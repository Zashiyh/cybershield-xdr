"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Activity,
  Clock,
  AlertTriangle,
  Scan,
  Lock,
  Eye,
  RefreshCw,
} from "lucide-react";

import ThreatCards from "@/components/threat-monitor/ThreatCards";
import LiveFeed from "@/components/threat-monitor/LiveFeed";
import RecentEvents from "@/components/threat-monitor/RecentEvents";
import AttackMap from "@/components/threat-monitor/AttackMap";
import LiveAttackFeed from "@/components/threat-monitor/LiveAttackFeed";
import GlobeContainer from "@/components/threat-monitor/GlobeContainer";

export interface ThreatData {
  totalAlerts: number;
  totalIncidents: number;
  critical: number;
  resolved: number;
  alerts: any[];
  incidents: any[];
}

export default function ThreatMonitorPage() {
  const [data, setData] = useState<ThreatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoScan, setAutoScan] = useState(true);

  async function loadData() {
    try {
      const res = await fetch("/api/security/threat-monitor", {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (error) {
      console.log("THREAT MONITOR ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    if (autoScan) {
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [autoScan]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleQuickScan = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await loadData();
    setLoading(false);
  };

  if (loading) {
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
            INITIALIZING THREAT MONITOR...
          </motion.p>
          <div className="flex gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-[#0a0e1a] flex items-center justify-center"
      >
        <div className="text-center space-y-4 p-8 rounded-2xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-red-400">Connection Error</h2>
          <p className="text-slate-400">Failed to load threat monitor data</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
          >
            Retry Connection
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-[#0a0e1a] flex items-center justify-center">
                    <Shield className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
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
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Threat
                  </span>
                  <span className="text-slate-300"> Monitor</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <motion.p
                    className="text-slate-400 text-sm flex items-center gap-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="w-3 h-3 text-green-400" />
                    <span>Live Security Operations Center</span>
                  </motion.p>
                  <span className="w-1 h-1 bg-slate-600 rounded-full" />
                  <p className="text-slate-500 text-xs flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAutoScan(!autoScan)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  autoScan
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${autoScan ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
                  {autoScan ? 'Auto-Scan ON' : 'Auto-Scan OFF'}
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickScan}
                className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0"
                  animate={{ x: loading ? 0 : '-100%' }}
                  transition={{ duration: 1, repeat: loading ? 0 : Infinity }}
                />
                <div className="flex items-center gap-2 relative">
                  <motion.div
                    animate={loading ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: loading ? Infinity : 0, ease: "linear" }}
                  >
                    <Scan className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                  <span className="text-sm font-medium text-cyan-300">
                    {loading ? 'Scanning...' : 'Quick Scan'}
                  </span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div>
          <ThreatCards data={data} />
        </div>

        {/* Globe Container */}
        <div className="relative">
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden">
            <GlobeContainer />
          </div>
        </div>

        {/* Map + Live Attack Feed */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden h-full">
              <AttackMap />
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl h-full">
              <LiveAttackFeed />
            </div>
          </div>
        </div>

        {/* Security Feeds */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl">
              <LiveFeed alerts={data.alerts} />
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl">
              <RecentEvents incidents={data.incidents} />
            </div>
          </div>
        </div>

        {/* Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-between p-4 bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl"
        >
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>System Online</span>
            </div>
            <span className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3" />
              <span>Encrypted Channel</span>
            </div>
            <span className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Monitoring {data.alerts?.length || 0} Threats</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>v3.2.1</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>AI Engine Active</span>
          </div>
        </motion.div>
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
    </div>
  );
}