import React, { useState } from "react";
import Button from "./Button";
import type { User } from "../../api/user";


export interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (userData: User) => Promise<void>;
}

export default function UserModal({ show, onClose, onSubmit }: UserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin" as User["role"],
    password: "",
    branch_id: "",
  });

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: User = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      branch_id: formData.branch_id,
      password: formData.password,
    };
    await onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </label>
          <label>
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Admin">Admin</option>
              <option value="Driver">Driver</option>
              <option value="Coordinator">Coordinator</option>
            </select>
          </label>
          <label>
            Branch ID
            <input
              type="text"
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button color="green" size="sm" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
