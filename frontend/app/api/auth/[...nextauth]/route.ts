import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

type LoginResponse = {
  access_token: string;
  refresh_token?: string;
};

type Credentials = {
  email: string;
  password: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const c = credentials as Credentials | undefined;
        if (!c?.email || !c?.password) return null;

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;

        if (!baseUrl) return null;

        const res = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: c.email, password: c.password }),
        });

        if (!res.ok) return null;

        const data = (await res.json()) as LoginResponse;
        if (!data?.access_token) return null;

        const decoded = jwtDecode<DecodedToken>(data.access_token);

        return {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        } as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        (token as any).accessToken = u.accessToken;
        (token as any).refreshToken = u.refreshToken;
        (token as any).role = u.role;
        (token as any).id = u.id;
        (token as any).email = u.email;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;

      if (session.user) {
        (session.user as any).id = (token as any).id;
        (session.user as any).role = (token as any).role;
        session.user.email =
          ((token as any).email as string | undefined) ?? session.user.email ?? null;
      }

      return session;
    },
  },

  pages: {
    signIn: `/admin/${process.env.ADMIN_SECRET || "login"}/login`,
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };