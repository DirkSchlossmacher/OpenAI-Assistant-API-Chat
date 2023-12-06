import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import SessionProvider from "./providers/SessionProviders";
import Toaster from "./toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AdEx GenAI Assistants App",
  description:
    "OpenAI Assistant",
    metadataBase: 'https://mydomain.com'
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
      <Analytics />
    </html>
  );
}

