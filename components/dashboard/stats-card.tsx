"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, Zap, Activity } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  progress?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  trend = "up",
  subtitle,
  progress,
}: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    switch(trend) {
      case "up": return <ArrowUpRight size={16} className="text-emerald-400" />;
      case "down": return <ArrowDownRight size={16} className="text-red-400" />;
      default: return <Minus size={16} className="text-slate-400" />;
    }
  };

  const getTrendColor = () => {
    switch(trend) {
      case "up": return "text-emerald-400";
      case "down": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getTrendBg = () => {
    switch(trend) {
      case "up": return "bg-emerald-500/20";
      case "down": return "bg-red-500/20";
      default: return "bg-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-slate-700/30
      bg-gradient-to-br
      from-slate-800/40
      to-slate-900/40
      backdrop-blur-xl
      p-6
      shadow-lg
      transition-all
      duration-300
      group
      "
      style={{
        borderColor: isHovered ? `${color}40` : "rgba(51, 65, 85, 0.3)",
      }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 30px ${color}15`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-400">
                {title}
              </p>
              {subtitle && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-700/30 text-slate-500">
                  {subtitle}
                </span>
              )}
            </div>

            <motion.h2
              className="mt-2 text-4xl font-bold text-white tracking-tight"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {value}
            </motion.h2>

            <div className="mt-3 flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: isHovered ? [0, 15, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendBg()} ${getTrendColor()}`}
              >
                {getTrendIcon()}
                <span>{change}</span>
              </motion.div>

              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Today
              </span>
            </div>
          </div>

          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl relative"
            style={{
              backgroundColor: `${color}20`,
              border: `1px solid ${color}30`,
            }}
            animate={{
              rotate: isHovered ? [0, 5, -5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
            }}
          >
            {/* Icon Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ border: `2px solid ${color}` }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.3, 0, 0.3] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            
            <Icon
              size={28}
              style={{ color }}
              className="relative z-10"
            />
          </motion.div>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4"
          >
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </motion.div>
        )}

        {/* Animated Dot for Live Status */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1.5"
          animate={{
            opacity: isHovered ? 1 : 0.5,
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
}