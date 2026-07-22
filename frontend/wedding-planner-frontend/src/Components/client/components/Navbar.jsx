import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdMenu, MdNotifications } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useAppData } from '../context/AppDataContext'

const pageTitles = {
  '/client/dashboard': 'Dashboard',
  '/client/planners': 'Browse Planners',
  '/client/packages': 'Packages',
  '/client/bookings': 'My Bookings',
  '/client/payments': 'Payments',
  '/client/feedback': 'Feedback & Rating',
  '/client/profile': 'My Profile',
}

function timeAgo(value) {
  const date = new Date(value)
  const diffMs = Date.now() - date.getTime()
  if (Number.isNaN(diffMs)) return ''

  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function Navbar({ onMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { notifications } = useAppData()
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef(null)
  const title = pageTitles[location.pathname] || 'Dashboard'

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <MdMenu size={22} />
        </button>

        <div>
          <h1 className="text-base font-semibold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">Welcome back, Olivia</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <MdNotifications size={22} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EC0B72] rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-gray-400 text-center">No notifications yet</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <p className="text-sm text-gray-700">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{timeAgo(n.time)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => navigate('/client/profile')}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="My Profile"
        >
          <FaUserCircle size={28} className="text-[#EC0B72]" />
          <span className="text-sm font-medium text-gray-700 hidden md:block">Olivia J.</span>
        </button>
      </div>
    </header>
  )
}
