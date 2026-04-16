import { supabase } from "@/lib/supabase";
import PortalClient from "./PortalClient";
import { XCircle } from "lucide-react";

export const runtime = "edge";

export const metadata = {
  referrer: 'no-referrer', 
};

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data, error } = await supabase.rpc('get_registration_by_token', { token });

  if (error || !data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-xl">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Access Denied</h2>
          <p className="text-sm text-zinc-500 font-medium">Registration not found or link is invalid.</p>
        </div>
      </div>
    );
  }

  // Pass the securely fetched data down to the interactive client
  return <PortalClient token={token} initialData={data[0]} />;
}