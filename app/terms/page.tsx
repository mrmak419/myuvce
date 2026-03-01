import { Scale, Copyright, Map, AlertTriangle, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Use | MyUVCE",
  description: "Copyright and usage guidelines for MyUVCE and the digital campus map.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Terms of Use & Copyright
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Last Updated: March 2026
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        
        {/* Section 1: Intellectual Property */}
        <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <Copyright className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              1. Intellectual Property
            </h2>
          </div>
          <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
            <p>
              All content on <strong>MyUVCE</strong>, including but not limited to the digital maps, floor plans, navigational layouts, and textual descriptions, is the intellectual property of the MyUVCE engineering team.
            </p>
            <p>
              These maps were created through independent physical surveys and original digital drafting. They are strictly protected by applicable copyright laws. You may not reproduce, distribute, scrape, modify, or republish these maps or our codebase on other websites or applications without explicit written permission from the Lead Developer.
            </p>
          </div>
        </section>

        {/* Section 2: Permitted Use */}
        <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Map className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              2. Permitted Use
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
            You are granted a limited, revocable license to access and use the maps and campus utilities for personal, non-commercial navigational and academic purposes (e.g., finding your classroom, tracking attendance). You are welcome to take screenshots for personal reference.
          </p>
        </section>

        {/* Section 3: Accuracy and Liability */}
        <section className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-900/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-400">
              3. Accuracy and Liability
            </h2>
          </div>
          <div className="space-y-4 text-rose-800/80 dark:text-rose-300/80 leading-relaxed text-sm">
            <p>
              While we strive for high precision by physically verifying locations, campus layouts can change abruptly due to renovations or administrative decisions. MyUVCE is an unofficial guide and provides all tools and information "as is" without warranty of any kind.
            </p>
            <p>
              The MyUVCE team is not liable for any inconvenience, academic loss, or confusion caused by errors, server downtime, or omissions in our maps and utilities. Always refer to official college signage or the UVCE administration for official and final information.
            </p>
          </div>
        </section>

        {/* Section 4: Contact Regarding Permissions */}
        <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              4. API & Usage Permissions
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm mb-4">
            If you wish to use our maps, data, or APIs for a student project, hackathon, or publication, please reach out to us first to discuss licensing and access.
          </p>
          <a 
            href="mailto:contact@myuvce.in"
            className="inline-flex items-center font-bold text-orange-600 dark:text-orange-400 hover:underline"
          >
            contact@myuvce.in
          </a>
        </section>

      </div>
    </div>
  );
}