"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Plus,
  Users,
  X,
} from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { users } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Task {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  progress: number;
  team: string[];
}

export default function DashboardPage() {
  const [currentUser] = useState(users[0]);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Digital Marketing Agency",
      subtitle: "Landing Page Design",
      color: "purple",
      progress: 60,
      team: [
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format",
      ]
    },
    {
      id: 2,
      title: "Online Course Mobile Apps",
      subtitle: "Landing Page Design",
      color: "orange",
      progress: 30,
      team: [
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop&auto=format",
      ]
    },
    {
      id: 3,
      title: "Political Articles Landing Page",
      subtitle: "Landing Page Design",
      color: "pink",
      progress: 40,
      team: [
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&auto=format",
      ]
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    subtitle: "",
    progress: 0
  });

  const addTask = () => {
    if (newTask.title && newTask.subtitle) {
      const colors = ["purple", "orange", "pink", "indigo", "emerald"];
      const newTaskObj: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        subtitle: newTask.subtitle,
        color: colors[Math.floor(Math.random() * colors.length)],
        progress: Number(newTask.progress) || 0,
        team: [users[0].avatar]
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask({ title: "", subtitle: "", progress: 0 });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="data-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Student Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Summary of student performance
          </p>
          <div className="mt-4 flex justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold">85%</div>
                  <div className="text-sm text-muted-foreground">
                    Overall Score
                  </div>
                </div>
              </div>
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="60"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm">Assignments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="text-sm">Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-500" />
              <span className="text-sm">Exams</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="data-card lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Student Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monthly performance comparison of students
          </p>
          <div className="mt-4 h-[200px]">
            <PerformanceChart />
          </div>
        </CardContent>
      </Card>

      <Card className="data-card lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-medium">
              Task Summary
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              You can add all the stuff as you wish
            </p>
          </div>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Button variant="outline" size="sm">
              <span>Recent</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <span>Friday</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-black text-white hover:bg-gray-700 hover:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Task Title</Label>
                    <Input
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      placeholder="Enter subtitle"
                      value={newTask.subtitle}
                      onChange={(e) => setNewTask({ ...newTask, subtitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Progress (%)</Label>
                    <Input
                      type="number"
                      placeholder="Enter progress"
                      min="0"
                      max="100"
                      value={newTask.progress}
                      onChange={(e) => setNewTask({ ...newTask, progress: Number(e.target.value) })}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={addTask}
                  >
                    Add Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`task-card ${task.color}`}>
                <div className="mb-2">
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-sm text-white/70">{task.subtitle}</p>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {task.team.slice(0, 4).map((avatar, i) => (
                      <Avatar
                        key={i}
                        className="h-6 w-6 border-2 border-white"
                      >
                        <AvatarImage src={avatar} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    {task.team.length > 4 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-white/20 text-xs font-medium text-white">
                        +{task.team.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    {task.progress}%
                    <span className="ml-1 text-xs text-white/70">
                      {task.progress < 50 ? "-10%" : "+20%"}
                    </span>
                  </div>
                </div>
                <Progress
                  value={task.progress}
                  className="h-1 bg-white/20"
                  indicatorClassName="bg-white"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="data-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Student Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Important academic updates and tasks
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900">
                <BookOpen className="h-6 w-6 text-indigo-500" />
              </div>
              <p className="text-sm font-medium">Assignment Submission</p>
            </div>
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900">
                <GraduationCap className="h-6 w-6 text-indigo-500" />
              </div>
              <p className="text-sm font-medium">Upcoming Exams</p>
            </div>
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-amber-100 p-2 dark:bg-amber-900">
                <Users className="h-6 w-6 text-amber-500" />
              </div>
              <p className="text-sm font-medium">
                Group Project Deadline
              </p>
            </div>
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-rose-100 p-2 dark:bg-rose-900">
                <BookOpen className="h-6 w-6 text-rose-500" />
              </div>
              <p className="text-sm font-medium">
                Lecture Notes Available
              </p>
            </div>
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900">
                <BookOpen className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="text-sm font-medium">
                Research Paper Submission
              </p>
            </div>
            <div className="grid-card flex flex-col items-center justify-center p-4">
              <div className="mb-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                <BookOpen className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-sm font-medium">Recorded Lectures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="data-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Student Overview
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full bg-black text-white hover:bg-gray-700 hover:text-white"
          >
            <Plus className="mr-1 h-3 w-3" />
            <span className="text-xs">5 subjects</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">87%</h3>
              <span className="text-xs text-green-500">+2.5%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Overall attendance percentage for the current semester
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-16 w-4 rounded-full bg-primary"></div>
              <div className="h-24 w-4 rounded-full bg-primary"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="data-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">
              Performance Overview
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full bg-gray-100"
            >
              <span className="text-xs">?</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold">85%</h3>
              <span className="text-xs text-green-500">+5%</span>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                25/30
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-white">
                92%
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-lg font-bold text-white">
                78%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="data-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            Student Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Quick access to your academic activities
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-rose-500 p-4 text-white">
              <BookOpen className="mb-2 h-6 w-6" />
              <p className="text-sm font-medium">Tests</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-primary p-4 text-white">
              <BookOpen className="mb-2 h-6 w-6" />
              <p className="text-sm font-medium">Exams</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-cyan-500 p-4 text-white">
              <BookOpen className="mb-2 h-6 w-6" />
              <p className="text-sm font-medium">Resources</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
