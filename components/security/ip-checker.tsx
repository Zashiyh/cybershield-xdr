"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldAlert,
  Globe,
  Activity,
  Loader2,
  Zap,
  Target,
  Shield,
  CheckCircle,
  AlertTriangle,
  Eye,
  Clock,
  Server,
  Globe2,
} from "lucide-react";

export default function IPChecker() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function checkIP() {
    if (!ip) {
      alert("Enter IP address");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("/api/security/ip-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip }),
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (!res.ok || !data.data) {
        alert(data.message || "Unable to check IP");
        return;
      }

      const info = data.data;

      setResult({
        ip: info.ipAddress || ip,
        score: info.abuseConfidenceScore ?? 0,
        country: info.countryCode || "Unknown",
        risk: info.abuseConfidenceScore >= 70
          ? "HIGH"
          : info.abuseConfidenceScore >= 30
          ? "MEDIUM"
          : "CLEAN",
        detections: [
          `${info.totalReports ?? 0} Abuse Reports`,
          `ISP: ${info.isp || "Unknown"}`,
          `Domain: ${info.domain || "Unknown"}`,
          `Last Reported: ${info.lastReportedAt || "None"}`,
        ],
      });
    } catch (error) {
      console.log("IP CHECK ERROR:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "CLEAN": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk) {
      case "HIGH": return <ShieldAlert className="w-5 h-5" />;
      case "MEDIUM": return <AlertTriangle className="w-5 h-5" />;
      case "CLEAN": return <CheckCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-400";
    if (score >= 30) return "text-yellow-400";
    return "text-green-400";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 70) return "bg-red-500";
    if (score >= 30) return "bg-yellow-500";
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
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
                  IP Reputation Checker
                </span>
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Analyze suspicious IP addresses
              </p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
            <span className="text-xs font-mono text-cyan-300">SECURITY TOOL</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter IP address to check..."
              className={`w-full rounded-xl border ${
                isFocused ? "border-cyan-500/50" : "border-slate-700/50"
              } bg-slate-800/50 pl-10 pr-4 py-3 text-white placeholder-slate-400 outline-none transition-colors`}
              onKeyDown={(e) => e.key === "Enter" && checkIP()}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkIP}
            disabled={loading}
            className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/10 to-blue-500/0"
              animate={{ x: loading ? 0 : '-100%' }}
              transition={{ duration: 1, repeat: loading ? 0 : Infinity }}
            />
            <div className="flex items-center gap-2 relative">
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Scanning..." : "Scan IP"}
            </div>
          </motion.button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 space-y-5"
            >
              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-4"
                >
                  <p className="text-sm text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3 h-3" />
                    Threat Score
                  </p>
                  <div className="mt-2">
                    <h3 className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </h3>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full ${getScoreBarColor(result.score)}`}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-4"
                >
                  <p className="text-sm text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-3 h-3" />
                    Country
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white flex items-center gap-2">
                    <Globe size={18} className="text-cyan-400" />
                    {result.country}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-4"
                >
                  <p className="text-sm text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    Risk Level
                  </p>
                  <h3 className={`mt-2 text-xl font-bold flex items-center gap-2 ${getRiskColor(result.risk)}`}>
                    {getRiskIcon(result.risk)}
                    {result.risk}
                  </h3>
                </motion.div>
              </div>

              {/* Detection Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl bg-slate-800/50 border border-slate-700/30 p-5"
              >
                <h3 className="mb-3 font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Detection Details
                </h3>
                <ul className="space-y-3 text-slate-300">
                  {result.detections.map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="p-1 rounded bg-cyan-500/10">
                        <Activity size={14} className="text-cyan-400" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* IP Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/20"
              >
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <Server className="w-3 h-3 text-cyan-400" />
                  <span>IP: <code className="text-cyan-300 font-mono">{result.ip}</code></span>
                  <span className="w-px h-3 bg-slate-700" />
                  <Clock className="w-3 h-3" />
                  <span>Checked just now</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    result.risk === "HIGH" ? "bg-red-400 animate-pulse" :
                    result.risk === "MEDIUM" ? "bg-yellow-400 animate-pulse" :
                    "bg-green-400"
                  }`} />
                  <span className={`text-xs font-medium ${
                    result.risk === "HIGH" ? "text-red-400" :
                    result.risk === "MEDIUM" ? "text-yellow-400" :
                    "text-green-400"
                  }`}>
                    {result.risk === "HIGH" ? "⚠️ Malicious" :
                     result.risk === "MEDIUM" ? "⚠️ Suspicious" :
                     "✅ Safe"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}