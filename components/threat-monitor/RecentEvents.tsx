"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Target,
  ArrowRight,
} from "lucide-react";

interface Incident {
  _id: string;
  title: string;
  ip: string;
  severity: string;
  status?: string;
  description?: string;
  createdAt: string;
}

interface RecentEventsProps {
  incidents: Incident[];
}

export default function RecentEvents({ incidents }: RecentEventsProps) {
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "HIGH": return <ShieldAlert className="w-4 h-4" />;
      case "MEDIUM": return <AlertTriangle className="w-4 h-4" />;
      case "LOW": return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityDot = (severity: string) => {
    switch(severity) {
      case "HIGH": return "bg-red-500";
      case "MEDIUM": return "bg-yellow-500";
      case "LOW": return "bg-green-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
              <Target className="text-orange-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Recent Incidents
                <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Latest security incidents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{incidents.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {incidents.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No incidents detected</p>
                <p className="text-xs text-slate-500">All systems are secure</p>
              </div>
            ) : (
              incidents.slice(0, 8).map((incident, index) => (
                <motion.div
                  key={incident._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden group cursor-pointer"
                  onClick={() => window.location.href = `/dashboard/incidents/${incident._id}`}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot(incident.severity)}`} />
                        <div className="p-1.5 rounded-lg bg-orange-500/10">
                          {getSeverityIcon(incident.severity)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {incident.title}
                          </p>
                          <p className="text-slate-400 text-xs flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {incident.ip}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-4">
                        {incident.status && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            incident.status === "OPEN" ? "bg-red-500/20 text-red-400" :
                            incident.status === "INVESTIGATING" ? "bg-blue-500/20 text-blue-400" :
                            "bg-green-500/20 text-green-400"
                          }`}>
                            {incident.status}
                          </span>
                        )}
                        {incident.description && (
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">
                            {incident.description}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(incident.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - index * 12}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`h-full rounded-full ${
                            incident.severity === "HIGH" ? "bg-red-500" :
                            incident.severity === "MEDIUM" ? "bg-yellow-500" :
                            "bg-green-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                <span>High: {incidents.filter(i => i.severity === "HIGH").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {incidents.filter(i => i.severity === "MEDIUM").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {incidents.filter(i => i.severity === "LOW").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Showing {Math.min(8, incidents.length)} of {incidents.length}</span>
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
          background: rgba(251, 146, 60, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
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