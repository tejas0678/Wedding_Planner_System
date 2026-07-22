import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import { getDashboardStats } from "../services/adminService";

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
    loadDashboard();
  }, []);


  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };


  const cards = [
    { title: "👥 Total Clients", value: stats.totalClients },
    { title: "💼 Total Planners", value: stats.totalPlanners },
    { title: "💍 Total Weddings", value: stats.totalWeddings },
    { title: "📦 Total Packages", value: stats.totalPackages },
    { title: "⏳ Pending Bookings", value: stats.pendingBookings },
  ];


  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          📊 Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          👋 Welcome back, Administrator
        </p>
      </div>


      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        {cards.map((card, index) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            index={index}
          />
        ))}

      </div>



      {/* Activities and Planners */}
      <div className="grid lg:grid-cols-2 gap-6">


        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow border">

          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">
              🔔 Recent Activities
            </h2>
          </div>


          <div>

            {stats.recentActivities.length === 0 ? (

              <EmptyState message="No recent activity available." />

            ) : (

              stats.recentActivities.map((activity) => (

                <div
                  key={activity.id}
                  className="p-5 border-b last:border-none"
                >

                  <h4 className="font-semibold">
                    👤 {activity.clientName}
                  </h4>


                  <p className="text-gray-500">
                    💼 {activity.plannerName}
                  </p>


                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {activity.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>




        {/* Top Planners */}
        <div className="bg-white rounded-xl shadow border">

          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">
              ⭐ Top Planners
            </h2>
          </div>


          <div>

            {stats.topPlanners.length === 0 ? (

              <EmptyState message="No planner data available." />

            ) : (

              stats.topPlanners.map((planner) => (

                <div
                  key={planner.id}
                  className="flex justify-between items-center p-5 border-b last:border-none"
                >

                  <div>

                    <h4 className="font-semibold">
                      👤 {planner.name}
                    </h4>


                    <p className="text-gray-500">
                      🎯 {planner.specialization}
                    </p>

                  </div>


                  <span className="font-semibold text-yellow-500">
                    ⭐ {planner.rating}
                  </span>


                </div>

              ))

            )}

          </div>

        </div>


      </div>


    </div>
  );
}