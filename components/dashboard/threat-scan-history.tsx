"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Search,
  X,
  Globe,
  Activity,
  RefreshCw,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Shield,
  Eye,
  Filter,
  ChevronDown,
} from "lucide-react";

interface Scan {
  _id: string;
  ip: string;
  score: number;
  country: string;
  risk: string;
  isp: string;
  domain: string;
  reports: number;
  createdAt: string;
}

export default function ThreatScanHistory() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [filtered, setFiltered] = useState<Scan[]>([]);
  const [selected, setSelected] = useState<Scan | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getScans = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/security/scans", {
        cache: "no-store",
      });
      const data = await res.json();
      setScans(data);
      setFiltered(data);
    } catch (error) {
      console.log("SCAN FETCH ERROR", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getScans();
    const interval = setInterval(() => {
      getScans();
    }, 10000);
    return () => clearInterval(interval);
  }, [getScans]);

  useEffect(() => {
    let data = [...scans];
    if (search) {
      data = data.filter((scan) =>
        scan.ip.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter !== "ALL") {
      data = data.filter((scan) => scan.risk === filter);
    }
    setFiltered(data);
  }, [search, filter, scans]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "HIGH":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "CLEAN":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "HIGH":
        return <ShieldAlert className="w-3 h-3" />;
      case "MEDIUM":
        return <AlertTriangle className="w-3 h-3" />;
      case "CLEAN":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
                <Target className="text-cyan-400" size={24} />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Threat Scan History
                </span>
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Click a scan to view details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={getScans}
              disabled={refreshing}
              className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 disabled:opacity-50 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0"
                animate={{ x: refreshing ? 0 : '-100%' }}
                transition={{ duration: 1, repeat: refreshing ? 0 : Infinity }}
              />
              <div className="flex items-center gap-2 relative">
                <RefreshCw className={`w-4 h-4 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium text-cyan-300">
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </span>
              </div>
            </motion.button>

            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{filtered.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-5 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700/30 pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl bg-slate-800/50 border border-slate-700/30 pl-10 pr-8 py-3 text-white appearance-none focus:border-cyan-500/50 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="ALL">All Risks</option>
              <option value="HIGH">🔴 HIGH</option>
              <option value="MEDIUM">🟡 MEDIUM</option>
              <option value="CLEAN">🟢 CLEAN</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
              />
              <p className="text-cyan-400 font-mono text-sm">LOADING SCANS...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700/50 text-sm text-slate-400">
                  <th className="p-3 font-medium">IP Address</th>
                  <th className="p-3 font-medium">Country</th>
                  <th className="p-3 font-medium">Risk</th>
                  <th className="p-3 font-medium">Score</th>
                  <th className="p-3 font-medium">Date</th>
                </tr>
              </thead>

              <AnimatePresence>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Shield className="w-12 h-12 text-slate-600" />
                          <p>No scans found</p>
                          <p className="text-sm text-slate-500">Try adjusting your search or filter</p>
                        </motion.div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((scan, index) => (
                      <motion.tr
                        key={scan._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{
                          backgroundColor: "rgba(30, 41, 59, 0.8)",
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => setSelected(scan)}
                        onMouseEnter={() => setHoveredRow(scan._id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="cursor-pointer border-b border-slate-700/30 text-white transition-colors duration-200"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={hoveredRow === scan._id ? { scale: 1.2 } : {}}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Shield className="w-3 h-3 text-cyan-400" />
                            </motion.div>
                            <code className="text-cyan-300 font-mono text-sm">{scan.ip}</code>
                          </div>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-slate-400" />
                            <span>{scan.country}</span>
                          </div>
                        </td>

                        <td className="p-3">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`rounded-full px-3 py-1 text-xs font-bold border ${getRiskColor(scan.risk)}`}
                          >
                            <span className="flex items-center gap-1">
                              {getRiskIcon(scan.risk)}
                              {scan.risk}
                            </span>
                          </motion.span>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${scan.score}%` }}
                                transition={{ duration: 1, delay: index * 0.05 }}
                                className={`h-full rounded-full ${getScoreBarColor(scan.score)}`}
                              />
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(scan.score)}`}>
                              {scan.score}/100
                            </span>
                          </div>
                        </td>

                        <td className="p-3 text-slate-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(scan.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        )}

        {/* Footer */}
        {scans.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  <span>High: {scans.filter(s => s.risk === "HIGH").length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                  <span>Medium: {scans.filter(s => s.risk === "MEDIUM").length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span>Clean: {scans.filter(s => s.risk === "CLEAN").length}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3" />
                <span>Auto-refresh every 10s</span>
                <span className="w-px h-3 bg-slate-700" />
                <span>{filtered.length} displayed</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scan Details Modal */}
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
                className="w-full max-w-lg rounded-2xl border border-slate-700/50 bg-[#0f172a] p-6 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${selected.risk === "HIGH" ? "bg-red-500/20" : selected.risk === "MEDIUM" ? "bg-yellow-500/20" : "bg-green-500/20"}`}>
                        {selected.risk === "HIGH" ? <ShieldAlert className="w-6 h-6 text-red-400" /> :
                         selected.risk === "MEDIUM" ? <AlertTriangle className="w-6 h-6 text-yellow-400" /> :
                         <CheckCircle className="w-6 h-6 text-green-400" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Threat Details</h3>
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

                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">IP Address</span>
                      <code className="text-cyan-300 font-mono">{selected.ip}</code>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Country</span>
                      <span className="text-white">{selected.country}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Threat Score</span>
                      <span className={`font-bold ${getScoreColor(selected.score)}`}>
                        {selected.score}/100
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Risk Level</span>
                      <span className={`font-bold ${selected.risk === "HIGH" ? "text-red-400" : selected.risk === "MEDIUM" ? "text-yellow-400" : "text-green-400"}`}>
                        {selected.risk}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">ISP</span>
                      <span className="text-white">{selected.isp}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Domain</span>
                      <span className="text-white">{selected.domain}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Reports</span>
                      <span className="text-white">{selected.reports}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30"
                    >
                      <span className="text-slate-400">Scan Date</span>
                      <span className="text-slate-300 text-sm">
                        {new Date(selected.createdAt).toLocaleString()}
                      </span>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(null)}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}