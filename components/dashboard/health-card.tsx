"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Globe,
  Server,
  Activity,
  ShieldCheck,
  Lock,
  HeartPulse,
  Wifi,
  Zap,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface HealthData {
  status: string;
  database: string;
  api: string;
  uptime: string;
  cpu: number;
  memory: number;
  threatEngine: string;
  alertProcessor: string;
  geoService: string;
  auth: string;
}

export default function HealthCard() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([]);

  async function loadHealth() {
    try {
      const res = await fetch("/api/security/health", {
        cache: "no-store",
      });
      const data = await res.json();
      setHealth(data);
      setIsLoading(false);
    } catch (error) {
      console.log("HEALTH ERROR", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadHealth();
    const timer = setInterval(loadHealth, 5000);
    return () => clearInterval(timer);
  }, []);

  function getStatusColor(value: number) {
    if (value >= 86) {
      return {
        text: "text-red-400",
        bg: "bg-red-500",
        status: "Critical",
        icon: AlertCircle,
        glow: "red",
      };
    }
    if (value >= 71) {
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-500",
        status: "Warning",
        icon: AlertTriangle,
        glow: "yellow",
      };
    }
    return {
      text: "text-green-400",
      bg: "bg-green-500",
      status: "Normal",
      icon: CheckCircle,
      glow: "green",
    };
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
            />
            <p className="text-cyan-400 font-mono text-sm">LOADING HEALTH DATA...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!health) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-6"
      >
        <div className="flex items-center gap-4 text-red-400">
          <AlertCircle className="w-8 h-8" />
          <div>
            <h3 className="font-bold">Health Check Failed</h3>
            <p className="text-sm text-red-400/70">Unable to fetch system health data</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const cpuStatus = getStatusColor(health.cpu);
  const memoryStatus = getStatusColor(health.memory);

  const systems = [
    {
      name: "CPU Usage",
      value: `${health.cpu}%`,
      status: cpuStatus.status,
      progress: health.cpu,
      color: cpuStatus.bg,
      icon: Cpu,
      glow: cpuStatus.glow,
    },
    {
      name: "Memory Usage",
      value: `${health.memory}%`,
      status: memoryStatus.status,
      progress: health.memory,
      color: memoryStatus.bg,
      icon: Server,
      glow: memoryStatus.glow,
    },
    {
      name: "Network",
      value: "Online",
      status: "Healthy",
      icon: Wifi,
      glow: "green",
    },
    {
      name: "Database",
      value: health.database,
      status: health.database === "Connected" ? "Healthy" : "Down",
      icon: Database,
      glow: health.database === "Connected" ? "green" : "red",
    },
    {
      name: "API Service",
      value: health.api,
      status: "Operational",
      icon: Activity,
      glow: "green",
    },
    {
      name: "Threat Engine",
      value: health.threatEngine,
      status: "Active",
      icon: ShieldCheck,
      glow: "green",
    },
    {
      name: "Alert Processor",
      value: health.alertProcessor,
      status: "Running",
      icon: Activity,
      glow: "green",
    },
    {
      name: "Geo Location Service",
      value: health.geoService,
      status: "Online",
      icon: Globe,
      glow: "green",
    },
    {
      name: "Authentication",
      value: health.auth,
      status: "Secure",
      icon: Lock,
      glow: "green",
    },
    {
      name: "Uptime",
      value: health.uptime,
      status: "Running",
      icon: Clock,
      glow: "green",
    },
  ];

  const getGlowColor = (glow: string) => {
    switch(glow) {
      case "red": return "from-red-500/10 to-red-500/5";
      case "yellow": return "from-yellow-500/10 to-yellow-500/5";
      case "green": return "from-green-500/10 to-green-500/5";
      default: return "from-cyan-500/10 to-cyan-500/5";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const critical = ["Critical", "Warning", "Down"];
    if (critical.includes(status)) {
      return status === "Critical" || status === "Down" 
        ? "bg-red-500/20 text-red-400 border-red-500/30" 
        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
    return "bg-green-500/20 text-green-400 border-green-500/30";
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
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
                <HeartPulse className="text-cyan-400" size={24} />
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
                  System Health Monitor
                </span>
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Real-time platform status
              </p>
            </div>
          </div>

          {/* Overall Status */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-green-300">ALL SYSTEMS NOMINAL</span>
          </motion.div>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {systems.map((system, index) => {
            const Icon = system.icon;
            const isDanger = system.status === "Critical" || system.status === "Warning" || system.status === "Down";
            const isCritical = system.status === "Critical" || system.status === "Down";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden group"
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${getGlowColor(system.glow || 'green')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{
                    x: hoveredIndex === index ? ['-100%', '100%'] : '-100%',
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredIndex === index ? 1 : 0,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={hoveredIndex === index ? { scale: 1.2, rotate: 5 } : {}}
                        transition={{ type: "spring", stiffness: 400 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          isDanger 
                            ? isCritical 
                              ? "bg-red-500/20" 
                              : "bg-yellow-500/20"
                            : "bg-cyan-500/20"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            isDanger 
                              ? isCritical 
                                ? "text-red-400" 
                                : "text-yellow-400"
                              : "text-cyan-400"
                          }
                        />
                      </motion.div>

                      <div>
                        <p className="text-white font-medium text-sm">{system.name}</p>
                        <p className="text-xs text-slate-400">{system.value}</p>
                      </div>
                    </div>

                    <motion.span
                      initial={false}
                      animate={{
                        scale: hoveredIndex === index ? 1.05 : 1,
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-bold border ${getStatusBadgeColor(system.status)}`}
                    >
                      {system.status}
                    </motion.span>
                  </div>

                  {system.progress !== undefined && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${system.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`h-full rounded-full transition-all duration-500 ${system.color}`}
                        />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="mt-1 flex justify-between text-[10px] text-slate-500"
                      >
                        <span>0%</span>
                        <span className="font-mono">{system.progress}%</span>
                        <span>100%</span>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Health Summary Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 rounded-xl bg-slate-800/30 border border-slate-700/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span>Healthy: {systems.filter(s => s.status === "Healthy" || s.status === "Normal" || s.status === "Running" || s.status === "Active" || s.status === "Operational" || s.status === "Secure" || s.status === "Online").length}</span>
              </div>
              <span className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span>Warning: {systems.filter(s => s.status === "Warning").length}</span>
              </div>
              <span className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                <span>Critical: {systems.filter(s => s.status === "Critical" || s.status === "Down").length}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span>Uptime: {health.uptime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}