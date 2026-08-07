"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  FileWarning,
  Zap,
  Clock,
  Eye,
  Target,
  Shield,
  ArrowRight,
} from "lucide-react";

interface Incident {
  _id: string;
  title: string;
  alertId: string;
  ip: string;
  severity: string;
  status: string;
  description: string;
  createdAt: string;
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    try {
      setLoading(true);
      const res = await fetch("/api/security/incidents", {
        cache: "no-store",
      });
      const data = await res.json();
      setIncidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const total = incidents.length;
  const open = incidents.filter((item) => item.status === "OPEN").length;
  const investigating = incidents.filter((item) => item.status === "INVESTIGATING").length;
  const resolved = incidents.filter((item) => item.status === "RESOLVED").length;

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "OPEN": return <AlertTriangle className="w-3 h-3" />;
      case "INVESTIGATING": return <Activity className="w-3 h-3" />;
      case "RESOLVED": return <ShieldCheck className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  const cards = [
    { title: "Total Incidents", value: total, icon: <FileWarning className="w-6 h-6" />, color: "#06b6d4" },
    { title: "Open", value: open, icon: <AlertTriangle className="w-6 h-6" />, color: "#ef4444" },
    { title: "Investigating", value: investigating, icon: <Activity className="w-6 h-6" />, color: "#3b82f6" },
    { title: "Resolved", value: resolved, icon: <ShieldCheck className="w-6 h-6" />, color: "#22c55e" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-cyan-400 font-mono text-sm">LOADING INCIDENTS...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-500/30">
              <Target className="text-orange-400" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Incidents
                </span>
                <span className="text-slate-300"> Center</span>
              </h1>
              <p className="mt-1 text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Security incident investigation center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
              <span className="text-xs font-mono text-orange-300">TOTAL: {total}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: card.color }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">{card.value}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${card.color}20`, border: `1px solid ${card.color}30` }}>
                  <div style={{ color: card.color }}>{card.icon}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Incidents Table */}
        <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 border-b border-slate-700/30">
                <tr>
                  <th className="p-4 text-sm font-medium text-slate-400">Incident</th>
                  <th className="p-4 text-sm font-medium text-slate-400">IP Address</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Severity</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Created</th>
                </tr>
              </thead>

              <tbody>
                {incidents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="w-12 h-12 text-slate-600" />
                        <p>No incidents found</p>
                        <p className="text-sm text-slate-500">All systems are secure</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  incidents.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                      onClick={() => {
                        window.location.href = `/dashboard/incidents/${item._id}`;
                      }}
                      onMouseEnter={() => setHoveredRow(item._id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="cursor-pointer border-b border-slate-700/30 text-white transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-orange-500/10">
                            <FileWarning className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{item.title}</div>
                            <p className="text-sm text-slate-400 truncate max-w-xs">{item.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <code className="px-2 py-1 rounded bg-slate-700/30 text-cyan-300 text-sm font-mono">
                          {item.ip}
                        </code>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border ${getSeverityColor(item.severity)}`}>
                          {item.severity}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 w-fit ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span>Open: {open}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span>Investigating: {investigating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Resolved: {resolved}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Eye className="w-3 h-3" />
            <span>{incidents.length} total incidents</span>
          </div>
        </div>
      </div>
    </div>
  );
}