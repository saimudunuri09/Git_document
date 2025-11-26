// app/jenkins-cli/page.js
"use client";

import React from "react";

export default function JenkinsLinuxCliPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-5">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-emerald-400">
          Jenkins CLI – Linux Commands
        </h1>
        <p className="text-slate-300">
          This page explains how to fetch Jenkins Job Names, Build Numbers, Build Status,
          and Git Commit IDs using Linux <code>curl</code> + API Token.
        </p>

        {/* Section 1 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">1. Set Jenkins Credentials (Linux)</h2>
          <p>Run these commands inside Linux terminal:</p>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`export JENKINS_USER="admin"
export JENKINS_TOKEN="YOUR_API_TOKEN"
export JENKINS_URL="http://localhost:8090"`}
          </pre>

          <p className="text-xs text-slate-500">⚠ Replace YOUR_API_TOKEN with your token.</p>
        </section>

        {/* Section 2 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-lime-300">2. Get All Jenkins Job Names</h2>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
"$JENKINS_URL/api/json?tree=jobs[name]"`}
          </pre>
        </section>

        {/* Section 3 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-300">3. Get Last Build Number, Status & URL</h2>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`JOB="nextjs-cicd"

curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
"$JENKINS_URL/job/$JOB/lastBuild/api/json?tree=number,result,url"`}
          </pre>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-pink-300">4. Get Git Commit SHA (Linux)</h2>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`JOB="nextjs-cicd"

curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
"$JENKINS_URL/job/$JOB/lastBuild/api/json?tree=actions[lastBuiltRevision[SHA1,branch[name]]]"`}
          </pre>
        </section>

        {/* Section 5 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-yellow-300">5. Only Print Commit SHA</h2>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`JOB="nextjs-cicd"

curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
"$JENKINS_URL/job/$JOB/lastBuild/api/json?tree=actions[lastBuiltRevision[SHA1]]" \\
| jq -r '.actions[]?.lastBuiltRevision?.SHA1' \\
| grep -v null`}
          </pre>
        </section>

        {/* Section 6 */}
        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-violet-300">6. Full Script (Job, Build, Status, Commit)</h2>

          <pre className="bg-black p-4 rounded-lg text-sm overflow-x-auto">
{`#!/bin/bash

echo "Fetching Jenkins jobs..."

JOBS=$(curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
"$JENKINS_URL/api/json?tree=jobs[name]" | jq -r '.jobs[].name')

for JOB in $JOBS; do
    echo "--------------------------------------------"
    echo "Job Name: $JOB"

    BUILD=$(curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
    "$JENKINS_URL/job/$JOB/lastBuild/api/json?tree=number,result,url")

    BUILD_NO=$(echo "$BUILD" | jq -r '.number')
    STATUS=$(echo "$BUILD" | jq -r '.result')
    URL=$(echo "$BUILD" | jq -r '.url')

    COMMIT=$(curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \\
    "$JENKINS_URL/job/$JOB/lastBuild/api/json?tree=actions[lastBuiltRevision[SHA1]]" \\
    | jq -r '.actions[]?.lastBuiltRevision?.SHA1' \\
    | grep -v null)

    echo "Build No  : $BUILD_NO"
    echo "Status    : $STATUS"
    echo "Commit SHA: $COMMIT"
    echo "URL       : $URL"
done`}
          </pre>
        </section>

      </div>
    </main>
  );
}
