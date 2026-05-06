"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ExpandableDescriptionProps {
  text: string;
  isMarkdown?: boolean;
}

export default function ExpandableDescription({ text, isMarkdown = false }: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return (
      <p className="text-base text-zinc-500 dark:text-zinc-400 italic">
        Welcome to our official page. We are currently updating our description.
      </p>
    );
  }

  const CHARACTER_LIMIT = 180;
  const isLong = text.length > CHARACTER_LIMIT;

  // ==========================================
  // MODE 1: PLAIN TEXT RENDERING
  // ==========================================
  if (!isMarkdown) {
    if (!isLong) {
      return (
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      );
    }

    return (
      <div className="space-y-3">
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {isExpanded ? text : `${text.substring(0, CHARACTER_LIMIT)}...`}
        </p>
        <ToggleButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
      </div>
    );
  }

  // ==========================================
  // MODE 2: MARKDOWN RENDERING
  // ==========================================
  return (
    <div className="space-y-3 w-full">
      <div 
        // We use prose to automatically style headings, lists, and links.
        // We use line-clamp to visually truncate without breaking HTML nodes.
        className={`prose prose-zinc dark:prose-invert prose-p:leading-relaxed prose-a:text-indigo-500 hover:prose-a:text-indigo-600 max-w-none text-base md:text-lg ${
          !isExpanded && isLong ? "line-clamp-4 overflow-hidden" : ""
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      
      {isLong && (
        <ToggleButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
      )}
    </div>
  );
}

// Reusable button component to keep the code DRY
function ToggleButton({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors pt-2"
    >
      {isExpanded ? (
        <>Show Less <ChevronUp className="w-4 h-4" /></>
      ) : (
        <>Read More <ChevronDown className="w-4 h-4" /></>
      )}
    </button>
  );
}