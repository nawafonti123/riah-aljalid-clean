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
        console.log('Starting authorize with:', credentials);
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
          console.log('Fetching URL:', url);

          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log('Response status:', res.status);
          
          const responseText = await res.text();
          console.log('Response text:', responseText);

          if (!res.ok) {
            console.error('Login failed with status', res.status);
            return null;
          }

          // محاولة تحليل JSON
          let data;
          try {
            data = JSON.parse(responseText);
          } catch {
            console.error('Failed to parse response as JSON');
            return null;
          }

          console.log('Parsed data:', data);

          // فك التوكن
          const decoded = jwtDecode<DecodedToken>(data.access_token);
          console.log('Decoded token:', decoded);

          // إرجاع المستخدم مع التوكنات
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
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };