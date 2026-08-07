"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  Activity,
  Save,
  Zap,
  Clock,
  User,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Target,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface Incident {
  _id: string;
  title: string;
  ip: string;
  severity: string;
  status: string;
  description: string;
  createdAt: string;
  assignedTo: string;
  notes: string;
  resolvedAt: string | null;
  alertId?: {
    _id: string;
    title: string;
    ip: string;
    severity: string;
    score: number;
    status: string;
  };
}

export default function IncidentDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const [notes, setNotes] = useState("");
  const [incidentId, setIncidentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function init() {
      const { id } = await params;
      setIncidentId(id);
      loadIncident(id);
    }
    init();
  }, []);

  async function loadIncident(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/security/incidents/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      console.log("INCIDENT DATA:", data);
      setIncident(data);
      setAssignedTo(data.assignedTo || "Unassigned");
      setNotes(data.notes || "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveIncident() {
    try {
      setSaving(true);
      await fetch(`/api/security/incidents/${incidentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: incident?.status,
          assignedTo,
          notes,
        }),
      });
      loadIncident(incidentId);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "INVESTIGATING":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "RESOLVED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-cyan-400 font-mono text-sm">LOADING INCIDENT...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
              <h2 className="text-2xl font-bold text-red-400">Incident Not Found</h2>
              <p className="text-slate-400">The incident you're looking for doesn't exist</p>
              <Link
                href="/dashboard/incidents"
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Incidents
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
          href="/dashboard/incidents"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Incidents
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-500/30">
              <Target className="text-orange-400" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {incident.title}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                  Incident Investigation
                </p>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getSeverityColor(incident.severity)}`}>
              {incident.severity}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-red-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <ShieldAlert className="text-red-400" size={24} />
              <p className="text-slate-400 mt-3 text-sm">Severity</p>
              <h2 className="text-3xl font-bold text-white">{incident.severity}</h2>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Activity className="text-blue-400" size={24} />
              <p className="text-slate-400 mt-3 text-sm">Status</p>
              <select
                value={incident.status}
                onChange={(e) =>
                  setIncident({
                    ...incident,
                    status: e.target.value,
                  })
                }
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
              >
                <option value="OPEN">OPEN</option>
                <option value="INVESTIGATING">INVESTIGATING</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Target className="text-cyan-400" size={24} />
              <p className="text-slate-400 mt-3 text-sm">IP Address</p>
              <h2 className="text-xl font-bold text-white font-mono">{incident.ip}</h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-cyan-400" size={20} />
            <h2 className="text-xl font-bold text-white">Description</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">{incident.description}</p>
        </div>

        {/* Related Alert */}
        {incident.alertId && (
          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-orange-400" size={20} />
              <h2 className="text-xl font-bold text-white">Related Alert</h2>
            </div>

            <p className="text-sm text-slate-400">Alert Title</p>
            <p className="text-white font-medium mb-4">{incident.alertId.title}</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <p className="text-xs text-slate-400">IP</p>
                <p className="text-white font-mono text-sm">{incident.alertId.ip}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <p className="text-xs text-slate-400">Severity</p>
                <p className="text-red-400 font-bold">{incident.alertId.severity}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <p className="text-xs text-slate-400">Threat Score</p>
                <p className="text-cyan-400 font-bold">{incident.alertId.score}/100</p>
              </div>
            </div>
          </div>
        )}

        {/* Investigation */}
        <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="text-purple-400" size={20} />
            <h2 className="text-xl font-bold text-white">Investigation</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Assigned Analyst
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="SOC Team">SOC Team</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Lee">Sarah Lee</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Investigation Notes
              </label>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                placeholder="Enter investigation notes..."
              />
            </div>

            <button
              onClick={saveIncident}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timestamps */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-cyan-400" size={18} />
              <h3 className="text-sm font-medium text-slate-400">Created</h3>
            </div>
            <p className="text-white mt-2">{new Date(incident.createdAt).toLocaleString()}</p>
          </div>

          {incident.resolvedAt && (
            <div className="rounded-2xl border border-slate-700/30 bg-slate-800/20 backdrop-blur-xl p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={18} />
                <h3 className="text-sm font-medium text-slate-400">Resolved</h3>
              </div>
              <p className="text-green-400 mt-2">{new Date(incident.resolvedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}