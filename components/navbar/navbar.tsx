"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  User,
  Activity,
  Zap,
  Eye,
  Lock,
  ShieldCheck,
  Crown,
} from "lucide-react";

interface CurrentUser {
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  }

  const getRoleColor = (role: string) => {
    switch(role?.toLowerCase()) {
      case "admin": return "bg-purple-500 text-white";
      case "analyst": return "bg-cyan-500 text-black";
      case "viewer": return "bg-slate-500 text-white";
      default: return "bg-cyan-500 text-black";
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role?.toLowerCase()) {
      case "admin": return <Crown className="w-3 h-3" />;
      case "analyst": return <ShieldCheck className="w-3 h-3" />;
      case "viewer": return <Eye className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-between border-b border-slate-700/30 bg-slate-800/20 backdrop-blur-xl px-6 py-4"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30">
            <Shield className="text-cyan-400" size={22} />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <div>
          <motion.h1
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CyberShield
            </span>
            <span className="text-slate-300"> XDR</span>
          </motion.h1>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
            AI Powered SOC Platform
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-lg p-2 hover:bg-slate-700/30 transition-colors"
        >
          <Bell className="text-slate-300" size={20} />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* User Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-700/50
                bg-slate-800/30
                backdrop-blur-sm
                px-3
                py-2
                hover:border-cyan-500/50
                transition-all
                duration-300
                group
              "
            >
              <div className="relative">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-500
                    font-bold
                    text-black
                    shadow-lg
                    shadow-cyan-500/20
                  "
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-white">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  {getRoleIcon(user?.role || "")}
                  {user?.role || ""}
                </p>
              </div>

              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  size={18}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                />
              </motion.div>
            </motion.button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenu.Content
                sideOffset={10}
                className="
                  z-50
                  w-72
                  rounded-xl
                  border
                  border-slate-700/50
                  bg-slate-800/90
                  backdrop-blur-xl
                  p-2
                  shadow-2xl
                  shadow-cyan-500/5
                "
              >
                {/* User Info */}
                <div className="border-b border-slate-700/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase ${getRoleColor(user?.role || "")}`}
                    >
                      {getRoleIcon(user?.role || "")}
                      {user?.role}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <DropdownMenu.Item className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 outline-none hover:bg-slate-700/50 transition-colors group">
                  <div className="p-1.5 rounded-lg bg-slate-700/30 group-hover:bg-cyan-500/20 transition-colors">
                    <User size={16} className="group-hover:text-cyan-400 transition-colors" />
                  </div>
                  My Profile
                </DropdownMenu.Item>

                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 outline-none hover:bg-slate-700/50 transition-colors group">
                  <div className="p-1.5 rounded-lg bg-slate-700/30 group-hover:bg-cyan-500/20 transition-colors">
                    <Settings size={16} className="group-hover:text-cyan-400 transition-colors" />
                  </div>
                  Settings
                </DropdownMenu.Item>

                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 outline-none hover:bg-slate-700/50 transition-colors group">
                  <div className="p-1.5 rounded-lg bg-slate-700/30 group-hover:bg-cyan-500/20 transition-colors">
                    <Activity size={16} className="group-hover:text-cyan-400 transition-colors" />
                  </div>
                  Activity Logs
                </DropdownMenu.Item>

                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 outline-none hover:bg-slate-700/50 transition-colors group">
                  <div className="p-1.5 rounded-lg bg-slate-700/30 group-hover:bg-cyan-500/20 transition-colors">
                    <Lock size={16} className="group-hover:text-cyan-400 transition-colors" />
                  </div>
                  Security Center
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="my-2 h-px bg-slate-700/50" />

                <DropdownMenu.Item
                  onSelect={logout}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-red-400
                    outline-none
                    hover:bg-red-500/10
                    transition-colors
                    group
                  "
                >
                  <div className="p-1.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <LogOut size={16} />
                  </div>
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </motion.div>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </motion.nav>
  );
}