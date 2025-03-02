"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { users } from "@/lib/mockData";

export default function SettingsPage() {
  const [currentUser] = useState(users[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedEmailNotifications = localStorage.getItem("emailNotifications") === "true";

    setDarkMode(savedDarkMode);
    setEmailNotifications(savedEmailNotifications);

    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("darkMode", darkMode.toString());
    localStorage.setItem("emailNotifications", emailNotifications.toString());

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex min-h-fit">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Email Notifications</span>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            
            <div className="mb-4">
              <label className="block text-lg mb-2">Change Password</label>
              <Input
                type="password"
                placeholder="New Password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button className="w-full mt-4" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
