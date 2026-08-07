"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Search,
  X,
  Clock,
  AlertTriangle,
  Shield,
  Eye,
  Filter,
  ChevronDown,
  Zap,
  Activity,
} from "lucide-react";

interface Alert {
  _id: string;
  title: string;
  ip: string;
  severity: string;
  status: string;
  score: number;
  description: string;
  createdAt: string;
  incidentId?: string;
}

const severityColors = {
  HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  LOW: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const severityIcons = {
  HIGH: <ShieldAlert className="w-4 h-4" />,
  MEDIUM: <AlertTriangle className="w-4 h-4" />,
  LOW: <Shield className="w-4 h-4" />,
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filtered, setFiltered] = useState<Alert[]>([]);
  const [selected, setSelected] = useState<Alert | null>(null);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("ALL");
  const [creating, setCreating] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/security/alerts", {
        cache: "no-store",
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setAlerts(list);
      setFiltered(list);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load alerts");
    } finally {
      setIsLoading(false);
    }
  }

  async function createIncident(alert: Alert) {
    try {
      setCreating(alert._id);
      const res = await fetch("/api/security/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: alert.title,
          alertId: alert._id,
          ip: alert.ip,
          severity: alert.severity,
          description: alert.description,
        }),
      });

      const data = await res.json();
      console.log("INCIDENT RESPONSE", data);

      if (res.ok) {
        toast.success("Incident Created Successfully");
        setAlerts((prev) =>
          prev.map((item) =>
            item._id === alert._id ? { ...item, incidentId: data._id } : item
          )
        );
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Incident creation failed");
    } finally {
      setCreating(null);
    }
  }

  useEffect(() => {
    let data = [...alerts];
    if (search) {
      data = data.filter((alert) =>
        alert.ip.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (severity !== "ALL") {
      data = data.filter((alert) => alert.severity === severity);
    }
    setFiltered(data);
  }, [search, severity, alerts]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0a0e1a] flex items-center justify-center"
      >
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 font-mono"
          >
            LOADING SECURITY ALERTS...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0a0e1a] p-6 md:p-8 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#0a0e1a] flex items-center justify-center">
                  <ShieldAlert className="w-7 h-7 text-red-400" />
                </div>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <div>
              <motion.h1
                className="text-4xl font-bold tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Security
                </span>
                <span className="text-slate-300"> Alerts</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-sm flex items-center gap-2"
              >
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Monitor detected security threats
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {filtered.length} Active Alerts
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a]/80 backdrop-blur-sm border border-slate-700/50 pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="rounded-xl bg-[#0f172a]/80 backdrop-blur-sm border border-slate-700/50 pl-10 pr-8 py-3 text-white appearance-none focus:border-cyan-500/50 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="ALL">All Severity</option>
              <option value="HIGH">🔴 HIGH</option>
              <option value="MEDIUM">🟡 MEDIUM</option>
              <option value="LOW">🔵 LOW</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Alerts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700/30">
                <tr>
                  <th className="p-4 text-sm font-medium">Alert</th>
                  <th className="p-4 text-sm font-medium">IP Address</th>
                  <th className="p-4 text-sm font-medium">Severity</th>
                  <th className="p-4 text-sm font-medium">Score</th>
                  <th className="p-4 text-sm font-medium">Action</th>
                  <th className="p-4 text-sm font-medium">Time</th>
                </tr>
              </thead>

              <AnimatePresence>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Shield className="w-12 h-12 text-slate-600" />
                          <p>No alerts found</p>
                          <p className="text-sm text-slate-500">Try adjusting your search or filter</p>
                        </motion.div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((alert, index) => (
                      <motion.tr
                        key={alert._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.01,
                          backgroundColor: "rgba(15, 23, 42, 0.8)",
                          transition: { duration: 0.2 }
                        }}
                        className="border-t border-slate-700/30 text-white cursor-pointer transition-all duration-200"
                        onClick={() => setSelected(alert)}
                        onMouseEnter={() => setHoveredRow(alert._id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={hoveredRow === alert._id ? { scale: 1.2, rotate: 10 } : {}}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <ShieldAlert size={18} className="text-red-400" />
                            </motion.div>
                            <span className="font-medium">{alert.title}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <code className="px-2 py-1 rounded bg-slate-800/50 text-cyan-300 text-sm font-mono">
                            {alert.ip}
                          </code>
                        </td>

                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[alert.severity as keyof typeof severityColors] || "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                            <span className="flex items-center gap-1">
                              {severityIcons[alert.severity as keyof typeof severityIcons]}
                              {alert.severity}
                            </span>
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${alert.score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${
                                  alert.score >= 80 ? "bg-red-500" :
                                  alert.score >= 50 ? "bg-yellow-500" :
                                  "bg-blue-500"
                                }`}
                              />
                            </div>
                            <span className="text-sm text-slate-400">{alert.score}/100</span>
                          </div>
                        </td>

                        <td className="p-4">
                          {alert.incidentId ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/dashboard/incidents/${alert.incidentId}`;
                              }}
                              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-xs font-bold text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                            >
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                View Incident
                              </span>
                            </motion.button>
                          ) : (
                            <motion.button
                              disabled={creating === alert._id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                createIncident(alert);
                              }}
                              className="relative group rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-xs font-bold text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-white/10 to-red-500/0"
                                animate={{
                                  x: creating === alert._id ? "100%" : "-100%"
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <span className="relative flex items-center gap-1">
                                {creating === alert._id ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                      <Zap className="w-3 h-3" />
                                    </motion.div>
                                    Creating...
                                  </>
                                ) : (
                                  <>
                                    <Shield className="w-3 h-3" />
                                    Create Incident
                                  </>
                                )}
                              </span>
                            </motion.button>
                          )}
                        </td>

                        <td className="p-4 text-slate-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(alert.createdAt).toLocaleString()}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </motion.div>

        {/* Alert Details Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0f172a] border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-red-500/20">
                        <ShieldAlert className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Alert Details</h2>
                        <p className="text-sm text-slate-400">ID: {selected._id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelected(null)}
                      className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </motion.button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <p className="text-sm text-slate-400">Title</p>
                      <p className="text-white font-medium">{selected.title}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <p className="text-sm text-slate-400">IP Address</p>
                      <code className="text-cyan-300 font-mono">{selected.ip}</code>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                      >
                        <p className="text-sm text-slate-400">Severity</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${severityColors[selected.severity as keyof typeof severityColors] || "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
                          {severityIcons[selected.severity as keyof typeof severityIcons]}
                          {selected.severity}
                        </span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                      >
                        <p className="text-sm text-slate-400">Score</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${selected.score}%` }}
                              transition={{ duration: 1 }}
                              className={`h-full rounded-full ${
                                selected.score >= 80 ? "bg-red-500" :
                                selected.score >= 50 ? "bg-yellow-500" :
                                "bg-blue-500"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium text-white">{selected.score}/100</span>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <p className="text-sm text-slate-400">Time</p>
                      <p className="text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </motion.div>

                    {selected.description && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                      >
                        <p className="text-sm text-slate-400">Description</p>
                        <p className="text-white text-sm">{selected.description}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    {!selected.incidentId && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          createIncident(selected);
                          setSelected(null);
                        }}
                        disabled={creating === selected._id}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50"
                      >
                        {creating === selected._id ? "Creating..." : "Create Incident"}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelected(null)}
                      className="flex-1 py-3 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}