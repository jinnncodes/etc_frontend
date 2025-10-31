// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";

interface User {
  name: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User>({ name: "Tony Stark" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ name: parsed.name?.trim() || "Tony Stark" });
    }
  }, []);

  return (
    <DashboardLayout user={user}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <Card title="Users" description="Manage users" />
        <Card title="Reports" description="View reports" />
        <Card title="Settings" description="Configure system" />
      </div>
    </DashboardLayout>
  );
}
