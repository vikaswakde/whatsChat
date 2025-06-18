import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AIModel } from "./ChatCard";
import { Input } from "./ui/input";

const ChatInfoMenuCard = ({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel | null) => void;
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsMenuOpen(false); // Close menu when opening search
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchVisible(false); // Close search when opening menu
  };

  const handleNewChat = () => {
    // aDD actual logic to start a new chat
    console.log("Starting a new chat...");
    setIsMenuOpen(false);
  };

  const handleDeleteChat = () => {
    // aDD actual logic to delete the current chat
    console.log("Deleting the current chat...");
    setIsMenuOpen(false);
  };

  const handleViewHistory = () => {
    // aDD actual logic to view chat history
    console.log("Viewing chat history...");
    setIsMenuOpen(false);
  };
  return (
    <div className="relative flex gap-1 p-2 w-full items-center justify-between border-b dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-tr-md rounded-tl-md z-10">
      <div className="flex items-center w-full gap-5">
        <div
          className={cn(
            "flex-shrink-0 bg-neutral-100 dark:bg-neutral-800",
            "shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]",
            "flex items-center justify-center border dark:border-neutral-700 rounded-full p-1"
          )}
        >
          {selectedModel.icon}
        </div>
        <div className="flex flex-col -space-y-1">
          <p className="text-md font-bold text-neutral-600 dark:text-neutral-300">
            {selectedModel.name}
          </p>
          <p className="text-neutral-400 dark:text-neutral-400 text-sm mt-1">
            {selectedModel.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-2 text-gray-500 dark:text-neutral-400">
        {/* search through the current chathistory */}
        {isSearchVisible ? (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search in chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
            <button
              onClick={handleSearchToggle}
              className="cursor-pointer hover:text-red-500 transition-colors p-2"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSearchToggle}
            className="cursor-pointer hover:text-blue-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:rounded-sm p-2 hover:border duration-100"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        )}

        {/* access menu options like visit chat hisoty, create new chat, delete current chat, etc */}
        {!isSearchVisible && (
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="cursor-pointer hover:text-blue-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:rounded-sm p-2 hover:border duration-100"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 border border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={handleViewHistory}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  View History
                </button>
                <button
                  onClick={handleNewChat}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  New Chat
                </button>
                <button
                  onClick={handleDeleteChat}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50"
                >
                  Delete Chat
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInfoMenuCard;
