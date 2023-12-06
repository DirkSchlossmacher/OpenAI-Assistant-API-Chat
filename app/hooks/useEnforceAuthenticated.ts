import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { env } from "../../env.mjs";

export const useEnforceAuthenticated = () => {
  const searchParams = useSearchParams();
  const { data: sessionData } = useSession();

  useEffect(() => {
    const token = searchParams.get("token");

    if (sessionData || token === env.NEXT_PUBLIC_AUTH_TOKEN) {
      return;
    }

    signIn("azure-ad");
  }, [sessionData]);
};
