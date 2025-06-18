import {
  BrainCircuitIcon,
  CloudLightningIcon,
  EyeIcon,
  FastForwardIcon,
  ImageIcon,
  MenuIcon,
  PinIcon,
  PlusIcon,
} from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ModeToggle } from "./mode-toggle";

interface ModelSearchAndFilterCardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: Record<string, boolean>;
  onFilterToggle: (filter: string) => void;
}

const ModelSearchAndFilterCard = ({
  searchQuery,
  setSearchQuery,
  activeFilters,
  onFilterToggle,
}: ModelSearchAndFilterCardProps) => {
  return (
    <div className="h-[10rem] w-full bg-white dark:bg-neutral-900 rounded-lg  border border-gray-300/80 dark:border-neutral-700 flex flex-col justify-around px-1 gap-2 shadow-xs p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-neutral-600 dark:text-neutral-300 font-bold p-2">
          Models
        </h1>
        <div className="flex items-center gap-3 px-3 text-gray-500 dark:text-neutral-400">
          <ModeToggle />
          <PlusIcon className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
          <MenuIcon className="w-4 h-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
        </div>
      </div>
      {/* search models  */}
      <div className="px-4 flex">
        <Input
          placeholder="Search for models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* filter models based on features supported */}
      <div className="flex gap-3 px-1">
        {/* pinned models */}
        <button
          className="cursor-pointer"
          onClick={() => onFilterToggle("pinned")}
        >
          <Badge variant={activeFilters.pinned ? "secondary" : "outline"}>
            <PinIcon />
            Pinned
          </Badge>
        </button>

        {/* Supports image generation */}
        <button
          className="cursor-pointer"
          onClick={() => onFilterToggle("imageGen")}
        >
          <Badge variant={activeFilters.imageGen ? "secondary" : "outline"}>
            <ImageIcon />
            Image Gen
          </Badge>
        </button>

        {/* Supports image uploads and analysis */}
        <button
          className="cursor-pointer"
          onClick={() => onFilterToggle("vision")}
        >
          <Badge variant={activeFilters.vision ? "secondary" : "outline"}>
            <EyeIcon />
            Vision
          </Badge>
        </button>
        {/* Very fast model */}
        <button
          className="cursor-pointer"
          onClick={() => onFilterToggle("fast")}
        >
          <Badge variant={activeFilters.fast ? "secondary" : "outline"}>
            <CloudLightningIcon />
            fast
          </Badge>
        </button>
      </div>
    </div>
  );
};

export default ModelSearchAndFilterCard;
