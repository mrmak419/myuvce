import { ALUMNI_DATA } from "@/data/wall";
import WallGridClient from "@/components/WallGridClient";

export const metadata = {
  title: "Wall of Fame | MyUVCE",
  description: "Celebrating UVCE Achievers who Dreamt Big and Cracked It.",
};

export default function WallOfFamePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-20">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#e63946] to-[#c92a2a] text-white pt-20 pb-16 px-4 rounded-b-[30px] shadow-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Wall of Fame
          </h1>
          <p className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Celebrating UVCE Achievers who Dreamt Big and Cracked It.
          </p>

          {/* Static Stats mapped from your HTML */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[140px] max-w-[200px] flex-1">
              <span className="block text-3xl font-black text-amber-400 mb-1">58 LPA</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Highest Package</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[140px] max-w-[200px] flex-1">
              <span className="block text-3xl font-black text-amber-400 mb-1">40+</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Companies &gt; 20LPA</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[140px] max-w-[200px] flex-1">
              <span className="block text-3xl font-black text-amber-400 mb-1">85%</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">Placement Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Client Component */}
      <WallGridClient initialData={ALUMNI_DATA} />

    </div>
  );
}