import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MdCalendarToday,
  MdFavorite,
  MdPayment,
  MdTrendingUp,
  MdSearch,
  MdCardGiftcard,
} from 'react-icons/md'
import DashboardCard from '../components/DashboardCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    totalBookings: '0',
    upcomingWedding: 'Not Booked',
    paymentStatus: 'Pending',
    weddingProgress: '0%'
  })
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Guest')

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API calls
        // const userResponse = await fetch('/api/user/profile')
        // const userData = await userResponse.json()
        // setUserName(userData.name)
        
        // const statsResponse = await fetch('/api/dashboard/stats')
        // const statsData = await statsResponse.json()
        // setDashboardData(statsData)
        
        // For demo, using default values
        setUserName('Olivia Johnson')
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const dashboardCards = [
    {
      label: 'Total Bookings',
      value: dashboardData.totalBookings,
      icon: <MdCalendarToday size={20} />,
    },
    {
      label: 'Upcoming Wedding',
      value: dashboardData.upcomingWedding,
      icon: <MdFavorite size={20} />,
    },
    {
      label: 'Payment Status',
      value: dashboardData.paymentStatus,
      icon: <MdPayment size={20} />,
    },
    {
      label: 'Wedding Progress',
      value: dashboardData.weddingProgress,
      icon: <MdTrendingUp size={20} />,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {userName}!
          </h2>
          <p className="text-gray-400 text-sm mt-1">Your wedding journey at a glance.</p>
        </div>
        <button
          onClick={() => navigate('/client/bookings')}
          className="flex items-center gap-2 bg-[#EC0B72] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200 self-start sm:self-auto text-sm whitespace-nowrap"
        >
          <MdCalendarToday size={16} />
          Book Wedding
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Selected Planner + Package */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Selected Planner */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center min-h-[200px] justify-between">
          <h3 className="text-base font-bold text-gray-900 self-start mb-4">Selected Planner</h3>
          <div className="flex flex-col items-center flex-1 justify-center">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-3">
              <MdSearch size={32} className="text-[#EC0B72]" />
            </div>
            <p className="text-sm text-gray-400 mb-4">No planner selected</p>
            <button
              onClick={() => navigate('/client/planners')}
              className="flex items-center gap-2 bg-[#EC0B72] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200"
            >
              <MdSearch size={16} />
              Browse Planners
            </button>
          </div>
        </div>

        {/* Selected Package */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center min-h-[200px] justify-between">
          <h3 className="text-base font-bold text-gray-900 self-start mb-4">Selected Package</h3>
          <div className="flex flex-col items-center flex-1 justify-center">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-3">
              <MdCardGiftcard size={32} className="text-[#EC0B72]" />
            </div>
            <p className="text-sm text-gray-400 mb-4">No package selected</p>
            <button
              onClick={() => navigate('/client/packages')}
              className="bg-[#EC0B72] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200"
            >
              View Packages
            </button>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">My Recent Bookings</h3>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-400">No bookings found.</p>
        </div>
      </div>
    </div>
  )
}