import { cn } from "@/lib/utils";
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  PaperclipIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { AIModel, Message } from "./ChatCard";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ChatMessagesInputBoxProps {
  webSearchEnabled: boolean;
  setWebSearchEnabled: (value: boolean) => void;
  selectedFile: File | null;
  selectedImage: File | null;
  setSelectedFile: (file: File | null) => void;
  setSelectedImage: (image: File | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedModel: AIModel;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isSignedIn: boolean;
  setShowSignUpModal: (value: boolean) => void;
  setModalText: (value: string) => void;
}

const ChatMessagesInputBox = ({
  webSearchEnabled,
  setWebSearchEnabled,
  fileInputRef,
  selectedFile,
  selectedImage,
  setSelectedFile,
  setSelectedImage,
  inputValue,
  setInputValue,
  textareaRef,
  selectedModel,
  messages,
  setMessages,
  messagesEndRef,
  isTyping,
  setIsTyping,
  isSignedIn,
  setShowSignUpModal,
  setModalText,
}: ChatMessagesInputBoxProps) => {
  const [guestMessageCount, setGuestMessageCount] = useState(0);

  useEffect(() => {
    if (!isSignedIn) {
      const count = parseInt(
        localStorage.getItem("guestMessageCount") || "0",
        10
      );
      setGuestMessageCount(count);
    }
  }, [isSignedIn]);

  const handleFeatureClick = (featureName: string) => {
    if (!isSignedIn) {
      setModalText(
        `Please sign up to use premium features like ${featureName}.`
      );
      setShowSignUpModal(true);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
      } else {
        setSelectedFile(file);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize the textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  // Handle message sending
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    if (!isSignedIn) {
      if (guestMessageCount >= 3) {
        setModalText(
          "You've reached your free message limit. Please sign up to continue."
        );
        setShowSignUpModal(true);
        return;
      }
      const newCount = guestMessageCount + 1;
      setGuestMessageCount(newCount);
      localStorage.setItem("guestMessageCount", newCount.toString());
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    // First add message, then scroll in callback to ensure message is rendered
    setMessages((prev) => {
      // Use a callback to ensure we scroll after the state update
      setTimeout(() => {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);

      return [...prev, userMessage];
    });

    setInputValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI typing
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      // Generate dummy response based on input
      let response = "";

      if (
        userMessage.content.toLowerCase().includes("hello") ||
        userMessage.content.toLowerCase().includes("hi")
      ) {
        response = "Hello! How can I help you today?";
      } else if (userMessage.content.toLowerCase().includes("weather")) {
        response =
          "I don't have access to real-time weather data, but I can help you find a reliable weather service!";
      } else if (userMessage.content.toLowerCase().includes("help")) {
        response = "I'm here to help! What would you like assistance with?";
      } else if (
        userMessage.content.toLowerCase().includes("how does ai work")
      ) {
        response =
          "AI, or Artificial Intelligence, works by enabling computers to perform tasks that typically require human intelligence. This broad field encompasses several key concepts and techniques";
      } else {
        response =
          "That's an interesting question. Let me think about it... \n\nBased on my knowledge, I would say this is a complex topic with multiple perspectives. Would you like me to elaborate on any specific aspect?";
      }

      // Add AI response and ensure scrolling
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            id: Date.now().toString(),
            content: response,
            role: "assistant",
            timestamp: new Date(),
          },
        ] as Message[];

        // Use a callback to ensure we scroll after the state update
        setTimeout(() => {
          const chatContainer = document.getElementById("chat-container");
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);

        return newMessages;
      });

      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent dark:from-neutral-950/95 pt-8 z-10">
      <div className="w-full max-w-5xl mx-auto px-4">
        {/* Selected file/image previews */}
        <div className="flex flex-wrap gap-2 mb-2 justify-start">
          {selectedFile && (
            <Badge
              variant="outline"
              className="text-xs bg-green-50 border-green-200 text-green-600 flex items-center gap-2 px-2 py-1 animate-fadeIn"
            >
              <FileTextIcon className="h-3 w-3" />
              <span>
                {selectedFile.name.length > 20
                  ? selectedFile.name.substring(0, 18) + "..."
                  : selectedFile.name}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="ml-1 text-green-700 hover:text-green-900"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedImage && (
            <Badge
              variant="outline"
              className="text-xs bg-indigo-50 border-indigo-200 text-indigo-600 flex items-center gap-2 px-2 py-1 animate-fadeIn"
            >
              <ImageIcon className="h-3 w-3" />
              <span>
                {selectedImage.name.length > 20
                  ? selectedImage.name.substring(0, 18) + "..."
                  : selectedImage.name}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="ml-1 text-indigo-700 hover:text-indigo-900"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>

        {/* Input box */}
        <div className="relative w-full rounded-2xl rounded-br-none rounded-bl-none border border-neutral-200/90 dark:border-neutral-700/90 bg-white/70 dark:bg-neutral-900/70 shadow-sm backdrop-blur-xl">
          <textarea
            ref={textareaRef}
            className="w-full pl-4 pr-12 pt-4 pb-3  mb-12 outline-none resize-none bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-200 border-b dark:border-neutral-700"
            placeholder={`Message ${selectedModel.name}...`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{ minHeight: "56px" }}
          />

          {/* Toolbar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        if (isSignedIn) {
                          setWebSearchEnabled(!webSearchEnabled);
                        } else {
                          handleFeatureClick("web search");
                        }
                      }}
                      className={cn(
                        "p-2 rounded-xl transition-colors flex items-center gap-1 border border-neutral-200/90 dark:border-neutral-700/90",
                        webSearchEnabled
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                          : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300",
                        !isSignedIn && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <GlobeIcon className="w-5 h-5" />
                      <p className="text-sm">search</p>
                    </button>
                  </TooltipTrigger>
                  {!isSignedIn && (
                    <TooltipContent>
                      <p>Sign up to enable web search</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        if (isSignedIn) {
                          fileInputRef.current?.click();
                        } else {
                          handleFeatureClick("file uploads");
                        }
                      }}
                      className={cn(
                        "p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors",
                        !isSignedIn && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <PaperclipIcon className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  {!isSignedIn && (
                    <TooltipContent>
                      <p>Sign up to attach files</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                  inputValue.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
                )}
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesInputBox;
