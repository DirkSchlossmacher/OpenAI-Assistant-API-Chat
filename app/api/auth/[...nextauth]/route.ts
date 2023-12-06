// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
      // You might need to add authorization URL if the default one doesn't work for your case.
      // authorization: { url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" },
    }),
  ],
  // ... other next-auth configurations
});