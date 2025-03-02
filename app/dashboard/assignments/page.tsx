"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentFilter } from "@/components/dashboard/student-filter";
import { AssignmentList } from "@/components/dashboard/assignment-list";
import { AssignmentChart } from "@/components/dashboard/assignment-chart";
import { users, students, getStudentsByParentId } from "@/lib/mockData";

export default function AssignmentsPage() {
  const [currentUser] = useState(users[0]);
  
  const availableStudents = currentUser.role === "teacher" 
    ? students 
    : getStudentsByParentId(currentUser.id);
  
  const [selectedStudent, setSelectedStudent] = useState(availableStudents[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <StudentFilter
          students={availableStudents}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">85%</div>
            <p className="text-xs text-muted-foreground">17 out of 20</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">10%</div>
            <p className="text-xs text-muted-foreground">2 out of 20</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">5%</div>
            <p className="text-xs text-muted-foreground">1 out of 20</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Based on completed assignments
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AssignmentChart />
        <AssignmentList studentId={selectedStudent.id} />
      </div>
    </div>
  );
}