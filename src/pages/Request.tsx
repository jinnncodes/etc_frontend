// src/pages/dashboard/Request.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CardBody from "../components/body/Requestbody"

interface User {
  name: string;
}

export default function Request() {
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
      <div className="w-full mb-6">
        <CardBody />
      </div>
    </DashboardLayout>
  );
}
