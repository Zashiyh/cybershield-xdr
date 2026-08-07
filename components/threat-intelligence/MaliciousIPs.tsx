"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Zap,
  Eye,
  Clock,
  AlertTriangle,
  Shield,
  Globe,
  MapPin,
  Activity,
  ExternalLink,
} from "lucide-react";

const maliciousIPs = [
  {
    ip: "185.220.101.1",
    country: "Germany",
    risk: "HIGH",
    reputation: 98,
    lastSeen: "2 min ago",
  },
  {
    ip: "91.218.114.45",
    country: "Russia",
    risk: "HIGH",
    reputation: 95,
    lastSeen: "5 min ago",
  },
  {
    ip: "45.143.200.77",
    country: "China",
    risk: "MEDIUM",
    reputation: 82,
    lastSeen: "12 min ago",
  },
  {
    ip: "103.92.24.11",
    country: "Singapore",
    risk: "LOW",
    reputation: 64,
    lastSeen: "28 min ago",
  },
  {
    ip: "172.67.201.90",
    country: "United States",
    risk: "MEDIUM",
    reputation: 79,
    lastSeen: "40 min ago",
  },
];

function riskColor(risk: string) {
  switch (risk) {
    case "HIGH":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "MEDIUM":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-green-500/20 text-green-400 border-green-500/30";
  }
}

function riskIcon(risk: string) {
  switch (risk) {
    case "HIGH":
      return <AlertTriangle className="w-3 h-3" />;
    case "MEDIUM":
      return <Shield className="w-3 h-3" />;
    default:
      return <Shield className="w-3 h-3" />;
  }
}

function riskDot(risk: string) {
  switch (risk) {
    case "HIGH": return "bg-red-500";
    case "MEDIUM": return "bg-yellow-500";
    default: return "bg-green-500";
  }
}

function getReputationColor(reputation: number) {
  if (reputation >= 80) return "text-red-400";
  if (reputation >= 60) return "text-yellow-400";
  return "text-green-400";
}

function getReputationBarColor(reputation: number) {
  if (reputation >= 80) return "bg-red-500";
  if (reputation >= 60) return "bg-yellow-500";
  return "bg-green-500";
}

export default function MaliciousIPs() {
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
              <ShieldAlert className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Malicious IP Feed
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Recently detected suspicious IP addresses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{maliciousIPs.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="pb-3 text-left text-xs font-medium text-slate-400">IP Address</th>
                <th className="pb-3 text-left text-xs font-medium text-slate-400">Country</th>
                <th className="pb-3 text-left text-xs font-medium text-slate-400">Reputation</th>
                <th className="pb-3 text-left text-xs font-medium text-slate-400">Risk</th>
                <th className="pb-3 text-left text-xs font-medium text-slate-400">Last Seen</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence initial={false}>
                {maliciousIPs.map((item, index) => (
                  <motion.tr
                    key={item.ip}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                    className="border-b border-slate-700/30 transition-colors duration-200 cursor-pointer group"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${riskDot(item.risk)}`} />
                        <code className="font-mono text-cyan-400 text-sm">{item.ip}</code>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-white text-sm">{item.country}</span>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.reputation}%` }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            className={`h-full rounded-full ${getReputationBarColor(item.reputation)}`}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getReputationColor(item.reputation)}`}>
                          {item.reputation}/100
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 w-fit ${riskColor(item.risk)}`}>
                        {riskIcon(item.risk)}
                        {item.risk}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Clock className="w-3 h-3" />
                        {item.lastSeen}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                <span>High: {maliciousIPs.filter(i => i.risk === "HIGH").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {maliciousIPs.filter(i => i.risk === "MEDIUM").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {maliciousIPs.filter(i => i.risk === "LOW").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Updated: Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}