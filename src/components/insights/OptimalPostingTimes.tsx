import { Card } from "@/components/ui/card";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"];

// Mock engagement data (0-100 scale)
const engagementData = [
  [20, 25, 30, 45, 60, 40], // Monday
  [25, 30, 35, 70, 65, 35], // Tuesday
  [22, 28, 40, 50, 55, 30], // Wednesday
  [30, 35, 45, 55, 60, 45], // Thursday
  [35, 40, 50, 75, 80, 50], // Friday
  [15, 20, 25, 30, 35, 40], // Saturday
  [10, 15, 20, 25, 30, 35], // Sunday
];

const getColor = (value: number) => {
  if (value >= 70) return "bg-chart-3"; // High engagement - green
  if (value >= 50) return "bg-chart-1"; // Medium-high - blue
  if (value >= 30) return "bg-chart-4"; // Medium - orange
  return "bg-muted"; // Low engagement - gray
};

const getOpacity = (value: number) => {
  if (value >= 70) return "opacity-100";
  if (value >= 50) return "opacity-80";
  if (value >= 30) return "opacity-60";
  return "opacity-40";
};

export function OptimalPostingTimes() {
  const bestTimes = [
    { day: "Tuesday", time: "2:00 PM", engagement: "95%" },
    { day: "Friday", time: "12:00 PM", engagement: "92%" },
    { day: "Friday", time: "4:00 PM", engagement: "88%" },
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Optimal Posting Times</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered analysis of your best times to post
        </p>
      </div>

      {/* Best Times Summary */}
      <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="font-medium mb-3 text-sm">🎯 Your Best Times to Post</h4>
        <div className="space-y-2">
          {bestTimes.map((time, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {time.day}s at {time.time}
              </span>
              <span className="text-success">{time.engagement} engagement</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Hours Header */}
          <div className="flex mb-2">
            <div className="w-24 flex-shrink-0" />
            {hours.map((hour) => (
              <div key={hour} className="w-16 text-xs text-muted-foreground text-center">
                {hour}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          {days.map((day, dayIdx) => (
            <div key={day} className="flex mb-1 items-center">
              <div className="w-24 flex-shrink-0 text-sm font-medium pr-4">{day}</div>
              {engagementData[dayIdx].map((value, hourIdx) => (
                <div
                  key={hourIdx}
                  className={`w-16 h-12 mr-1 rounded ${getColor(value)} ${getOpacity(value)} 
                    flex items-center justify-center text-xs font-medium cursor-pointer
                    hover:ring-2 hover:ring-primary transition-all`}
                  title={`${day} ${hours[hourIdx]}: ${value}% engagement`}
                >
                  {value}%
                </div>
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-6 text-xs flex-wrap">
            <span className="text-muted-foreground">Engagement Level:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted opacity-40" />
              <span>Low (0-30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-chart-4 opacity-60" />
              <span>Medium (30-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-chart-1 opacity-80" />
              <span>Good (50-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-chart-3 opacity-100" />
              <span>Excellent (70%+)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
