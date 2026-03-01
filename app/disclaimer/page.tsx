import { AlertTriangle, Info, Map, ExternalLink, Copyright } from "lucide-react";

export const metadata = {
  title: "Disclaimer | MyUVCE",
  description: "Important information regarding the unofficial status of MyUVCE.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Disclaimer
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Last Updated: March 2026
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Not Official */}
        <section className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-900/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg">
              <Info className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-400">
              1. Not an Official Website
            </h2>
          </div>
          <div className="space-y-4 text-rose-800/80 dark:text-rose-300/80 leading-relaxed text-sm">
            <p>
              <strong>MyUVCE</strong> is a student-run engineering initiative and is <strong>NOT</strong> the official website of University Visvesvaraya College of Engineering (UVCE), Bangalore.
            </p>
            <p>
              This platform serves as an unofficial digital infrastructure portal created by students, for students. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with the UVCE administration, Bangalore University, or the Government of Karnataka.
            </p>
          </div>
        </section>

        {/* Section 2: Accuracy */}
        <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              2. Accuracy of Information
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm mb-4">
            While we strive to keep our platform data (including the Directory, Map, and Hub) up to date, we make no warranties of any kind regarding the completeness, accuracy, reliability, or suitability of the information.
          </p>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 text-sm text-orange-800 dark:text-orange-300 rounded-r-lg">
            <strong>Note to Students:</strong> Room numbers and faculty allocations are subject to change. Always verify critical information (exams, fees, attendance) with the college administration directly.
          </div>
        </section>

        {/* Section 3: Map Data */}
        <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-5 h-5 text-neutral-400" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              3. Map & Directory Data
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
            The Campus Map and Directory tools were created through manual surveying by student volunteers. Minor errors may exist. MyUVCE will not be liable for any inconvenience caused by reliance on this data.
          </p>
        </section>

        {/* Section 4 & 5: External Links & Copyright */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">4. External Links</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              We link to external platforms (Instagram, LinkedIn). We do not guarantee the accuracy or relevance of information on external sites.
            </p>
          </section>

          <section className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Copyright className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">5. Copyright</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              The "UVCE" name and logos belong to their respective owners. Custom code, maps, and guides belong to the MyUVCE team.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}