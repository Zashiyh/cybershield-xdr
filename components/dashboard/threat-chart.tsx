"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  AlertTriangle,
  Shield,
  Eye,
} from "lucide-react";

const initialData = [
  { time: "00:00", threats: 20, attacks: 5, blocked: 15 },
  { time: "04:00", threats: 45, attacks: 12, blocked: 33 },
  { time: "08:00", threats: 32, attacks: 8, blocked: 24 },
  { time: "12:00", threats: 80, attacks: 25, blocked: 55 },
  { time: "16:00", threats: 55, attacks: 15, blocked: 40 },
  { time: "20:00", threats: 95, attacks: 30, blocked: 65 },
  { time: "24:00", threats: 60, attacks: 18, blocked: 42 },
];

export default function ThreatChart() {
  const [data, setData] = useState(initialData);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;
        
        // Update last value slightly
        const change = Math.floor(Math.random() * 20) - 10;
        const newThreats = Math.max(10, Math.min(100, newData[lastIndex].threats + change));
        const newAttacks = Math.max(2, Math.min(35, newData[lastIndex].attacks + Math.floor(change / 3)));
        const newBlocked = Math.max(5, Math.min(70, newData[lastIndex].blocked + Math.floor(change / 2)));
        
        newData[lastIndex] = {
          ...newData[lastIndex],
          threats: newThreats,
          attacks: newAttacks,
          blocked: newBlocked,
        };
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const totalThreats = data.reduce((sum, item) => sum + item.threats, 0);
  const avgThreats = Math.round(totalThreats / data.length);
  const maxThreats = Math.max(...data.map(item => item.threats));
  const maxTime = data.find(item => item.threats === maxThreats)?.time || "";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 shadow-xl min-w-[180px]"
        >
          <p className="text-slate-400 text-xs mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-sm">Threats</span>
              <span className="text-white font-bold">{payload[0].value}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-sm">Attacks</span>
              <span className="text-orange-400 font-bold">{payload[1]?.value || 0}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-sm">Blocked</span>
              <span className="text-green-400 font-bold">{payload[2]?.value || 0}</span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
              <Activity className="text-cyan-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Threat Timeline
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Security events detected over 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
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
              <span className="text-xs font-mono text-green-300">LIVE</span>
            </motion.div>

            {/* Stats Summary */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <span className="text-xs text-slate-400">
                  Avg: <span className="text-white font-bold">{avgThreats}</span>
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30">
                <span className="text-xs text-slate-400">
                  Peak: <span className="text-red-400 font-bold">{maxThreats}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Total Threats</p>
            <p className="text-lg font-bold text-white">{totalThreats}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Peak Time</p>
            <p className="text-lg font-bold text-orange-400">{maxTime}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-lg font-bold text-green-400">Monitoring</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                opacity={0.5}
              />

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Area for threats */}
              <Area
                type="monotone"
                dataKey="threats"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#threatGradient)"
                dot={{
                  r: 4,
                  stroke: "#06b6d4",
                  strokeWidth: 2,
                  fill: "#0f172a",
                }}
                activeDot={{
                  r: 8,
                  stroke: "#06b6d4",
                  strokeWidth: 2,
                  fill: "#06b6d4",
                }}
              />

              {/* Line for attacks */}
              <Line
                type="monotone"
                dataKey="attacks"
                stroke="#f97316"
                strokeWidth={2}
                dot={{
                  r: 3,
                  stroke: "#f97316",
                  strokeWidth: 1.5,
                  fill: "#0f172a",
                }}
                activeDot={{
                  r: 6,
                  stroke: "#f97316",
                  strokeWidth: 2,
                  fill: "#f97316",
                }}
              />

              {/* Line for blocked */}
              <Line
                type="monotone"
                dataKey="blocked"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{
                  r: 3,
                  stroke: "#22c55e",
                  strokeWidth: 1.5,
                  fill: "#0f172a",
                }}
                activeDot={{
                  r: 6,
                  stroke: "#22c55e",
                  strokeWidth: 2,
                  fill: "#22c55e",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-xs text-slate-400">Threats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-slate-400">Attacks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">Monitoring</span>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span>{data[data.length - 1].threats > data[0].threats ? 'Increasing' : 'Decreasing'} trend</span>
              </div>
              <span className="w-px h-3 bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>{Math.round((data.reduce((sum, item) => sum + item.blocked, 0) / totalThreats) * 100)}% blocked</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
              <span>{data.filter(item => item.threats > 70).length} peak hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}