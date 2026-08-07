"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bug, Zap, Eye, Clock, AlertTriangle, Shield, ExternalLink } from "lucide-react";

const cves = [
  {
    id: "CVE-2026-1458",
    score: 9.8,
    severity: "Critical",
    published: "2026-08-04",
    description: "Remote Code Execution vulnerability in popular web framework.",
  },
  {
    id: "CVE-2026-1123",
    score: 8.6,
    severity: "High",
    published: "2026-08-02",
    description: "Authentication bypass vulnerability allowing unauthorized access.",
  },
  {
    id: "CVE-2026-0934",
    score: 6.5,
    severity: "Medium",
    published: "2026-07-30",
    description: "Information disclosure vulnerability exposing sensitive data.",
  },
  {
    id: "CVE-2026-0841",
    score: 4.3,
    severity: "Low",
    published: "2026-07-28",
    description: "Cross-site scripting vulnerability in admin panel.",
  },
];

function severityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "High":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-green-500/20 text-green-400 border-green-500/30";
  }
}

function severityIcon(severity: string) {
  switch (severity) {
    case "Critical":
      return <AlertTriangle className="w-3 h-3" />;
    case "High":
      return <Shield className="w-3 h-3" />;
    case "Medium":
      return <Bug className="w-3 h-3" />;
    default:
      return <Shield className="w-3 h-3" />;
  }
}

function severityDot(severity: string) {
  switch (severity) {
    case "Critical": return "bg-red-500";
    case "High": return "bg-orange-500";
    case "Medium": return "bg-yellow-500";
    default: return "bg-green-500";
  }
}

function getScoreColor(score: number) {
  if (score >= 9) return "text-red-400";
  if (score >= 7) return "text-orange-400";
  if (score >= 4) return "text-yellow-400";
  return "text-green-400";
}

function getScoreBarColor(score: number) {
  if (score >= 9) return "bg-red-500";
  if (score >= 7) return "bg-orange-500";
  if (score >= 4) return "bg-yellow-500";
  return "bg-green-500";
}

export default function CVEFeed() {
  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
              <Bug className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Latest CVEs
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Recent published vulnerabilities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{cves.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* CVE List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {cves.map((cve, index) => (
              <motion.div
                key={cve.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden group"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${severityDot(cve.severity)}`} />
                      <h3 className="font-mono text-cyan-400 text-sm font-bold">
                        {cve.id}
                      </h3>
                      {cve.severity === "Critical" && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-400 text-[10px] font-bold animate-pulse">
                          URGENT
                        </span>
                      )}
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 ${severityColor(cve.severity)}`}>
                      {severityIcon(cve.severity)}
                      {cve.severity}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-3 flex items-center gap-6">
                    <div>
                      <p className="text-xs text-slate-500">CVSS Score</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(cve.score / 10) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            className={`h-full rounded-full ${getScoreBarColor(cve.score)}`}
                          />
                        </div>
                        <span className={`text-lg font-bold ${getScoreColor(cve.score)}`}>
                          {cve.score}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Published</p>
                      <p className="text-sm text-white flex items-center gap-1.5 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {cve.published}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {cve.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-4 rounded-full ${severityDot(cve.severity)}`} />
                      <span className="text-xs text-slate-500">
                        {cve.severity} severity
                      </span>
                    </div>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                      View Details
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                <span>Critical: {cves.filter(c => c.severity === "Critical").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                <span>High: {cves.filter(c => c.severity === "High").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {cves.filter(c => c.severity === "Medium").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {cves.filter(c => c.severity === "Low").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Updated: Today</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}