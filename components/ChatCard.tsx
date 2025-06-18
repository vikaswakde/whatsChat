"use client";
import { cn } from "@/lib/utils";
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LoaderIcon,
  SparklesIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import ChatInfoMenuCard from "./ChatInfoMenuCard";
import LlmModelsListCard from "./LlmModelsListCard";
import ModelSearchAndFilterCard from "./ModelSearchAndFilterCard";
import ChatMessagesInputBox from "./ChatMessagesInputBox";
import WelcomeCard from "./WelcomeCard";
import { Gemini, OpenAI } from "@lobehub/icons";

// Define message type
export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export type AIModel = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  pinned?: boolean;
  imageGen?: boolean;
  vision?: boolean;
  fast?: boolean;
};

// dummy ai models
const aiModels: AIModel[] = [
  {
    id: "gemini",
    name: "Gemini 2.5 Pro",
    description:
      "Ask this model the questions you have about any topic in deep research",
    icon: (
      <Gemini
        className="h-4 w-4 text-neutral-600 dark:text-neutral-300"
        size={25}
      />
    ),
    vision: true,
    fast: true,
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most capable model for reasoning tasks",
    icon: (
      <OpenAI
        className="h-4 w-4 text-neutral-600 dark:text-neutral-300"
        size={25}
      />
    ),
    pinned: true,
    fast: true,
  },
  {
    id: "gpt4",
    name: "GPT-4o",
    description: "OpenAI's most advanced model for complex tasks",
    icon: (
      <OpenAI
        className="h-4 w-4 text-neutral-600 dark:text-neutral-300"
        size={25}
      />
    ),
    imageGen: true,
    vision: true,
  },
];

const ChatCard = () => {
  const [inputValue, setInputValue] = useState("");
  const [allModels, setAllModels] = useState<AIModel[]>(aiModels);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    pinned: false,
    imageGen: false,
    vision: false,
    fast: false,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [featuresPanelOpen, setFeaturesPanelOpen] = useState(false);

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
      textareaRef.current.focus();
    }
  };

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handlePinToggle = (modelId: string) => {
    setAllModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId ? { ...model, pinned: !model.pinned } : model
      )
    );
  };

  const filteredModels = allModels
    .filter((model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((model) => {
      if (activeFilters.pinned && !model.pinned) return false;
      if (activeFilters.imageGen && !model.imageGen) return false;
      if (activeFilters.vision && !model.vision) return false;
      if (activeFilters.fast && !model.fast) return false;
      return true;
    });

  // Toggle features panel
  const toggleFeaturesPanel = () => {
    setFeaturesPanelOpen(!featuresPanelOpen);
  };

  return (
    <div
      className={cn(
        "w-full h-full min-h-[42rem] bg-white dark:bg-neutral-950",
        "shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]",
        "p-2 flex"
      )}
    >
      {/* left section chats and llms */}
      <div className="flex flex-col h-full w-[400px] border-neutral-200 dark:border-neutral-700">
        {/* chats header search, filter, and menu options */}
        <ModelSearchAndFilterCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
        />

        {/* llm models list - styled like WhatsApp contacts */}
        <LlmModelsListCard
          models={filteredModels}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onPinToggle={handlePinToggle}
        />
      </div>

      {/* right main chats section */}
      <div className="h-full w-full bg-white dark:bg-neutral-900 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col relative overflow-hidden ml-2">
        {selectedModel ? (
          <>
            {/* top chat menu section */}
            <ChatInfoMenuCard
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />

            {/* main chat section with chat interface */}
            <div
              className="flex-1 flex flex-col bg-white dark:bg-neutral-900 overflow-y-auto"
              id="chat-container"
            >
              {/* Messages would go here */}
              <div className="flex-1 px-4 py-6 pb-38">
                <div className="flex flex-col gap-6 max-w-6xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col",
                        message.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl p-4 shadow-sm",
                          message.role === "user"
                            ? "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                            : "shadow-none"
                        )}
                      >
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && <LoaderIcon className="spin mb-2" />}
                  <div ref={messagesEndRef} className="h-1" />
                </div>
              </div>

              {/* Input area with frosted glass effect - positioned absolute at bottom */}
              <ChatMessagesInputBox
                webSearchEnabled={webSearchEnabled}
                setWebSearchEnabled={setWebSearchEnabled}
                fileInputRef={fileInputRef}
                selectedFile={selectedFile}
                selectedImage={selectedImage}
                setSelectedFile={setSelectedFile}
                setSelectedImage={setSelectedImage}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaRef={textareaRef}
                selectedModel={selectedModel}
                messages={messages}
                setMessages={setMessages}
                messagesEndRef={messagesEndRef}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
              />
            </div>
          </>
        ) : (
          // Welcome screen when no model is selected
          <WelcomeCard />
        )}
      </div>
    </div>
  );
};

export default ChatCard;
