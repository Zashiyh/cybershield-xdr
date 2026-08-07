"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Shield,
  LayoutDashboard,
  Activity,
  ShieldAlert,
  Globe,
  Server,
  FileText,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  Zap,
  ChevronRight,
  AlertCircle,
  Clock,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Threat Monitor",
    href: "/dashboard/threat-monitor",
    icon: Activity,
  },
  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: ShieldAlert,
  },
  {
    name: "Incidents",
    href: "/dashboard/incidents",
    icon: Activity,
  },
  {
    name: "Threat Intelligence",
    href: "/dashboard/intelligence",
    icon: Globe,
  },
  {
    name: "Assets",
    href: "/dashboard/assets",
    icon: Server,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    async function getAlertCount() {
      try {
        const res = await fetch("/api/security/alerts/count", {
          cache: "no-store",
        });
        const data = await res.json();
        setAlertCount(data.count || 0);
      } catch (error) {
        console.log(error);
      }
    }

    getAlertCount();
    const interval = setInterval(getAlertCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative
        h-screen
        ${collapsed ? "w-20" : "w-72"}
        flex
        flex-col
        border-r
        border-slate-700/30
        bg-slate-800/20
        backdrop-blur-xl
        transition-all
        duration-300
        overflow-hidden
        shadow-2xl
        shadow-cyan-500/5
      `}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-700/30 p-5">
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
              <Shield className="text-cyan-400" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  CyberShield
                </span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                XDR Platform
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex w-full justify-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
              <Shield className="text-cyan-400" size={22} />
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-slate-700/30 transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-slate-400" />
          ) : (
            <ChevronLeft size={20} className="text-slate-400" />
          )}
        </motion.button>
      </div>

      {/* Menu */}
      <nav className="relative z-10 flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin scrollbar-track-slate-800/20 scrollbar-thumb-cyan-500/20">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const isHovered = hoveredItem === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredItem(item.href)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-200
                  group
                  ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/30"
                  }
                `}
              >
                {/* Active Indicator */}
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full"
                  />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      p-1.5 rounded-lg transition-colors
                      ${
                        active
                          ? "bg-cyan-500/20 text-cyan-400"
                          : isHovered
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-400"
                      }
                    `}
                  >
                    <Icon size={20} />
                  </div>

                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-sm font-medium ${
                        active ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </div>

                {!collapsed && item.name === "Alerts" && alertCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-400 border border-red-500/30"
                  >
                    <AlertCircle size={12} />
                    {alertCount}
                  </motion.span>
                )}

                {/* Tooltip for collapsed mode */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.name}
                    {item.name === "Alerts" && alertCount > 0 && (
                      <span className="ml-1 text-red-400">({alertCount})</span>
                    )}
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative z-10 border-t border-slate-700/30 p-4">
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-slate-400">All Systems Online</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>Version 1.0.0</span>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <Shield size={18} className="text-cyan-400" />
          </div>
        )}
      </div>

      {/* Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.2);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </motion.aside>
  );
}