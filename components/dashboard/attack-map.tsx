"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Shield,
  MapPin,
  Activity,
  Zap,
  Globe,
  AlertCircle,
  Target,
  Radar,
} from "lucide-react";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const threatIcons = {
  "Malware": "💀",
  "Brute Force": "🔑",
  "Bot Attack": "🤖",
  "Phishing": "🎣",
  "DDoS": "💥",
  "Ransomware": "💰",
};

const threatColors = {
  "Malware": "#ef4444",
  "Brute Force": "#f97316",
  "Bot Attack": "#a855f7",
  "Phishing": "#3b82f6",
  "DDoS": "#ef4444",
  "Ransomware": "#dc2626",
};

const initialAttacks = [
  { name: "United States", coordinates: [-100, 40], threat: "Malware", severity: "HIGH" },
  { name: "Russia", coordinates: [90, 60], threat: "Brute Force", severity: "MEDIUM" },
  { name: "China", coordinates: [105, 35], threat: "Bot Attack", severity: "HIGH" },
  { name: "Brazil", coordinates: [-50, -10], threat: "Phishing", severity: "LOW" },
  { name: "United Kingdom", coordinates: [-3, 55], threat: "DDoS", severity: "HIGH" },
  { name: "Australia", coordinates: [133, -25], threat: "Ransomware", severity: "MEDIUM" },
];

export default function AttackMap() {
  const [attacks, setAttacks] = useState(initialAttacks);
  const [selectedAttack, setSelectedAttack] = useState<any>(null);
  const [activeAttacks, setActiveAttacks] = useState(attacks);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate live attacks
  useEffect(() => {
    setIsLoading(false);
    
    const interval = setInterval(() => {
      // Add random new attack
      if (Math.random() > 0.7) {
        const countries = [
          { name: "Japan", coords: [135, 35] },
          { name: "Germany", coords: [10, 51] },
          { name: "India", coords: [78, 20] },
          { name: "South Africa", coords: [25, -30] },
          { name: "Mexico", coords: [-100, 23] },
          { name: "France", coords: [2, 47] },
        ];
        
        const threats = ["Malware", "Brute Force", "Bot Attack", "Phishing", "DDoS", "Ransomware"];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const randomThreat = threats[Math.floor(Math.random() * threats.length)];
        const severities = ["HIGH", "MEDIUM", "LOW"];
        
        const newAttack = {
          name: randomCountry.name,
          coordinates: randomCountry.coords,
          threat: randomThreat,
          severity: severities[Math.floor(Math.random() * severities.length)],
        };
        
        setAttacks(prev => [newAttack, ...prev.slice(0, 9)]);
        setActiveAttacks(prev => [newAttack, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "HIGH": return "#ef4444";
      case "MEDIUM": return "#f97316";
      case "LOW": return "#3b82f6";
      default: return "#6b7280";
    }
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
        className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/30 to-orange-500/30 border border-red-500/30">
                <Globe className="text-red-400" size={24} />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Global Attack Map
                </span>
                <Radar className="w-4 h-4 text-red-400 animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                {activeAttacks.length} active threats detected
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-red-300">LIVE MONITORING</span>
            </div>
          </motion.div>
        </div>

        {/* Map Container */}
        <div className="relative h-[400px] w-full rounded-xl border border-slate-700/30 overflow-hidden bg-slate-900/50">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full"
              />
            </div>
          ) : (
            <>
              <ComposableMap projectionConfig={{ scale: 150 }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => (
                      <motion.g
                        key={geo.rsmKey}
                        whileHover={{ scale: 1.02 }}
                        onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <Geography
                          geography={geo}
                          fill={hoveredCountry === geo.properties.name ? "#334155" : "#1e293b"}
                          stroke="#334155"
                          strokeWidth={0.5}
                          className="transition-all duration-300"
                        />
                      </motion.g>
                    ))
                  }
                </Geographies>

                {/* Attack Markers */}
                {activeAttacks.map((attack, index) => (
                  <g key={`marker-${index}`}>
                    <Marker coordinates={attack.coordinates as [number, number]}>
                      <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400,
                          damping: 20,
                          delay: index * 0.1 
                        }}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => setSelectedAttack(attack)}
                        className="cursor-pointer"
                      >
                        {/* Pulse Ring */}
                        <motion.circle
                          r={20}
                          fill={getSeverityColor(attack.severity)}
                          opacity={0.1}
                          animate={{
                            r: [15, 25, 15],
                            opacity: [0.1, 0.05, 0.1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                        
                        {/* Outer Ring */}
                        <motion.circle
                          r={12}
                          fill="none"
                          stroke={getSeverityColor(attack.severity)}
                          strokeWidth={1.5}
                          opacity={0.4}
                          animate={{
                            r: [10, 15, 10],
                            opacity: [0.4, 0.1, 0.4],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.15,
                          }}
                        />
                        
                        {/* Core */}
                        <circle
                          r={6}
                          fill={getSeverityColor(attack.severity)}
                          className="shadow-lg"
                        />
                        
                        {/* Inner Glow */}
                        <motion.circle
                          r={3}
                          fill="white"
                          opacity={0.6}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        />
                      </motion.g>
                    </Marker>

                    {/* Threat Label */}
                    <Marker coordinates={[attack.coordinates[0] + 5, attack.coordinates[1] - 8]}>
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <foreignObject
                          x={-40}
                          y={-12}
                          width={80}
                          height={24}
                          className="overflow-visible"
                        >
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-slate-700/50">
                            <span className="text-xs">
                              {threatIcons[attack.threat as keyof typeof threatIcons]}
                            </span>
                            <span className="text-[10px] font-medium text-white truncate">
                              {attack.threat}
                            </span>
                          </div>
                        </foreignObject>
                      </motion.g>
                    </Marker>
                  </g>
                ))}
              </ComposableMap>

              {/* Hovered Country Tooltip */}
              <AnimatePresence>
                {hoveredCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-slate-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span className="text-sm text-white">{hoveredCountry}</span>
                      <span className="text-xs text-slate-400">
                        {attacks.filter(a => a.name === hoveredCountry).length} threats
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Attack Legend */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-slate-700/50"
              >
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-400 font-medium">Threat Severity</p>
                  {["HIGH", "MEDIUM", "LOW"].map((severity) => (
                    <div key={severity} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getSeverityColor(severity) }} />
                      <span className="text-xs text-white">{severity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Attack Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-red-400" />
                    <span className="text-sm font-bold text-white">{activeAttacks.length}</span>
                  </div>
                  <span className="w-px h-4 bg-slate-700" />
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                    <span className="text-xs text-slate-400">Live</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Threat Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {Object.entries(threatIcons).map(([threat, icon]) => {
            const count = attacks.filter(a => a.threat === threat).length;
            return (
              <motion.div
                key={threat}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/30 flex items-center gap-2"
              >
                <span>{icon}</span>
                <span className="text-xs text-white">{threat}</span>
                <span className="text-xs text-slate-400">{count}</span>
              </motion.div>
            );
          })}
        </motion.div>

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
                className="bg-[#0f172a] border border-slate-700/50 rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Attack Details</h3>
                    <p className="text-sm text-slate-400">{selectedAttack.name}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">
                      {threatIcons[selectedAttack.threat as keyof typeof threatIcons]} {selectedAttack.threat}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Severity</span>
                    <span className="text-white font-medium">{selectedAttack.severity}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <span className="text-slate-400">Coordinates</span>
                    <span className="text-white font-mono text-sm">
                      {selectedAttack.coordinates.join(", ")}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAttack(null)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}