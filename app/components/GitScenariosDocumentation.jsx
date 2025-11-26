"use client";

import React, { useState } from "react";
import * as docs from "@/app/docs";
import {
  Home,
  Settings,
  BookOpen,
  Zap,
  GitBranch,
  GitMerge,
  GitPullRequest,
  AlertCircle,
  Shield,
  Code,
  Terminal,
  Book,
  Wrench,
} from "lucide-react";

const menu = [
  { key: "Introduction", label: "Introduction", icon: Home },
  { key: "BasicSetup", label: "Basic Setup", icon: Settings },
  { key: "StartingProject", label: "Starting a Project", icon: BookOpen },
  { key: "DailyWorkflow", label: "Daily Workflow", icon: Zap },
  { key: "Branching", label: "Branching Strategies", icon: GitBranch },
  { key: "Merging", label: "Merging & Conflicts", icon: GitMerge },
  { key: "RemoteOperations", label: "Remote Operations", icon: GitPullRequest },
  { key: "PullRequests", label: "Pull Requests", icon: GitPullRequest },
  { key: "Emergencies", label: "Emergency Scenarios", icon: AlertCircle },
  { key: "TeamWorkflows", label: "Team Workflows", icon: Shield },
  { key: "BestPractices", label: "Best Practices", icon: Book },
  { key: "Troubleshooting", label: "Troubleshooting", icon: Terminal },
  { key: "Advanced", label: "Advanced Scenarios", icon: Code },
  { key: "JenkinsCli", label: "Jenkins CLI", icon: Wrench },
];

export default function GitScenariosDocumentation() {
  const [active, setActive] = useState("Introduction");
  const DocComponent = docs[active];

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Git Scenarios</h1>
        <p className="text-sm text-gray-500 mb-6">Complete Reference Guide</p>

        <nav className="space-y-1">
          {menu.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg 
                ${active === key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <article className="prose prose-lg max-w-none">
          <DocComponent />
        </article>
      </main>
    </div>
  );
}
