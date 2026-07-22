import { useEffect, useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { getPackages } from '../services/adminService';

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages().then((data) => setPackages(data));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Packages</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {packages.length === 0 ? (
        <EmptyState message="No packages available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
              <div className="mt-2 text-indigo-700 font-bold">₹{pkg.price.toLocaleString()}</div>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end gap-2">
                <button className="text-indigo-600 hover:text-indigo-800"><Edit className="w-4 h-4" /></button>
                <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}