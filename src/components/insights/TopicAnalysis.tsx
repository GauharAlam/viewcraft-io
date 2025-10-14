import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const topics = [
  { text: "Social Media", value: 95, trend: "up" },
  { text: "Marketing", value: 88, trend: "up" },
  { text: "Analytics", value: 82, trend: "up" },
  { text: "Content Strategy", value: 75, trend: "stable" },
  { text: "Engagement", value: 70, trend: "up" },
  { text: "ROI", value: 65, trend: "down" },
  { text: "Brand Awareness", value: 60, trend: "up" },
  { text: "Customer Insights", value: 55, trend: "stable" },
  { text: "Influencer", value: 50, trend: "up" },
  { text: "Video Content", value: 48, trend: "up" },
  { text: "Community", value: 45, trend: "stable" },
  { text: "AI Tools", value: 42, trend: "up" },
  { text: "Growth Hacking", value: 40, trend: "stable" },
  { text: "User Generated", value: 38, trend: "up" },
  { text: "Metrics", value: 35, trend: "stable" },
];

export function TopicAnalysis() {
  const getSize = (value: number) => {
    if (value >= 80) return "text-2xl md:text-3xl";
    if (value >= 60) return "text-xl md:text-2xl";
    if (value >= 40) return "text-lg md:text-xl";
    return "text-base";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Trending Topics in Your Community</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Keywords and topics your audience is talking about
        </p>
      </div>

      {/* Word Cloud Simulation */}
      <div className="min-h-[300px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 flex flex-wrap items-center justify-center gap-4">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className={`${getSize(topic.value)} font-semibold transition-all duration-200 
              hover:text-primary cursor-pointer ${getTrendColor(topic.trend)} opacity-${
              Math.max(40, topic.value)
            }`}
            style={{
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
          >
            {topic.text}
          </div>
        ))}
      </div>

      {/* Top Topics List */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-sm">Top 5 Trending Topics</h4>
        {topics.slice(0, 5).map((topic, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-muted-foreground">#{idx + 1}</span>
              <span className="font-medium">{topic.text}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${topic.value}%` }}
                />
              </div>
              <TrendingUp
                className={`w-4 h-4 ${
                  topic.trend === "up"
                    ? "text-success"
                    : topic.trend === "down"
                    ? "text-destructive rotate-180"
                    : "text-muted-foreground rotate-90"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
