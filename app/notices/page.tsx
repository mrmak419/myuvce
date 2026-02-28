import { Bell, Calendar } from "lucide-react";

export default function NoticesPage() {
    const notices = [
        { title: "Even Semester Timetable Released for All Branches", date: "Jan 12, 2026", category: "Academic" },
        { title: "Placement Drive: Intuit - Pre-Placement Talk Scheduled", date: "Jan 09, 2026", category: "Placement" },
        { title: "Milana 2026: Alumni Meet Registration Now Open", date: "Jan 05, 2026", category: "Events" },
        { title: "Examination Registration Form Deadline Extended", date: "Jan 02, 2026", category: "Exam" },
        { title: "Winter Internship Program 2026 Applications", date: "Dec 28, 2025", category: "Opportunities" },
        { title: "Scholarship Portal for SC/ST/OBC Students Updated", date: "Dec 25, 2025", category: "Support" },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
                    <Bell className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Notice Board</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">Stay updated with the latest campus announcements</p>
                </div>
            </div>

            <div className="space-y-6">
                {notices.map((notice, idx) => (
                    <div key={idx} className="group p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-lg hover:border-orange-500/20 transition-all">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-100 dark:border-orange-800/50">
                                {notice.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                <Calendar className="w-3.5 h-3.5" />
                                {notice.date}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-orange-600 transition-colors">
                            {notice.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
