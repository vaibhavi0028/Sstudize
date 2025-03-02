"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentCard } from "@/components/dashboard/student-card";
import { StudentFilter } from "@/components/dashboard/student-filter";
import { users, students, getStudentsByParentId } from "@/lib/mockData";
import { calculateAverageScore } from "@/lib/utils";

export default function StudentsPage() {
  const [currentUser] = useState(users[0]);
  
  const availableStudents = currentUser.role === "teacher" 
    ? students 
    : getStudentsByParentId(currentUser.id);
  
  const [selectedStudent, setSelectedStudent] = useState(availableStudents[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        <StudentFilter
          students={availableStudents}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              {currentUser.role === "teacher" ? "In your class" : "Under your care"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {calculateAverageScore(selectedStudent.id)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all subjects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">95%</div>
            <p className="text-xs text-muted-foreground">
              Present days this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">85%</div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            isSelected={student.id === selectedStudent.id}
            onClick={() => setSelectedStudent(student)}
          />
        ))}
      </div>
    </div>
  );
}