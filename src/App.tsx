import type { ReactNode } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  X,
  Code2,
  Gamepad2,
  Globe,
} from "lucide-react";
import './index.css'

type Link = {
  name: string;
  url: string;
};

type LinksData = {
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
};

// const hoverColors: Record<string, string> = {
//   GitHub: "group-hover:text-blue-200",
//   LinkedIn: "group-hover:text-blue-500",
//   "X (Twitter)": "group-hover:text-sky-400",
//   Instagram: "group-hover:text-pink-500",
//   "Dev.to": "group-hover:text-yellow-500",
//   "Chess.com": "group-hover:text-green-600",
//   Default: "group-hover:text-white",
// };

const iconMap: Record<string, ReactNode> = {
  GitHub: <Github className="w-6 h-6" />,
  LinkedIn: <Linkedin className="w-6 h-6" />,
  "X (Twitter)": <X className="w-6 h-6" />,
  Instagram: <Instagram className="w-6 h-6" />,
  "Chess.com": <Gamepad2 className="w-6 h-6" />,
  "Dev.to": <Code2 className="w-6 h-6" />,
  Default: <Globe className="w-6 h-6" />,
};

type Project = {
  name: string;
  url: string;
  description: string;
  thumbnail: string;
};

const projects: Project[] = [
  {
    name: "My Portfolio",
    url: "https://abhisdistro.pages.dev/",
    description: "Showcase of my projects and Pastimes",
    thumbnail: "./abhisdistro.png",
  },
  {
    name: "Traata",
    url: "https://traata.pages.dev/",
    description: "A secure, lightweight password manager built for simplicity and privacy.",
    thumbnail: "./traata.png",
  },
  {
    name: "BlunderBot",
    url: "https://blunderbot.pages.dev/",
    description: "Your AI chess bot which roasts you",
    thumbnail: "./blunderbot.png",
  },
  {
    name: "Terminal Sandbox",
    url: "https://terminalsandbox.pages.dev/",
    description: "Web-based Debian Linux terminal sandbox",
    thumbnail: "./abhisdistro.png",
  }
];

const data: LinksData = {
  name: "Abhishek Dvs",
  bio: "Full-stack dev · Photography · Biking · Chess",
  avatar: "./abhisdistro.png",
  links: [
    { name: "GitHub", url: "https://github.com/AbhishekDvs" },
    { name: "LinkedIn", url: "https://linkedin.com/in/allstarabhishek" },
    { name: "Dev.to", url: "https://dev.to/abhishekdvs" },
    { name: "Instagram", url: "https://www.instagram.com/fourforcephoto/" },
    { name: "X (Twitter)", url: "https://x.com/abhisheksdistro" },
    { name: "Chess.com", url: "https://www.chess.com/member/dovahkiinishere" },
  ],
};
export default function App() {
  return (
    <div className="relative min-h-screen text-[#111] font-sans">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="./bg.svg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <header className="w-full border-b border-neutral-300 bg-white/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">{data.name}</h1>
          <span className="text-sm text-neutral-700 hidden sm:block">
            {data.bio}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center">

        <img
          src={data.avatar}
          alt={data.name}
          className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover shadow-md"
        />

        <h2 className="text-2xl font-bold mt-5">Building useful tools & ideas.</h2>

        <p className="mt-3 max-w-md text-neutral-700 leading-relaxed text-sm">
          Developer · Security Enthusiast · AI · Photography
        </p>

        {/* Social Links */}
        <div className="flex gap-2 mt-5">
          {data.links.map((link, idx) => {
            const icon = iconMap[link.name] || iconMap.Default;
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-neutral-300 bg-white/80 backdrop-blur-sm hover:border-yellow-400 hover:text-yellow-500 transition rounded"
              >
                {icon}
              </a>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 py-6">

        <h2 className="text-lg font-extrabold tracking-tight mb-4">
          Projects <span className="text-yellow-500">→</span>
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">

          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-white/80 backdrop-blur-md border border-neutral-300 hover:border-yellow-400 p-3 rounded-lg transition shadow-sm hover:shadow-md"
            >
              <img
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                className="w-20 h-20 rounded-md object-cover border border-neutral-200 group-hover:border-yellow-400 transition"
              />

              <div className="ml-4">
                <h3 className="font-semibold text-base group-hover:text-yellow-600 transition">
                  {project.name}
                </h3>
                <p className="text-neutral-600 text-xs mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </a>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-300 bg-white/70 backdrop-blur-md py-5 mt-10 text-center text-neutral-600 text-xs">
        © {new Date().getFullYear()} {data.name}
      </footer>
    </div>
  );
}






