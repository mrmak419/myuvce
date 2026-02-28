import { BookOpen, Calendar, Download, Search } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-20">
                <div className="max-w-2xl">
                    <div className="mb-6">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 dark:border-orange-800">
                            Academic Hub
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-6">
                        Study Materials <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Built by Students.</span>
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Access a comprehensive repository of UVCE classroom notes, previous year question papers, and essential lab manuals.
                    </p>
                </div>
                <div className="flex flex-col w-full lg:w-96 p-8 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Find specific subjects..."
                            className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all text-sm"
                        />
                    </div>
                    <div className="mt-8 space-y-4">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Popular Searches</p>
                        <div className="flex flex-wrap gap-2">
                            {['M1 (2021 Scheme)', 'Microcontrollers', 'Analog Electronics', 'Compiler Design'].map((tag) => (
                                <button key={tag} className="px-3.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium rounded-full hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                <ResourceCard
                    title="Notes & Materials"
                    desc="Handwritten and digital notes for all engineering departments."
                    icon={BookOpen}
                    count="2400+ Files"
                    gradient="from-orange-500 to-amber-500"
                />
                <ResourceCard
                    title="Previous Question Papers"
                    desc="Semester-wise collection of university question papers."
                    icon={Calendar}
                    count="800+ Papers"
                    gradient="from-orange-600 to-rose-600"
                />
                <ResourceCard
                    title="Lab Manuals & Vivas"
                    desc="Preparation guides for laboratory exams and vivas."
                    icon={Download}
                    count="150+ Manuals"
                    gradient="from-amber-600 to-orange-700"
                />
            </div>

            <div className="p-10 bg-orange-600 dark:bg-orange-700 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-bold mb-4">Contribute to the Library</h2>
                    <p className="text-orange-50 opacity-90 leading-relaxed">
                        Found a helpful resource? Share it with your fellow students and help the community grow. Your contribution makes a difference.
                    </p>
                </div>
                <button className="relative z-10 px-8 py-4 bg-white text-orange-700 font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                    Upload Content
                </button>
            </div>
        </div>
    );
}

function ResourceCard({ title, desc, icon: Icon, count, gradient }: any) {
    return (
        <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white w-fit mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">{title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">{desc}</p>
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-400">{count}</span>
                <span className="p-2.5 rounded-full bg-neutral-50 dark:bg-neutral-800 text-neutral-400 group-hover:bg-orange-50 group-hover:text-orange-600 dark:group-hover:bg-orange-950/20 transition-all">
                    <Download className="w-4 h-4" />
                </span>
            </div>
        </div>
    );
}
