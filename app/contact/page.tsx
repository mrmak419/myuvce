"use client";

import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">Contact Us</h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                    Have any questions or suggestions? We're here to help the student community.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <ContactCard
                        icon={Mail}
                        title="Email"
                        value="contact@myuvce.in"
                        href="mailto:contact@myuvce.in"
                    />
                    <ContactCard
                        icon={MapPin}
                        title="Location"
                        value="KR Circle, Bengaluru - 560001"
                        href="https://maps.google.com/?q=UVCE+KR+Circle"
                    />
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-10 shadow-sm">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Subject</label>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Write your message here..."
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 outline-none transition-all resize-none"
                            />
                        </div>
                        <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group">
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ContactCard({ icon: Icon, title, value, href }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-6 p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:shadow-lg transition-all group"
        >
            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">{value}</p>
            </div>
        </a>
    );
}
