import { useEffect, useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getClients } from '../services/adminService';

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    getClients().then((data) => setClients(data));
  }, []);

  const filtered = clients.filter((client) => {
    const matchSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
                        client.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Clients</h1>

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
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center">
                  <EmptyState message="No clients found" />
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr key={client.id}>
                  <td className="px-4 py-4 text-sm text-gray-900">{client.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{client.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{client.email}</td>
                  <td className="px-4 py-4"><StatusBadge status={client.status} /></td>
                  <td className="px-4 py-4 text-sm text-gray-500">{client.created}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800"><Eye className="w-4 h-4" /></button>
                      <button className="text-indigo-600 hover:text-indigo-800"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
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