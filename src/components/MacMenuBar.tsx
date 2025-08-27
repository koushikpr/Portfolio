import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wifi, 
  Battery, 
  Search,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const MacMenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { name: 'Portfolio', active: true },
    { name: 'About', active: false },
    { name: 'Projects', active: false },
    { name: 'Experience', active: false },
    { name: 'Contact', active: false },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-7 mac-menubar text-sm">
      <div className="flex items-center justify-between h-full px-4">
        
        {/* Left side - App menu */}
        <div className="flex items-center space-x-6">
          {/* Apple logo */}
          <div className="w-5 h-5 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Apple Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* App name */}
          <span className="font-semibold text-mac-gray-800 dark:text-teal-100">
            Koushik's Portfolio
          </span>
          
          {/* Menu items */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`px-2 py-1 rounded transition-colors ${
                  item.active 
                    ? 'bg-mac-blue-500 text-white' 
                    : 'text-mac-gray-600 hover:text-mac-gray-800 dark:text-teal-300 dark:hover:text-teal-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - System status */}
        <div className="flex items-center space-x-4">
          {/* App Store */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 cursor-pointer"
          >
            
          </motion.div>

          {/* Search */}
          <Search className="w-4 h-4 text-mac-gray-600 hover:text-mac-gray-800 dark:text-teal-300 dark:hover:text-teal-100 cursor-pointer transition-colors" />
          
          {/* Dark mode toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-mac-gray-600 hover:text-mac-gray-800 dark:text-teal-300 dark:hover:text-teal-100 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
          
          {/* System icons */}
          <Wifi className="w-4 h-4 text-mac-gray-600 dark:text-teal-300" />
          <Battery className="w-4 h-4 text-mac-gray-600 dark:text-teal-300" />
          
          {/* Time */}
          <div className="text-mac-gray-800 dark:text-teal-100 font-medium">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })} {currentTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MacMenuBar
