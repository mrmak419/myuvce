"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertCircle, Edit2, CheckCircle2, FileText } from "lucide-react";

export default function PortalClient({ token, initialData }: { token: string, initialData: any }) {
  const [data, setData] = useState<any>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(initialData.form_responses || {});

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    const schema = data.registration_schema || [];
    for (const field of schema) {
      if (field.required && !field.system) {
        const val = formData[field.id];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          setErrorMsg(`Please fill out the required field: ${field.label}`);
          setIsSaving(false);
          return;
        }
      }
    }

    try {
      const { error } = await supabase.rpc('update_registration_by_token', {
        token: token,
        new_responses: formData
      });

      if (error) throw error;

      setData((prev: any) => ({ ...prev, form_responses: formData }));
      setIsEditing(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMsg(err.message || "Failed to save changes. The deadline may have passed.");
    } finally {
      setIsSaving(false);
    }
  };

  const schema = data.registration_schema || [];
  const deadlinePassed = data.registration_deadline ? new Date() > new Date(data.registration_deadline) : false;
  const canEdit = data.allow_edits && !deadlinePassed;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">{data.event_title}</h1>
            <p className="text-sm text-zinc-500 font-medium mt-1">
              Registered with: <span className="text-zinc-900 dark:text-zinc-300 font-bold">{data.student_email}</span>
            </p>
          </div>

          {!isEditing && (
            <div className="shrink-0">
              {canEdit ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <Edit2 className="w-4 h-4" /> Edit Answers
                </button>
              ) : (
                <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 text-center">
                    {!data.allow_edits ? "Edits not allowed for this event" : "Editing deadline has passed"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {errorMsg && isEditing && (
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-bold rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
            <FileText className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isEditing ? "Edit Your Responses" : "Your Responses"}
            </h2>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              {schema.map((field: any) => {
                const answer = data.form_responses[field.id];
                const displayAnswer = Array.isArray(answer) ? answer.join(", ") : answer;

                return (
                  <div key={field.id} className="space-y-1.5">
                    <p className="text-sm font-bold text-zinc-500">{field.label}</p>
                    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {displayAnswer || <span className="text-zinc-300 dark:text-zinc-700 italic">No answer provided</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {schema.map((field: any) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {field.label} {field.required && !field.system && <span className="text-red-500">*</span>}
                  </label>
                  
                  {(field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'time') && (
                    <input
                      disabled={field.system}
                      type={field.type}
                      required={field.required && !field.system}
                      value={formData[field.id] || ""}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                      onChange={e => handleChange(field.id, e.target.value)}
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      disabled={field.system}
                      required={field.required && !field.system}
                      value={formData[field.id] || ""}
                      rows={4}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 resize-none disabled:opacity-50"
                      onChange={e => handleChange(field.id, e.target.value)}
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      disabled={field.system}
                      required={field.required && !field.system}
                      value={formData[field.id] || ""}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                      onChange={e => handleChange(field.id, e.target.value)}
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
                        <label key={i} className={`flex items-center gap-3 ${field.system ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                          <input
                            disabled={field.system}
                            type="radio"
                            name={field.id}
                            value={opt}
                            checked={formData[field.id] === opt}
                            required={field.required && !field.system}
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
                      {field.options.map((opt: string, i: number) => {
                        const isChecked = Array.isArray(formData[field.id]) && formData[field.id].includes(opt);
                        return (
                          <label key={i} className={`flex items-center gap-3 ${field.system ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input
                              disabled={field.system}
                              type="checkbox"
                              value={opt}
                              checked={isChecked}
                              onChange={e => handleCheckbox(field.id, opt, e.target.checked)}
                              className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(data.form_responses || {});
                  }}
                  className="flex-1 py-3.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}