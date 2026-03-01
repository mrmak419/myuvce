export const runtime = 'edge';
export const revalidate = 3600; // Refetch the Google Sheet every hour

import Image from "next/image";
import { Instagram, MapPin, Zap, ExternalLink } from "lucide-react";
import Papa from "papaparse";

// 1. HARDCODED BASE DATA
const BASE_CLUBS = [
  {
    clubName: "CAMPUS",
    handle: "UVCE",
    profileLink: "https://www.instagram.com/suck_uvce",
    photos: [
      { title: "ENTRANCE", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5WHJlEoAWmxXwYFT1rfer0FDWeXK7IfCBB2xFXEtkngiW5FdUnCERaoJyVuWsuo_cI_bpSVHZPP4GndZRXqB3HLVTn4DpO-1q04LFumdgfaXdaBJqgK549jL02uB6_JDg1gTiUz1-jfPpeWbwRwsWzvHtr4TC6mcvpQ8lL4sJu3Ui9apE5kV2gqXlXnNy/s1351/uvce%20main%20building.jpg", postLink: "https://www.instagram.com/p/DHLbPe1xkJK/" },
      { title: "QUADRANGLE", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgspuvqY3ruSOhoPjGz6Cw8snxGsTFzgWBSLONgKeT8m6rwGyIXwdezHF0G6xN4Lz9dCcw39y3wqz3dwMqrHFNhjMW4IVzU4b7apXzOMxK6eCDtxEFkY8FHLlMFKEkORfljY1sOL4dQuTFzPAfQzD3spy239JDsTTdDW3teJHkwFW59h6uydIllzfcuXkPU/s1440/uvce%20rg.jpg", postLink: "https://www.instagram.com/p/DRoNkzPkcp-/" },
      { title: "ROCK GARDEN", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFan2xtcqYPNA-hDQDwKtPH3ZZqS-YUDCoF5F58xONOCyWT6vYxgI0th1QNqMGcdxIrtLKLFcYCPZUG2ak6NyHwY-jm9t2Yo8v0qN6C0IM_OtOIcL_xtLhn9igsAdKB3mC5J1wa3czCxzVvp9FML3dFYbqhIfZiR3hnMGvfAoLZSZphrPLjtRA_VUCUxsk/s1440/uvce%20rg1.jpg", postLink: "https://www.instagram.com/p/DRlUxw6ETy0/" }
    ]
  },
  {
    clubName: "IEEE UVCE",
    handle: "ieeeuvce",
    profileLink: "https://www.instagram.com/ieeeuvce",
    photos: [
      { title: "KAGADA 2025", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj97GmlfDDmA3Gil-X5GnNXQ3y0QW7vp9tKXKIbl0C0Syb-stkF8p6sNIEFDjvyfukLnJvsg-36crYxoAubYpDMJJls0PX_jojdW_j7jExcEflIEgoeLRb702QLov0H6EMMyHP-P70O7f2cqYb6AGN49cJBwk06Ij9-aNaEGFIRMWekUJokwbbSmaMrVG-5/s1080/ieee%201.jpg", postLink: "https://www.instagram.com/p/DRL4AzjEU2W/" },
      { title: "BHAAG UVCE BHAAG", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr4O8-HC3lcRvZg0BH4xUqOyydQiiI0A5IyqtQZnIBxgFT7KqJ7tcZWavCMlKtIwhyW-NqVfkmx-Pg2oqgldMOJz_BiWQOIfVM8Eaz-v2EKweaThMDYNt14pfbgBeLzpmfY6VpxRdxuOD3boh5emDUTUlDMCeRCaEO1_fWa19SPBP2_jO0riRhg4HNFcsf/s1080/BUB.jpg", postLink: "https://www.instagram.com/p/DRY8s8KjJ3z/" }
    ]
  },
  {
    clubName: "MARVEL UVCE",
    handle: "marvel_uvce",
    profileLink: "https://www.instagram.com/marvel_uvce",
    photos: [
      { title: "OPEN DAY", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8t8bnabFTf_C-xVIc6AuG3sKW3mxM99R28LLnVBMf_2Lz6UeG03LKnj8padEEmtF27Y5puZT2V8vZMxd966kmvDzbYoxOw4NW7DDU6gUeSS-OpZaMQS4kvTKdAkG46X65s5ehwQGxAtOOs7cJeL9DEWvpJNQeCrbH-vGsL4i9L04fBwz47qngvRaiiUD7/s1440/MARVEL%20LAB.jpg", postLink: "https://www.instagram.com/p/DP4DchIkjNj/" }
    ]
  },
  {
    clubName: "UVCE CHETANA",
    handle: "uvce_chetana",
    profileLink: "https://www.instagram.com/uvce_chetana",
    photos: [
      { title: "Kannada Rajyotsava (VAIBHAVA)", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGKRnCpin4X3Sg4ovFpvSBHVryLaJYukXQkdpRTi4cLf2w6Noq4wYuPd_J12ziKVVAKVQ4XvFmRE8YNo_eLktIm7PfxHT99_45FmguQAxbuuDCzjgw4WCKawUD6ksv9F_E1AA-CKedxrJdcyRLXos0nCN2AYyiydp2CT8nJU4cgg554Un64B0UUlSvet5A/s1440/chetana%20vaibhava.jpg", postLink: "https://www.instagram.com/p/DQ3Z4YZjzmR/" }
    ]
  }
];

// 2. SERVER-SIDE DATA FETCHER
async function getGalleryData() {
  // Deep clone base data to avoid mutating global state
  const mergedData = JSON.parse(JSON.stringify(BASE_CLUBS));
  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTedVrXjRh321gxxwTeKiyR4A9BPY4udtQti1QO2aL-_ajaX1Vnd8xdywnPxmwrlUfl4AeP6yYq3hSa/pub?output=csv";

  try {
    const response = await fetch(sheetURL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch sheet");
    
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    parsed.data.forEach((row: any) => {
      if (!row.Club || !row.Image) return;

      const existingClub = mergedData.find((c: any) => c.clubName === row.Club);
      const newPhoto = {
        title: row.Title || "Untitled",
        image: row.Image,
        postLink: row.Link || "#"
      };

      if (existingClub) {
        existingClub.photos.push(newPhoto);
      } else {
        mergedData.push({
          clubName: row.Club,
          handle: row.Handle || "",
          profileLink: row.ProfileLink || "#",
          photos: [newPhoto]
        });
      }
    });
  } catch (error) {
    console.error("Gallery Sheet fetch failed, falling back to local data:", error);
  }

  return mergedData;
}

export const metadata = {
  title: "Experiencing the Heritage | MyUVCE",
  description: "A visual archive of UVCE's legacy, culture, and active student clubs.",
};

export default async function GalleryPage() {
  // Data is fetched securely on the server
  const clubs = await getGalleryData();

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* 1. Static Info Section (Heritage & Architecture) */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4 uppercase">
            Experiencing the Heritage
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto italic">
            Beyond the Red Walls: A visual archive of UVCE's legacy and culture.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-neutral-900 border-t-4 border-rose-600 dark:border-rose-500 rounded-xl p-8 text-center shadow-sm">
            <span className="block text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">1917</span>
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Established</span>
          </div>
          <div className="bg-white dark:bg-neutral-900 border-t-4 border-rose-600 dark:border-rose-500 rounded-xl p-8 text-center shadow-sm">
            <span className="block text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">15+</span>
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Active Clubs</span>
          </div>
          <div className="bg-white dark:bg-neutral-900 border-t-4 border-rose-600 dark:border-rose-500 rounded-xl p-8 text-center shadow-sm">
            <span className="block text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">40+</span>
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Annual Events</span>
          </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-rose-700 dark:text-rose-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <MapPin className="w-5 h-5" /> The Architecture
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The <strong>Red Building (Entrance)</strong> is a landmark designed by Sir M. Visvesvaraya. The <strong>Quadrangle</strong> is the heart of the college, and the <strong>Rock Garden</strong> serves as a natural amphitheater for open-air discussions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-rose-700 dark:text-rose-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <Zap className="w-5 h-5" /> Innovation Hubs
            </h3>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2 list-disc pl-4">
              <li><strong>MARVEL:</strong> A 24/7 Makerspace for 3D printing and prototyping.</li>
              <li><strong>IEEE UVCE:</strong> Hosts massive events like KAGADA and IMPETUS.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-rose-700 dark:text-rose-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <Instagram className="w-5 h-5" /> Cultural Vibrance
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>UVCE Chetana</strong> keeps the local culture alive, hosting the massive annual Kannada Rajyotsava (Vaibhava) celebration in front of the main block.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Gallery Section */}
      <section className="space-y-16">
        {clubs.map((club: any, idx: number) => (
          <div key={idx} className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            
            {/* Club Header */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white uppercase">
                {club.clubName}
              </h2>
              {club.profileLink !== "#" && (
                <a 
                  href={club.profileLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4" /> @{club.handle}
                </a>
              )}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.photos.map((photo: any, photoIdx: number) => (
                <div key={photoIdx} className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                    <Image 
                      src={photo.image} 
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={photo.image.includes('googleusercontent')}
                    />
                  </div>
                  
                  {/* Photo Metadata */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white dark:bg-neutral-900">
                    <span className="font-bold text-neutral-900 dark:text-white mb-4 line-clamp-1">
                      {photo.title}
                    </span>
                    <a 
                      href={photo.postLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-500 transition-colors"
                    >
                      View Post <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}