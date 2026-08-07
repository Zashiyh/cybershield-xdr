"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Shield,
  Clock,
  Eye,
  Zap,
  Activity,
} from "lucide-react";

interface Alert {
  _id: string;
  title: string;
  ip: string;
  severity: string;
  status: string;
  description: string;
  createdAt: string;
}

interface LiveFeedProps {
  alerts: Alert[];
}

export default function LiveFeed({ alerts }: LiveFeedProps) {
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case "OPEN": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "INVESTIGATING": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "RESOLVED": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
              <Activity className="text-blue-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Live Alert Feed
                <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Real-time security alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-blue-300">LIVE</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Alerts: <span className="text-white font-bold">{alerts.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No active alerts</p>
                <p className="text-xs text-slate-500">System is secure</p>
              </div>
            ) : (
              alerts.map((alert, index) => (
                <motion.div
                  key={alert._id}
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
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 rounded-lg bg-blue-500/10">
                          {getSeverityIcon(alert.severity)}
                        </div>
                        <h3 className="text-white font-semibold text-sm truncate">
                          {alert.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          IP Address
                        </p>
                        <code className="text-cyan-300 font-mono text-sm mt-1 block">
                          {alert.ip}
                        </code>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Status
                        </p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                    </div>

                    {alert.description && (
                      <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                        {alert.description}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - index * 10}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`h-full rounded-full ${
                            alert.severity === "HIGH" ? "bg-red-500" :
                            alert.severity === "MEDIUM" ? "bg-yellow-500" :
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
                <span>High: {alerts.filter(a => a.severity === "HIGH").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Medium: {alerts.filter(a => a.severity === "MEDIUM").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {alerts.filter(a => a.severity === "LOW").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>{alerts.length} total alerts</span>
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
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}