"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

export default function SubmitProfileForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // The exact URL from your legacy code
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtFP2BoceCzo2Yui2p6Eyyfoeqnw2HCypMJUuq9jbyHv5nfh6GyjAXfpEwhYjjitIbIA/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        formRef.current.reset();
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-xl border-t-8 border-[#1d3557] dark:border-blue-600 relative overflow-hidden">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] dark:text-white mb-3 tracking-tight">
          Get Featured
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Share your story. Inspire the next generation.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Input Group 1 */}
          <div className="relative">
            <input type="text" id="name" name="name" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Full Name
            </label>
          </div>

          <div className="relative">
            <input type="text" id="batch" name="batch" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="batch" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Batch & Branch
            </label>
          </div>

          <div className="relative">
            <input type="text" id="company" name="company" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="company" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Company
            </label>
          </div>

          <div className="relative">
            <input type="text" id="role" name="role" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="role" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Role
            </label>
          </div>

          <div className="relative">
            <input type="text" id="package" name="package" placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="package" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Package (Optional)
            </label>
          </div>

          <div className="relative">
            <input type="url" id="linkedin" name="linkedin" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="linkedin" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              LinkedIn URL
            </label>
          </div>
        </div>

        {/* Full Width Inputs */}
        <div>
          <div className="relative mb-2">
            <input type="url" id="photo_url" name="photo_url" placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="photo_url" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Photo URL
            </label>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Paste a Drive link, or leave blank and we will use your LinkedIn photo.</span>
        </div>

        <div>
          <div className="relative">
            <input type="text" id="quote" name="quote" required placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors"
            />
            <label htmlFor="quote" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Your Quote
            </label>
          </div>
        </div>

        <div>
          <div className="relative mb-2">
            <textarea id="story" name="story" required placeholder=" " rows={4}
              className="peer w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 py-3 text-neutral-900 dark:text-white focus:border-[#1d3557] dark:focus:border-blue-500 focus:outline-none transition-colors resize-y"
            ></textarea>
            <label htmlFor="story" className="absolute left-0 -top-3.5 text-sm text-[#1d3557] dark:text-blue-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#1d3557] dark:peer-focus:text-blue-500 peer-focus:font-bold cursor-text">
              Success Story
            </label>
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Write your story or list key points. We will format it for you.</span>
        </div>

        {/* Action Area */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#1d3557] to-[#e63946] text-white font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(29,53,87,0.2)] hover:shadow-[0_15px_25px_rgba(230,57,70,0.3)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === "submitting" ? "Sending..." : "Submit Profile"}
            {status !== "submitting" && <Send className="w-5 h-5" />}
          </button>

          {/* Feedback Messages */}
          {status === "success" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-[#2a9d8f] font-bold animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle className="w-5 h-5" /> Success! Sent for review.
            </div>
          )}
          
          {status === "error" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-[#e63946] font-bold animate-in fade-in slide-in-from-bottom-2">
              <AlertTriangle className="w-5 h-5" /> Error submitting form. Please try again.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}