// pages/api/auth/[...nextauth].ts
import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth";
import { incrementSessionRefreshCount } from '@/app/utils/cloud/redisRestClient';


import AzureADProvider from "next-auth/providers/azure-ad";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    error: string | undefined;
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      let error: string | undefined = session.error;

      if (!token?.email) {
        error = "Email is missing";
        session.error = "Email is missing";
        return session; // Return the modified session        
      }

      console.log("Session-Refresh: ",token.email);
      const dateKey = new Date().toISOString().slice(0, 7); // "YYYY-MM"
      await incrementSessionRefreshCount(token.email, dateKey, "", "", "");


      return {
        ...session,
        error,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
