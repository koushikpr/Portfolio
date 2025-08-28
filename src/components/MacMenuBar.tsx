import { useState, useEffect } from 'react'
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.menu-dropdown-container')) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  const menuItems = [
    { 
      name: 'About', 
      active: false,
      hasDropdown: true,
      dropdownItems: [
        { name: 'My Profile', action: () => console.log('My Profile clicked') },
        { name: 'Resume', action: () => console.log('Resume clicked') },
        { name: 'Contact', action: () => console.log('Contact clicked') }
      ]
    },
    { 
      name: 'Projects', 
      active: false,
      hasDropdown: true,
      dropdownItems: [
        { name: 'AI/ML Pipeline', action: () => console.log('AI/ML Pipeline clicked') },
        { name: 'WiFi Throughput Prediction', action: () => console.log('WiFi Throughput Prediction clicked') },
        { name: 'AWS Terraform', action: () => console.log('AWS Terraform clicked') },
        { name: 'CI/CD Pipeline', action: () => console.log('CI/CD Pipeline clicked') },
        { name: 'Containerized Flask', action: () => console.log('Containerized Flask clicked') },
        { name: 'Spring Boot GKE', action: () => console.log('Spring Boot GKE clicked') }
      ]
    },
    { 
      name: 'Experience', 
      active: false,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Stevens Institute of Technology', action: () => console.log('Stevens clicked') },
        { name: 'Sellwizr', action: () => console.log('Sellwizr clicked') },
        { name: 'Antwalk', action: () => console.log('Antwalk clicked') },
        { name: 'Tech Musketeers', action: () => console.log('Tech Musketeers clicked') },
        { name: 'Softnerve', action: () => console.log('Softnerve clicked') }
      ]
    },
  ]

  const handleMenuClick = (item: any) => {
    if (item.hasDropdown) {
      setActiveDropdown(activeDropdown === item.name ? null : item.name)
    } else {
      setActiveDropdown(null)
      // Handle regular menu item click
      console.log(`${item.name} clicked`)
    }
  }

  const handleDropdownItemClick = (dropdownItem: any) => {
    dropdownItem.action()
    setActiveDropdown(null)
  }

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
              <div key={item.name} className="relative menu-dropdown-container">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`px-2 py-1 rounded transition-colors ${
                    item.active || activeDropdown === item.name
                      ? 'bg-mac-blue-500 text-white' 
                      : 'text-mac-gray-600 hover:text-mac-gray-800 dark:text-teal-300 dark:hover:text-teal-100'
                  }`}
                >
                  {item.name}
                </button>
                
                {/* Dropdown menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-md shadow-2xl border border-black/10 dark:border-white/10 py-1 min-w-48 z-50"
                    style={{
                      boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)'
                    }}
                  >
                    {item.dropdownItems?.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownItemClick(dropdownItem)}
                        className="w-full text-left px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-75 font-normal"
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
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
