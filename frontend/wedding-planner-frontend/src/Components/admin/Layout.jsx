// src/Components/admin/Layout.jsx
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white p-4 shadow-sm flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-indigo-700">
            WedPlan Admin
          </h1>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          <Outlet /> {/* ← renders /admin/* pages */}
        </main>
      </div>
    </div>
  );
}