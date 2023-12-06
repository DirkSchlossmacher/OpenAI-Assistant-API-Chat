"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import Chat from "../components/Chat";
import { useEnforceAuthenticated } from "../hooks/useEnforceAuthenticated";
import { useMapPathToAssistantId } from "../hooks/useMapPathToAssistantId";
import { useUserHasAccess } from "../hooks/useUserHasAccess";

const Assistant: NextPage = () => {
  useEnforceAuthenticated();

  const { assistant } = useParams<{
    assistant: string;
  }>();

  const userHasAccess = useUserHasAccess(assistant);
  const assistantID = useMapPathToAssistantId(assistant);

  if (!userHasAccess || !assistantID) {
    console.log(userHasAccess, assistantID);
    return <div>Access denied</div>;
  }

  return <Chat assistantID={assistantID} />;
};

export default Assistant;
