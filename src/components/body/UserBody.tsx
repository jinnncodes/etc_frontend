import { useState, useMemo } from "react";
import Button from "../common/Button";
import { mockUsers } from "../dummy/mockUsers";
import ExportToExcel from "../common/ExporttoExcel";

export default function UserBody() {
  const [filter, setFilter] = useState("");

  const filteredUsers = useMemo(
    () =>
      mockUsers.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  return (
    <div className="w-full bg-white rounded-lg shadow p-6 min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <input
          id="userfilter"
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-black w-full sm:w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 border-[#c9c9c9]"
        />

        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button color="green" size="sm" onClick={() => alert("Add new user clicked")}>
            Add User
          </Button>

          {/* Export */}
          <ExportToExcel
            fileName="User_List"
            data={filteredUsers}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 font-medium">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Created At</th>
              <th className="py-2 px-4">Updated At</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Branch ID</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.created_at}</td>
                <td className="py-2 px-4">{user.updated_at}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.branch_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
