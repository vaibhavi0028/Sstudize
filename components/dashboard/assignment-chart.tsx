"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assignments } from "@/lib/mockData";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function AssignmentChart() {
  const data = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1);
    const monthAssignments = assignments.filter(
      (assignment) => new Date(assignment.dueDate).getMonth() === i
    );
    
    const completed = monthAssignments.filter(
      (assignment) => assignment.status === "completed"
    ).length;
    
    const total = monthAssignments.length;
    
    return {
      month: month.toLocaleString('default', { month: 'short' }),
      completed: completed,
      total: total,
      percentage: total > 0 ? (completed / total) * 100 : 0
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 