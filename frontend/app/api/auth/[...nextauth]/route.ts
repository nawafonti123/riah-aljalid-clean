import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            process.env.BACKEND_URL;

          if (!baseUrl) {
            console.error('Missing NEXT_PUBLIC_API_URL/BACKEND_URL');
            return null;
          }

          const url = `${baseUrl}/auth/login`;

          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const responseText = await res.text();

          if (!res.ok) {
            console.error('Login failed:', res.status, responseText);
            return null;
          }

          let data: any;
          try {
            data = JSON.parse(responseText);
          } catch {
            console.error('Invalid JSON from backend:', responseText);
            return null;
          }

          if (!data?.access_token) {
            console.error('Backend did not return access_token:', data);
            return null;
          }

          const decoded = jwtDecode<DecodedToken>(data.access_token);

          return {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          } as any;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.role = u.role;
        token.id = u.id;
        token.email = u.email;
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ نخلي accessToken واضح للفرونت
      (session as any).accessToken = token.accessToken as string;

      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        session.user.email = (token.email as string) || session.user.email || '';
      }

      return session;
    },
  },

  // ✅ مهم جداً: مسار تسجيل الدخول الحقيقي عندك /admin/[secret]/login
  pages: {
    signIn: `/admin/${process.env.ADMIN_SECRET || 'login'}/login`,
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };