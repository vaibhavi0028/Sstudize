"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAttendanceStats } from "@/lib/utils";

interface AttendanceChartProps {
  studentId: string;
}

export function AttendanceChart({ studentId }: AttendanceChartProps) {
  const stats = getAttendanceStats(studentId);
  
  const data = [
    { name: "Present", value: stats.present, color: "#10B981" },
    { name: "Late", value: stats.late, color: "#F59E0B" },
    { name: "Absent", value: stats.absent, color: "#EF4444" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-md bg-green-50 p-2 dark:bg-green-950">
            <p className="text-xs text-muted-foreground">Present</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {stats.presentPercentage}%
            </p>
          </div>
          <div className="rounded-md bg-yellow-50 p-2 dark:bg-yellow-950">
            <p className="text-xs text-muted-foreground">Late</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.latePercentage}%
            </p>
          </div>
          <div className="rounded-md bg-red-50 p-2 dark:bg-red-950">
            <p className="text-xs text-muted-foreground">Absent</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {stats.absentPercentage}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}