// lib/wallOfFame.ts
import Papa from "papaparse";

export interface Alumni {
  name: string;
  batch: string;
  year: number;
  company: string;
  role: string;
  packageDisplay: string;
  ctc: number;
  lpa: number;
  quote: string;
  intro: string;
  image: string;
  linkedin: string;
  tierColor: string;
  totalRank: number;
}

const PLACEHOLDER = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfD_P9_L2U07-88k6F7M_O_mYp6Xj0jFm0vL6r0uX8zB0jFm0vL6r0uX8zB0jFm0vL6r0uX8zB0/s1600/uvce-logo.png";
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwi3-pKifBBlZUXXxawQHycCEHN3Or-DH9Y4A2Ms4xxuhWRZ0D3AkZaCe3-tDhO4xrc/exec"; // Ensure this is the correct CSV URL for the Wall data, not the Gallery data.

export async function getWallData(): Promise<Alumni[]> {
  try {
    const response = await fetch(SHEET_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch Wall data");

    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: false, skipEmptyLines: true });
    
    const rows = parsed.data as string[][];
    const currentYear = new Date().getFullYear();

    // Skip the header row (index 0)
    const alumniList: Alumni[] = rows.slice(1).map((row) => {
      const name = row[1];
      if (!name) return null;

      const batchYear = parseInt(row[2]) || currentYear;
      const branch = row[3] || "";
      const ctc = parseFloat(row[7]) || 0;
      const lpa = ctc / 100000;

      const score = ((currentYear - batchYear) * 1000) + (lpa * 50);

      let color = "#1d3557"; // Default Blue
      if (lpa >= 50) color = "#D4AF37"; // Gold
      else if (lpa >= 25) color = "#2a9d8f"; // Teal
      else if (lpa >= 15) color = "#cd7f32"; // Bronze

      return {
        name,
        batch: `${branch}, ${batchYear}`,
        year: batchYear,
        company: row[4] || "",
        role: row[5] || "",
        packageDisplay: row[6] || "Private",
        ctc,
        lpa,
        quote: row[8] || "Dream Big.",
        intro: row[9] || "",
        image: (row[10] && row[10].startsWith('http')) ? row[10] : PLACEHOLDER,
        linkedin: row[11] || "#",
        tierColor: color,
        totalRank: score
      };
    }).filter(item => item !== null) as Alumni[];

    return alumniList;

  } catch (error) {
    console.error("Wall of Fame fetch failed:", error);
    return [];
  }
}