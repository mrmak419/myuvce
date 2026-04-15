"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, MessageCircle, Calendar, CalendarDays, Copy } from "lucide-react";

export default function RegistrationForm({ event }: { event: any }) {
  const schema = event.registration_schema || [];
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToken, setSuccessToken] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

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

    const studentEmail = formData['sys-email'];
    const studentName = formData['sys-name'];
    
    if (!studentEmail || !studentName) {
      setErrorMsg("Name and Email are required to register.");
      setIsSubmitting(false);
      return;
    }

    try {
      const editToken = crypto.randomUUID();

      const { error } = await supabase.from('myuvce_events_registrations').insert({
        event_id: event.id,
        student_email: studentEmail,
        form_responses: formData,
        edit_token: editToken 
      });

      if (error) throw error;
      
      // Store the token in state to switch the UI to the Digital Ticket
      setSuccessToken(editToken);
    } catch (err: any) {
      console.error("Registration Database Error:", err);
      
      let friendlyError = "Something went wrong with your registration. Please try again.";

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

  // --- Helpers for the Digital Ticket Dashboard ---

  const getCalendarDates = () => {
    if (!event.event_date) return { start: "", end: "" };
    const startDate = new Date(event.event_date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours for standard block
    const format = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '').substring(0, 15) + 'Z';
    return { start: format(startDate), end: format(endDate) };
  };

  const handleDownloadICS = () => {
    const { start, end } = getCalendarDates();
    const portalLink = `https://myuvce.in/events/portal/${successToken}`;
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${event.title}\nDESCRIPTION:Portal Link: ${portalLink}\nEND:VEVENT\nEND:VCALENDAR`;
    
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://myuvce.in/events/portal/${successToken}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Render Digital Ticket Dashboard ---
  if (successToken) {
    const portalLink = `https://myuvce.in/events/portal/${successToken}`;
    const displayDate = event.event_date ? new Date(event.event_date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Date TBA';
    
    const actionText = event.allow_edits ? "View/Edit responses" : "View responses";
    const waText = `RSVP For ${event.title}\nDate: ${displayDate}\n${actionText} : ${portalLink}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    
    const { start, end } = getCalendarDates();
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(portalLink)}`;

    return (
      <div className="max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Registration Confirmed</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">Please save your digital ticket link below.</p>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 space-y-4">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Event</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{event.title}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Date</p>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{displayDate}</p>
          </div>

          <div className="pt-4 space-y-3">
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Save to WhatsApp
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a 
                href={googleCalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Google Cal
              </a>
              <button 
                onClick={handleDownloadICS}
                className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                Apple Cal
              </button>
            </div>

            <button 
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 font-bold text-sm rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Responce Link"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Standard Form ---
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