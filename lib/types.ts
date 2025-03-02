export type Role = 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  avatar: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  parentId: string;
  avatar: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface Score {
  id: string;
  studentId: string;
  subjectId: string;
  value: number;
  date: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  date: string;
}