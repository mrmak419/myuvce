import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blogger.googleusercontent.com' },
      { protocol: 'https', hostname: '*.bp.blogspot.com' },
    ],
  },
  async redirects() {
    return [
      
      // 2. Internal Refactoring Catch-all
      {
        source: '/posts/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // 3. Legacy Static Pages Migration
      {
        source: '/p/about-us.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/p/contact-us.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/p/privacy-policy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/p/term-page.html',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/p/submit-profile.html',
        destination: '/submit-profile',
        permanent: true,
      },
      {
        source: '/p/myuvce-wall-of-fame.html',
        destination: '/wall',
        permanent: true,
      },
      {
        source: '/p/gallery.html',
        destination: '/gallery',
        permanent: true
      },
      {
        source: '/p/disclaimer.html',
        destination: '/disclaimer',
        permanent: true
      },
      {
        source: '/p/classroom-directory.html',
        destination: '/map',
        permanent: true
      },
      {
        source: '/2025/12/uvce-notes.html',
        destination: '/uvce-notes',
        permanent: true,
      },
      {
        source :'/resource',
        destination: '/uvce-notes',
        permanent: true,
      },
      {
        source:'/blog/uvce-notes',
        destination: '/uvce-notes',
        permanent: true,
      },
      { source: '/2026/01/the-roadmap-for-myuvcein-documenting.html', destination: '/blog/the-roadmap-for-myuvce-in-documenting-the-uvce-story-for-the-future', permanent: true },
      { source: '/2026/01/beyond-the-red-walls.html', destination: '/blog/not-nandi-hills-5-hidden-drives-for-the-real-explorers-of-uvce', permanent: true },
      { source: '/2025/12/uvce-notes.html', destination: '/blog/uvce-notes-pyqs-lab-manuals-model-question-papers-announcements-complete-resource-hub-iit-model', permanent: true },
      { source: '/2026/01/sgpa-calculator-viva-garage-launch.html', destination: '/blog/myuvce-hub-update-sgpa-estimator-viva-garage-now-live', permanent: true },
      { source: '/2026/01/student-testimonials-why-uvce-top-choice-cet.html', destination: '/blog/why-uvce-is-still-the-top-choice-for-cet-toppers', permanent: true },
      { source: '/2026/01/life-at-uvce-2025-vs-1975-comparison_01498015048.html', destination: '/blog/life-at-uvce-in-2025-vs-1975-what-has-changed-and-what-never-will', permanent: true },
      { source: '/2026/01/architecture-of-uvce-stone-buildings-heritage.html', destination: '/blog/architecture-of-uvce-preserving-the-heritage-of-our-iconic-stone-buildings', permanent: true },
      { source: '/2026/01/the-nale-banni-culture-history.html', destination: '/blog/the-nale-banni-culture-a-humorous-look-at-uvce-office-life', permanent: true },
      { source: '/2026/01/uvce-canteen-story-decades-history.html', destination: '/blog/the-bisi-bele-bath-beyond-the-canteen-culture-of-uvce-through-decades', permanent: true },
      { source: '/2026/01/you-we-see-yee-uvce-history.html', destination: '/blog/you-we-see-yee-a-1975-look-at-the-quirks-of-uvce-part-1', permanent: true },
      { source: '/2026/01/uvce-new-mechanical-block-85-crore-upgrade.html.html', destination: '/blog/the-85-crore-upgrade-a-deep-dive-into-the-new-8-floor-mechanical-block', permanent: true },
      { source: '/2026/01/how-to-get-published-student-guide-international-conferences.html', destination: '/blog/how-to-get-published-a-student-s-guide-to-international-technical-conferences', permanent: true },
      { source: '/2026/01/from-bangalore-to-florence-rohit-pawar-research-journey.html', destination: '/blog/from-bangalore-to-florence-rohit-pawar-s-research-journey-to-italy', permanent: true },
      { source: '/2026/01/deep-sea-robotics-auv-path-planning.html', destination: '/blog/deep-sea-robotics-path-planning-for-autonomous-underwater-vehicles-auvs', permanent: true },
      { source: '/2026/01/rules-and-regulations.html', destination: '/blog/uvce-academic-rules-2025-complete-ug-regulations-guide', permanent: true },
      { source: '/2026/01/project-spotlight-aquaspectra-microplastic-detection.html', destination: '/blog/project-spotlight-aquaspectra-autonomous-microplastic-detection-by-students', permanent: true },
      { source: '/2026/01/funding-your-dream-visvesvaraya-startup-fellowship.html', destination: '/blog/funding-your-dream-the-sir-m-visvesvaraya-entrepreneur-startup-fellowship', permanent: true },
      { source: '/2026/01/inside-marvel-rd-uvce.html', destination: '/blog/inside-marvel-r-d-the-lab-where-uvce-students-build-the-future', permanent: true },
      { source: '/2026/01/bridge-initiative-uvce.html', destination: '/blog/the-bridge-initiative-everything-you-need-to-know-about-uvce-s-new-innovation-hub', permanent: true },
      { source: '/2026/01/ieee-membership-guide-uvce.html', destination: '/blog/everything-you-need-to-know-about-ieee-membership-at-uvce', permanent: true },
      { source: '/2026/01/global-uvce-network-opportunities-us-europe.html', destination: '/blog/the-global-uvce-network-opportunities-in-the-us-and-europe', permanent: true },
      { source: '/2026/01/mentorship-matters-2004-2011-batches.html', destination: '/blog/mentorship-matters-how-the-2004-and-2011-batches-give-back', permanent: true },
      { source: '/2026/01/global-power-uvcega-industry-academia.html.html', destination: '/blog/the-global-power-of-uvcega-bridging-industry-and-academia', permanent: true },
      { source: '/2026/01/amar-subramanya-apple-vp-ai-uvce-alumnus.html', destination: '/blog/from-kr-circle-to-cupertino-amar-subramanya-s-journey-to-vp-of-ai-at-apple', permanent: true },
      { source: '/2026/01/defense-innovation-legacy-dr-vk-aatre-drdo.html', destination: '/blog/defense-and-innovation-the-legacy-of-dr-v-k-aatre-at-drdo', permanent: true },
      { source: '/2026/01/dr-nasir-ahmed-dct-inventor-uvce-alumni.html', destination: '/blog/the-inventor-of-dct-how-dr-nasir-ahmed-changed-digital-media', permanent: true },
      { source: '/2026/01/meet-golden-ten-uvce-alumni-ieee-fellows.html', destination: '/blog/meet-the-golden-ten-the-10-uvce-alumni-who-became-ieee-fellows', permanent: true },
      { source: '/2025/12/vision-2030-future-campus-technical-societies-uvce.html', destination: '/blog/the-vision-for-2030-what-s-next-for-campus-technical-societies', permanent: true },
      { source: '/2025/12/student-to-leader-organizing-fests-uvce.html', destination: '/blog/student-to-leader-how-organizing-fests-prepares-you-for-the-world', permanent: true },
      { source: '/2025/12/kagada-20-years-student-research-uvce.html', destination: '/blog/kagada-20-years-of-promoting-student-research-at-uvce', permanent: true },
      { source: '/2025/12/the-evolution-of-impetus-flagship-fest.html', destination: '/blog/the-evolution-of-impetus-how-it-became-a-flagship-technical-fest', permanent: true },
      { source: '/2025/12/25-years-40-awards-ieee-uvce-timeline.html', destination: '/blog/25-years-40-awards-a-timeline-of-ieee-uvce-s-national-recognition', permanent: true },
      { source: '/2025/12/uvce-academic-bible-2025-rules-regulations.html', destination: '/blog/the-uvce-academic-bible-2025-regulations-decoded', permanent: true },
      { source: '/2025/12/uvce-guide-honours-minor-degree-exam-rules.html', destination: '/blog/uvce-admission-guide-understanding-honours-minors-and-new-autonomous-rules', permanent: true },
      { source: '/2025/12/sampada-spotlight-uvce-volunteering-legacy.html', destination: '/blog/the-essence-of-uvce-volunteering-a-legacy-of-selfless-action', permanent: true },
      { source: '/2025/12/birth-of-ieee-uvce-legacy-2000.html', destination: '/blog/the-birth-of-a-legacy-how-ieee-uvce-started-in-2000', permanent: true },
      { source: '/2025/12/install-myuvce-app.html', destination: '/blog/how-to-install-myuvce-app-access-2025-scheme-notes-pyqs', permanent: true },
      { source: '/2025/12/adichunchanagiri-girls-hostel-uvce-guide.html', destination: '/blog/sree-adichunchanagiri-girls-hostel-the-complete-uvce-student-guide-2026', permanent: true },
      { source: '/2025/12/hackathon-internship-guide-uvce.html', destination: '/blog/the-uvce-student-s-guide-to-hackathons-internships-2026-edition', permanent: true },
      { source: '/2025/12/sap-labs-interview-experience-uvce-gautham-sutrave.html', destination: '/blog/sap-labs-interview-experience-uvce-gautham-sutrave-batch-26', permanent: true },
      { source: '/2025/12/sap-labs-interview-experience-placement-uvce-insights.html', destination: '/blog/sap-labs-recruitment-at-uvce-5-rounds-ctc-and-resume-tips', permanent: true },
      { source: '/2025/12/uvce-vs-private-colleges-roi-review.html', destination: '/blog/why-i-chose-uvce-over-msrit-bmsce-a-student-s-honest-review', permanent: true },
      { source: '/2025/12/uvce-digital-library-inauguration-canara-bank-2025.html', destination: '/blog/uvce-digital-library-inauguration-cbjef', permanent: true },
      { source: '/2025/12/uvce-student-clubs-culture-guide.html', destination: '/blog/the-ultimate-guide-to-student-clubs-at-uvce-tech-culture-campus-life', permanent: true },
      { source: '/2025/11/uvce-placement-report-2025-40lpa-comeback.html', destination: '/blog/uvce-placement-report-from-26-5-lpa-to-40-lpa-the-2025-comeback', permanent: true },
      { source: '/2025/11/uvce-academic-roadmap-2025-26-full-calendar.html', destination: '/blog/the-complete-academic-roadmap-uvce-1st-year-2025-26-odd-even-semester-guide', permanent: true },
      { source: '/2025/11/uvce-fee-structure-2025-26-batch-2029.html', destination: '/blog/uvce-official-annual-fee-structure-2025-26-a-complete-breakdown-for-batch-of-2029', permanent: true },
      { source: '/2025/11/guide-to-uvce-student-clubs.html', destination: '/blog/the-ultimate-guide-to-student-clubs-at-uvce-tech-cultural-r-d', permanent: true },
      { source: '/2025/11/how-to-reach-uvce-bus-metro-guide-for.html', destination: '/blog/how-to-reach-uvce-bus-metro-guide-for-kr-circle-and-jb-campus', permanent: true },
      { source: '/2025/11/uvce-freshers-guide-5-things-you-need.html', destination: '/blog/uvce-fresher-s-guide-5-things-you-need-to-know-before-day-1', permanent: true },
      { source: '/2025/11/lost-in-uvce-complete-guide-to-finding.html', destination: '/blog/lost-in-uvce-a-complete-guide-to-finding-labs-and-classrooms-at-kr-circle', permanent: true },
      { 
        source: '/2025/11/the-map-of-uvce.html', 
        destination: '/blog/uvce-campus-map-find-classrooms-labs-departments',
         permanent: true 
        },
        {
          source: '/blog/the-map-of-uvce',
          destination: '/map',
          permanent: true
        },
        {
          source: 'blog/guide-to-uvce-student-clubs',
          destination: '/blog/the-ultimate-guide-to-student-clubs-at-uvce-tech-cultural-r-d',
          permanent: true
        },
        

    ];
  },
};

export default withPWA(nextConfig);