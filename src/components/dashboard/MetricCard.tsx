import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string;
  progress: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

export function MetricCard({ 
  title, 
  value, 
  progress,
  change, 
  changeType, 
}: MetricCardProps) {
  const changeColorClass = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  const chartData = [
    { name: 'Progress', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const progressColor = 'hsl(var(--primary))';
  const remainingColor = 'hsl(var(--border))';

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
        </div>
        <div className="w-20 h-20 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={35}
                startAngle={90}
                endAngle={450}
                stroke="none"
                fill={remainingColor}
              />
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={35}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill={progressColor} />
                <Cell fill="transparent" />
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-lg font-semibold"
              >
                {`${progress}%`}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className={cn("text-sm mt-2 font-medium", changeColorClass)}>
        {change}
      </p>
    </Card>
  );
}