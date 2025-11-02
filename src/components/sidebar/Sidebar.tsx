import { useState, useEffect } from "react";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import SidebarMenuItems from "./SidebarMenuItems";
import { Menu as MenuIcon } from "lucide-react";
import { logout } from "../../api/auth";
import Modal from "../common/Modal";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  userName: string;
}

export default function MySidebar({ userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setSidebarOpen((prev) => !prev);
    else setCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const message = await logout();
      setModalMessage(message || "Logout Successful");
      setShowModal(true);
    } catch (err: unknown) {
      setModalMessage(err instanceof Error ? err.message : "Logout failed");
      setShowModal(true);
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      {/* Hamburger button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-r-md text-white md:hidden"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          collapsed={collapsed}
          rootStyles={{
            backgroundColor: "#1F2937",
            [`& .${sidebarClasses.container}`]: {
              height: "100vh",
              backgroundColor: "#1F2937",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {/* Logo */}
          <div
            className="flex items-center justify-start p-4 cursor-pointer text-white"
            onClick={toggleSidebar}
            style={{marginBottom: "20px"}}
          >
            {!collapsed ? (
              <span className="text-2xl font-bold">MyApp</span>
            ) : (
              <span>M</span>
            )}
          </div>

          {/* Menu */}
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                backgroundColor: active ? "#374151" : "transparent",
                "&:hover": { backgroundColor: "#4B5563" }, 
                color: "white",
                width: "100%", 
                justifyContent: "flex-start", 
                padding: "0.75rem 1rem",
                marginTop: "0.75rem"
              }),
            }}
          >
            {/* SidebarMenuItems will handle icon + label */}
            <SidebarMenuItems collapsed={collapsed} gap="gap-6" />
          </Menu>

          {/* Profile at bottom-left */}
          <div className="mt-auto p-4 flex flex-col items-start relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              {!collapsed && <span className="text-white">{userName}</span>}
            </div>

            {!collapsed && profileMenuOpen && (
              <div className="absolute left-0 bottom-14 w-full bg-gray-800 rounded shadow z-50">
                <div
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                  onClick={() => alert("Change Password clicked")}
                >
                  Change Password
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </Sidebar>
      )}

      {/* Modal */}
      <Modal show={showModal} message={modalMessage} onClose={handleModalOk} />
    </>
  );
}
