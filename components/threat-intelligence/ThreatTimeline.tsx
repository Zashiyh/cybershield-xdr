"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import {
  Activity,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye,
} from "lucide-react";

const timelineData = [
  { time: "09:00", threats: 5, attacks: 2, blocked: 3 },
  { time: "10:00", threats: 9, attacks: 4, blocked: 5 },
  { time: "11:00", threats: 15, attacks: 7, blocked: 8 },
  { time: "12:00", threats: 12, attacks: 5, blocked: 7 },
  { time: "13:00", threats: 20, attacks: 10, blocked: 10 },
  { time: "14:00", threats: 18, attacks: 8, blocked: 10 },
  { time: "15:00", threats: 26, attacks: 14, blocked: 12 },
  { time: "16:00", threats: 22, attacks: 11, blocked: 11 },
];

export default function ThreatTimeline() {
  const totalThreats = timelineData.reduce((sum, item) => sum + item.threats, 0);
  const avgThreats = Math.round(totalThreats / timelineData.length);
  const maxThreats = Math.max(...timelineData.map(item => item.threats));
  const maxTime = timelineData.find(item => item.threats === maxThreats)?.time || "";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 text-sm">Threats</span>
              <span className="text-white font-bold">{payload[0]?.value || 0}</span>
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
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden h-full"
    >
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
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
                Threat activity over time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Avg: <span className="text-white font-bold">{avgThreats}</span>
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Peak: <span className="text-red-400 font-bold">{maxThreats}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Total Threats</p>
            <p className="text-lg font-bold text-white">{totalThreats}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Peak Time</p>
            <p className="text-lg font-bold text-orange-400">{maxTime}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-700/20">
            <p className="text-xs text-slate-400">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-lg font-bold text-green-400">Monitoring</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={timelineData}
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
                stroke="#334155"
                opacity={0.5}
              />

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                fontSize={11}
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
        <div className="flex items-center justify-center gap-6 mt-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-cyan-500" />
            <span className="text-xs text-slate-400">Threats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-orange-500" />
            <span className="text-xs text-slate-400">Attacks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500 border-t-2 border-dashed" />
            <span className="text-xs text-slate-400">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">Monitoring</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 p-2.5 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span>{timelineData[timelineData.length - 1].threats > timelineData[0].threats ? 'Increasing' : 'Decreasing'} trend</span>
              </div>
              <span className="w-px h-3 bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>{Math.round((timelineData.reduce((sum, item) => sum + item.blocked, 0) / totalThreats) * 100)}% blocked</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
              <span>{timelineData.filter(item => item.threats > 20).length} peak hours</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}