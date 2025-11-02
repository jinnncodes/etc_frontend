import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import ExportToExcel from "../common/ExportToExcel";
import UserModal from "../common/UserModal";
import type { User } from "../../api/user";
import { createUser, getUsers } from "../../api/user";

export default function UserBody() {
  const [filter, setFilter] = useState<string>("");
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const hasFetched = useRef(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, []);

  // Filtered users for table display
const filteredUsers = useMemo(
  () =>
    users.filter((user) =>
      (user.name ?? "").toLowerCase().includes(filter.toLowerCase())
    ),
  [filter, users]
);


  // Submit new user to API
  const handleSubmitUser = async (userData: User) => {
    try {
      const newUser = await createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      setShowUserModal(false);
      navigate("/users");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to create user");
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-6 min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-black w-full sm:w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 border-[#c9c9c9]"
        />

        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button
            color="green"
            size="sm"
            onClick={() => setShowUserModal(true)}
          >
            Submit
          </Button>

          <ExportToExcel
            fileName="User_List"
            data={filteredUsers as Record<string, unknown>[]}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 font-medium">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Branch ID</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.branch_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      <UserModal
        show={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleSubmitUser} // Pass API function
      />
    </div>
  );
}
