// app/page.tsx

"use client";

import { NextPage } from "next";
import Chat from "./components/Chat";
import { useEnforceAuthenticated } from "./hooks/useEnforceAuthenticated";
import { useMapPathToAssistantId } from "./hooks/useMapPathToAssistantId";
import { useUserHasAccess } from "./hooks/useUserHasAccess";

const Root: NextPage = () => {
  useEnforceAuthenticated();

  const userHasAccess = useUserHasAccess("default");
  const assistantID = useMapPathToAssistantId("default");

  if (!userHasAccess || !assistantID) {
    console.log(userHasAccess, assistantID);
    return <div>Access denied</div>;
  }

  return <Chat assistantID={assistantID} />;
};

export default Root;
