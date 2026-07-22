// src/Components/admin/Layout.jsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 lg:ml-64">

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between bg-white border-b px-5 py-4 shadow-sm">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-gray-800">
            WedPlan Admin
          </h1>

        </header>

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}