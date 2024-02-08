// hooks/useStartAssistant.ts
import { useEffect } from "react";
import ChatManager from "../services/ChatManager";

export const useStartAssistant = (
  assistantId: string | null,
  chatManager: ChatManager | null,
  initialThreadMessage: string,
) => {
  useEffect(() => {
    if (assistantId && chatManager) {
      console.log("Assistant ID gefunden:", assistantId);
      console.log('userEmail pre startAssistantWithId:', localStorage.getItem('userEmail'));
      const addEmail = " (User Email: "+localStorage.getItem('userEmail')+")";
      chatManager.startAssistantWithId(assistantId, initialThreadMessage + addEmail);
    } else {
      console.warn("Assistant ID nicht gefunden");
    }
  }, [assistantId, chatManager, initialThreadMessage]);
};
