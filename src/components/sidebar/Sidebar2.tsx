// import { useEffect, useState } from "react";
// import { Menu, ChevronDown, ChevronUp } from "lucide-react";
// import { logout } from "../../api/auth";
// import { useNavigate } from "react-router-dom";
// import Modal from "../common/Modal";
// import SidebarMenuItems from "./SidebarMenuItems";

// interface SidebarProps {
//   userName: string;
// }

// export default function Sidebar({ userName }: SidebarProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     if (isMobile) setIsOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     try {
//       const message = await logout();
//       setModalMessage(message || "Logout Successfully");
//       setShowModal(true);
//     } catch (err: unknown) {
//       setModalMessage(err instanceof Error ? err.message : "Logout failed");
//       setShowModal(true);
//     }
//   };

//   const handleModalOk = () => {
//     setShowModal(false);
//     navigate("/"); // redirect after logout
//   };

//   const sidebarOpen = !isMobile || isOpen;

//   return (
//     <>
//       {/* Hamburger Button */}
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-4 left-4 z-50 h-14 w-14 bg-gray-800 rounded-r-md flex items-center justify-center md:hidden"
//         >
//           <Menu className="w-7 h-7 text-white" />
//         </button>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen bg-gray-800 flex flex-col justify-between
//           transition-all duration-300 z-40 shadow-lg
//           ${sidebarOpen ? "w-72 px-4 py-6" : "w-24 px-2 py-6"}
//           md:w-72 md:px-4 md:static
//         `}
//       >
//         {/* Logo */}
//         <div className="flex items-center justify-center mb-10">
//           {sidebarOpen ? (
//             <span className="text-3xl font-bold text-white">MyApp</span>
//           ) : (
//             <span className="text-2xl font-bold text-white">M</span>
//           )}
//         </div>

//         {/* Menu Items */}
//         <nav className="flex flex-col gap-2 flex-1">
//           <SidebarMenuItems sidebarOpen={sidebarOpen} />
//         </nav>

//         {/* Profile */}
//         <div className="relative">
//           <div
//             onClick={() => setProfileMenuOpen((prev) => !prev)}
//             className={`flex items-center rounded-md cursor-pointer transition-all duration-300 ${
//               sidebarOpen ? "space-x-3 bg-gray-900 px-3 py-2" : "justify-center bg-gray-800 p-2"
//             }`}
//           >
//             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
//               {userName.charAt(0).toUpperCase()}
//             </div>
//             {sidebarOpen && (
//               <>
//                 <span className="font-medium transition-all duration-300">{userName}</span>
//                 {profileMenuOpen ? (
//                   <ChevronUp className="w-4 h-4 text-white" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4 text-white" />
//                 )}
//               </>
//             )}
//           </div>

//           {/* Dropdown Card */}
//           {sidebarOpen && profileMenuOpen && (
//             <div className="absolute bottom-full mb-2 left-0 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-green-500 w-full">
//               <div
//                 className="px-4 py-3 hover:bg-gray-700 cursor-pointer text-white text-sm"
//                 onClick={() => alert("Change Password clicked")}
//               >
//                 Change Password
//               </div>
//               <div
//                 className="px-4 py-3 hover:bg-gray-700 cursor-pointer text-white text-sm"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Modal */}
//       <Modal show={showModal} message={modalMessage} onClose={handleModalOk} />
//     </>
//   );
// }
