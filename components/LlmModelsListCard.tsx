"use client";
import { cn } from "@/lib/utils";
import { Gemini, OpenAI } from "@lobehub/icons";
import React, { useState } from "react";
import { AIModel } from "./ChatCard";
import { PinIcon, EyeIcon, ImageIcon, CloudLightningIcon } from "lucide-react";
import { Badge } from "./ui/badge";

// dummy ai models
const aiModels: AIModel[] = [
  {
    id: "gemini",
    name: "Gemini 2.5 Pro",
    description:
      "Ask this model the questions you have about any topic in deep research",
    icon: <Gemini className="h-4 w-4 text-neutral-600" size={25} />,
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most capable model for reasoning tasks",
    icon: <OpenAI className="h-4 w-4 text-neutral-600" size={25} />,
  },
  {
    id: "gpt4",
    name: "GPT-4o",
    description: "OpenAI's most advanced model for complex tasks",
    icon: <OpenAI className="h-4 w-4 text-neutral-600" size={25} />,
  },
];

const LlmModelsListCard = ({
  models,
  selectedModel,
  setSelectedModel,
  onPinToggle,
}: {
  models: AIModel[];
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel) => void;
  onPinToggle: (modelId: string) => void;
}) => {
  // Handle model selection
  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
  };

  return (
    <div className="flex-1 mt-3 relative max-w-full overflow-auto">
      <div className="h-full w-full bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 dark:divide-neutral-700 border border-neutral-200 dark:border-neutral-700">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => handleModelSelect(model)}
            className={cn(
              "flex gap-3 p-4 cursor-pointer transition-colors group relative",
              selectedModel?.id === model.id
                ? "bg-blue-50 dark:bg-blue-900/50"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  "h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800",
                  "shadow-sm flex items-center justify-center"
                )}
              >
                {model.icon}
              </div>
            </div>
            <div className="flex flex-col pt-1 flex-1">
              <p className="text-md font-medium text-neutral-800 dark:text-neutral-200">
                {model.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 text-wrap max-w-[240px]">
                {model.description}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {model.vision && (
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    Vision
                  </Badge>
                )}
                {model.imageGen && (
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Image Gen
                  </Badge>
                )}
                {model.fast && (
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    <CloudLightningIcon className="w-3 h-3 mr-1" />
                    Fast
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPinToggle(model.id);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/50 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <PinIcon
                className={cn(
                  "w-4 h-4 text-neutral-400",
                  model.pinned &&
                    "fill-yellow-400 text-yellow-500 dark:text-yellow-400"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LlmModelsListCard;
