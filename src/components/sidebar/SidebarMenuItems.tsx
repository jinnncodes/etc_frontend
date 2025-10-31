import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Clipboard, FileText, Settings } from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  route: string;
}

interface SidebarMenuItemsProps {
  sidebarOpen: boolean;
}

export default function SidebarMenuItems({ sidebarOpen }: SidebarMenuItemsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, route: "/dashboard" },
    { label: "Users", icon: <Users className="w-5 h-5" />, route: "/users" },
    { label: "Request", icon: <Clipboard className="w-5 h-5" />, route: "/request" },
    { label: "Reports", icon: <FileText className="w-5 h-5" />, route: "/reports" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, route: "/settings" },
  ];

  return (
    <>
      {menuItems.map(({ label, icon, route }) => {
        const isActive = location.pathname === route;

        return (
          <button
            key={label}
            onClick={() => navigate(route)}
            className={`
              backgroundnone flex flex-col items-start rounded hover:bg-indigo-600 transition-all w-full
              ${sidebarOpen ? "px-3 py-3" : "p-3 justify-center"}
            `}
          >
            <div className={`flex items-center w-full ${isActive ? "border-b-2 border-white-500 pb-2" : ""}`}>
              {icon}
              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium transition-all duration-300">
                  {label}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </>
  );
}
