"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function PerformanceChart() {
  const performanceData = [
    { month: "Jan", currentYear: 85, lastYear: 78 },
    { month: "Feb", currentYear: 88, lastYear: 80 },
    { month: "Mar", currentYear: 90, lastYear: 82 },
    { month: "Apr", currentYear: 83, lastYear: 79 },
    { month: "May", currentYear: 91, lastYear: 85 },
    { month: "Jun", currentYear: 87, lastYear: 81 },
    { month: "Jul", currentYear: 89, lastYear: 83 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={performanceData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          ticks={[70, 75, 80, 85, 90, 95]}
          domain={[70, 95]}
        />
        <Tooltip 
          cursor={{ fill: 'transparent' }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        <Bar 
          dataKey="currentYear" 
          fill="#6366f1" 
          radius={[4, 4, 0, 0]}
          name="This Year"
        />
        <Bar 
          dataKey="lastYear" 
          fill="#e5e7eb" 
          radius={[4, 4, 0, 0]}
          name="Last Year"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
