import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  CreditCard,
  MessageSquare,
  LogOut,
  X,
  Heart,
} from 'lucide-react';

const navItems = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/admin/clients',
    label: 'Manage Clients',
    icon: Users,
  },
  {
    path: '/admin/planners',
    label: 'Manage Planners',
    icon: Users,
  },
  {
    path: '/admin/packages',
    label: 'Manage Packages',
    icon: Package,
  },
  {
    path: '/admin/bookings',
    label: 'Manage Bookings',
    icon: ClipboardList,
  },
  {
    path: '/admin/payments',
    label: 'Monitor Payments',
    icon: CreditCard,
  },
  {
    path: '/admin/feedback',
    label: 'Feedback & Reports',
    icon: MessageSquare,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64
          bg-white border-r border-gray-100
          transform transition-transform duration-300
          lg:translate-x-0 lg:static lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        <div className="flex flex-col h-full">

          {/* Logo + Admin Profile */}

          <div className="px-4 pt-5 pb-4 border-b border-gray-100">

            <div className="flex items-center gap-2 mb-4">

              <span
                className="w-7 h-7 rounded-lg grid place-items-center"
                style={{
                  background: '#fff0f3',
                  color: '#e91e4d',
                }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </span>

              <span
                className="text-lg font-bold"
                style={{ color: '#0f2747' }}
              >
                WedPlan Admin
              </span>

              <button
                onClick={closeSidebar}
                className="ml-auto lg:hidden text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            <div
              className="rounded-xl px-3 py-3"
              style={{ background: '#fff0f3' }}
            >

              <div
                className="text-xs font-semibold tracking-wide"
                style={{ color: '#e91e4d' }}
              >
                ADMIN
              </div>

              <div
                className="font-bold mt-1"
                style={{ color: '#0f2747' }}
              >
                Admin
              </div>

              <div
                className="text-xs mt-1 text-gray-500"
                style={{ fontFamily: 'Arial,sans-serif' }}
              >
                admin@example.com
              </div>

            </div>

          </div>

          {/* Navigation */}

          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">

            {navItems.map(
              ({ path, label, icon: Icon }) => (

                <NavLink
                  key={path}
                  to={path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-lg
                    text-sm
                    transition-all

                    ${
                      isActive
                        ? 'bg-[#fff0f3] text-[#e91e4d] font-semibold'
                        : 'text-[#29425f] hover:bg-gray-50'
                    }
                    `
                  }
                >

                  <Icon className="w-[18px] h-[18px]" />

                  <span>{label}</span>

                </NavLink>

              )
            )}

          </nav>

          {/* Logout */}

          <div className="p-3 border-t border-gray-100">

            <button
              onClick={() => console.log('Logout clicked')}
              className="
                flex items-center gap-3
                w-full px-3 py-2.5
                rounded-lg text-sm
                text-[#e91e4d]
                hover:bg-[#fff0f3]
              "
            >
              <LogOut className="w-[18px] h-[18px]" />

              <span>Logout</span>

            </button>

          </div>

        </div>

      </aside>
    </>
  );
}