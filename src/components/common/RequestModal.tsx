// components/common/RequestModal.tsx
import React, { useState } from "react";
import Button from "./Button";


export interface RequestModalProps {
  show: boolean;
  onClose: () => void;
  type: "Regular" | "Urgent";
}

export default function RequestModal({ show, onClose, type }: RequestModalProps) {
  const [formData, setFormData] = useState({
    requestType: "Driver",
    date: "",
    time: "",
    description: "",
    images: [] as File[],
  });

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      images: e.target.files ? Array.from(e.target.files) : [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 pt-25">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">{type} Request</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Request Type */}
          <label>
            Request Type
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#c9c9c9] rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Driver">Driver</option>
              <option value="StaffRescue">StaffRescue</option>
              <option value="ProductPickup">Product Pickup</option>
            </select>
          </label>

          {/* Date */}
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#c9c9c9] rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>

          {/* Time */}
          <label>
            Time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#c9c9c9] rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>

          {/* Description */}
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#c9c9c9] rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>

          {/* Images */}
          <label>
            Images (Optional)
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              className="w-full px-3 py-2 border border-[#c9c9c9] rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              color={type === "Urgent" ? "red" : "green"}
              size="sm"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
