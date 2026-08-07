"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/stats-card";
import ThreatChart from "@/components/dashboard/threat-chart";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import AISummary from "@/components/dashboard/ai-summary";
import HealthCard from "@/components/dashboard/health-card";
import LiveThreatFeed from "@/components/dashboard/live-threat-feed";
import IPChecker from "@/components/security/ip-checker";
import ThreatScanHistory from "@/components/dashboard/threat-scan-history";
import ThreatAnalytics from "@/components/dashboard/threat-analytics";
import dynamic from "next/dynamic";
import {
  ShieldAlert,
  TriangleAlert,
  FolderOpen,
  HeartPulse,
  Bot,
  Monitor,
  RefreshCw,
  Activity,
  Scan,
  Shield,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AttackMap = dynamic(
  () => import("@/components/dashboard/attack-map"),
  { ssr: false }
);

// Animation variants - No spring animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [scanning, setScanning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{x: number, y: number}>>([]);

  // Initialize particles only on client side
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      });
    }
    setParticles(newParticles);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleQuickScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScanning(false);
  };

  const statsData = [
    { title: "Critical Threats", value: 12, change: "+18%", icon: ShieldAlert, color: "#ef4444" },
    { title: "Active Alerts", value: 46, change: "+12%", icon: TriangleAlert, color: "#f97316" },
    { title: "Incidents", value: 9, change: "+4%", icon: FolderOpen, color: "#3b82f6" },
    { title: "System Health", value: "98%", change: "+1%", icon: HeartPulse, color: "#22c55e" },
    { title: "AI Detections", value: 187, change: "+31%", icon: Bot, color: "#a855f7" },
    { title: "Protected Endpoints", value: 254, change: "+6%", icon: Monitor, color: "#06b6d4" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#0a0e1a] p-6 md:p-8 relative overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Animated Gradient Orbs - Fixed spring animations */}
      <motion.div 
        className="absolute top-0 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" // Changed from spring
        }}
      />
      <motion.div 
        className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }} // Changed from spring
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
                transition={{ duration: 0.2 }} // Changed from spring
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CyberGuard
                </span>
                <span className="text-slate-300"> SOC</span>
              </motion.h1>
              <motion.div 
                className="flex items-center gap-3 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p 
                  className="text-slate-400 text-sm flex items-center gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-3 h-3 text-green-400" />
                  <span>All Systems Operational</span>
                </motion.p>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <p className="text-slate-500 text-xs flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Last sync: {lastUpdated.toLocaleTimeString()}
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleQuickScan}
              disabled={scanning}
              className="group relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0"
                animate={{ x: scanning ? 0 : '-100%' }}
                transition={{ duration: 1, repeat: scanning ? 0 : Infinity }}
              />
              <div className="flex items-center gap-2 relative">
                <motion.div
                  animate={{ rotate: scanning ? 360 : 0 }}
                  transition={{ duration: 1, repeat: scanning ? Infinity : 0, ease: "linear" }}
                >
                  <Scan className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-sm font-medium text-cyan-300">
                  {scanning ? 'Scanning...' : 'Quick Scan'}
                </span>
              </div>
            </motion.button>
            
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-700/50 disabled:opacity-50 group"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }} // Changed from spring
            >
              <RefreshCw className={`w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 } // Changed from spring
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <StatsCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Threat Chart */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
            <ThreatChart />
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
            <RecentAlerts />
          </div>
        </motion.div>

        {/* AI + Health + Analytics */}
        <motion.div 
          className="grid gap-6 xl:grid-cols-2"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="relative">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
              <AISummary />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
              <HealthCard />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="xl:col-span-2 relative">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
              <ThreatAnalytics />
            </div>
          </motion.div>
        </motion.div>

        {/* Attack Map + Live Feed */}
        <motion.div 
          className="grid gap-6 xl:grid-cols-2"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="relative">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden">
              <AttackMap />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative">
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
              <LiveThreatFeed />
            </div>
          </motion.div>
        </motion.div>

        {/* IP Checker */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
            <IPChecker />
          </div>
        </motion.div>

        {/* Threat Scan History */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6">
            <ThreatScanHistory />
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}