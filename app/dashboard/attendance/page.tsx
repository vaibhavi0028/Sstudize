"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { StudentFilter } from "@/components/dashboard/student-filter";
import { users, students, getStudentsByParentId, attendance } from "@/lib/mockData";
import { getAttendanceStats } from "@/lib/utils";

export default function AttendancePage() {
  const [currentUser] = useState(users[0]);
  
  const availableStudents = currentUser.role === "teacher" 
    ? students 
    : getStudentsByParentId(currentUser.id);
  
  const [selectedStudent, setSelectedStudent] = useState(availableStudents[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const stats = getAttendanceStats(selectedStudent.id);
  
  const studentAttendance = attendance.filter(
    (record) => record.studentId === selectedStudent.id
  );
  
  const attendanceMap = new Map();
  studentAttendance.forEach((record) => {
    attendanceMap.set(record.date, record.status);
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <StudentFilter
            students={availableStudents}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {stats.presentPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.present} days out of {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {stats.latePercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.late} days out of {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {stats.absentPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.absent} days out of {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              School days recorded
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AttendanceChart studentId={selectedStudent.id} />
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  present: (date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return attendanceMap.get(dateStr) === 'present';
                  },
                  late: (date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return attendanceMap.get(dateStr) === 'late';
                  },
                  absent: (date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return attendanceMap.get(dateStr) === 'absent';
                  },
                }}
                modifiersStyles={{
                  present: { backgroundColor: '#10B981', color: 'white' },
                  late: { backgroundColor: '#F59E0B', color: 'white' },
                  absent: { backgroundColor: '#EF4444', color: 'white' },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}