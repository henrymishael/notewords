import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: number;
      username?: string;
    };
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    role: number;
    token: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: number;
    accessToken: string;
    username?: string;
  }
}
