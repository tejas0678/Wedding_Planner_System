import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getBookings } from '../services/adminService';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    getBookings().then((data) => setBookings(data));
  }, []);

  const filtered = bookings.filter((booking) => {
    const matchSearch = booking.client.toLowerCase().includes(search.toLowerCase()) ||
                        booking.planner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || booking.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by client or planner..." />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planner</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center">
                  <EmptyState message="No bookings found" />
                </td>
              </tr>
            ) : (
              filtered.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-4 text-sm text-gray-900">{booking.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{booking.client}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{booking.planner}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{booking.package}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{booking.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{booking.venue}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">₹{booking.budget.toLocaleString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={booking.status} /></td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800"><Eye className="w-4 h-4" /></button>
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