import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import UserBody from "../components/body/UserBody";

interface User {
  name: string;
}

export default function User() {
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
        <UserBody />
      </div>
    </DashboardLayout>
  );
}
