import { Link2, BookOpen, GraduationCap, Map, Users, Star } from "lucide-react";
import Link from "next/link";

export default function QuickLinks() {
    const links = [
        { name: "UVCE Notes & PYQs", icon: BookOpen, href: "/resources", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { name: "Syllabus Copy", icon: GraduationCap, href: "/syllabus", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { name: "Digital Campus Map", icon: Map, href: "/map", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
        { name: "Student Clubs", icon: Users, href: "/clubs", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
        { name: "Placement Stats", icon: Star, href: "/placements", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    ];

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white tracking-wide text-lg">Quick Links</h3>
            </div>
            <ul className="space-y-3">
                {links.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                        <li key={idx}>
                            <Link
                                href={link.href}
                                className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-[1.02] border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all group"
                            >
                                <div className={`p-2.5 rounded-[10px] shadow-sm group-hover:scale-110 transition-transform ${link.bg}`}>
                                    <Icon className={`w-4 h-4 ${link.color}`} />
                                </div>
                                <span className="font-semibold text-sm group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">{link.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
