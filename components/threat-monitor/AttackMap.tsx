"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Globe,
  Target,
  Zap,
  Activity,
  Eye,
  X,
  MapPin,
} from "lucide-react";

interface AttackLocation {
  ip: string;
  title: string;
  severity: string;
  lat: number;
  lng: number;
  country: string;
  city: string;
  targetLat: number;
  targetLng: number;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const SOC_LOCATION = {
  lat: 6.9271,
  lng: 79.8612,
};

export default function AttackMap() {
  const [attacks, setAttacks] = useState<AttackLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttack, setSelectedAttack] = useState<AttackLocation | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    loadAttackLocations();
  }, []);

  async function loadAttackLocations() {
    try {
      const res = await fetch("/api/security/alerts", {
        cache: "no-store",
      });
      const alerts = await res.json();

      if (!Array.isArray(alerts)) {
        setLoading(false);
        return;
      }

      const locations = await Promise.all(
        alerts.slice(0, 10).map(async (alert: any) => {
          try {
            const geoRes = await fetch(`/api/security/geo?ip=${alert.ip}`);
            const geo = await geoRes.json();

            return {
              ip: alert.ip,
              title: alert.title,
              severity: alert.severity,
              lat: Number(geo.lat) || 0,
              lng: Number(geo.lng) || 0,
              country: geo.country || "Unknown",
              city: geo.city || "Unknown",
              targetLat: SOC_LOCATION.lat,
              targetLng: SOC_LOCATION.lng,
            };
          } catch (err) {
            console.log(err);
            return null;
          }
        })
      );

      const filtered = locations.filter(
        (item): item is AttackLocation => item !== null
      );

      setAttacks(filtered);
    } catch (err) {
      console.log("ATTACK MAP ERROR", err);
    } finally {
      setLoading(false);
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "HIGH": return "#ef4444";
      case "MEDIUM": return "#f97316";
      case "LOW": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "HIGH": return <ShieldAlert className="w-4 h-4" />;
      case "MEDIUM": return <AlertTriangle className="w-4 h-4" />;
      case "LOW": return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-cyan-400 font-mono text-sm">LOADING ATTACK MAP...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
              <Globe className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Live Attack Map
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                {attacks.length} active attacks detected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-red-300">LIVE</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] w-full rounded-xl border border-slate-700/30 overflow-hidden bg-slate-900/50">
          <ComposableMap projectionConfig={{ scale: 140 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: {
                        fill: "#1e293b",
                        outline: "none",
                        transition: "all 0.3s",
                      },
                      hover: {
                        fill: "#334155",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#334155",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Attack Markers */}
            {attacks.map((attack, index) => (
              <Marker
                key={index}
                coordinates={[attack.lng, attack.lat]}
                onClick={() => setSelectedAttack(attack)}
              >
                <g className="cursor-pointer">
                  {/* Pulse Ring */}
                  <circle
                    r={15}
                    fill={getSeverityColor(attack.severity)}
                    opacity={0.15}
                  />
                  {/* Outer Ring */}
                  <circle
                    r={10}
                    fill="none"
                    stroke={getSeverityColor(attack.severity)}
                    strokeWidth={1.5}
                    opacity={0.4}
                  />
                  {/* Core */}
                  <circle
                    r={6}
                    fill={getSeverityColor(attack.severity)}
                    stroke="white"
                    strokeWidth={2}
                  />
                  {/* Inner Glow */}
                  <circle
                    r={3}
                    fill="white"
                    opacity={0.6}
                  />
                  {/* Country Label */}
                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{
                      fill: "white",
                      fontSize: "8px",
                      fontWeight: "bold",
                      textShadow: "0 0 10px rgba(0,0,0,0.8)",
                    }}
                  >
                    {attack.country}
                  </text>
                </g>
              </Marker>
            ))}

            {/* SOC Marker */}
            <Marker coordinates={[SOC_LOCATION.lng, SOC_LOCATION.lat]}>
              <g>
                <circle r={12} fill="#06b6d4" opacity={0.2} />
                <circle r={8} fill="#06b6d4" stroke="white" strokeWidth={2} />
                <circle r={3} fill="white" opacity={0.8} />
                <text
                  textAnchor="middle"
                  y={-15}
                  style={{
                    fill: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    textShadow: "0 0 10px rgba(0,0,0,0.8)",
                  }}
                >
                  SOC
                </text>
              </g>
            </Marker>
          </ComposableMap>
        </div>

        {/* Attack List */}
        <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {attacks.length === 0 ? (
            <div className="text-center py-4 text-slate-400">
              <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm">No active attacks detected</p>
            </div>
          ) : (
            attacks.map((attack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAttack(attack)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30 cursor-pointer hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-1.5 rounded-lg bg-red-500/10">
                    {getSeverityIcon(attack.severity)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{attack.title}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {attack.city}, {attack.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    attack.severity === "HIGH" ? "bg-red-500/20 text-red-400" :
                    attack.severity === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {attack.severity}
                  </span>
                  <code className="text-cyan-300 text-xs font-mono hidden sm:block">{attack.ip}</code>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Attack Details Modal */}
        <AnimatePresence>
          {selectedAttack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedAttack(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-[#0f172a] p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-red-500/20">
                      <ShieldAlert className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Attack Details</h3>
                      <p className="text-sm text-slate-400">{selectedAttack.ip}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAttack(null)}
                    className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Title</span>
                    <span className="text-white font-medium">{selectedAttack.title}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Location</span>
                    <span className="text-white">
                      {selectedAttack.city}, {selectedAttack.country}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Severity</span>
                    <span className={`font-bold ${
                      selectedAttack.severity === "HIGH" ? "text-red-400" :
                      selectedAttack.severity === "MEDIUM" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>
                      {selectedAttack.severity}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Coordinates</span>
                    <span className="text-cyan-300 font-mono text-sm">
                      {selectedAttack.lat.toFixed(4)}, {selectedAttack.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAttack(null)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                <span>High: {attacks.filter(a => a.severity === "HIGH").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                <span>Medium: {attacks.filter(a => a.severity === "MEDIUM").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Low: {attacks.filter(a => a.severity === "LOW").length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>{attacks.length} active attacks</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </div>
  );
}