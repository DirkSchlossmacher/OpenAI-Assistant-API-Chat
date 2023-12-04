import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Toaster from "./toaster";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agent42",
  description:
    "OpenAI Assistant",
    metadataBase: 'https://mydomain.com'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      <Analytics />
    </html>
  );
}

/*
// pages/_app.tsx or the equivalent in your project

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;


// Any React component
import { useSession, signIn, signOut } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in

      <button onClick={() => signIn('azure-ad')}>Sign in with Azure AD</button>
    </>
  );
}

export default AuthButton;
*/