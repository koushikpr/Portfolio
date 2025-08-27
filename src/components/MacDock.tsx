import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy
} from 'lucide-react'
import CalendarIcon from './CalendarIcon'

const MacDock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const dockItems = [
    { id: 'finder', name: 'Finder', icon: null, section: 'finder', isCustomIcon: true, iconPath: '/finder.png' },
    { id: 'launchpad', name: 'Launchpad', icon: null, section: 'launchpad', isCustomIcon: true, iconPath: '/launchpad-bigsur.png' },
    { id: 'about', name: 'About Me', icon: null, section: 'hero', isCustomIcon: true, iconPath: '/contact.png' },
    { id: 'projects', name: 'Projects', icon: null, section: 'projects', isCustomIcon: true, iconPath: '/vscode.png' },
    { id: 'experience', name: 'Experience', icon: Briefcase, section: 'experience' },
    { id: 'education', name: 'Education', icon: GraduationCap, section: 'education' },
    { id: 'certifications', name: 'Certifications', icon: Award, section: 'certifications' },
    { id: 'achievements', name: 'Achievements', icon: Trophy, section: 'achievements' },
    { id: 'appstore', name: 'App Store', icon: null, section: 'appstore', isCustomIcon: true, iconPath: '/appstore.png' },
    { id: 'calendar', name: 'Calendar', icon: null, section: 'calendar', isCustomIcon: true, isDynamic: true },
    { id: 'github', name: 'GitHub', icon: null, section: 'github', isCustomIcon: true, iconPath: '/github.png' },
    { id: 'linkedin', name: 'LinkedIn', icon: null, section: 'linkedin', isCustomIcon: true, iconPath: '/linkedin.webp' },
    { id: 'mail', name: 'Mail', icon: null, section: 'contact', isCustomIcon: true, iconPath: '/mail.png' },
    { id: 'contacts', name: 'Contacts', icon: null, section: 'contact', isCustomIcon: true, iconPath: '/contact.png' },
    { id: 'folder', name: 'Folder', icon: null, section: 'folder', isCustomIcon: true, iconPath: '/folder-icon.webp' },
    { id: 'trash', name: 'Trash', icon: null, section: 'trash', isCustomIcon: true, iconPath: '/recyclebin.png' },
  ]

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'finder') {
      // Handle finder - could show file browser or navigate to desktop
      console.log('Finder clicked')
      return
    }
    if (sectionId === 'launchpad') {
      // Handle launchpad - could show app grid or portfolio overview
      console.log('Launchpad clicked')
      return
    }
    if (sectionId === 'github') {
      window.open('https://github.com/koushikpr', '_blank')
      return
    }
    if (sectionId === 'linkedin') {
      window.open('https://linkedin.com/in/koushikpr', '_blank')
      return
    }
    if (sectionId === 'appstore') {
      // Could open App Store or show portfolio apps
      console.log('App Store clicked')
      return
    }
    if (sectionId === 'folder') {
      // Could show file manager or portfolio files
      console.log('Folder clicked')
      return
    }
    if (sectionId === 'contacts') {
      // Handle contacts app
      console.log('Contacts app clicked')
      return
    }
    if (sectionId === 'calendar') {
      // Handle calendar app
      console.log('Calendar app clicked')
      return
    }

    if (sectionId === 'trash') {
      // Handle trash - could show a modal or animation
      console.log('Trash clicked')
      return
    }
    
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="flex items-end space-x-1 bg-white/10 dark:bg-teal-dark-900/20 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20 dark:border-teal-dark-700/30 shadow-mac-xl"
      >
        {dockItems.map((item) => (
          <React.Fragment key={item.id}>
            {/* Add separator before GitHub (social/communication apps) */}
            {item.id === 'github' && (
              <div className="w-px h-12 bg-white/30 dark:bg-teal-dark-600/40 mx-1 self-center"></div>
            )}
            {/* Add separator before Folder (system items) */}
            {item.id === 'folder' && (
              <div className="w-px h-12 bg-white/30 dark:bg-teal-dark-600/40 mx-1 self-center"></div>
            )}
          <motion.div
            key={item.id}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Tooltip */}
            {hoveredItem === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-mac-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
              >
                {item.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-mac-gray-800"></div>
              </motion.div>
            )}
            
            {/* Dock item */}
            <motion.button
              onClick={() => scrollToSection(item.section)}
              className="mac-dock-item w-14 h-14 transition-all duration-200"
              animate={{
                scale: hoveredItem === item.id ? 1.3 : 1,
                y: hoveredItem === item.id ? -8 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {item.isCustomIcon ? (
                item.id === 'calendar' ? (
                  <CalendarIcon />
                ) : (
                  <img 
                    src={item.iconPath} 
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-xl"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
                  />
                )
              ) : item.icon ? (
                <div className="w-12 h-12 bg-gradient-to-br from-mac-gray-200 to-mac-gray-400 rounded-xl flex items-center justify-center shadow-lg">
                  <item.icon className="w-7 h-7 text-mac-gray-700" />
                </div>
              ) : null}
            </motion.button>
            
            {/* Active indicator */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-mac-gray-600 rounded-full opacity-60"></div>
          </motion.div>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default MacDock
