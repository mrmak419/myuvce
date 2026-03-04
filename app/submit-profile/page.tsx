import SubmitProfileForm from "@/components/SubmitProfileForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Submit Profile - Wall of Fame", 
  description: "Share your UVCE placement or achievement story to inspire the next generation.",
  alternates: {
    canonical: "/submit-profile",
  },
};

export default function SubmitProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 px-4 sm:px-6">
      <SubmitProfileForm />
    </div>
  );
}