"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getScoresOverTime } from "@/lib/utils";

interface PerformanceChartProps {
  studentId: string;
}

export function PerformanceChart({ studentId }: PerformanceChartProps) {
  const [data] = useState(() => getScoresOverTime(studentId));

  const barData = [
    { month: "Jan", currentYear: 85, lastYear: 78 },
    { month: "Feb", currentYear: 88, lastYear: 80 },
    { month: "Mar", currentYear: 90, lastYear: 82 },
    { month: "Apr", currentYear: 83, lastYear: 79 },
    { month: "May", currentYear: 91, lastYear: 85 },
    { month: "Jun", currentYear: 87, lastYear: 81 },
    { month: "Jul", currentYear: 89, lastYear: 83 },
  ];

  return (
    <Card className="w-full max-w-2xl p-4">
      <CardHeader>
        <CardTitle>Performance Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            barCategoryGap={120}
            barGap={24}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[70, 75, 80, 85, 90, 95]}
              domain={[70, 95]}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar
              dataKey="currentYear"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              name="This year"
              barSize={30}
            />
            <Bar
              dataKey="lastYear"
              fill="#e5e7eb"
              radius={[4, 4, 0, 0]}
              name="Last year"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
