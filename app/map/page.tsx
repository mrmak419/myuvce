import Link from "next/link";
import { 
  Map as MapIcon, 
  BookOpen, 
  AlertTriangle, 
  Settings, 
  Landmark, 
  Zap, 
  GraduationCap, 
  ClipboardList, 
  Search, 
  Laptop, 
  ArrowRight 
} from "lucide-react";
import CampusSearchDirectory from "@/components/CampusSearchDirectory";
import { ROOMS } from "@/data/campus-map";

export const metadata = {
  title: "Campus Map & Directory | MyUVCE",
  description: "Navigate the UVCE KR Circle campus. Find classrooms, labs, and exam halls instantly.",
};

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header */}
      <div className="mb-12 text-center md:text-left flex flex-col md:items-start items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
          Campus Directory
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Search the database of 120+ rooms, labs, and staff cabins across the K.R. Circle campus. Click navigate to open Google Maps coordinates.
        </p>
        
        {/* Link to the Visual Map Blog Post */}
        <Link 
          href="/blog/the-map-of-uvce" 
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 font-bold rounded-full transition-colors hover:bg-orange-200 dark:hover:bg-orange-900/50"
        >
          <MapIcon className="w-5 h-5" />
          View the Visual Campus Map
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* The Interactive React Component */}
      <div className="mb-24">
        <CampusSearchDirectory initialRooms={ROOMS} />
      </div>

      {/* Static SEO Guide Content */}
      <section className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Complete Guide to UVCE Locations
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Navigating the historic campus can be confusing. Use this visual guide to find your building blocks instantly.
          </p>
        </div>

        {/* Visual Map Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 p-8 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="w-full md:w-auto p-6 bg-green-600 text-white rounded-xl text-center shadow-md flex flex-col items-center">
            <Settings className="w-6 h-6 mb-2 opacity-90" />
            <span className="block font-bold text-lg mb-1">Mechanical Block</span>
            <span className="text-sm opacity-90">Mech Dept, Workshops</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-xs my-4 md:my-0">
            <span className="hidden md:block w-12 h-px bg-neutral-300 dark:bg-neutral-700"></span>
            Cross Road
            <span className="hidden md:block w-12 h-px bg-neutral-300 dark:bg-neutral-700"></span>
          </div>

          <div className="w-full md:w-auto p-6 bg-orange-600 text-white rounded-xl text-center shadow-md flex-grow max-w-xs flex flex-col items-center">
            <Landmark className="w-6 h-6 mb-2 opacity-90" />
            <span className="block font-bold text-lg mb-1">Main Block</span>
            <span className="text-sm opacity-90">Admin, CSE, Quadrangle</span>
          </div>

          <div className="w-full md:w-auto p-6 bg-rose-600 text-white rounded-xl text-center shadow-md flex flex-col items-center">
            <Zap className="w-6 h-6 mb-2 opacity-90" />
            <span className="block font-bold text-lg mb-1">Electrical Block</span>
            <span className="text-sm opacity-90">EEE Dept, HV Lab</span>
          </div>

          <div className="w-full md:w-auto p-6 bg-indigo-600 text-white rounded-xl text-center shadow-md flex flex-col items-center">
            <GraduationCap className="w-6 h-6 mb-2 opacity-90" />
            <span className="block font-bold text-lg mb-1">LHC Complex</span>
            <span className="text-sm opacity-90">Lecture Halls 1-6</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">During Exams</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              During End Semester Exams, room allotments are shuffled across buildings. A CS student might write in the Mechanical Block, and a Mech student in the LHC.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800 flex items-start gap-3">
                <ClipboardList className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-1">Step 1: Check the Notice</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Always check the physical notice board near the Principal's Chamber first.</span>
                </div>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-100 dark:border-neutral-800 flex items-start gap-3">
                <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-1">Step 2: Decode the Number</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">LH Series are behind the main building. 100s/200s are usually Main/Electrical blocks.</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <MapIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Department Locations</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-orange-600 bg-orange-50/50 dark:bg-orange-950/20 rounded-r-lg flex items-start gap-3">
                <Laptop className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-1">Computer Science</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Main Block (Quadrangle Area). CSE Labs 1-4 are on the 2nd Floor.</span>
                </div>
              </div>
              <div className="p-4 border-l-4 border-rose-600 bg-rose-50/50 dark:bg-rose-950/20 rounded-r-lg flex items-start gap-3">
                <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-1">Electrical & Electronics</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Electrical Block (Right side of Main Quad). Landmarks: TPO and NCC room.</span>
                </div>
              </div>
              <div className="p-4 border-l-4 border-green-600 bg-green-50/50 dark:bg-green-950/20 rounded-r-lg flex items-start gap-3">
                <Settings className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-1">Mechanical Engineering</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Separate Building across the road, near State Bank of India (SBM).</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-300/80 rounded-xl border border-orange-200 dark:border-orange-900/50 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Note for Civil & Architecture Students:</strong> This directory covers the K.R. Circle Campus only. The Department of Civil Engineering and the School of Architecture are located at the Jnana Bharathi (JB) Campus.
          </p>
        </div>
      </section>

    </div>
  );
}