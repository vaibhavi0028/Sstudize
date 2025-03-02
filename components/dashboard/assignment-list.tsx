"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assignment } from "@/lib/types";
import { assignments, subjects } from "@/lib/mockData";

interface AssignmentListProps {
  studentId?: string;
}

export function AssignmentList({ studentId }: AssignmentListProps) {
  const [displayAssignments] = useState<Assignment[]>(assignments);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAssignments.slice(0, 5).map((assignment) => {
            const subject = subjects.find((s) => s.id === assignment.subjectId);
            return (
              <div
                key={assignment.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  {assignment.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : assignment.status === "overdue" ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: subject?.color }}
                      />
                      <span>{subject?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                  </div>
                  <Badge
                    variant={
                      assignment.status === "completed"
                        ? "outline"
                        : assignment.status === "overdue"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {assignment.status === "completed"
                      ? "Completed"
                      : assignment.status === "overdue"
                      ? "Overdue"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}