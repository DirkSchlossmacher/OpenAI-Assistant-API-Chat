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

/* https://adex-my-assistant.vercel.app/api/auth/session 
sample response      

      {
        "user": {
            "name": "Dirk Schlossmacher",
            "email": "dirk.schlossmacher@adexpartners.com",
            "image": "data:image/jpeg;base64, /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAwADADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrtskkpOSBmua8Zrc3zWGh2l39nNyHlmcE5CKAOx7lv0rqJJ4o2JZwAK47W7iKTxfp19C3yJaTRSHaecEEc/ia3xEmqbaMsPFSqJMvaf8AD7RGsVWee9lkA5f7Sy5P4Gs7xH4S0xLVhbG4glC4Rknbk9s81v6brpmn+yi2ki5A3shCkkZGKx9b12OX5ZEIBLbTtO35Tg89uo615N5231PXUIX1WhyngrW9R05b3R7tjI8bCSJnctgHqB/OulOo3c0q75mwT0HFcXp6sfGd1KzMAbcFfQ+36ZrqIsmZPqK9eg+aCbPHrx5ZtInurqaaZ97k89Kt6XcQRROJ2GRIrKuOoxg1nSn96/8AvGmb9nz7goXkkngU61P2kHEVGp7OakdPHrMEcnm/Zv3MTA4QZcf7Rzzj2FYEGp2k4mJidI2ZiAwwSc/qKv2EtrqVmLmFoGkAI3nGGH19M1g6kFsppZSkZuHG35ediV47jZWZ7andXQy0t1ub6S4jXAUlRxjrW9Z2v7xdoyc8tXLQa9Do2s2+manIIormFJQ5H+pZicBvYjB9vpXo9pbJHsIwc8gg5Br1aCUKaSPHxEnKpdnk/iXxLNY6i9nZBPMQ5kkdc4J7AVyF9qV9qHFzdSSL/dJwo/AcVZ1C3vJ9Uu5mtp2LzMc+WeeaqPY3m1sWs/T/AJ5mm5XBKx6npMIh0XR4rhCkMumxTRORgZywYfmAfxrc03w2/mNqF+vlWijesb/ecAZ3N6D2712GiaDBH4f0jzFy0VpEEDfMVbaM4z0rH+I097p/grUJY2LSTqLdFC7my5wcY9t35VzqgudyZ0Os+TlR8867qLa1rt7qLZxPISgPZBwo/ICtnwl4t1XQLyCCGXzrJ3CtbTElRk9V/un6cVhnTrrb/wAes/HbyzVmxsbpb23JtZgBIpP7s+tbGJ//2Q==",
            "id": "lAfZYLKAmPbhsW_60IkahSxoD8p9eUuMBadp2p1esjA"
        },
        "expires": "2024-01-13T12:09:01.577Z"
    }
*/

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
