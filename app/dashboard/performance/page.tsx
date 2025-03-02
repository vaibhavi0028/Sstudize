"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentFilter } from "@/components/dashboard/student-filter";
import { PerformanceChart } from "@/components/dashboard/performance-student";
import { SubjectProgress } from "@/components/dashboard/subject-progress";
import { users, students, getStudentsByParentId, subjects } from "@/lib/mockData";
import { getScoresBySubject, calculateSubjectAverage } from "@/lib/utils";

export default function PerformancePage() {
  const [currentUser] = useState(users[0]);
  
  const availableStudents = currentUser.role === "teacher" 
    ? students 
    : getStudentsByParentId(currentUser.id);
  
  const [selectedStudent, setSelectedStudent] = useState(availableStudents[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  
  const subjectData = getScoresBySubject(selectedStudent.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Analysis</h1>
        <StudentFilter
          students={availableStudents}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <PerformanceChart studentId={selectedStudent.id}/>
          </div>
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <Card
                key={subject.id}
                className={`cursor-pointer ${
                  selectedSubject === subject.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{subject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateSubjectAverage(selectedStudent.id, subject.id)}
                  </div>
                  <div
                    className="mt-2 h-2 w-full rounded-full bg-secondary"
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${calculateSubjectAverage(selectedStudent.id, subject.id)}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <SubjectProgress studentId={selectedStudent.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}