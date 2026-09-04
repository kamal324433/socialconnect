import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'
import { 
  Home, 
  Zap, 
  Compass, 
  TrendingUp, 
  Users, 
  Menu, 
  X,
  ChevronRight 
} from 'lucide-react'

export default function Sidebar() {
  const { isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useSidebar()
  const location = useLocation()

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/', color: 'text-blue-600' },
    { icon: Zap, label: 'Challenges', path: '/challenges', color: 'text-cyan-600' },
    { icon: Compass, label: 'How It Works', path: '/how-it-works', color: 'text-red-600' },
    { icon: TrendingUp, label: 'Impact', path: '/impact', color: 'text-teal-600' },
    { icon: Users, label: 'About Us', path: '/about', color: 'text-purple-600' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-40 md:hidden bg-gradient-primary text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
        title="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto flex flex-col bg-white border-r-2 border-gray-100 shadow-lg md:shadow-sm transition-all duration-300 z-40 pt-20 md:pt-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64 w-64'}
        `}
      >
        {/* Sidebar Header - Desktop Only */}
        <div className="hidden md:flex h-24 bg-gradient-to-br from-blue-900 to-cyan-700 items-center justify-between px-4 sticky top-0 z-50">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-black text-lg">SC</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">SocialConnect</p>
                <p className="text-blue-100 text-xs">Navigate</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition-all"
            title="Toggle Sidebar"
          >
            <ChevronRight size={20} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${
                    active
                      ? 'bg-gradient-primary text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                title={item.label}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-all ${
                    active ? 'text-white scale-110' : `${item.color} group-hover:scale-110`
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className={`font-semibold text-sm whitespace-nowrap ${active ? 'text-white' : 'text-gray-800'}`}>
                      {item.label}
                    </span>
                    {active && <ChevronRight size={18} className="ml-auto" />}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className={`text-center ${isCollapsed ? 'text-xs' : 'text-sm'}`}>
            <p className="text-gray-600 font-medium">SIH 2026</p>
            <p className="text-gray-400 text-xs">Innovation Platform</p>
          </div>
        </div>
      </aside>
    </>
  )
}

