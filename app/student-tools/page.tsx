import { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Calculator, Gamepad2, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Utilities Hub",
  description: "The complete suite of MyUVCE student tools and utilities for the 2025 Scheme. Access SGPA calculators, campus maps, and smart notes.",
  alternates: {
    canonical: "/student-tools",
  },
};

const TOOLS = [
  {
    name: "MyUVCE Hub",
    description: "The all-in-one student platform. Track attendance, manage assignments, and access all utilities in one dashboard.",
    action: "Launch Dashboard",
    href: "https://hub.pluranode.in",
    icon: LayoutDashboard,
    isExternal: true,
    featured: true, // Gets the heavy green styling
    color: {
      bg: "bg-green-50/50 dark:bg-green-900/10",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      text: "text-green-600 dark:text-green-500",
      border: "border-2 border-green-600",
    }
  },
  {
    name: "Smart Notes Library",
    description: "Instant access to syllabus copies and notes. View PDFs directly in the app with zero downloads.",
    action: "Browse Notes",
    href: "/uvce-notes",
    icon: BookOpen,
    isExternal: false,
    color: {
      bg: "bg-white dark:bg-neutral-900",
      iconBg: "bg-pink-50 dark:bg-pink-900/20",
      text: "text-pink-600 dark:text-pink-400",
      border: "border border-neutral-200 dark:border-neutral-800",
    }
  },
  {
    name: "SGPA Estimator",
    description: "Calculate your SGPA based on the 2025 regulations. Supports reverse calculation to find your target grades.",
    action: "Calculate Now",
    href: "https://hub.pluranode.in/sgpa",
    icon: Calculator,
    isExternal: true,
    color: {
      bg: "bg-white dark:bg-neutral-900",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border border-neutral-200 dark:border-neutral-800",
    }
  },
  {
    name: "Viva Garage",
    description: "Gamified viva practice. Test your skills in Physics, Chemistry, and C-Programming with real questions.",
    action: "Play Now",
    href: "https://hub.pluranode.in/viva",
    icon: Gamepad2,
    isExternal: true,
    color: {
      bg: "bg-white dark:bg-neutral-900",
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      border: "border border-neutral-200 dark:border-neutral-800",
    }
  },
  {
    name: "Classroom Directory",
    description: "Locate specific exam halls, labs, and classrooms on campus with our detailed guide.",
    action: "Find Room",
    href: "/map",
    icon: MapPin,
    isExternal: false, 
    color: {
      bg: "bg-white dark:bg-neutral-900",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border border-neutral-200 dark:border-neutral-800",
    }
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
          Campus Utilities Hub
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Welcome to the MyUVCE Utility Hub. These tools are designed to help students of the 2025 Scheme navigate their academics efficiently.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <Link
              key={tool.name}
              href={tool.href}
              target={tool.isExternal ? "_blank" : undefined}
              rel={tool.isExternal ? "noopener noreferrer" : undefined}
              className={`flex flex-col h-full rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group ${tool.color.border} ${tool.color.bg}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${tool.color.iconBg} ${tool.color.text} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {tool.name}
              </h2>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 flex-grow">
                {tool.description}
              </p>
              
              <div className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${tool.color.text}`}>
                {tool.action} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}