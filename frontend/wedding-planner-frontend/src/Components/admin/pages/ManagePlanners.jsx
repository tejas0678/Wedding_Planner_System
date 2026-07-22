import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { getPlanners } from "../services/adminService";

export default function ManagePlanners() {

  const [planners, setPlanners] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  useEffect(() => {
    loadPlanners();
  }, []);

  const loadPlanners = async () => {
    try {
      const data = await getPlanners();
      setPlanners(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = planners.filter((planner) => {

    const matchSearch =
      planner.name.toLowerCase().includes(search.toLowerCase()) ||
      planner.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      planner.status === statusFilter;

    const matchApproval =
      approvalFilter === "All" ||
      planner.approvalStatus === approvalFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchApproval
    );
  });

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Manage Planners
        </h1>

        <p className="text-gray-500 mt-2">
          Approve, reject and manage planners.
        </p>

      </div>

      <div className="bg-white rounded-xl shadow border p-5">

        <div className="grid md:grid-cols-3 gap-4">

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Planner..."
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2"
            value={approvalFilter}
            onChange={(e) =>
              setApprovalFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-5 py-3 text-left">ID</th>

              <th className="px-5 py-3 text-left">Planner</th>

              <th className="px-5 py-3 text-left">Email</th>

              <th className="px-5 py-3 text-left">Experience</th>

              <th className="px-5 py-3 text-left">Specialization</th>

              <th className="px-5 py-3 text-left">Rating</th>

              <th className="px-5 py-3 text-left">Status</th>

              <th className="px-5 py-3 text-left">Approval</th>

              <th className="px-5 py-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>

                <td colSpan="9">

                  <EmptyState message="No planners found." />

                </td>

              </tr>

            ) : (

              filtered.map((planner) => (

                <tr
                  key={planner.id}
                  className="border-t"
                >

                  <td className="px-5 py-4">
                    {planner.id}
                  </td>

                  <td className="px-5 py-4">
                    {planner.name}
                  </td>

                  <td className="px-5 py-4">
                    {planner.email}
                  </td>

                  <td className="px-5 py-4">
                    {planner.experience}
                  </td>

                  <td className="px-5 py-4">
                    {planner.specialization}
                  </td>

                  <td className="px-5 py-4">
                    {planner.rating}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={planner.status} />
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={planner.approvalStatus} />
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
                        View
                      </button>

                      <button className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600">
                        Edit
                      </button>

                      <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">
                        Approve
                      </button>

                      <button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}