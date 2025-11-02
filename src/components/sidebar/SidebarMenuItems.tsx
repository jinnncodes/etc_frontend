import { MenuItem } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Clipboard, FileText, Settings } from "lucide-react";

interface SidebarMenuItemsProps {
  collapsed: boolean;
  gap?: string; // Tailwind gap class
}

export default function SidebarMenuItems({ collapsed, gap = "gap-6" }: SidebarMenuItemsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <Home size={18} />, route: "/dashboard" },
    { label: "Users", icon: <Users size={18} />, route: "/users" },
    { label: "Request", icon: <Clipboard size={18} />, route: "/request" },
    { label: "Reports", icon: <FileText size={18} />, route: "/reports" },
    { label: "Settings", icon: <Settings size={18} />, route: "/settings" },
  ];

  return (
    <>
      {menuItems.map(({ label, icon, route }) => {
        const isActive = location.pathname === route;
        return (
          <MenuItem
            key={label}
            icon={icon}
            active={isActive}
            onClick={() => navigate(route)}
            className={`flex items-center ${gap}`}
          >
            {!collapsed && label}
          </MenuItem>
        );
      })}
    </>
  );
}
