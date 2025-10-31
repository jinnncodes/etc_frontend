import { useState, useMemo } from "react";
import Button from "../common/Button";
import RequestModal from "../common/RequestModal";
import { mockRequests } from "../dummy/mockRequest";

export default function RequestBody() {
  const [filter, setFilter] = useState("");
  const [modalType, setModalType] = useState<"Regular" | "Urgent" | null>(null);

  const filteredRequests = useMemo(
    () =>
      mockRequests.filter((req) =>
        req.description.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  return (
    <div className="w-full bg-white rounded-lg shadow p-6 min-h-[500px] flex flex-col">
      {/* Header: Filter + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <input
          id="requestfilter"
          type="text"
          placeholder="Filter by description..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-black w-full sm:w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 border-[#c9c9c9]"
        />

        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button color="green" size="sm" onClick={() => setModalType("Regular")}>
            Regular Request
          </Button>
          <Button color="red" size="sm" onClick={() => setModalType("Urgent")}>
            Urgent Request
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 font-medium">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Images</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4">{req.id}</td>
                <td className="py-2 px-4">{req.date}</td>
                <td className="py-2 px-4">{req.time}</td>
                <td className="py-2 px-4">{req.description}</td>
                <td className="py-2 px-4">{req.location || "-"}</td>
                <td className="py-2 px-4">
                  {req.images?.length ? req.images.join(", ") : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalType && (
        <RequestModal
          show={!!modalType}
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
