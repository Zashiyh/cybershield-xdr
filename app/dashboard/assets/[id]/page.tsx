"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ShieldAlert,
  ArrowLeft,
  Zap,
  Activity,
  Shield,
  CheckCircle,
  AlertTriangle,
  Eye,
  Target,
  Cpu,
  HardDrive,
  Clock,
  FileWarning,
} from "lucide-react";
import Link from "next/link";

interface Asset {
  _id: string;
  name: string;
  ip: string;
  os: string;
  type: string;
  status: string;
  risk: string;
  riskScore: number;
  alertCount: number;
  lastThreat: string | null;
}

interface Alert {
  title: string;
  ip: string;
  severity: string;
  score: number;
  status: string;
}

export default function AssetDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise
  const { id } = React.use(params);
  
  const [asset, setAsset] = useState<Asset | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    loadAsset();
  }, []);

  async function loadAsset() {
    try {
      setLoading(true);
      const assetRes = await fetch(`/api/security/assets/${id}`, {
        cache: "no-store",
      });
      const assetData = await assetRes.json();
      setAsset(assetData);

      const alertRes = await fetch("/api/security/alerts", {
        cache: "no-store",
      });
      const alertData = await alertRes.json();

      const related = Array.isArray(alertData)
        ? alertData.filter((alert: Alert) => alert.ip === assetData.ip)
        : [];

      setAlerts(related);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "HIGH":
      case "CRITICAL": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk) {
      case "HIGH":
      case "CRITICAL": return <ShieldAlert className="w-4 h-4" />;
      case "MEDIUM": return <AlertTriangle className="w-4 h-4" />;
      case "LOW": return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Online": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Offline": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Maintenance": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Online": return <CheckCircle className="w-3 h-3" />;
      case "Offline": return <AlertTriangle className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  // Helper function to safely get asset ID
  const getAssetId = (asset: Asset | null) => {
    if (!asset || !asset._id) return "Unknown";
    return asset._id.slice(0, 12);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-cyan-400 font-mono text-sm">LOADING ASSET...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
              <h2 className="text-2xl font-bold text-red-400">Asset Not Found</h2>
              <p className="text-slate-400">The asset you're looking for doesn't exist</p>
              <Link
                href="/dashboard/assets"
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Assets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          href="/dashboard/assets"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Assets
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
              <Server className="text-cyan-400" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                {asset.name || "Unnamed Asset"}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                  Asset Details
                </p>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getStatusColor(asset.status || "Unknown")}`}>
                  {getStatusIcon(asset.status || "Unknown")}
                  {asset.status || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 ${getRiskColor(asset.risk || "LOW")}`}>
              {getRiskIcon(asset.risk || "LOW")}
              {asset.risk || "LOW"}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Asset Information */}
          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/20">
                  <Server className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">Asset Information</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">IP Address</span>
                  <code className="text-cyan-300 font-mono">{asset.ip || "N/A"}</code>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">Operating System</span>
                  <span className="text-white flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-slate-400" />
                    {asset.os || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">Asset Type</span>
                  <span className="text-white flex items-center gap-1.5">
                    <HardDrive className="w-3 h-3 text-slate-400" />
                    {asset.type || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${asset.riskScore || 0}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${
                          (asset.riskScore || 0) >= 70 ? "bg-red-500" :
                          (asset.riskScore || 0) >= 40 ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                      />
                    </div>
                    <span className="text-white font-bold">{asset.riskScore || 0}/100</span>
                  </div>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">Alert Count</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <FileWarning className="w-3 h-3 text-red-400" />
                    {asset.alertCount || 0}
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <span className="text-slate-400">Last Threat</span>
                  <span className="text-slate-300 text-sm flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {asset.lastThreat
                      ? new Date(asset.lastThreat).toLocaleString()
                      : "No threats detected"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Alerts Summary */}
          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-red-500/10 rounded-full blur-3xl" />
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-red-500/20">
                  <ShieldAlert className="text-red-400" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">Security Alerts</h2>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
                >
                  <p className="text-6xl font-bold text-red-400">{alerts.length}</p>
                </motion.div>
                <p className="text-slate-400 mt-2">Detected threats</p>

                {alerts.length > 0 && (
                  <div className="mt-4 flex gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-xs text-red-400">
                        High: {alerts.filter(a => a.severity === "HIGH").length}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <span className="text-xs text-yellow-400">
                        Medium: {alerts.filter(a => a.severity === "MEDIUM").length}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <span className="text-xs text-green-400">
                        Low: {alerts.filter(a => a.severity === "LOW").length}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Alerts Table */}
        <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-red-400" size={20} />
              <h2 className="text-xl font-bold text-white">Related Alerts</h2>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <span className="text-xs text-slate-400">
                Total: <span className="text-white font-bold">{alerts.length}</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="p-4 text-sm font-medium">Alert</th>
                  <th className="p-4 text-sm font-medium">Severity</th>
                  <th className="p-4 text-sm font-medium">Score</th>
                  <th className="p-4 text-sm font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {alerts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="w-12 h-12 text-slate-600" />
                        <p>No alerts found</p>
                        <p className="text-sm text-slate-500">This asset is secure</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  alerts.map((alert, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="border-b border-slate-700/30 text-white transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileWarning className="w-4 h-4 text-orange-400" />
                          <span>{alert.title || "Unknown Alert"}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border ${getSeverityColor(alert.severity || "LOW")}`}>
                          {alert.severity || "LOW"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${alert.score || 0}%` }}
                              transition={{ duration: 1, delay: index * 0.05 }}
                              className={`h-full rounded-full ${
                                (alert.score || 0) >= 70 ? "bg-red-500" :
                                (alert.score || 0) >= 40 ? "bg-yellow-500" :
                                "bg-green-500"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium text-white">{alert.score || 0}/100</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border ${
                          alert.status === "OPEN" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                          alert.status === "INVESTIGATING" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                          "bg-green-500/20 text-green-400 border-green-500/30"
                        }`}>
                          {alert.status || "UNKNOWN"}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer - Fixed with null check */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              <span>Asset ID: {getAssetId(asset)}...</span>
            </div>
            <span className="w-px h-3 bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span>Status: {asset.status || "Unknown"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{alerts.length} related alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
}