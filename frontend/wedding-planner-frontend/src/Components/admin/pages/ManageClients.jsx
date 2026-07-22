import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { getClients } from "../services/adminService";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data || []);
    } catch (error) {
      console.error(error);
      setClients([]);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Clients
        </h1>

        <p className="mt-2 text-gray-500">
          View, search and manage all registered clients.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name or email..."
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Client ID
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>

              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredClients.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="py-10"
                >
                  <EmptyState message="No clients found." />
                </td>

              </tr>

            ) : (

              filteredClients.map((client) => (

                <tr
                  key={client.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4">
                    {client.id}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {client.name}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {client.email}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {client.phone}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={client.status} />
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {client.created}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
                        View
                      </button>

                      <button className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
                        Edit
                      </button>

                      <button className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                        Delete
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