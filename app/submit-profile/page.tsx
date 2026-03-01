import SubmitProfileForm from "@/components/SubmitProfileForm";

export const metadata = {
  title: "Submit Profile | MyUVCE Wall of Fame",
  description: "Share your UVCE placement or achievement story to inspire the next generation.",
};

export default function SubmitProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 px-4 sm:px-6">
      <SubmitProfileForm />
    </div>
  );
}