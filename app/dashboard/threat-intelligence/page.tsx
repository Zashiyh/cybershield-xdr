"use client";

import { motion } from "framer-motion";
import ThreatOverview from "@/components/threat-intelligence/ThreatOverview";
import MaliciousIPs from "@/components/threat-intelligence/MaliciousIPs";
import IOCFeed from "@/components/threat-intelligence/IOCFeed";
import CVEFeed from "@/components/threat-intelligence/CVEFeed";
import ThreatTimeline from "@/components/threat-intelligence/ThreatTimeline";
import {
  Shield,
  Activity,
  Zap,
  Globe,
  Target,
  Eye,
} from "lucide-react";

export default function ThreatIntelligencePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0a0e1a] p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/30">
              <Globe className="text-purple-400" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Threat Intelligence
                </span>
                <span className="text-slate-300"> Center</span>
              </h1>
              <p className="mt-1 text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Monitor cyber threats, malicious indicators, CVEs and intelligence feeds in real time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-purple-300">LIVE</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                Active Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ThreatOverview />
        </motion.div>

        {/* Malicious IPs & IOC Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden h-full">
              <MaliciousIPs />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden h-full">
              <IOCFeed />
            </div>
          </div>
        </motion.div>

        {/* CVE Feed & Threat Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden h-full">
              <CVEFeed />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden h-full">
              <ThreatTimeline />
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-700/20"
        >
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>Threat Intelligence Active</span>
            </div>
            <span className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <Target className="w-3 h-3" />
              <span>Real-time monitoring</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Eye className="w-3 h-3" />
            <span>All feeds operational</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}