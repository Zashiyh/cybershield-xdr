"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  User,
  Activity,
} from "lucide-react";

interface CurrentUser {
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);

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

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-[#0b1120] px-6 py-4">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <Shield className="text-cyan-400" size={24} />

        <div>
          <h1 className="text-xl font-bold text-cyan-400">
            CyberShield XDR
          </h1>

          <p className="text-xs text-slate-400">
            AI Powered SOC Platform
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button className="rounded-lg p-2 hover:bg-slate-800 transition">
          <Bell className="text-slate-300" size={20} />
        </button>

        <DropdownMenu.Root>

          <DropdownMenu.Trigger asChild>

            <button
              className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-3
              py-2
              hover:border-cyan-500
              transition
              "
            >

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-cyan-500
                font-bold
                text-black
                "
              >
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="hidden text-left md:block">

                <p className="text-sm font-semibold text-white">
                  {user?.name || "Loading..."}
                </p>

                <p className="text-xs text-slate-400">
                  {user?.role || ""}
                </p>

              </div>

              <ChevronDown
                size={18}
                className="text-slate-400"
              />

            </button>

          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>

            <DropdownMenu.Content
              sideOffset={10}
              className="
              z-50
              w-72
              rounded-xl
              border
              border-slate-700
              bg-[#111827]
              p-2
              shadow-2xl
              "
            >

              <div className="border-b border-slate-700 p-3">

                <p className="font-semibold text-white">
                  {user?.name}
                </p>

                <p className="text-sm text-slate-400">
                  {user?.email}
                </p>

                <span
                  className="
                  mt-2
                  inline-block
                  rounded-full
                  bg-cyan-500
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  text-black
                  "
                >
                  {user?.role}
                </span>

              </div>

              <DropdownMenu.Item className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-300 outline-none hover:bg-slate-800">

                <User size={18} />

                My Profile

              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-300 outline-none hover:bg-slate-800">

                <Settings size={18} />

                Settings

              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-300 outline-none hover:bg-slate-800">

                <Activity size={18} />

                Activity Logs

              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-300 outline-none hover:bg-slate-800">

                <Shield size={18} />

                Security Center

              </DropdownMenu.Item>

              <DropdownMenu.Separator className="my-2 h-px bg-slate-700" />

              <DropdownMenu.Item
                onSelect={logout}
                className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-red-400
                outline-none
                hover:bg-red-500/10
                "
              >
                <LogOut size={18} />

                Logout

              </DropdownMenu.Item>

            </DropdownMenu.Content>

          </DropdownMenu.Portal>

        </DropdownMenu.Root>

      </div>

    </nav>
  );
}