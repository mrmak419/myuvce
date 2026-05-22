import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyUVCE Hub',
  description: 'A student-built utility for UVCE to track attendance, calculate SGPA, and access peer-contributed study materials.',
  openGraph: {
    title: 'MyUVCE Hub',
    description: 'A student-built utility for UVCE to track attendance, calculate SGPA, and access peer-contributed study materials.',
    url: 'https://myuvce.in/myuvce-hub',
    siteName: 'MyUVCE',
    images: [
      {
        url: '/images/hub-logo.png', 
        width: 512,
        height: 512,
        alt: 'MyUVCE Hub Logo',
      },
    ],
    type: 'website',
  },
};

export default function MyUVCEHubLanding() {
  const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=in.myuvce.hub";

  const features = [

    { 
      title: "Academic Resources", 
      desc: "A shared repository of IIT-model previous year question papers, class notes, and reference materials uploaded by students." 
    },

    
    { 
      title: "SGPA Calculator & Predictor", 
      desc: "Computes grades using current autonomous regulations. Input a target SGPA to back-calculate the required marks for each subject.",
      link: { text: "Open SGPA Tool", href: "https://hub.myuvce.in/sgpa" }
    },

    { 
      title: "Attendance Tracker", 
      desc: "Calculates the exact number of classes you can skip or need to attend to maintain your required minimum percentage." 
    },
    
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-200">
      <div className="max-w-4xl w-full space-y-12 text-center">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm flex items-center justify-center mb-6 overflow-hidden border border-neutral-200 dark:border-neutral-800">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="/images/hub-logo.png" 
               alt="MyUVCE Hub Logo" 
               className="w-full h-full object-cover dark:opacity-90"
             />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            MyUVCE Hub
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            A student-built companion utility to manage attendance, grades, and academic documentation.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <a 
            href={PLAY_STORE_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            Get it on Google Play
          </a>
        </div>

        {/* Core Utilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800/60 shadow-sm flex flex-col justify-between transition-colors duration-200">
              <div>
                <h2 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">{feature.title}</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">{feature.desc}</p>
              </div>
              {feature.link && (
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                  <a 
                    href={feature.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
                  >
                    {feature.link.text} →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}