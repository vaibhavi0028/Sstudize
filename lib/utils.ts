import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { scores, subjects, attendance } from './mockData';
import { type Score, type Attendance } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAverageScore(studentId: string): number {
  const studentScores = scores.filter(score => score.studentId === studentId);
  if (studentScores.length === 0) return 0;
  
  const sum = studentScores.reduce((acc, score) => acc + score.value, 0);
  return Math.round((sum / studentScores.length) * 10) / 10;
}

export function calculateSubjectAverage(studentId: string, subjectId: string): number {
  const studentSubjectScores = scores.filter(
    score => score.studentId === studentId && score.subjectId === subjectId
  );
  
  if (studentSubjectScores.length === 0) return 0;
  
  const sum = studentSubjectScores.reduce((acc, score) => acc + score.value, 0);
  return Math.round((sum / studentSubjectScores.length) * 10) / 10;
}

export function getScoresBySubject(studentId: string) {
  const studentScores = scores.filter(score => score.studentId === studentId);
  
  const scoresBySubject = subjects.map(subject => {
    const subjectScores = studentScores
      .filter(score => score.subjectId === subject.id)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      subject,
      scores: subjectScores,
      average: calculateSubjectAverage(studentId, subject.id)
    };
  });
  
  return scoresBySubject;
}

export function getAttendanceStats(studentId: string) {
  const studentAttendance = attendance.filter(record => record.studentId === studentId);
  
  const present = studentAttendance.filter(record => record.status === 'present').length;
  const absent = studentAttendance.filter(record => record.status === 'absent').length;
  const late = studentAttendance.filter(record => record.status === 'late').length;
  const total = studentAttendance.length;
  
  return {
    present,
    absent,
    late,
    total,
    presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
    absentPercentage: total > 0 ? Math.round((absent / total) * 100) : 0,
    latePercentage: total > 0 ? Math.round((late / total) * 100) : 0
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getScoresOverTime(studentId: string) {
  const studentScores = scores.filter(score => score.studentId === studentId);
  
  const scoresByMonth: Record<string, { [subjectId: string]: number }> = {};
  
  studentScores.forEach(score => {
    const date = new Date(score.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if (!scoresByMonth[monthYear]) {
      scoresByMonth[monthYear] = {};
    }
    
    if (!scoresByMonth[monthYear][score.subjectId]) {
      scoresByMonth[monthYear][score.subjectId] = score.value;
    } else {
      
      const existingDate = new Date(
        studentScores.find(
          s => s.subjectId === score.subjectId && 
          new Date(s.date).getMonth() === date.getMonth() &&
          new Date(s.date).getFullYear() === date.getFullYear()
        )?.date || ''
      );
      
      if (date > existingDate) {
        scoresByMonth[monthYear][score.subjectId] = score.value;
      }
    }
  });
  
  const months = Object.keys(scoresByMonth).sort((a, b) => {
    const [aMonth, aYear] = a.split('/').map(Number);
    const [bMonth, bYear] = b.split('/').map(Number);
    
    if (aYear !== bYear) return aYear - bYear;
    return aMonth - bMonth;
  });
  
  return months.map(month => {
    const [monthNum, year] = month.split('/');
    const monthName = new Date(Number(year), Number(monthNum) - 1).toLocaleString('default', { month: 'short' });
    
    return {
      month: `${monthName} ${year}`,
      ...scoresByMonth[month],
      average: Object.values(scoresByMonth[month]).reduce((sum, score) => sum + score, 0) / 
               Object.values(scoresByMonth[month]).length
    };
  });
}

export function getAttendanceData(studentId: string) {
  const studentAttendance = attendance.filter(record => record.studentId === studentId);
  
  const attendanceByWeek: Record<string, { present: number, absent: number, late: number }> = {};
  
  studentAttendance.forEach(record => {
    const date = new Date(record.date);
    const weekNum = Math.floor(date.getDate() / 7) + 1;
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const weekKey = `Week ${weekNum}, ${new Date(date.getFullYear(), date.getMonth()).toLocaleString('default', { month: 'short' })}`;
    
    if (!attendanceByWeek[weekKey]) {
      attendanceByWeek[weekKey] = { present: 0, absent: 0, late: 0 };
    }
    
    attendanceByWeek[weekKey][record.status]++;
  });
  
  return Object.entries(attendanceByWeek).map(([week, data]) => ({
    week,
    ...data
  }));
}