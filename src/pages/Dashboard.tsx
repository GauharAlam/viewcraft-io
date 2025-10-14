import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FollowerGrowthChart } from "@/components/dashboard/FollowerGrowthChart";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { PlatformSelect } from "@/components/dashboard/PlatformSelect";
import { Users, Heart, TrendingUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-[32px] font-bold mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your social media.</p>
          </div>

          {/* Filters */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <PlatformSelect selected={selectedPlatform} onSelect={setSelectedPlatform} />
            
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </Button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <MetricCard
              title="Total Followers"
              value="24,583"
              change="+12.5% from last month"
              changeType="positive"
              icon={Users}
            />
            <MetricCard
              title="Engagement Rate"
              value="4.8%"
              change="+2.3% from last month"
              changeType="positive"
              icon={Heart}
            />
            <MetricCard
              title="Total Reach"
              value="1.2M"
              change="+8.1% from last month"
              changeType="positive"
              icon={TrendingUp}
            />
            <MetricCard
              title="Total Shares"
              value="8,234"
              change="-3.2% from last month"
              changeType="negative"
              icon={Share2}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            <FollowerGrowthChart />
            <EngagementChart />
          </div>
        </main>
      </div>
    </div>
  );
}
