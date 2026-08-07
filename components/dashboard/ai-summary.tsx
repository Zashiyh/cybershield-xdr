"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Zap,
  Activity,
  Shield,
  Lock,
  Eye,
  RefreshCw,
  Sparkles,
  Radar,
  Cpu,
} from "lucide-react";

export default function AISummary() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskLevel, setRiskLevel] = useState("HIGH");
  const [detections, setDetections] = useState([
    "Multiple suspicious login attempts detected from unknown IP addresses",
    "Possible brute force attack pattern identified",
    "Unusual network traffic detected from 3 endpoints",
  ]);
  const [currentDetection, setCurrentDetection] = useState(0);

  // Simulate AI analysis rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDetection((prev) => (prev + 1) % detections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [detections.length]);

  const handleRefresh = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    
    // Randomize risk level for demo
    const levels = ["HIGH", "MEDIUM", "LOW"];
    setRiskLevel(levels[Math.floor(Math.random() * levels.length)]);
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case "HIGH": return "red";
      case "MEDIUM": return "yellow";
      case "LOW": return "green";
      default: return "red";
    }
  };

  const getRiskIcon = (level: string) => {
    switch(level) {
      case "HIGH": return <ShieldAlert className="text-red-400" size={22} />;
      case "MEDIUM": return <AlertTriangle className="text-yellow-400" size={22} />;
      case "LOW": return <Shield className="text-green-400" size={22} />;
      default: return <ShieldAlert className="text-red-400" size={22} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 overflow-hidden group"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* AI Status Indicator */}
      <motion.div
        className="absolute top-4 right-4 flex items-center gap-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
          <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-purple-300 font-mono">AI ACTIVE</span>
        </div>
      </motion.div>

      {/* Header */}
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30">
              <Bot className="text-purple-400" size={28} />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <div>
            <motion.h2
              className="text-xl font-bold text-white flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Threat Summary
              </span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.h2>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Activity className="w-3 h-3 text-green-400 animate-pulse" />
              Automated security analysis
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            disabled={isAnalyzing}
            className="ml-auto p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-slate-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Risk Level */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`mb-5 rounded-xl border border-${getRiskColor(riskLevel)}-500/20 bg-${getRiskColor(riskLevel)}-500/10 p-4 relative overflow-hidden`}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r from-${getRiskColor(riskLevel)}-500/0 via-${getRiskColor(riskLevel)}-500/5 to-${getRiskColor(riskLevel)}-500/0`}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getRiskIcon(riskLevel)}
              </motion.div>
              <div>
                <p className="text-sm text-slate-400">Current Risk Level</p>
                <motion.p
                  key={riskLevel}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xl font-bold text-${getRiskColor(riskLevel)}-400`}
                >
                  {riskLevel}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Radar className={`w-4 h-4 text-${getRiskColor(riskLevel)}-400`} />
              <span className={`text-xs font-mono text-${getRiskColor(riskLevel)}-400/70`}>
                SCANNING...
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Analysis Cards */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <AlertTriangle size={18} className="text-orange-400" />
                </motion.div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  Detection
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                    {detections.length} threats
                  </span>
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentDetection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-slate-300 leading-relaxed"
                >
                  {detections[currentDetection]}
                </motion.p>
              </AnimatePresence>

              {/* Detection Dots */}
              <div className="flex gap-1 mt-3">
                {detections.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentDetection ? 'w-4 bg-purple-400' : 'w-2 bg-slate-600'
                    }`}
                    animate={{ 
                      width: index === currentDetection ? 16 : 8,
                      backgroundColor: index === currentDetection ? '#a855f7' : '#475569'
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle size={18} className="text-green-400" />
                </motion.div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  Recommended Action
                  <Lock className="w-3 h-3 text-slate-400" />
                </h3>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-slate-300 leading-relaxed flex items-start gap-2"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-green-400 mt-0.5"
                >
                  •
                </motion.span>
                Block suspicious IP addresses, enforce MFA, and review authentication logs.
              </motion.p>

              <motion.div
                className="mt-3 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors"
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/30 hover:bg-slate-700 transition-colors"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* AI Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/20"
          >
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span>AI Engine v3.2</span>
              </div>
              <span className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-slate-400" />
                <span>Analyzing {detections.length} threats</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs text-green-400 font-mono">LIVE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}