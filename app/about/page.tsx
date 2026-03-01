import Image from "next/image";
import { ExternalLink, AlertTriangle, Map, BookOpen, Terminal } from "lucide-react";

export const metadata = {
  title: "About Us | MyUVCE",
  description: "The digital infrastructure and engineering team behind MyUVCE.",
};

const TEAM = [
  {
    name: "Mohammad Ayaan Khan",
    role: "Maintainer",
    description: "Architects the core digital infrastructure, including MyUVCE Hub and the overarching platform ecosystem.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWqww6gBq6LDkcyWWVG2X5_kdocx4iJMv5xHaw19IVQYG_8D8KDPEn1iUzesdlLRkhlA6qJ25iSdI1lEQGbPtfYmmA9_EZgG1mURzP5CwlIe7abEz05Z_zoTFAeP9T318htde3bJnpb-I3tNb2dd2qYoCOCi8ZGQKc9ighQCBQuIhV7ah76Q7bnmKw2QOM/s320-rw/ayaan.png",
    linkedin: "https://www.linkedin.com/in/mrmak/",
  },
  {
    name: "Gourav P D",
    role: "Strategy & Tech Support",
    description: "Manages internal operations and spearheads spatial initiatives like the digital UVCE campus map.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtAhN4DRm9FRIY4N7sIwrUMsLtL6Otz0lu-9j-smOs2YADTZt4IWo3p7S4i570QNFhxj-XGOr4EFUYPbu_FjxYTIpkUCI6hh_30C3TuOARlYVz0b_eUAbQ2aKPaF2r6j3IPElNA1_obRhOj68M4qkn3B6QzhQbX8FiM4-mZi4ZTBsxdvuURNeCjUH7B3qs/s320-rw/gourav.png",
    linkedin: "https://www.linkedin.com/in/gourav-pd-631526385/",
  },
  {
    name: "Chinmay Joshi",
    role: "Content Lead",
    description: "The voice of the community. Bridges the communication gap between alumni, seniors, and freshers.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmO4qkXOzdCoy52gGsCfFspSWIvQCfWtK5hihyphenhyphenjN6t_YOorI-CTrG78TtWwDHkfYly5NWGloAqvvyBhXCWBAp4qyVUuSho2gB4D12LFDWMR4SUy0lA9sqAh2AwBZh60LBk0D7wciv1pP-gQvVGI1YlpJDgOPopvPrxJQrNJh-DZiSXFe5XlAePIR6QJoTY/s96-rw/chinmay.jpg",
    linkedin: "https://www.linkedin.com/in/chinmay-joshi-35a354379/",
  },
  {
    name: "Shreyas V",
    role: "Web Developer",
    description: "Developer of UVCE Learn. Builds digital utilities to modernize standard campus operations.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6pCAX4l73rNz33SY6XIfQAvf0zYolmlv2t7roGrNqT7kqVPVEBQcVC-UQncmKjljrWtkmEkqXDLvcT6Tpy1v0hxDxi1jNlssWm98_PNG3KT83LC1akmpEoslRTGgzyxKrfesJLsWXwkM-TxJHbCP600B_9AqHTTHwL0nUq9opiLbH77aM2M55avrAN4qw/s320-rw/shreyas.jpg",
    linkedin: "https://www.linkedin.com/in/ishreyasv/",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header Section */}
      <section className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
          Engineering the Campus
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Established in 1917, University Visvesvaraya College of Engineering is a historic institution. 
          We are the student initiative building its modern digital infrastructure.
        </p>
      </section>

      {/* Core Features / Mission */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Terminal className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Campus Utilities</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            Building software that solves actual student problems, from attendance tracking interfaces to classroom directories.
          </p>
        </div>
        
        <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Map className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Digital Mapping</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            Mapping the sprawling K.R. Circle campus floor-by-floor so freshers can locate labs and lecture halls instantly.
          </p>
        </div>

        <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Academic Repository</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            Maintaining an indexed, highly searchable database of lab manuals, notes, and previous year question papers.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Meet the Team</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Class of 2029</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover border-4 border-neutral-50 dark:border-neutral-800"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white text-center">{member.name}</h3>
              <span className="mt-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-400">
                {member.role}
              </span>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed flex-grow">
                {member.description}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Connect <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-3xl mx-auto">
        <div className="flex items-start gap-4 p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl">
          <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-rose-900 dark:text-rose-400 mb-1">Unofficial Resource</h4>
            <p className="text-sm text-rose-700 dark:text-rose-300/80 leading-relaxed">
              MyUVCE is an independent initiative created by students. We are not affiliated with, endorsed by, or officially connected to the administration of UVCE or Bangalore University.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}