"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ShieldAlert } from "lucide-react";

interface Attack {
  _id?: string;
  title: string;
  ip: string;
  severity: string;
  createdAt: string;
}

export default function LiveAttackFeed() {
  const [alerts, setAlerts] = useState<Attack[]>([]);
  const [previousCount, setPreviousCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  async function load() {
    try {
      const res = await fetch("/api/security/alerts", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        if (data.length > previousCount) {
          setPreviousCount(data.length);
        }

        setAlerts(data.slice(0, 10));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [alerts]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-black p-6">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="relative">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-red-500"></span>

            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </div>

          <Activity className="text-cyan-400" />

          <h2 className="text-xl font-bold text-white">
            Live Attack Feed
          </h2>

        </div>

        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400">
          LIVE
        </span>

      </div>

      <div
        ref={containerRef}
        className="max-h-[500px] space-y-4 overflow-y-auto pr-2"
      >
        {alerts.length > 0 ? (
          alerts.map((item, index) => (
            <div
              key={item._id ?? index}
              className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 transition-all duration-300 hover:border-cyan-500"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <ShieldAlert
                    size={18}
                    className={
                      item.severity === "HIGH"
                        ? "text-red-500"
                        : item.severity === "MEDIUM"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  />

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  {index === 0 && (
                    <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                      NEW
                    </span>
                  )}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.severity === "HIGH"
                      ? "bg-red-500/20 text-red-400"
                      : item.severity === "MEDIUM"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.severity}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-slate-500">
                    IP Address
                  </p>

                  <p className="font-mono text-white">
                    {item.ip}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Time
                  </p>

                  <p className="text-white">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </p>
                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
            No live attacks detected.
          </div>
        )}
      </div>
    </div>
  );
}