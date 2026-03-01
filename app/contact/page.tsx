import { Mail, Instagram, MapPin, Map, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us | MyUVCE",
  description: "Get in touch with the MyUVCE team for feedback, map corrections, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          We build these tools for the UVCE community. Whether you want to report a bug, suggest a new feature, or just say hello, our inbox is always open.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Email Card */}
        <a 
          href="mailto:contact@myuvce.in"
          className="flex flex-col items-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all group"
        >
          <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Email Us</h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center mb-4">
            For partnerships, feedback, and general inquiries.
          </p>
          <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
            contact@myuvce.in
          </span>
        </a>

        {/* Instagram Card */}
        <a 
          href="https://www.instagram.com/myuvce/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-pink-500/50 dark:hover:border-pink-500/50 transition-all group"
        >
          <div className="w-14 h-14 bg-pink-50 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Instagram className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Instagram</h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center mb-4">
            Follow us for campus updates and feature drops.
          </p>
          <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">
            @myuvce
          </span>
        </a>

        {/* Location Card */}
        <div className="flex flex-col items-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Location</h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center mb-4">
            Find us navigating the labyrinth of the main block.
          </p>
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm text-center">
            UVCE, KR Circle<br />Bangalore - 560001
          </span>
        </div>

      </div>

      {/* Map Correction Banner */}
      <div className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-950 rounded-3xl border border-neutral-800 p-8 md:p-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <Map className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Submit a Map Correction
              </h2>
            </div>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
              Did a lab move? Found a classroom we missed? Help us keep the digital campus map accurate for everyone. Photos and rough sketches are highly appreciated.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <a 
              href="mailto:contact@myuvce.in?subject=Map%20Update"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-900/20"
            >
              <Send className="w-5 h-5" />
              Send Update
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}