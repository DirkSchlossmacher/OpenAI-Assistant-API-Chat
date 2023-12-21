// useChatState.ts
import { useRef, useState } from "react";
import ChatManager from "../services/ChatManager";

type FileDetail = {
  name: string;
  type: string;
  size: number;
};

export const useChatState = (defaultAssistentId: string) => {
  const [assistantName, setAssistantName] = useState("");
  const [assistantModel, setAssistantModel] = useState("gpt-4-1106-preview");
  const [assistantDescription, setAssistantDescription] = useState("");
  const [inputmessage, setInputmessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: string; content: any }[]
  >([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isStartLoading, setStartLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // const [initialThreadMessage, setInitialThreadMessage] = useState(
  //    "You are a super-smart and experienced assistant for all at AdEx Partners who aim to identify project opportunities at prospects and existing clients! Introduce yourself and give examples how you can help to the user. Suggest sample questions and explain the required, suited context per question in order to provide good assistance. Additionally: - explain how users can use you by copy/paste unstructured input (like: chat conversations, email exchanges, etc), to identify opportunities, to obtain guidance for next steps, ...",
  // );
  const [initialThreadMessage, setInitialThreadMessage] = useState(
    "You are a super-smart assistant for all at AdEx Partners: Introduce yourself in accordance with your given instructions (see your Assistant API configuration) with LESS than 100 words (but somewhat styled with markdown formatting), incl. the following: at intro end provide a choice (fortmatted as ordered list) [ A) if you shall: give examples how you can help to the user; B) if you shall: suggest sample questions and explain the required, suited context per question in order to provide good assistance; C) if you shall: explain how users can use you by copy/paste unstructured input (like: chat conversations, email exchanges, etc), to benefit from your knowledge and to obtain guidance; or D) if you shall: explain more on how to interact and benefit from you.] Should the user already know you, the interaction can start without further explanations.",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const counter = useRef(0);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [chatManager, setChatManager] = useState<ChatManager | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(
    defaultAssistentId,
  );
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoadingFirstMessage, setIsLoadingFirstMessage] = useState(false);
  const [chatUploadedFiles, setChatUploadedFiles] = useState<File[]>([]);
  const [chatFileDetails, setChatFileDetails] = useState<FileDetail[]>([]);

  return {
    assistantName,
    setAssistantName,
    assistantModel,
    setAssistantModel,
    assistantDescription,
    setAssistantDescription,
    inputmessage,
    setInputmessage,
    chatMessages,
    setChatMessages,
    chatStarted,
    setChatStarted,
    isButtonDisabled,
    setIsButtonDisabled,
    files,
    setFiles,
    assistantId,
    setAssistantId,
    threadId,
    setThreadId,
    isStartLoading,
    setStartLoading,
    isSending,
    setIsSending,
    statusMessage,
    setStatusMessage,
    counter,
    inputRef,
    formRef,
    initialThreadMessage,
    setInitialThreadMessage,
    chatManager,
    setChatManager,
    isMessageLoading,
    setIsMessageLoading,
    progress,
    setProgress,
    isLoadingFirstMessage,
    setIsLoadingFirstMessage,
    chatUploadedFiles,
    setChatUploadedFiles,
    chatFileDetails,
    setChatFileDetails,
  };
};
