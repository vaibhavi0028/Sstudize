import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/lib/types";
import { calculateAverageScore } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  isSelected?: boolean;
  onClick?: () => void;
}

export function StudentCard({ student, isSelected, onClick }: StudentCardProps) {
  const averageScore = calculateAverageScore(student.id);
  
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:border-primary",
        isSelected && "border-primary"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{student.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{student.grade}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Average Score</p>
            <p className="text-2xl font-bold">{averageScore}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Grade</p>
            <p className="text-2xl font-bold">
              {averageScore >= 90
                ? "A"
                : averageScore >= 80
                ? "B"
                : averageScore >= 70
                ? "C"
                : averageScore >= 60
                ? "D"
                : "F"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}