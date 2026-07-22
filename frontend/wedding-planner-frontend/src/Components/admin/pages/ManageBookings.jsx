import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { getBookings } from "../services/adminService";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (error) {
      console.error(error);
      setBookings([]);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.plannerName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Bookings
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage all wedding bookings.
        </p>
      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search client or planner..."
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-3 text-left">
                Booking ID
              </th>

              <th className="px-5 py-3 text-left">
                Client
              </th>

              <th className="px-5 py-3 text-left">
                Planner
              </th>

              <th className="px-5 py-3 text-left">
                Wedding Date
              </th>

              <th className="px-5 py-3 text-left">
                Package
              </th>

              <th className="px-5 py-3 text-left">
                Amount
              </th>

              <th className="px-5 py-3 text-left">
                Status
              </th>

              <th className="px-5 py-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="py-10"
                >
                  <EmptyState message="No bookings found." />
                </td>

              </tr>

            ) : (

              filteredBookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {booking.id}
                  </td>

                  <td className="px-5 py-4">
                    {booking.clientName}
                  </td>

                  <td className="px-5 py-4">
                    {booking.plannerName}
                  </td>

                  <td className="px-5 py-4">
                    {booking.weddingDate}
                  </td>

                  <td className="px-5 py-4">
                    {booking.packageName}
                  </td>

                  <td className="px-5 py-4">
                    ₹{booking.amount}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center">

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
                      >
                        View
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