import { useEffect, useState } from 'react';
import { Eye, Edit, Check, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getPlanners } from '../services/adminService';

export default function ManagePlanners() {
  const [planners, setPlanners] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [approvalFilter, setApprovalFilter] = useState('All');

  useEffect(() => {
    getPlanners().then((data) => setPlanners(data));
  }, []);

  const filtered = planners.filter((planner) => {
    const matchSearch = planner.name.toLowerCase().includes(search.toLowerCase()) ||
                        planner.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || planner.status === statusFilter;
    const matchApproval = approvalFilter === 'All' || planner.approved === (approvalFilter === 'Approved');
    return matchSearch && matchStatus && matchApproval;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Planners</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <select
            value={approvalFilter}
            onChange={(e) => setApprovalFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Approval</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center">
                  <EmptyState message="No planners found" />
                </td>
              </tr>
            ) : (
              filtered.map((planner) => (
                <tr key={planner.id}>
                  <td className="px-4 py-4 text-sm text-gray-900">{planner.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{planner.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{planner.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{planner.experience}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{planner.specialization}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{planner.rating}</td>
                  <td className="px-4 py-4"><StatusBadge status={planner.status} /></td>
                  <td className="px-4 py-4">
                    {planner.approved ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800"><Eye className="w-4 h-4" /></button>
                      <button className="text-indigo-600 hover:text-indigo-800"><Edit className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-800"><Check className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-800"><X className="w-4 h-4" /></button>
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