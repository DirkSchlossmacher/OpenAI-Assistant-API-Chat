import { env } from "@/env.mjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserHasAccess = (assistant: string) => {
  const [userHasAccess, setUserHasAccess] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    const config = env.NEXT_PUBLIC_ASSISTANTS_CONFIG.find(
      (config) => config.urlPath === assistant,
    );

    if (!config) {
      setUserHasAccess(false);
      return;
    }

    const requiresAuth = config.restriction === "emails";

    if (!requiresAuth) {
      setUserHasAccess(true);
      return;
    }

    if (
      sessionData?.user?.email &&
      config.emails.includes(sessionData?.user?.email)
    ) {
      setUserHasAccess(true);
      return;
    }

    setUserHasAccess(false);
  }, [sessionData, assistant]);

  return userHasAccess;
};