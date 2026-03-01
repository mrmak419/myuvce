import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MyUVCE",
  description: "How MyUVCE handles and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          Last Updated: March 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        
        <section>
          <p>
            At <strong>MyUVCE</strong> (<a href="https://myuvce.in" className="text-orange-600 dark:text-orange-400 hover:underline">myuvce.in</a>), the privacy of our campus community is our primary concern. As a student-run digital initiative, we are committed to building utilities that respect your data. This Privacy Policy documents the types of information that is collected and how we use it.
          </p>
          <p className="mt-4">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Log Files & Infrastructure
          </h2>
          <p>
            MyUVCE follows a standard procedure of using log files, a standard practice for hosting platforms and edge networks (such as Cloudflare). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, and referring/exit pages. 
          </p>
          <p className="mt-4">
            These are not linked to any information that is personally identifiable. The sole purpose of this information is for analyzing traffic trends, administering the site, security monitoring, and ensuring our campus utilities remain online and performant under heavy load.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Cookies and Local Storage
          </h2>
          <p>
            To provide a modern web experience, MyUVCE utilizes 'cookies' and browser Local Storage. These technologies are used strictly to store functional information—such as your UI preferences (like Dark Mode) or preserving your session state while using our campus tools.
          </p>
          <p className="mt-4">
            We do <strong>not</strong> use third-party advertising cookies or trackers. Our goal is to optimize your experience and customize our platform's content based on your browser type without compromising your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Third-Party Services
          </h2>
          <p>
            We utilize secure third-party infrastructure (like Vercel, Cloudflare, and GitHub) to host and deploy our codebase. While we do not serve third-party ads, these infrastructure providers may automatically receive your IP address when you connect to our servers to ensure secure and encrypted delivery of our website. 
          </p>
        </section>

        <section className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 mt-12">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
            Consent
          </h2>
          <p className="text-sm">
            By using our website and digital utilities, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </section>

      </div>
    </div>
  );
}