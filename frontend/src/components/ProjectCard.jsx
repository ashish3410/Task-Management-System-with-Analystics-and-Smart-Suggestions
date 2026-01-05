import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
export default function ProjectCard({ project }) {
  const description =
    project.description?.length > 60
      ? project.description.slice(0, 60) + "…"
      : project.description || "No description available.";

  return (
    <div
      className="group relative h-full rounded-2xl border border-white/10 
                 bg-white/5 backdrop-blur-xl p-5
                 shadow-lg shadow-black/30
                 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-indigo-900/40"
    >
      {/* Gradient Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r 
                      from-indigo-500/10 to-purple-500/10 
                      opacity-0 blur-xl transition-opacity 
                      group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold capitalize text-white line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">
          {description && description.length>35?description.substring(0,35)+"....": description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-400">
          <span>View Project</span>
          <span className="group-hover:translate-x-1 transition-transform">
            <MoveLeft className="inline-block h-8 w-8 rotate-180" color="indigo"/>
          </span>
        </div>
      </div>
    </div>
  );
}
