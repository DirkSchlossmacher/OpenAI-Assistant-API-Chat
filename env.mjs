import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const AssistantsConfigSchema = z.array(z.object({
    "assistantId": z.string(),
    "urlPath": z.string(),
    "initialThreadMessage": z.string().optional(),
    "restriction": z.enum(["none", "emails"]).optional(),
    "emails": z.array(z.string().email()),
}))

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),

        NEXTAUTH_URL: z.string(),
        NEXTAUTH_SECRET: z.string().min(18),

        AZURE_AD_CLIENT_ID: z.string(),
        AZURE_AD_CLIENT_SECRET: z.string(),
        AZURE_AD_TENANT_ID: z.string(),

        OPENAI_API_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_AUTH_TOKEN: z.string(),
        NEXT_PUBLIC_ASSISTANTS_CONFIG: AssistantsConfigSchema
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,

        NEXTAUTH_URL: process.env.VERCEL_URL ?? process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

        AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
        AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
        AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,

        OPENAI_API_KEY: process.env.OPENAI_API_KEY,

        NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN,
        NEXT_PUBLIC_ASSISTANTS_CONFIG: JSON.parse(process.env.NEXT_PUBLIC_ASSISTANTS_CONFIG || "[]"),
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    onValidationError: (error) => {
        console.error(error);
        throw error;
    },
});
