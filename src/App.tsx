import type { ReactNode } from "react";
import { motion } from "motion/react";
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

const hoverColors: Record<string, string> = {
  GitHub: "group-hover:text-blue-200",
  LinkedIn: "group-hover:text-blue-500",
  "X (Twitter)": "group-hover:text-sky-400",
  Instagram: "group-hover:text-pink-500",
  "Dev.to": "group-hover:text-yellow-500",
  "Chess.com": "group-hover:text-green-600",
  Default: "group-hover:text-white",
};

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
  },
];

const data: LinksData = {
  name: "Abhishek Dvs",
  bio: "Full-stack dev · Photography · OSINT · Chess",
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
    <div className="relative min-h-screen text-white px-4">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="./bg.svg"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

     {/* Main container */}
      <div className="flex flex-col justify-center items-center min-h-screen">

        {/* Profile section */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <img
              src={data.avatar}
              alt={data.name}
              className="rounded-full border border-neutral-700 shadow-lg bg-white w-32 h-32 object-cover mx-auto"
            />
          </motion.div>

          <motion.h1
            className="text-2xl font-bold mt-4 text-center w-full"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {data.name}
          </motion.h1>
          <motion.p
            className="text-neutral-300 mt-1 text-center w-full"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {data.bio}
          </motion.p>

          <motion.div
            className="flex gap-6 mt-4 justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {data.links.map((link, idx) => {
              const hoverColor = hoverColors[link.name] || hoverColors.Default;
              const icon = iconMap[link.name] || iconMap.Default;
              return (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="group p-3 rounded-full bg-neutral-900/70 hover:bg-neutral-800 transition"
                >
                  <span className={`text-white transition-colors ${hoverColor}`}>
                    {icon}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Projects section */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 justify-items-center max-w-4xl mx-auto">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-neutral-900/70 hover:bg-neutral-800 rounded-xl p-4 shadow-lg transition flex flex-col items-center mx-auto"
            >
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={`${project.name} thumbnail`}
                  className="rounded-xl mb-3 object-cover w-48 h-48 mx-auto"
                />
              )}
              <h3 className="font-semibold text-lg mb-1 text-center w-full">{project.name}</h3>
              <p className="text-neutral-400 text-sm text-center w-full">{project.description}</p>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

