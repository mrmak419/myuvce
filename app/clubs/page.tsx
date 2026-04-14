// app/clubs/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Users, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Club {
  slug: string;
  name: string;
  description: string | null;
  logo_url: string | null;
}

export default function ClubsDirectory() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      const { data, error } = await supabase
        .from('myuvce_events_clubs')
        .select('slug, name, description, logo_url')
        .eq('is_active', true)
        .order('name');
      
      if (data && !error) setClubs(data);
      setIsLoading(false);
    }
    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (club.description && club.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full animate-in fade-in duration-500">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
          Campus Clubs & Societies
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Discover student organizations, technical chapters, and cultural groups shaping the campus experience.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-shadow"
          placeholder="Search for a club by name or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-zinc-100 dark:bg-zinc-800/50 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <>
          {filteredClubs.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <Users className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No clubs found</h3>
              <p className="text-zinc-500 mt-1">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <Link 
                  key={club.slug} 
                  href={`/clubs/${club.slug}`}
                  className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700 overflow-hidden shrink-0">
                      {club.logo_url ? (
                        <Image src={club.logo_url} alt={club.name} width={64} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {club.name}
                  </h3>
                  
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mt-auto">
                    {club.description || "No description provided."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}