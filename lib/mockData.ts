import { User, Student, Subject, Score, Attendance, Assignment, Notification } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@school.edu',
    role: 'teacher',
    password: '123', 
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'parent',
    password: '123', 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&auto=format',
  },
];


export const students: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: '5th Grade',
    parentId: '2',
    avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    grade: '3rd Grade',
    parentId: '2',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&auto=format',
  },
  {
    id: '3',
    name: 'Olivia Davis',
    grade: '5th Grade',
    parentId: '3',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format',
  },
  {
    id: '4',
    name: 'James Wilson',
    grade: '4th Grade',
    parentId: '4',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format',
  },
];

export const subjects: Subject[] = [
  { id: '1', name: 'Math', color: '#4C51BF' },
  { id: '2', name: 'Science', color: '#38B2AC' },
  { id: '3', name: 'English', color: '#ED8936' },
  { id: '4', name: 'History', color: '#9F7AEA' },
  { id: '5', name: 'Art', color: '#F56565' },
];

export const messages = [
  {
    id: 1,
    sender: users[0],
    subject: "Meeting Reminder",
    content: "Don't forget about our meeting tomorrow at 10 AM.",
    timestamp: "2025-03-01T10:30:00Z",
    read: false,
  },
  {
    id: 2,
    sender: users[1],
    subject: "Project Update",
    content: "The latest version of the project has been pushed to GitHub.",
    timestamp: "2025-02-28T15:45:00Z",
    read: true,
  },
  {
    id: 3,
    sender: users[0],
    subject: "New Assignment",
    content: "Please complete the new assignment by next Monday.",
    timestamp: "2025-02-27T08:20:00Z",
    read: false,
  },
  {
    id: 4,
    sender: users[1],
    subject: "Team Lunch",
    content: "Let's plan a lunch this Friday. Any suggestions?",
    timestamp: "2025-02-26T12:10:00Z",
    read: true,
  },
  
];

const generateScores = () => {
  const scores: Score[] = [];
  const now = new Date();
  
  students.forEach(student => {
    subjects.forEach(subject => {
      for (let i = 0; i < 6; i++) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        
        scores.push({
          id: `score-${student.id}-${subject.id}-${i}`,
          studentId: student.id,
          subjectId: subject.id,
          value: Math.floor(Math.random() * 30) + 70, 
          date: date.toISOString().split('T')[0],
        });
      }
    });
  });
  
  return scores;
};

const generateAttendance = () => {
  const attendance: Attendance[] = [];
  const now = new Date();
  const statuses: ('present' | 'absent' | 'late')[] = ['present', 'absent', 'late'];
  
  students.forEach(student => {
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      let status: 'present' | 'absent' | 'late';
      const rand = Math.random();
      if (rand < 0.85) status = 'present';
      else if (rand < 0.95) status = 'late';
      else status = 'absent';
      
      attendance.push({
        id: `attendance-${student.id}-${i}`,
        studentId: student.id,
        date: date.toISOString().split('T')[0],
        status,
      });
    }
  });
  
  return attendance;
};

const generateAssignments = () => {
  const assignments: Assignment[] = [];
  const now = new Date();
  const statuses: ('pending' | 'completed' | 'overdue')[] = ['pending', 'completed', 'overdue'];
  
  subjects.forEach(subject => {
    for (let i = 0; i < 3; i++) {
      const dueDate = new Date(now);
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) - 7); 
      
      const status = dueDate < now ? 
        (Math.random() < 0.7 ? 'completed' : 'overdue') : 
        (Math.random() < 0.5 ? 'completed' : 'pending');
      
      assignments.push({
        id: `assignment-${subject.id}-${i}`,
        title: `${subject.name} Assignment ${i + 1}`,
        subjectId: subject.id,
        dueDate: dueDate.toISOString().split('T')[0],
        status,
      });
    }
  });
  
  return assignments;
};

const generateNotifications = () => {
  const notifications: Notification[] = [];
  const now = new Date();
  const types: ('info' | 'warning' | 'success' | 'error')[] = ['info', 'warning', 'success', 'error'];
  
  users.forEach(user => {
    for (let i = 0; i < 5; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - Math.floor(Math.random() * 7)); 
      
      notifications.push({
        id: `notification-${user.id}-${i}`,
        userId: user.id,
        message: getRandomNotificationMessage(user.role, i),
        type: types[Math.floor(Math.random() * types.length)],
        read: Math.random() < 0.5,
        date: date.toISOString(),
      });
    }
  });
  
  return notifications;
};

function getRandomNotificationMessage(role: string, index: number): string {
  const teacherMessages = [
    'New student added to your class',
    'Parent meeting scheduled for tomorrow',
    'Reminder: Submit grades by Friday',
    'School closure due to weather',
    'Staff meeting at 3 PM today'
  ];
  
  const parentMessages = [
    'Your child has a new assignment due',
    'Report card available for review',
    'Parent-teacher conference scheduled',
    'School event next week',
    'Your child was marked late today'
  ];
  
  return role === 'teacher' ? teacherMessages[index] : parentMessages[index];
}

export const scores = generateScores();
export const attendance = generateAttendance();
export const assignments = generateAssignments();
export const notifications = generateNotifications();

export const getStudentsByParentId = (parentId: string) => {
  return students.filter(student => student.parentId === parentId);
};

export const getScoresByStudentId = (studentId: string) => {
  return scores.filter(score => score.studentId === studentId);
};

export const getAttendanceByStudentId = (studentId: string) => {
  return attendance.filter(record => record.studentId === studentId);
};

export const getNotificationsByUserId = (userId: string) => {
  return notifications.filter(notification => notification.userId === userId);
};

export const getSubjectById = (subjectId: string) => {
  return subjects.find(subject => subject.id === subjectId);
};

export const getStudentById = (studentId: string) => {
  return students.find(student => student.id === studentId);
};