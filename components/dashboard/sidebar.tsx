"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  ChevronUp,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

interface SidebarProps {
  user: User;
  className?: string;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function Sidebar({ user, className, expanded, setExpanded }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-screen flex-col border-r bg-white transition-all duration-300 dark:bg-gray-900",
        expanded ? "w-64" : "w-20",
        className
      )}
    >
      <div className="relative h-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setExpanded(!expanded);
          }}
          className="absolute left-4 top-6 h-8 w-8 z-50"
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <div
          className={cn(
            "absolute right-8 top-4 flex items-center gap-4 transition-opacity duration-300",
            expanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground capitalize">
              Status: {user.role}
            </span>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <NavItem
            expanded={expanded}
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            href="/dashboard"
            active
          />
          <NavItem
            expanded={expanded}
            icon={<Mail className="h-5 w-5" />}
            label="Inbox"
            href="/dashboard/inbox"
            badge="4"
          />
          <NavItem
            expanded={expanded}
            icon={<Users className="h-5 w-5" />}
            label="Students"
            href="/dashboard/students"
          />
          <NavItem
            expanded={expanded}
            icon={<BarChart3 className="h-5 w-5" />}
            label="Performance"
            href="/dashboard/performance"
          />
          <NavItem
            expanded={expanded}
            icon={<BookOpen className="h-5 w-5" />}
            label="Assignments"
            href="/dashboard/assignments"
          />
          <NavItem
            expanded={expanded}
            icon={<Calendar className="h-5 w-5" />}
            label="Attendance"
            href="/dashboard/attendance"
          />
          <NavItem
            expanded={expanded}
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            href="/dashboard/settings"
          />
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className={cn("rounded-lg bg-indigo-950 p-4", !expanded && "p-2")}>
          <div className={cn("mb-2", !expanded && "hidden")}>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-white">
                Upgrade plan
              </span>
              <span className="flex h-4 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-black">
                PRO
              </span>
            </div>
            <p className="text-xs text-indigo-200">
              Get 1 month free trial and access all the features
            </p>
          </div>
          <Button
            size={expanded ? "sm" : "icon"}
            className="w-full bg-white text-black hover:bg-gray-100"
          >
            {expanded ? "Upgrade" : <ChevronsUp className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="border-t p-4">
        <NavItem
          expanded={expanded}
          icon={<LogOut className="h-5 w-5" />}
          label="Log Out"
          href="/login"
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  expanded: boolean;
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ expanded, icon, label, href, active, badge }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <span className="flex-shrink-0 items-center justify-center mx-auto">
        {icon}
      </span>
      {expanded && <span className="flex-1 truncate">{label}</span>}
      {expanded && badge && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}
