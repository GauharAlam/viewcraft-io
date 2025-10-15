import { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FollowerGrowthChart } from "@/components/dashboard/FollowerGrowthChart";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { PlatformSelect } from "@/components/dashboard/PlatformSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { RedditProfileCard } from "@/components/dashboard/RedditProfileCard";
import { RedditPostTable } from "@/components/dashboard/RedditPostTable";

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    // The main content starts here. The pt-20/24 accounts for the sticky header.
    <main className="p-4 pt-20 md:p-8 md:pt-24">
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

      {/* Conditional Rendering Logic */}
      {selectedPlatform === 'reddit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RedditProfileCard />
          </div>
          <div className="lg:col-span-2">
            <RedditPostTable />
          </div>
        </div>
      ) : (
        <>
          {/* Metrics Grid (for other platforms) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <MetricCard 
              title="Total Followers" 
              value="24,583" 
              progress={75}
              change="+12.5% from last month" 
              changeType="positive" 
            />
            <MetricCard 
              title="Engagement Rate" 
              value="4.8%" 
              progress={60}
              change="+2.3% from last month" 
              changeType="positive" 
            />
            <MetricCard 
              title="Total Reach" 
              value="1.2M" 
              progress={90}
              change="+8.1% from last month" 
              changeType="positive" 
            />
            <MetricCard 
              title="Total Shares" 
              value="8,234" 
              progress={40}
              change="-3.2% from last month" 
              changeType="negative"
            />
          </div>

          {/* Charts Grid (for other platforms) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            <FollowerGrowthChart />
            <EngagementChart />
          </div>
        </>
      )}
    </main>
  );
}