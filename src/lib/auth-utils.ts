import nookies from "nookies";
import CredentialsProvider from "next-auth/providers/credentials";
import { signin } from "@/requests/auth";
import { _storageKeys } from "@/lib/utils";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.login || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const { login, password } = credentials as ILoginPayload;

          const response = await signin({
            login,
            password,
          });

          // Optional: Set additional cookie if needed
          if (req && "res" in req && req.res) {
            nookies.set({ res: req.res }, _storageKeys.token, response.token, {
              maxAge: 1 * 24 * 60 * 60, // 1 day
              path: "/",
              httpOnly: false,
            });
          }

          // Return user object that matches the extended User interface
          return {
            id: response.user.id.toString(), // Ensure it's a string
            name: response.user.name,
            email: response.user.email,
            image: response.user.profile_picture,
            role: response.user.user_type_id,
            token: response.token,
            username: response.user.username,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null on error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On first sign in, user object is available
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.role = user.role;
        token.accessToken = user.token;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
