import { useEffect, useState } from 'react';
import { Users, Calendar, Package, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import { getDashboardStats } from '../services/adminService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalPlanners: 0,
    totalWeddings: 0,
    totalPackages: 0,
    pendingBookings: 0,
    recentActivities: [],
    topPlanners: [],
  });

  useEffect(() => {
    getDashboardStats().then((data) => setStats(data));
  }, []);

  const statItems = [
    { title: 'Total Clients', value: stats.totalClients, icon: Users },
    { title: 'Total Planners', value: stats.totalPlanners, icon: Users },
    { title: 'Total Weddings', value: stats.totalWeddings, icon: Calendar },
    { title: 'Total Packages', value: stats.totalPackages, icon: Package },
    { title: 'Pending Bookings', value: stats.pendingBookings, icon: Clock },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {statItems.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      {/* Recent Activity & Top Planners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {stats.recentActivities.length === 0 ? (
            <p className="text-gray-500">No recent activity available.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {stats.recentActivities.map((activity, idx) => (
                <li key={idx} className="py-2">
                  <p className="text-sm">{activity}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Top Planners</h2>
          {stats.topPlanners.length === 0 ? (
            <p className="text-gray-500">No planner data available.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {stats.topPlanners.map((planner, idx) => (
                <li key={idx} className="py-2">
                  <p className="font-medium">{planner.name}</p>
                  <p className="text-sm text-gray-500">{planner.specialization}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}