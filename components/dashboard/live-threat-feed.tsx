"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Globe,
  Clock,
  Activity,
  Zap,
  Radar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Target,
} from "lucide-react";

interface Threat {
  _id: string;
  ip: string;
  country: string;
  risk: string;
  score: number;
  createdAt: string;
}

export default function LiveThreatFeed() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [newThreats, setNewThreats] = useState<string[]>([]);

  async function loadThreats() {
    try {
      const res = await fetch("/api/security/live-feed", {
        cache: "no-store",
      });
      const data = await res.json();

      // Track new threats for animation
      if (threats.length > 0 && data.length > threats.length) {
        const newIds = data.slice(0, data.length - threats.length).map((t: Threat) => t._id);
        setNewThreats(newIds);
        setTimeout(() => setNewThreats([]), 3000);
      }

      setThreats(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadThreats();
    const interval = setInterval(() => {
      loadThreats();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk) {
      case "HIGH": return <ShieldAlert className="w-3 h-3" />;
      case "MEDIUM": return <AlertTriangle className="w-3 h-3" />;
      case "LOW": return <CheckCircle className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 50) return "text-yellow-400";
    return "text-green-400";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
              <Radar className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Live Threat Feed
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Real time security events
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-red-300">LIVE</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Threats: <span className="text-white font-bold">{threats.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Threat List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {threats.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No threats detected</p>
                <p className="text-xs text-slate-500">System is secure</p>
              </div>
            ) : (
              threats.map((threat, index) => {
                const isNew = newThreats.includes(threat._id);
                const isHovered = hoveredId === threat._id;

                return (
                  <motion.div
                    key={threat._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredId(threat._id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden group"
                  >
                    {/* New Threat Glow */}
                    {isNew && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl" />
                    )}

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

                    <div className="relative">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-red-400" />
                            <h3 className="font-bold text-white text-sm truncate">
                              {threat.ip}
                            </h3>
                            {isNew && (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-400 text-[10px] font-bold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <p className="text-sm text-slate-400 flex items-center gap-1">
                              <Globe size={14} />
                              {threat.country}
                            </p>

                            <p className={`text-sm font-medium flex items-center gap-1 ${getScoreColor(threat.score)}`}>
                              Score: {threat.score}/100
                            </p>

                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock size={12} />
                              {new Date(threat.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {/* Score Bar */}
                          <div className="mt-3">
                            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-700">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${threat.score}%` }}
                                transition={{ duration: 1, delay: index * 0.05 }}
                                className={`h-full rounded-full ${getScoreBarColor(threat.score)}`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold border ${getRiskColor(threat.risk)}`}>
                            <span className="flex items-center gap-1">
                              {getRiskIcon(threat.risk)}
                              {threat.risk}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                <span>High: {threats.filter(t => t.risk === "HIGH").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {threats.filter(t => t.risk === "MEDIUM").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {threats.filter(t => t.risk === "LOW").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Auto-refresh every 5s</span>
              <span className="w-px h-3 bg-slate-700" />
              <span>{threats.length} active</span>
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