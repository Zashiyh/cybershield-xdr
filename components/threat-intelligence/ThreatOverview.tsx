"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Ban,
  AlertTriangle,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Total Threats",
    value: "1,248",
    icon: ShieldAlert,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30",
    trend: "+12%",
    trendUp: true,
    progress: 78,
  },
  {
    title: "Critical Threats",
    value: "24",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    trend: "+8%",
    trendUp: true,
    progress: 45,
  },
  {
    title: "Active IOC",
    value: "61",
    icon: ShieldCheck,
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    trend: "+23%",
    trendUp: true,
    progress: 92,
  },
  {
    title: "Blocked IPs",
    value: "432",
    icon: Ban,
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30",
    trend: "-5%",
    trendUp: false,
    progress: 67,
  },
];

export default function ThreatOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="relative rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 overflow-hidden group"
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: item.color.replace('text-', '') }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {item.title}
                  </p>
                  <motion.h2 
                    className="mt-2 text-3xl font-bold text-white tracking-tight"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {item.value}
                  </motion.h2>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.trendUp 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {item.trendUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {item.trend}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Today
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg} border ${item.border}`}
                >
                  <Icon className={item.color} size={26} />
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="font-mono">{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      item.progress >= 70 ? "bg-green-500" :
                      item.progress >= 40 ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                  />
                </div>
              </div>

              {/* Live Status Dot */}
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-1.5"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[10px] text-green-400/70 font-mono">LIVE</span>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}