import { Bell, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function NoticeBoard() {
    const notices = [
        { title: "Even Semester Timetable Released for All Branches", date: "Jan 12, 2026", isNew: true },
        { title: "Placement Drive: Intuit - Pre-Placement Talk Scheduled", date: "Jan 09, 2026", isNew: false },
        { title: "Milana 2026: Alumni Meet Registration Now Open", date: "Jan 05, 2026", isNew: false },
        { title: "Examination Registration Form Deadline Extended", date: "Jan 02, 2026", isNew: false },
    ];

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-600/90 dark:to-rose-600/90 px-5 py-4 flex items-center gap-3">
                <Bell className="w-5 h-5 text-white animate-pulse" />
                <h3 className="font-bold text-white tracking-wide">Notice Board</h3>
            </div>
            <div className="p-5">
                <ul className="space-y-4">
                    {notices.map((notice, idx) => (
                        <li key={idx} className="group flex flex-col items-start border-b border-neutral-100 dark:border-neutral-800/80 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    {notice.date}
                                </span>
                                {notice.isNew && (
                                    <span className="text-[10px] font-bold text-white bg-rose-500 px-1.5 py-0.5 rounded uppercase animate-bounce">
                                        New
                                    </span>
                                )}
                            </div>
                            <a href="#" className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-relaxed block">
                                {notice.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <Link href="/notices" className="mt-5 inline-flex items-center justify-center w-full gap-2 p-3 text-sm font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all border border-red-100 dark:border-red-900/50">
                    View All Notices <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
