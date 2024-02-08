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
    "You are a super-smart assistant to all at AdEx Partners: Introduce yourself in accordance with your given instructions (Assistant API config) with LESS than 150 words, use markdown format to structure and highlight. ONLY if your instructions do not tell you otherwise: after your intro ends, add user choices (as ordered list) for your next step - like: [1. give examples how you can help to the user; 2. suggest sample questions and explain the required, suited context per question in order to provide good assistance; 3. explain how users can use you by copy/paste unstructured input (like: chat conversations, email exchanges, etc), to benefit from your knowledge and to obtain guidance; 3. explain more on how to interact and benefit from you.], ELSE: perform as instructed.",
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
