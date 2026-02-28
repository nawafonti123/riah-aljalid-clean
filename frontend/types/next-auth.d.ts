import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      role?: string;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
  }
}