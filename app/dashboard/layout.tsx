"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { cn } from "@/lib/utils";
import { users } from "@/lib/mockData";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentUser] = useState(users[0]);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        user={currentUser} 
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300",
        expanded ? "ml-64" : "ml-20"
      )}>
        <Header user={currentUser} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 