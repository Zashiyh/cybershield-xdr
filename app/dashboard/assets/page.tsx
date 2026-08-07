"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Server,
  X,
  Zap,
  Activity,
  Shield,
  CheckCircle,
  AlertTriangle,
  Eye,
  Target,
  Cpu,
  HardDrive,
} from "lucide-react";

interface Asset {
  _id: string;
  name: string;
  ip: string;
  os: string;
  type: string;
  status: string;
  risk: string;
  lastSeen: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filtered, setFiltered] = useState<Asset[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    ip: "",
    os: "",
    type: "Endpoint",
  });

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      setLoading(true);
      const res = await fetch("/api/security/assets", {
        cache: "no-store",
      });
      const data = await res.json();
      setAssets(data);
      setFiltered(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function addAsset() {
    try {
      await fetch("/api/security/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          status: "Online",
          risk: "LOW",
        }),
      });

      setOpen(false);
      setForm({
        name: "",
        ip: "",
        os: "",
        type: "Endpoint",
      });
      loadAssets();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.ip.includes(search)
    );
    setFiltered(data);
  }, [search, assets]);

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

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "HIGH": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk) {
      case "HIGH": return <AlertTriangle className="w-3 h-3" />;
      case "MEDIUM": return <Activity className="w-3 h-3" />;
      case "LOW": return <CheckCircle className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-cyan-400 font-mono text-sm">LOADING ASSETS...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
              <Server className="text-cyan-400" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Assets
                </span>
                <span className="text-slate-300"> Management</span>
              </h1>
              <p className="mt-1 text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                Monitor connected endpoints and servers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <span className="text-xs font-mono text-cyan-300">
                Total: {assets.length}
              </span>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <Plus size={18} />
              Add Asset
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-sm px-4 focus-within:border-cyan-500/50 transition-colors">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search asset or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent p-3 text-white outline-none placeholder-slate-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 border-b border-slate-700/30">
                <tr>
                  <th className="p-4 text-sm font-medium text-slate-400">Asset</th>
                  <th className="p-4 text-sm font-medium text-slate-400">IP Address</th>
                  <th className="p-4 text-sm font-medium text-slate-400">OS</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Type</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="p-4 text-sm font-medium text-slate-400">Risk</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Server className="w-12 h-12 text-slate-600" />
                        <p>No assets found</p>
                        <p className="text-sm text-slate-500">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((asset, index) => (
                    <motion.tr
                      key={asset._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                      onClick={() => {
                        router.push(`/dashboard/assets/${asset._id}`);
                      }}
                      onMouseEnter={() => setHoveredRow(asset._id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="cursor-pointer border-b border-slate-700/30 text-white transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-cyan-500/10">
                            <Server size={18} className="text-cyan-400" />
                          </div>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <code className="px-2 py-1 rounded bg-slate-700/30 text-cyan-300 text-sm font-mono">
                          {asset.ip}
                        </code>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <Cpu className="w-3 h-3 text-slate-400" />
                          <span>{asset.os}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3 h-3 text-slate-400" />
                          <span>{asset.type}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 w-fit ${getStatusColor(asset.status)}`}>
                          {getStatusIcon(asset.status)}
                          {asset.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center gap-1 w-fit ${getRiskColor(asset.risk)}`}>
                          {getRiskIcon(asset.risk)}
                          {asset.risk}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-700/20">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>Online: {assets.filter(a => a.status === "Online").length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span>Offline: {assets.filter(a => a.status === "Offline").length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <span>Maintenance: {assets.filter(a => a.status === "Maintenance").length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Eye className="w-3 h-3" />
            <span>{filtered.length} assets displayed</span>
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-2xl border border-slate-700/50 bg-[#0f172a] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20">
                    <Plus className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Add Asset</h2>
                    <p className="text-sm text-slate-400">Register a new endpoint</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-1.5">Asset Name</label>
                  <input
                    placeholder="e.g., Web Server 01"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 block mb-1.5">IP Address</label>
                  <input
                    placeholder="e.g., 192.168.1.100"
                    value={form.ip}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ip: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 block mb-1.5">Operating System</label>
                  <input
                    placeholder="e.g., Windows 11, Ubuntu 22.04"
                    value={form.os}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        os: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 block mb-1.5">Asset Type</label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                  >
                    <option value="Endpoint">Endpoint</option>
                    <option value="Server">Server</option>
                    <option value="Network Device">Network Device</option>
                    <option value="Database">Database</option>
                    <option value="Cloud Instance">Cloud Instance</option>
                  </select>
                </div>

                <button
                  onClick={addAsset}
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-bold text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Save Asset
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}