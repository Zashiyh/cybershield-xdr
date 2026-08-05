"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        scale: 1.03,
      }}
      className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-slate-800
      bg-gradient-to-br
      from-[#111827]
      to-[#0B1120]
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:border-cyan-500/40
      hover:shadow-cyan-500/10
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -right-10
        -top-10
        h-32
        w-32
        rounded-full
        blur-3xl
        opacity-20
        "
        style={{
          backgroundColor: color,
        }}
      />

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight
              size={16}
              className="text-emerald-400"
            />

            <span className="text-sm font-medium text-emerald-400">
              {change}
            </span>

            <span className="text-xs text-slate-500">
              Today
            </span>
          </div>
        </div>

        <div
          className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          "
          style={{
            backgroundColor: `${color}20`,
          }}
        >
          <Icon
            size={32}
            style={{
              color,
            }}
          />
        </div>

      </div>
    </motion.div>
  );
}