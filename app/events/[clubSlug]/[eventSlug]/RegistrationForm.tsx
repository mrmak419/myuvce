"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function RegistrationForm({ event }: { event: any }) {
  const schema = event.registration_schema || [];
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckbox = (id: string, option: string, isChecked: boolean) => {
    setFormData(prev => {
      const current = prev[id] || [];
      if (isChecked) return { ...prev, [id]: [...current, option] };
      return { ...prev, [id]: current.filter((val: string) => val !== option) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // Basic Validation for required fields
    for (const field of schema) {
      if (field.required) {
        const val = formData[field.id];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          setErrorMsg(`Please fill out the required field: ${field.label}`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Isolate system fields guaranteed by EventEditor
    const studentEmail = formData['sys-email'];
    const studentName = formData['sys-name'];
    
    if (!studentEmail || !studentName) {
      setErrorMsg("Name and Email are required to register.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Generate the UUID on the client to bypass RLS SELECT restrictions
      const editToken = crypto.randomUUID();

      // 2. Insert data and token (NO .select() chained here)
      const { error } = await supabase.from('myuvce_events_registrations').insert({
        event_id: event.id,
        student_email: studentEmail,
        form_responses: formData,
        edit_token: editToken // Passing the client-generated token
      });

      if (error) throw error;
      
      const clubName = Array.isArray(event.myuvce_events_clubs) 
        ? event.myuvce_events_clubs[0]?.name 
        : event.myuvce_events_clubs?.name;

      // 3. Build the secure portal link using our client token
      const portalLink = `https://myuvce.in/events/portal/${editToken}`;

      // 4. Fire Background Email Worker asynchronously
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentEmail,
          studentName,
          eventTitle: event.title,
          clubName: clubName || 'UVCE Club',
          eventDate: event.event_date,
          portalLink 
        })
      }).catch(err => console.error("Non-fatal email error:", err));
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Registration Database Error:", err);
      
      let friendlyError = "Something went wrong with your registration. Please try again.";

      // Catches the UUID unique violation or duplicate email violation
      if (err?.code === '23505') {
        friendlyError = "It looks like you have already registered for this event with this email address.";
      } else if (err?.code === '23503') {
        friendlyError = "This event is no longer available or accepting registrations.";
      } else if (err?.message && err.message.toLowerCase().includes("fetch")) {
        friendlyError = "Network error. Please check your internet connection and try again.";
      }

      setErrorMsg(friendlyError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in zoom-in-95 duration-500">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">You're In!</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Your registration has been confirmed. We have sent a copy of your responses to your email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-bold rounded-xl animate-in fade-in slide-in-from-top-2">
          {errorMsg}
        </div>
      )}

      {schema.map((field: any) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {(field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'time') && (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder || ""}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-zinc-100"
              onChange={e => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              required={field.required}
              placeholder={field.placeholder || ""}
              rows={4}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-zinc-100 resize-none"
              onChange={e => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'select' && (
            <select
              required={field.required}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-zinc-100"
              onChange={e => handleChange(field.id, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select an option</option>
              {field.options.map((opt: string, i: number) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {field.type === 'radio' && (
            <div className="space-y-2 pt-1">
              {field.options.map((opt: string, i: number) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    required={field.required}
                    onChange={e => handleChange(field.id, e.target.value)}
                    className="w-4 h-4 text-indigo-600 border-zinc-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{opt}</span>
                </label>
              ))}
            </div>
          )}

          {field.type === 'checkbox' && (
            <div className="space-y-2 pt-1">
              {field.options.map((opt: string, i: number) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={opt}
                    onChange={e => handleCheckbox(field.id, opt, e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{opt}</span>
               </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70 mt-8 shadow-lg shadow-indigo-500/30"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
      </button>
    </form>
  );
}