import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { OptimalPostingTimes } from "@/components/insights/OptimalPostingTimes";
import { TopicAnalysis } from "@/components/insights/TopicAnalysis";
import { PlatformSelect } from "@/components/dashboard/PlatformSelect";
import { useState } from "react";

export default function Insights() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-[32px] font-bold mb-2">AI Insights</h1>
            <p className="text-muted-foreground">
              Actionable intelligence powered by data analysis
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <PlatformSelect selected={selectedPlatform} onSelect={setSelectedPlatform} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <OptimalPostingTimes />
            <TopicAnalysis />
          </div>
        </main>
      </div>
    </div>
  );
}
