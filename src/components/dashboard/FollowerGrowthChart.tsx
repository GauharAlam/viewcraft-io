// src/components/dashboard/FollowerGrowthChart.tsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// --- UPDATED DATA ARRAY ---
const data = [
  { month: "Jan", twitter: 4000, instagram: 2400, linkedin: 2400 },
  { month: "Feb", twitter: 3000, instagram: 1398, linkedin: 2210 },
  { month: "Mar", twitter: 2000, instagram: 9800, linkedin: 2290 }, // Keep the spike
  { month: "Apr", twitter: 2780, instagram: 3908, linkedin: 2000 },
  { month: "May", twitter: 1890, instagram: 4800, linkedin: 2181 },
  { month: "Jun", twitter: 2390, instagram: 3800, linkedin: 2500 },
  { month: "Jul", twitter: 3490, instagram: 4300, linkedin: 2100 },
  // Added data for Aug - Dec
  { month: "Aug", twitter: 3600, instagram: 4500, linkedin: 2300 },
  { month: "Sep", twitter: 3800, instagram: 4700, linkedin: 2450 },
  { month: "Oct", twitter: 4100, instagram: 5100, linkedin: 2600 },
  { month: "Nov", twitter: 4300, instagram: 5500, linkedin: 2750 },
  { month: "Dec", twitter: 4500, instagram: 6000, linkedin: 2900 },
];
// --- END OF UPDATE ---

export function FollowerGrowthChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Follower Growth</h3>
        <p className="text-sm text-muted-foreground mt-1">Track your audience growth across platforms</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
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
          <Line 
            type="monotone" 
            dataKey="twitter" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            name="X (Twitter)"
            dot={{ fill: 'hsl(var(--chart-1))' }}
          />
          <Line 
            type="monotone" 
            dataKey="instagram" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            name="Instagram"
            dot={{ fill: 'hsl(var(--chart-2))' }}
          />
          <Line 
            type="monotone" 
            dataKey="linkedin" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            name="LinkedIn"
            dot={{ fill: 'hsl(var(--chart-3))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}