"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Alumni } from "@/data/wall";
import { Search, X, Package, ChevronRight, ExternalLink } from "lucide-react";

export default function WallGridClient({ initialData }: { initialData: Alumni[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery) return initialData;
    return initialData.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialData, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Search & CTA Area */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 max-w-3xl mx-auto">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:border-[#e63946] focus:ring-0 transition-colors text-neutral-900 dark:text-white"
          />
        </div>
        
        {/* Update the href to point to your new routing structure if needed */}
        <a 
          href="/submit-profile" 
          className="w-full sm:w-auto px-8 py-3 bg-[#e63946] hover:bg-[#c92a2a] text-white font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center whitespace-nowrap"
        >
          Join the Wall +
        </a>
      </div>

      {/* Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 font-medium">No achievers found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((alumni, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedAlumni(alumni)}
              className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all cursor-pointer group"
              style={{ borderTop: `5px solid ${alumni.color}` }}
            >
              <div className="p-5 flex items-center gap-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image src={alumni.image} alt={alumni.name} fill className="rounded-full object-cover border-2 border-neutral-100 dark:border-neutral-800" unoptimized />
                </div>
                <div>
                  <h3 className="font-bold text-[#1d3557] dark:text-blue-400 text-lg leading-tight m-0">{alumni.name}</h3>
                  <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{alumni.batch}</span>
                  <div className="mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold text-white inline-block" style={{ backgroundColor: alumni.color }}>
                    {alumni.company}
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-neutral-50 dark:bg-neutral-900/50 flex-grow">
                <p className="italic text-neutral-600 dark:text-neutral-300 text-[15px] leading-relaxed line-clamp-3">"{alumni.quote}"</p>
              </div>

              <div className="px-5 py-4 bg-neutral-100/50 dark:bg-neutral-950 flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#2a9d8f]">
                  {alumni.pkg ? <><Package className="w-4 h-4" /> {alumni.pkg}</> : <span></span>}
                </div>
                <div className="text-[13px] font-bold text-[#e63946] group-hover:underline flex items-center">
                  Read Story <ChevronRight className="w-4 h-4 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedAlumni(null)}>
          <div 
            className="bg-white dark:bg-neutral-900 w-full max-w-[600px] rounded-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 text-center shrink-0" style={{ backgroundColor: selectedAlumni.color }}>
              <button onClick={() => setSelectedAlumni(null)} className="absolute top-3 right-4 text-white/80 hover:text-white text-3xl font-light transition-colors">
                &times;
              </button>
              <div className="relative w-[85px] h-[85px] mx-auto mb-2">
                <Image src={selectedAlumni.image} alt={selectedAlumni.name} fill className="rounded-full object-cover border-4 border-white" unoptimized />
              </div>
              <h2 className="text-2xl font-bold text-white m-0 tracking-tight uppercase">{selectedAlumni.name}</h2>
              <p className="text-white/90 text-[15px] mt-1">{selectedAlumni.role} @ {selectedAlumni.company}</p>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <span className="block text-[13px] font-bold text-neutral-400 uppercase tracking-wide mb-2 mt-4">Success Story</span>
              {/* whitespace-pre-line is critical here to preserve your formatting */}
              <div className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed whitespace-pre-line">
                {selectedAlumni.intro}
              </div>

              <span className="block text-[13px] font-bold text-neutral-400 uppercase tracking-wide mb-2 mt-6">Words of Wisdom</span>
              <div className="bg-neutral-50 dark:bg-neutral-950 border-l-[4px] border-[#e63946] p-4 italic text-neutral-700 dark:text-neutral-300">
                "{selectedAlumni.quote}"
              </div>

              {selectedAlumni.pkg && (
                <div className="mt-5">
                  <span className="block text-[13px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Achievement</span>
                  <div className="text-neutral-800 dark:text-neutral-200 font-medium">
                    Package: <b className="text-[#2a9d8f]">{selectedAlumni.pkg}</b>
                  </div>
                </div>
              )}

              {selectedAlumni.linkedin && selectedAlumni.linkedin !== "#" && (
                <a 
                  href={selectedAlumni.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full p-3 mt-6 bg-[#0077b5] hover:bg-[#005885] text-white font-bold rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" /> Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}