import { GraduationCap, Users, History, Mail } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 dark:border-orange-800 mb-8 inline-block animate-bounce">
                    Our Story
                </span>
                <h1 className="text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-8 leading-tight">
                    For Students. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">By UVCE '29.</span>
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    MyUVCE is more than just a website. It's the digital home for every student at University Visvesvaraya College of Engineering.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                <StoryCard
                    title="The Mission"
                    desc="To provide every UVCE student with the resources and tools they need to succeed academically and professionaly."
                    icon={GraduationCap}
                    color="orange"
                />
                <StoryCard
                    title="The Community"
                    desc="Bringing students together through collaborative study materials, event updates, and peer support."
                    icon={Users}
                    color="rose"
                />
                <StoryCard
                    title="The History"
                    desc="Born out of the need for a unified portal that preserves the rich legacy of our prestigious institution."
                    icon={History}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-neutral-900 dark:bg-black p-12 lg:p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/30 rounded-full blur-[120px] group-hover:bg-orange-600/50 transition-colors" />
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-8 leading-tight">Building the Future <br /> of MyUVCE Together.</h2>
                    <p className="text-lg text-neutral-400 leading-relaxed mb-12">
                        Currently maintained by the 2029 Batch, we're constantly improving the portal. Whether it's the CGPA calculator or the Notes library, everything is built from scratch using modern tech.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="mailto:info@myuvce.in" className="flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold shadow-xl transition-all">
                            <Mail className="w-5 h-5" />
                            Get in Touch
                        </a>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-bold backdrop-blur-md transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="relative z-10 hidden lg:flex items-center justify-center p-12 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
                    <div className="text-center">
                        <div className="text-7xl font-black text-white mb-2">5.0k+</div>
                        <div className="text-orange-400 font-bold uppercase tracking-widest text-sm">Monthly Users</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StoryCard({ title, desc, icon: Icon, color }: any) {
    const colorClasses: any = {
        orange: "text-orange-600 bg-orange-50 dark:bg-orange-950/20",
        rose: "text-rose-600 bg-rose-50 dark:bg-rose-950/20",
        amber: "text-amber-600 bg-amber-50 dark:bg-amber-950/20"
    };

    return (
        <div className="p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 border border-neutral-100 dark:border-none shadow-sm ${colorClasses[color]}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">{title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{desc}</p>
        </div>
    );
}
