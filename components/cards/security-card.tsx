import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  change?: string;
  color?: string;
  subtitle?: string;
}

export default function SecurityCard({
  title,
  value,
  icon,
  trend = "neutral",
  change,
  color = "#06b6d4",
  subtitle,
}: Props) {
  const getTrendColor = () => {
    switch(trend) {
      case "up": return "text-emerald-400 bg-emerald-500/20";
      case "down": return "text-red-400 bg-red-500/20";
      default: return "text-slate-400 bg-slate-500/20";
    }
  };

  const getTrendIcon = () => {
    switch(trend) {
      case "up": return "↑";
      case "down": return "↓";
      default: return "•";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="relative rounded-xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-5 shadow-lg shadow-cyan-500/5 overflow-hidden group"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
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

      {/* Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 30px ${color}15`,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
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
              {value}
            </motion.h2>

            {change && (
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getTrendColor()}`}>
                  <span className="text-sm">{getTrendIcon()}</span>
                  {change}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Today
                </span>
              </div>
            )}
          </div>

          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            className="flex h-14 w-14 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${color}20`,
              border: `1px solid ${color}30`,
            }}
          >
            {/* Icon Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ border: `2px solid ${color}` }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div className="text-2xl relative z-10" style={{ color }}>
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Animated Dot for Live Status */}
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
}