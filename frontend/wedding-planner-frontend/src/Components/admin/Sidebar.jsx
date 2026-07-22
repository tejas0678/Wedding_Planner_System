// src/Components/admin/Sidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  CreditCard,
  MessageSquare,
  LogOut,
  Heart,
  X,
} from "lucide-react";

const navItems = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/clients",
    label: "Manage Clients",
    icon: Users,
  },
  {
    path: "/admin/planners",
    label: "Manage Planners",
    icon: Users,
  },
  {
    path: "/admin/packages",
    label: "Manage Packages",
    icon: Package,
  },
  {
    path: "/admin/bookings",
    label: "Manage Bookings",
    icon: ClipboardList,
  },
  {
    path: "/admin/payments",
    label: "Monitor Payments",
    icon: CreditCard,
  },
  {
    path: "/admin/reports",
    label: "Feedback & Reports",
    icon: MessageSquare,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const closeSidebar = () => setSidebarOpen(false);

  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-lg
          z-40 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}

          <div className="border-b p-5">

            <div className="flex items-center">

              <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">

                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />

              </div>

              <div className="ml-3">

                <h2 className="font-bold text-lg">
                  WedPlan
                </h2>

                <p className="text-xs text-gray-500">
                  Admin Panel
                </p>

              </div>

              <button
                onClick={closeSidebar}
                className="ml-auto lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

          </div>

          {/* Admin */}

          <div className="m-4 bg-rose-50 rounded-xl p-4">

            <p className="text-xs text-rose-500 uppercase">
              Administrator
            </p>

            <h3 className="font-semibold mt-2">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              admin@example.com
            </p>

          </div>

          {/* Navigation */}

          <nav className="flex-1 px-3">

            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                    isActive
                      ? "bg-rose-500 text-white"
                      : "text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}

          </nav>

          {/* Logout */}

          <div className="border-t p-4">

            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 w-full border border-rose-300 rounded-xl py-3 text-rose-500 hover:bg-rose-500 hover:text-white transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>

          </div>

        </div>
      </aside>
    </>
  );
}