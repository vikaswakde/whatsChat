import { ImageIcon, FileTextIcon, SparklesIcon, GlobeIcon } from "lucide-react";
import React from "react";

const WelcomeCard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-8 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
        <SparklesIcon className="h-10 w-10 text-blue-500 dark:text-blue-300" />
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
        Welcome to AI Chat
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-8">
        Select an AI model from the sidebar to start a conversation. Each model
        has unique capabilities to help with your tasks.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-800/50 hover:shadow-md transition-shadow">
          <FileTextIcon className="h-6 w-6 text-blue-500 mb-2" />
          <h3 className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Ask Questions
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Get answers to any question from multiple AI models
          </p>
        </div>

        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-800/50 hover:shadow-md transition-shadow">
          <ImageIcon className="h-6 w-6 text-purple-500 mb-2" />
          <h3 className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Generate Images
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Create images from text descriptions
          </p>
        </div>

        <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-800/50 hover:shadow-md transition-shadow">
          <GlobeIcon className="h-6 w-6 text-green-500 mb-2" />
          <h3 className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Web Search
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Get up-to-date information from the web
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
