import { env } from "@/env.mjs";
import { useEffect, useState } from "react";

export const useMapPathToAssistantId = (path: string) => {
  const [assistantId, setAssistantId] = useState<string | null>(null);

  useEffect(() => {
    console.log("path:",path,"assistant config:",env.NEXT_PUBLIC_ASSISTANTS_CONFIG);

    const config = env.NEXT_PUBLIC_ASSISTANTS_CONFIG.find(
      (config) => config.urlPath === path,
    );

    if (!config) {
      setAssistantId(null);
      return;
    }

    setAssistantId(config.assistantId);
  }, [path]);

  return assistantId;
};
