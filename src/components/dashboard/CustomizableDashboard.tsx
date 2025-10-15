import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardWidget } from "./DashboardWidget";
import { MetricCard } from "./MetricCard";
import { FollowerGrowthChart } from "./FollowerGrowthChart";
import { EngagementChart } from "./EngagementChart";
import { Users, Heart, TrendingUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomizableDashboard() {
  const [layout, setLayout] = useState([
    { i: "followers", x: 0, y: 0, w: 3, h: 2 },
    { i: "engagement", x: 3, y: 0, w: 3, h: 2 },
    { i: "reach", x: 6, y: 0, w: 3, h: 2 },
    { i: "shares", x: 9, y: 0, w: 3, h: 2 },
    { i: "follower-chart", x: 0, y: 2, w: 6, h: 4 },
    { i: "engagement-chart", x: 6, y: 2, w: 6, h: 4 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    // TODO: Save to backend
    console.log("Layout changed:", newLayout);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm">
          Reset Layout
        </Button>
      </div>
      
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={50}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".cursor-move"
      >
        <div key="followers">
          <DashboardWidget title="Total Followers">
            <MetricCard
              title="Total Followers"
              value="24,583"
              change="+12.5% from last month"
              changeType="positive"
              icon={Users}
            />
          </DashboardWidget>
        </div>
        
        <div key="engagement">
          <DashboardWidget title="Engagement Rate">
            <MetricCard
              title="Engagement Rate"
              value="4.8%"
              change="+2.3% from last month"
              changeType="positive"
              icon={Heart}
            />
          </DashboardWidget>
        </div>
        
        <div key="reach">
          <DashboardWidget title="Total Reach">
            <MetricCard
              title="Total Reach"
              value="1.2M"
              change="+8.1% from last month"
              changeType="positive"
              icon={TrendingUp}
            />
          </DashboardWidget>
        </div>
        
        <div key="shares">
          <DashboardWidget title="Total Shares">
            <MetricCard
              title="Total Shares"
              value="8,234"
              change="-3.2% from last month"
              changeType="negative"
              icon={Share2}
            />
          </DashboardWidget>
        </div>
        
        <div key="follower-chart">
          <DashboardWidget title="Follower Growth">
            <FollowerGrowthChart />
          </DashboardWidget>
        </div>
        
        <div key="engagement-chart">
          <DashboardWidget title="Engagement Over Time">
            <EngagementChart />
          </DashboardWidget>
        </div>
      </GridLayout>
    </div>
  );
}
