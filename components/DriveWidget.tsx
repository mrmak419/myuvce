"use client";

import { useState, useEffect, useCallback } from "react";
import { Folder, FileText, ArrowLeft, Loader2, X, ExternalLink, Image as ImageIcon } from "lucide-react";

interface DriveItem {
  id: string;
  name: string;
  type: "folder" | "file";
  mime?: string;
}

interface DriveResponse {
  items: DriveItem[];
  error?: string;
}

const WORKER_URL = "https://uvce-drive-cache.mrmak419.workers.dev";

export default function DriveWidget({ rootId }: { rootId: string }) {
  const [history, setHistory] = useState<string[]>([rootId]);
  const currentFolderId = history[history.length - 1];
  const isRoot = history.length === 1;

  const [data, setData] = useState<DriveResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<{ id: string; name: string } | null>(null);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const fetchFolder = useCallback(async (folderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${WORKER_URL}?id=${folderId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      
      const result: DriveResponse = await res.json();
      if (result.error) throw new Error(result.error);
      
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load directory.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolder(currentFolderId);
  }, [currentFolderId, fetchFolder]);

  useEffect(() => {
    if (previewFile) {
      document.body.style.overflow = "hidden";
      setIframeLoading(true);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [previewFile]);

  const handleItemClick = (item: DriveItem) => {
    if (item.type === "folder") {
      setHistory(prev => [...prev, item.id]);
    } else {
      setPreviewFile({ id: item.id, name: item.name });
    }
  };

  const handleBackClick = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handlePrefetch = (item: DriveItem) => {
    if (item.type === "file") {
      fetch(`${WORKER_URL}?action=view&id=${item.id}`, { 
        method: "GET",
        priority: "low" 
      } as RequestInit).catch(() => {});
    }
  };

  const isImage = (filename: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[60vh] min-h-[400px] md:h-[500px]">
      
      <div className="bg-neutral-50 dark:bg-neutral-950 px-4 py-3 md:py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm md:text-base font-bold text-neutral-600 dark:text-neutral-400">
          <Folder className="w-5 h-5 text-orange-500" />
          <span className="truncate max-w-[150px] sm:max-w-none">
            {isRoot ? "Root Directory" : "Sub-Directory"}
          </span>
        </div>
        {!isRoot && (
          <button
            onClick={handleBackClick}
            className="flex items-center gap-1.5 text-sm font-bold text-neutral-700 dark:text-neutral-200 bg-neutral-200/50 dark:bg-neutral-800 px-3 py-2 md:px-4 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors active:scale-95 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />
          </div>
        )}

        {error ? (
          <div className="flex items-center justify-center h-full text-red-500 text-sm font-medium px-4 text-center italic">
            {error}
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
            Folder is empty
          </div>
        ) : (
          <ul className="space-y-1">
            {data?.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => handlePrefetch(item)}
                  onTouchStart={() => handlePrefetch(item)}
                  className="w-full flex items-center gap-4 px-3 py-3.5 md:px-4 md:py-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors group active:bg-neutral-200 dark:active:bg-neutral-700 touch-manipulation"
                >
                  {item.type === "folder" ? (
                    <Folder className="w-6 h-6 text-blue-500 flex-shrink-0 fill-blue-500/20" />
                  ) : isImage(item.name) ? (
                    <ImageIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <FileText className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                  <span className="text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-200 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {previewFile && (
        <div className="fixed inset-0 z-[99999] bg-neutral-950 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
            <h3 className="text-white font-semibold text-sm md:text-base truncate max-w-[65%]">
              {previewFile.name}
            </h3>
            
            <div className="flex items-center gap-3">
              <a 
                href={`https://drive.google.com/file/d/${previewFile.id}/view`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-neutral-800"
                title="Open in Drive"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setPreviewFile(null)} 
                className="text-neutral-400 hover:text-red-500 transition-colors p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative w-full flex-1 h-[100dvh] bg-neutral-100 flex items-center justify-center overflow-hidden">
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 z-10">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <span className="text-sm font-bold text-neutral-500">Loading Secure Viewer...</span>
              </div>
            )}
            
            {isImage(previewFile.name) ? (
              <img 
                src={`${WORKER_URL}?action=view&id=${previewFile.id}`} 
                alt={previewFile.name}
                className="max-w-full max-h-full object-contain p-4 shadow-lg"
                onLoad={() => setIframeLoading(false)}
              />
            ) : previewFile.name.toLowerCase().match(/\.(doc|docx|ppt|pptx|xls|xlsx)$/) ? (
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(`${WORKER_URL}?action=view&id=${previewFile.id}`)}&embedded=true`}
                className="w-full h-full border-none"
                title={previewFile.name}
                onLoad={() => setIframeLoading(false)}
              />
            ) : (
              <iframe
                src={`${WORKER_URL}?action=view&id=${previewFile.id}`}
                className="w-full h-full border-none"
                title={previewFile.name}
                onLoad={() => setIframeLoading(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}