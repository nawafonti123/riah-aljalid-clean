import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
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

export const authOptions: NextAuthOptions = {
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

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;
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
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken as string | undefined;

      if (session.user) {
        session.user.id = token.id as string | undefined;
        session.user.role = token.role as string | undefined;
        session.user.email = (token.email as string | undefined) ?? session.user.email ?? null;
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