import { useState } from "react";
import { PlatformSelect } from "@/components/dashboard/PlatformSelect";
import { OptimalPostingTimes } from "@/components/insights/OptimalPostingTimes";
import { TopicAnalysis } from "@/components/insights/TopicAnalysis";

export default function Insights() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    <main className="p-4 pt-20 md:p-8 md:pt-24">
      <div className="max-w-5xl mx-auto">
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
      </div>
    </main>
  );
}