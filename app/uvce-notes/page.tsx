import DriveWidget from "@/components/DriveWidget";
import { Book, FileSpreadsheet, Laptop, Briefcase, Calendar, Bell } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "UVCE IIT-Model Notes & Resources",
  description: "The ultimate digital library for UVCE. Access curated notes, previous year question papers (PYQs), and lab manuals.",
  alternates: {
    canonical: "/uvce-notes",
  },
};

const RESOURCES = [
  { id: "notes", title: "Subject Notes", icon: Book, color: "text-blue-500", root: "1QlBFUGbvhI6eiwTnyb-ppUzmOacKWoEr", desc: "Handwritten notes verified by toppers." },
  { id: "pyqs", title: "Previous Papers", icon: FileSpreadsheet, color: "text-red-500", root: "1Uajw3XCM2KPEMy8eWUK_ywiirHRcM76_", desc: "End semester exams and IA papers." },
  { id: "manuals", title: "Lab Manuals", icon: Laptop, color: "text-green-500", root: "1kqsW_rqZIcxJQgjkDj9NKiRJqDlTKW8_", desc: "Code snippets and experiment procedures." },
  { id: "placement", title: "Placement Prep", icon: Briefcase, color: "text-orange-500", root: "1WSSv7TgCvTK--aV1X_UX6T4MTTtniSVE", desc: "Aptitude and core technical summaries." },
  { id: "timetables", title: "Timetables", icon: Calendar, color: "text-purple-500", root: "1hzVJqlsPLYpyR3yWN1m7bR9lqot0zXVf", desc: "Class and examination schedules." },
  { id: "circulars", title: "Circulars", icon: Bell, color: "text-teal-500", root: "1MsUb9Jyd0b6NLdg4IBECRyCoKGMOdBmC", desc: "Official announcements." },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-8 md:p-16 text-center text-white shadow-xl overflow-hidden mb-16">
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-md">
            UVCE IIT-Model Notes & PYQs
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
            The Ultimate Digital Library for the 2025 Autonomous Batch. Curated notes, PYQs, and manuals—all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {RESOURCES.map(res => (
              <a key={res.id} href={`#${res.id}`} className="px-5 py-2.5 bg-white/10 hover:bg-white hover:text-blue-700 border border-white/20 rounded-full text-sm font-bold backdrop-blur-sm transition-all shadow-sm">
                {res.title} ↓
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Drive Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {RESOURCES.map((resource) => {
          const Icon = resource.icon;
          return (
            <section key={resource.id} id={resource.id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 ${resource.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  {resource.title}
                </h2>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium text-sm ml-12">
                {resource.desc}
              </p>
              <DriveWidget rootId={resource.root} />
            </section>
          );
        })}
      </div>

      {/* SEO & Guide Section */}
      <article className="max-w-4xl mx-auto prose dark:prose-invert prose-orange prose-headings:tracking-tight prose-a:text-orange-600 dark:prose-a:text-orange-400">
        <h2 className="text-3xl font-black border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-8">
          Decoding the IIT Model at UVCE
        </h2>
        <p>
          The University of Visvesvaraya College of Engineering (UVCE) has embarked on a transformative journey with the adoption of the <strong>IIT Model Curriculum</strong> starting from the 2025-2026 academic batch. This shift towards an autonomous, credit-based system brings significant changes to how engineering is taught and evaluated at Karnataka's oldest engineering college.
        </p>

        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
          <h4 className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mt-0 mb-2 font-bold text-lg">
            🎓 Why this repository matters?
          </h4>
          <p className="m-0 text-blue-900 dark:text-blue-200 text-sm leading-relaxed">
            The syllabus under the autonomous board is dynamic. Standard textbooks often fail to cover specific module requirements set by UVCE professors. The notes hosted here are curated specifically to align with the <strong>UVCE Autonomous Syllabus</strong>, bridging the gap between generic engineering concepts and what is actually asked in exams.
          </p>
        </div>

        <h3>The Power of Handwritten Notes</h3>
        <p>In the age of PDFs and PPTs, why do we prioritize handwritten notes? The answer lies in the cognitive connection. Notes written by seniors and toppers often contain:</p>
        <ul>
          <li><strong>Simplified Explanations:</strong> Complex theorems broken down into student-friendly language.</li>
          <li><strong>Exam-Oriented Diagrams:</strong> Sketches that are easy to reproduce in the exam hall.</li>
          <li><strong>Hidden Hints:</strong> Marginalia that indicates "Important for Internals" or "Repeated Question."</li>
        </ul>

        <h3>Strategic Prep with Previous Year Questions (PYQs)</h3>
        <p>
          "History repeats itself," especially in engineering examinations. Analyzing Previous Year Question Papers (PYQs) is the single most effective strategy to boost your SGPA. Under the IIT Model, the question pattern often shifts from rote memorization to conceptual problems.
        </p>

        <h3>Frequently Asked Questions</h3>
        <div className="space-y-4 not-prose mt-8">
          <details className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-neutral-900 dark:text-white">
              Is this material valid for the 2025 Autonomous Batch?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm border-t border-neutral-100 dark:border-neutral-800">
              Yes. We actively update the drive folders to align with the latest 2025-26 IIT Model syllabus released by the UVCE Academic Council.
            </div>
          </details>

          <details className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-neutral-900 dark:text-white">
              How do I calculate my SGPA under the new scheme?
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm border-t border-neutral-100 dark:border-neutral-800">
              The IIT Model uses a relative or absolute grading system depending on the subject distribution. You can use the <a href="https://hub.myuvce.in/sgpa" target="_blank" className="text-orange-600 hover:underline">SGPA Estimator tool</a> available on MyUVCE Hub.
            </div>
          </details>
        </div>

        <p className="text-center mt-16 text-sm text-neutral-500 italic">
          Disclaimer: These resources are compiled by students for students. While we strive for accuracy, please always cross-reference with official college communications.
        </p>
      </article>

    </div>
  );
}