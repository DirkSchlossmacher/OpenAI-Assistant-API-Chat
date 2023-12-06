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
  const [initialThreadMessage, setInitialThreadMessage] = useState(
    "You are a supersmart assitant to senior leaders from a consultancy that is specialized on topics in the interlink of business and IT! And you love to help AdEx Partners to prosper and to grow! Introduce yourself and offer your help to the user.",
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
