"use client";

import { useState, useEffect, useCallback } from "react";
import { Folder, FileText, File, ArrowLeft, X, Loader2, ExternalLink } from "lucide-react";

const SCRIPT_URL = "https://uvce-drive-cache.mrmak419.workers.dev/";

interface DriveItem {
  id: string;
  name: string;
  type: "folder" | "file";
  mime?: string;
}

interface DriveResponse {
  currentId: string;
  parent: string | null;
  items: DriveItem[];
  error?: string;
}

export default function DriveWidget({ rootId }: { rootId: string }) {
  const [currentFolder, setCurrentFolder] = useState<string>(rootId);
  const [data, setData] = useState<DriveResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal & Iframe State
  const [previewFile, setPreviewFile] = useState<{ id: string; name: string } | null>(null);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const fetchFolder = useCallback(async (folderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${SCRIPT_URL}?id=${folderId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const json: DriveResponse = await res.json();
      
      if (json.error) throw new Error(json.error);
      
      setData(json);
      setCurrentFolder(folderId);
    } catch (err: any) {
      setError("Server Busy or Folder Unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 1. Initial Load
  useEffect(() => {
    fetchFolder(rootId);
  }, [rootId, fetchFolder]);

  // 2. Body Scroll Lock for Modal
  useEffect(() => {
    if (previewFile) {
      document.body.style.overflow = "hidden";
      setIframeLoading(true); // Reset loader every time a new file is opened
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewFile]);

  const isRoot = currentFolder === rootId;

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Header & Breadcrumbs */}
        <div className="bg-neutral-50 dark:bg-neutral-950 p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="font-bold text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-2">
            📂 {isRoot ? "Main Directory" : "Sub-folder"}
          </div>
          {!isRoot && data?.parent && (
            <button 
              onClick={() => data.parent && fetchFolder(data.parent)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>

        {/* Folder Contents */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
              <span className="font-medium">Fetching files...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500 font-medium">{error}</div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">This folder is empty.</div>
          ) : (
            <div className="space-y-1">
              {data?.items.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => item.type === "folder" ? fetchFolder(item.id) : setPreviewFile({ id: item.id, name: item.name })}
                  className="group flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                >
                  <div className="flex-shrink-0">
                    {item.type === "folder" ? (
                      <Folder className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                    ) : item.mime?.includes("pdf") ? (
                      <FileText className="w-6 h-6 text-red-500" />
                    ) : (
                      <File className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen PDF Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-[99999] flex flex-col bg-neutral-900/98">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="font-bold text-neutral-900 dark:text-white truncate pr-4 max-w-[70%]">
              {previewFile.name}
            </h3>
            
            <div className="flex items-center gap-2">
              <a 
                href={`https://drive.google.com/file/d/${previewFile.id}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                title="Open directly in Google Drive"
              >
                 <ExternalLink className="w-3.5 h-3.5" />
              </a>
              
              <button 
                onClick={() => setPreviewFile(null)}
                className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Iframe & Loading State Container */}
          <div className="relative w-full flex-1 bg-neutral-100 dark:bg-neutral-900">
            
            {/* 🔴 THE FIX: Loading overlay stays until the iframe finishes painting */}
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 animate-pulse">
                  Preparing document...
                </p>
              </div>
            )}

            {/* 🔴 THE VIEWER: Points to Google's Preview URL to ensure zero downloads */}
            <iframe 
              key={previewFile.id}
              src={`https://drive.google.com/file/d/${previewFile.id}/preview`} 
              className="absolute inset-0 w-full h-full border-none"
              allow="autoplay"
              onLoad={() => setIframeLoading(false)} // Hides the loader when ready
              style={{ colorScheme: 'light' }} // Prevents dark mode clashes with Google's canvas
            />
          </div>
        </div>
      )}
    </>
  );
}