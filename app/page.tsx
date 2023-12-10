// app/page.tsx

"use client";

import { NextPage } from "next";
import Chat from "./components/Chat";
import { useEnforceAuthenticated } from "./hooks/useEnforceAuthenticated";
import { useMapPathToAssistantId } from "./hooks/useMapPathToAssistantId";
import { useUserHasAccess } from "./hooks/useUserHasAccess";

const Root: NextPage = () => {
  const isAuthenticated = useEnforceAuthenticated();
  const userHasAccess = useUserHasAccess("default");
  const assistantID = useMapPathToAssistantId("default");

  console.log("app/page.tsx: isAuthenticated:", isAuthenticated);

  if (!userHasAccess || !assistantID || !isAuthenticated) {
    return <div>Access denied</div>;
  }

  return <Chat assistantID={assistantID} />;
};

export default Root;
