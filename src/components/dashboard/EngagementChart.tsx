import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Mon", likes: 4000, comments: 2400, shares: 2400 },
  { name: "Tue", likes: 3000, comments: 1398, shares: 2210 },
  { name: "Wed", likes: 2000, comments: 9800, shares: 2290 },
  { name: "Thu", likes: 2780, comments: 3908, shares: 2000 },
  { name: "Fri", likes: 1890, comments: 4800, shares: 2181 },
  { name: "Sat", likes: 2390, comments: 3800, shares: 2500 },
  { name: "Sun", likes: 3490, comments: 4300, shares: 2100 },
];

export function EngagementChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Engagement Metrics</h3>
        <p className="text-sm text-muted-foreground mt-1">Daily breakdown of user interactions</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="likes" fill="hsl(var(--chart-1))" name="Likes" radius={[4, 4, 0, 0]} />
          <Bar dataKey="comments" fill="hsl(var(--chart-2))" name="Comments" radius={[4, 4, 0, 0]} />
          <Bar dataKey="shares" fill="hsl(var(--chart-3))" name="Shares" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
