import DriveWidget from "@/components/DriveWidget";
import { Book, FileSpreadsheet, Laptop, Briefcase, Calendar, Bell, AlertCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UVCE IIT-Model Notes & Resources",
  description: "The ultimate digital library for UVCE. Access curated notes, previous year question papers (PYQs), and lab manuals.",
  alternates: {
    canonical: "/uvce-notes",
  },
  openGraph: {
    title: "UVCE IIT-Model Notes & Resources",
    description: "The ultimate digital library for UVCE. Access curated notes, previous year question papers (PYQs), and lab manuals.",
    url: "/uvce-notes", 
    siteName: "MyUVCE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UVCE IIT-Model Notes & Resources",
    description: "The ultimate digital library for UVCE. Access curated notes, previous year question papers (PYQs), and lab manuals.",
  }
};

// Updated colors to match the refined Jewel tone aesthetic
const RESOURCES = [
  { id: "notes", title: "Subject Notes", icon: Book, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20", root: "1QlBFUGbvhI6eiwTnyb-ppUzmOacKWoEr", desc: "Handwritten notes verified by toppers." },
  { id: "pyqs", title: "Previous Papers", icon: FileSpreadsheet, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20", root: "1Uajw3XCM2KPEMy8eWUK_ywiirHRcM76_", desc: "End semester exams and IA papers." },
  { id: "manuals", title: "Lab Manuals", icon: Laptop, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20", root: "1kqsW_rqZIcxJQgjkDj9NKiRJqDlTKW8_", desc: "Code snippets and experiment procedures." },
  { id: "placement", title: "Placement Prep", icon: Briefcase, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20", root: "1WSSv7TgCvTK--aV1X_UX6T4MTTtniSVE", desc: "Aptitude and core technical summaries." },
  { id: "timetables", title: "Timetables", icon: Calendar, color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20", root: "1hzVJqlsPLYpyR3yWN1m7bR9lqot0zXVf", desc: "Class and examination schedules." },
  { id: "circulars", title: "Circulars", icon: Bell, color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20", root: "1MsUb9Jyd0b6NLdg4IBECRyCoKGMOdBmC", desc: "Official announcements." },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* FLASHY BUT PROFESSIONAL DEPRECATION BANNER */}
      <div className="relative isolate flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 px-6 py-5 rounded-2xl mb-10 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-500/50">
        
        {/* Subtle background glow effect */}
        <div className="absolute -left-20 top-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-10 dark:opacity-[0.05]" />
        </div>

        <div className="flex items-start sm:items-center gap-4">
  <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex-shrink-0 animate-pulse">
    <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
  </div>
  <div>
    <h3 className="text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-100 mb-0.5">
      1st Semester Archive Only
    </h3>
    <p className="text-xs sm:text-sm text-indigo-700 dark:text-indigo-300">
      This section is  for 1st-semester resources. For 2nd semester onwards, the latest notes, PYQs, and assignments are hosted on MyUVCE HUB.
    </p>
  </div>
</div>

        <a 
          href="https://hub.myuvce.in/study-material" 
          className="flex-shrink-0 flex items-center gap-1.5 w-full sm:w-auto justify-center px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 group"
        >
          Go to MyUVCE Hub
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Clean, Minimal Header */}
      <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
          Notes & Resources
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Direct access to the IIT-Model curriculum digital library. Select a folder below to view curated notes, PYQs, and lab manuals.
        </p>
      </div>

      {/* Grid of Drive Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {RESOURCES.map((resource) => {
          const Icon = resource.icon;
          return (
            <section key={resource.id} id={resource.id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${resource.color}`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {resource.title}
                </h2>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-medium text-sm ml-12">
                {resource.desc}
              </p>
              <DriveWidget rootId={resource.root} />
            </section>
          );
        })}
      </div>

      {/* SEO & Guide Section - Updated to Zinc Theme */}
      <article className="max-w-4xl mx-auto prose dark:prose-invert prose-indigo prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50 prose-headings:tracking-tight prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500">
        <h2 className="text-3xl font-black border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8">
          Decoding the IIT Model at UVCE
        </h2>
        <p>
          The University of Visvesvaraya College of Engineering (UVCE) has embarked on a transformative journey with the adoption of the <strong>IIT Model Curriculum</strong> starting from the 2025-2026 academic batch. This shift towards an autonomous, credit-based system brings significant changes to how engineering is taught and evaluated at Karnataka's oldest engineering college.
        </p>

        <div className="my-8 p-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl shadow-sm">
          <h4 className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 mt-0 mb-2 font-bold text-lg">
            🎓 Why this repository matters?
          </h4>
          <p className="m-0 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            The syllabus under the autonomous board is dynamic. Standard textbooks often fail to cover specific module requirements set by UVCE professors. The notes hosted here are curated specifically to align with the <strong>UVCE Autonomous Syllabus</strong>, bridging the gap between generic engineering concepts and what is actually asked in exams.
          </p>
        </div>

        <h3>The Power of Handwritten Notes</h3>
        <p>In the age of PDFs and PPTs, why do we prioritize handwritten notes? The answer lies in the cognitive connection. Notes written by seniors and toppers often contain:</p>
        <ul className="text-zinc-600 dark:text-zinc-400">
          <li><strong className="text-zinc-900 dark:text-zinc-100">Simplified Explanations:</strong> Complex theorems broken down into student-friendly language.</li>
          <li><strong className="text-zinc-900 dark:text-zinc-100">Exam-Oriented Diagrams:</strong> Sketches that are easy to reproduce in the exam hall.</li>
          <li><strong className="text-zinc-900 dark:text-zinc-100">Hidden Hints:</strong> Marginalia that indicates "Important for Internals" or "Repeated Question."</li>
        </ul>

        <h3>Strategic Prep with Previous Year Questions (PYQs)</h3>
        <p>
          "History repeats itself," especially in engineering examinations. Analyzing Previous Year Question Papers (PYQs) is the single most effective strategy to boost your SGPA. Under the IIT Model, the question pattern often shifts from rote memorization to conceptual problems.
        </p>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 not-prose mt-8">
          <details className="group bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-zinc-900 dark:text-zinc-50">
              Is this material valid for the 2025 Autonomous Batch?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm border-t border-zinc-100 dark:border-zinc-800/50 mt-2 pt-4">
              Yes. We actively update the drive folders to align with the latest 2025-26 IIT Model syllabus released by the UVCE Academic Council.
            </div>
          </details>

          <details className="group bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-zinc-900 dark:text-zinc-50">
              How do I calculate my SGPA under the new scheme?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm border-t border-zinc-100 dark:border-zinc-800/50 mt-2 pt-4">
              The IIT Model uses a relative or absolute grading system depending on the subject distribution. You can use the <a href="https://hub.myuvce.in/sgpa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">SGPA Estimator tool</a> available on MyUVCE Hub.
            </div>
          </details>
        </div>

        <p className="text-center mt-16 text-sm text-zinc-500 dark:text-zinc-500 italic">
          Disclaimer: These resources are compiled by students for students. While we strive for accuracy, please always cross-reference with official college communications.
        </p>
      </article>

    </div>
  );
}