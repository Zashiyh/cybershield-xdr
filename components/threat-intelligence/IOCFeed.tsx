"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Eye,
  Clock,
  AlertTriangle,
  Shield,
  Server,
  Globe,
  Link,
  Hash,
  FileCode,
  ExternalLink,
} from "lucide-react";

const iocs = [
  {
    type: "IP",
    value: "185.220.101.1",
    confidence: "High",
    source: "AbuseIPDB",
  },
  {
    type: "Domain",
    value: "malware-update.xyz",
    confidence: "High",
    source: "VirusTotal",
  },
  {
    type: "URL",
    value: "hxxps://evil-login[.]com",
    confidence: "Medium",
    source: "OTX",
  },
  {
    type: "SHA256",
    value: "5D2A93F8E7C4B1A8...",
    confidence: "Critical",
    source: "Internal",
  },
  {
    type: "MD5",
    value: "9f86d081884c7d65...",
    confidence: "Medium",
    source: "Hybrid Analysis",
  },
];

function confidenceColor(level: string) {
  switch (level) {
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

function confidenceIcon(level: string) {
  switch (level) {
    case "Critical":
      return <AlertTriangle className="w-3 h-3" />;
    case "High":
      return <Shield className="w-3 h-3" />;
    case "Medium":
      return <ShieldCheck className="w-3 h-3" />;
    default:
      return <ShieldCheck className="w-3 h-3" />;
  }
}

function confidenceDot(level: string) {
  switch (level) {
    case "Critical": return "bg-red-500";
    case "High": return "bg-orange-500";
    case "Medium": return "bg-yellow-500";
    default: return "bg-green-500";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "IP":
      return <Server className="w-3 h-3" />;
    case "Domain":
      return <Globe className="w-3 h-3" />;
    case "URL":
      return <Link className="w-3 h-3" />;
    case "SHA256":
    case "MD5":
      return <Hash className="w-3 h-3" />;
    default:
      return <FileCode className="w-3 h-3" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "IP":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Domain":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "URL":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "SHA256":
    case "MD5":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

export default function IOCFeed() {
  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
              <ShieldCheck className="text-cyan-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                IOC Feed
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Indicators of Compromise
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{iocs.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* IOC List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {iocs.map((ioc, index) => (
              <motion.div
                key={index}
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${confidenceDot(ioc.confidence)}`} />
                      <span className={`rounded-md px-2 py-1 text-xs font-bold border flex items-center gap-1 ${getTypeColor(ioc.type)}`}>
                        {getTypeIcon(ioc.type)}
                        {ioc.type}
                      </span>
                      <code className="font-mono text-sm text-white truncate max-w-[150px]">
                        {ioc.value}
                      </code>
                      {ioc.confidence === "Critical" && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-400 text-[10px] font-bold animate-pulse">
                          CRITICAL
                        </span>
                      )}
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 ${confidenceColor(ioc.confidence)}`}>
                      {confidenceIcon(ioc.confidence)}
                      {ioc.confidence}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-500">
                        Source: <span className="text-slate-300">{ioc.source}</span>
                      </div>
                    </div>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                      Investigate
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${100 - index * 15}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className={`h-full rounded-full ${
                          ioc.confidence === "Critical" ? "bg-red-500" :
                          ioc.confidence === "High" ? "bg-orange-500" :
                          ioc.confidence === "Medium" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                      />
                    </div>
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
                <span>Critical: {iocs.filter(i => i.confidence === "Critical").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                <span>High: {iocs.filter(i => i.confidence === "High").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {iocs.filter(i => i.confidence === "Medium").length}</span>
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
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
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