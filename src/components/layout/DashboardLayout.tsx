
import type { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";

interface Props {
  user: { name: string };
  children: ReactNode;
}

export default function DashboardLayout({ user, children }: Props) {
  return (
    <div className="flex min-h-screen font-mono bg-gray-900 text-white">
      <Sidebar userName={user.name} />
      <main className="flex-1 p-8 md:ml-0">{children}</main>
    </div>
  );
}
