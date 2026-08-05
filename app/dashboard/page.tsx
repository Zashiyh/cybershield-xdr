"use client";

import StatsCard from "@/components/dashboard/stats-card";
import ThreatChart from "@/components/dashboard/threat-chart";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import AISummary from "@/components/dashboard/ai-summary";
import HealthCard from "@/components/dashboard/health-card";
import AttackMap from "@/components/dashboard/attack-map";
import LiveThreatFeed from "@/components/dashboard/live-threat-feed";
import IPChecker from "@/components/security/ip-checker";
import ThreatScanHistory from "@/components/dashboard/threat-scan-history";
import ThreatAnalytics from "@/components/dashboard/threat-analytics";

import {
  ShieldAlert,
  TriangleAlert,
  FolderOpen,
  HeartPulse,
  Bot,
  Monitor,
} from "lucide-react";


export default function DashboardPage() {


  return (

    <div className="space-y-8">


      {/* Header */}

      <div>

        <h1
          className="
          text-4xl
          font-bold
          text-white
          "
        >
          Security Dashboard
        </h1>


        <p
          className="
          mt-2
          text-slate-400
          "
        >
          AI Powered Cyber Security Operations Center
        </p>

      </div>




      {/* Stats */}

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
        "
      >


        <StatsCard
          title="Critical Threats"
          value={12}
          change="+18%"
          icon={ShieldAlert}
          color="#ef4444"
        />


        <StatsCard
          title="Active Alerts"
          value={46}
          change="+12%"
          icon={TriangleAlert}
          color="#f97316"
        />


        <StatsCard
          title="Incidents"
          value={9}
          change="+4%"
          icon={FolderOpen}
          color="#3b82f6"
        />


        <StatsCard
          title="System Health"
          value="98%"
          change="+1%"
          icon={HeartPulse}
          color="#22c55e"
        />


        <StatsCard
          title="AI Detections"
          value={187}
          change="+31%"
          icon={Bot}
          color="#a855f7"
        />


        <StatsCard
          title="Protected Endpoints"
          value={254}
          change="+6%"
          icon={Monitor}
          color="#06b6d4"
        />


      </div>

      





      {/* Threat Chart */}

      <ThreatChart />





      {/* Alerts */}

      <RecentAlerts />





      {/* AI + Health */}

      <div
        className="
        grid
        gap-6
        xl:grid-cols-2
        "
      >

        <AISummary />

        <HealthCard />

        {/* Global Threat Monitoring */}

        <ThreatAnalytics />

<div
  className="
  grid
  gap-6
  xl:grid-cols-2
  "
>

  <AttackMap />

  <LiveThreatFeed />

</div>


      </div>

      {/* IP Checker */}

      <IPChecker />

      {/* Threat Scan History */}

      <ThreatScanHistory />

    </div>

  );

}