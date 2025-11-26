"use client";

import React, { useState, useMemo } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dynamic from "next/dynamic";

import {
  Home, Settings, BookOpen, Zap, GitBranch, GitMerge,
  GitPullRequest, AlertCircle, Code, Shield, Terminal, Book
} from "lucide-react";

// MDX Renderer
const MDXContent = dynamic(() => import("@/components/MDXContent"), {
  ssr: false,
});

// ORDERED LIST OF ALL YOUR DOCUMENTS (OPTION C)
const SECTIONS = [
  { key: "Introduction", icon: Home },
  { key: "Basic-Setup", icon: Settings },
  { key: "Starting-Project", icon: BookOpen },
  { key: "Daily-Workflow", icon: Zap },
  { key: "Branching", icon: GitBranch },
  { key: "Merging", icon: GitMerge },
  { key: "Remote-Operations", icon: GitPullRequest },
  { key: "Pull-Requests", icon: GitPullRequest },
  { key: "Emergencies", icon: AlertCircle },
  { key: "Advanced", icon: Code },
  { key: "Team-Workflows", icon: Shield },
  { key: "Troubleshooting", icon: Terminal },
  { key: "Best-Practices", icon: Book },
  { key: "Jenkins-CLI", icon: Terminal }
];

export default function DocumentationPage() {
  const [active, setActive] = useState("Introduction");
  const [search, setSearch] = useState("");

  // Load MDX content dynamically
  const loadDoc = (name) => {
    const filePath = path.join(process.cwd(), `app/docs/${name}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(raw);
    return content;
  };

  const filteredSections = SECTIONS.filter((sec) =>
    sec.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <input
          placeholder="Search sections..."
          className="w-full p-2 mb-4 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredSections.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2
              ${active === key ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700" : "hover:bg-gray-100"}
            `}
          >
            <Icon size={20} />
            <span>{key.replace("-", " ")}</span>
          </button>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <MDXContent source={loadDoc(active)} />
      </main>
    </div>
  );
}
