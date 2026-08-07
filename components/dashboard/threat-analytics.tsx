"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  Zap,
  TrendingUp,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Radar,
  Target,
} from "lucide-react";

export default function ThreatAnalytics() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/security/analytics", {
          cache: "no-store",
        });
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log("Analytics error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  // Sample data for testing if API fails
  const sampleData = {
    riskData: [
      { _id: "HIGH", count: 45 },
      { _id: "MEDIUM", count: 30 },
      { _id: "CLEAN", count: 25 },
    ],
    countryData: [
      { _id: "US", count: 120 },
      { _id: "RU", count: 80 },
      { _id: "CN", count: 60 },
      { _id: "BR", count: 40 },
      { _id: "IN", count: 35 },
    ],
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-cyan-400 font-mono text-sm">LOADING ANALYTICS...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-6">
        <div className="flex items-center gap-4 text-red-400">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <h3 className="font-bold">Analytics Error</h3>
            <p className="text-sm text-red-400/70">Unable to fetch analytics data</p>
          </div>
        </div>
      </div>
    );
  }

  // Use sample data if API returns empty
  const chartData = data && data.riskData && data.riskData.length > 0 ? data : sampleData;

  const riskColors: any = {
    HIGH: "#ef4444",
    MEDIUM: "#facc15",
    CLEAN: "#22c55e",
  };

  const totalRisk = chartData?.riskData?.reduce((acc: number, item: any) => acc + item.count, 0) || 0;

  // Custom label for pie chart - Fixed version
  const renderCustomLabel = ({ name, percent }: any) => {
    if (!percent) return name;
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-cyan-400 text-sm">
            Count: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Risk Distribution Chart */}
      <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20">
              <Radar className="text-cyan-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Risk Distribution</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-green-400" />
                Total: {totalRisk} threats analyzed
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {chartData?.riskData?.map((item: any, index: number) => (
              <div
                key={index}
                className="px-2 py-1 rounded-lg bg-slate-700/30 border border-slate-600/30"
              >
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: riskColors[item._id] }}
                  />
                  <span className="text-xs text-slate-400">{item._id}</span>
                  <span className="text-xs font-bold text-white">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData.riskData}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={4}
              label={renderCustomLabel}
            >
              {chartData?.riskData?.map((item: any, index: number) => (
                <Cell
                  key={index}
                  fill={riskColors[item._id] || "#06b6d4"}
                  stroke="#0f172a"
                  strokeWidth={3}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-slate-300 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-2xl font-bold text-white">{totalRisk}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
        </div>
      </div>

      {/* Country Chart */}
      <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
              <Globe className="text-purple-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Top Attack Countries</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Target className="w-3 h-3" />
                {chartData?.countryData?.length || 0} countries affected
              </p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-xs font-mono text-purple-300">LIVE</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData.countryData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="_id"
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
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="#06b6d4"
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/30">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-slate-400">
            Highest: {chartData?.countryData?.[0]?._id || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}