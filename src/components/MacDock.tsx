import React, { useState } from 'react'
import { motion } from 'framer-motion'

import CalendarIcon from './CalendarIcon'
import MasterFinderWindow from './MasterFinderWindow'

const MacDock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<Array<{id: string, title: string, originX: number, originY: number, folder: string, isMinimized: boolean}>>([])



  const handleDockItemClick = (folderId: string, title: string, folder: string) => {
    const existingWindow = openWindows.find(window => window.id === folderId)
    
    if (existingWindow) {
      // Window exists - toggle minimize/restore
      if (existingWindow.isMinimized) {
        // Restore window
        setOpenWindows(prev => prev.map(window => 
          window.id === folderId 
            ? { ...window, isMinimized: false }
            : window
        ))
      } else {
        // Minimize window
        setOpenWindows(prev => prev.map(window => 
          window.id === folderId 
            ? { ...window, isMinimized: true }
            : window
        ))
      }
    } else {
      // Open new window
      const dockElement = document.querySelector('.mac-dock-container')
      const folderIconElement = document.querySelector(`[data-dock-id="${folderId}"]`)
      
      let originX = window.innerWidth / 2 // Default to center
      let originY = window.innerHeight - 100 // Default to bottom
      
      if (dockElement && folderIconElement) {
        const iconRect = folderIconElement.getBoundingClientRect()
        originX = iconRect.left + iconRect.width / 2
        originY = iconRect.top + iconRect.height / 2
      }
      
      setOpenWindows(prev => [...prev, { id: folderId, title, originX, originY, folder, isMinimized: false }])
    }
  }

  const closeFolderWindow = (folderId: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== folderId))
  }

  const dockItems = [
    { id: 'finder', name: 'Finder', icon: null, section: 'finder', isCustomIcon: true, iconPath: '/finder.png' },
    { id: 'launchpad', name: 'Launchpad', icon: null, section: 'launchpad', isCustomIcon: true, iconPath: '/launchpad-bigsur.png' },
    { id: 'appstore', name: 'App Store', icon: null, section: 'appstore', isCustomIcon: true, iconPath: '/appstore.png' },
    { id: 'projects', name: 'Projects', icon: null, section: 'projects', isCustomIcon: true, iconPath: '/vscode.png' },
    { id: 'experience', name: 'Experience', icon: null, section: 'experience', isCustomIcon: true, iconPath: '/certifications-folder.png' },
    { id: 'education', name: 'Education', icon: null, section: 'education', isCustomIcon: true, iconPath: '/education-folder.png' },
    { id: 'certifications', name: 'Certifications', icon: null, section: 'certifications', isCustomIcon: true, iconPath: '/achievements-folder.png' },
    { id: 'events', name: 'Events', icon: null, section: 'events', isCustomIcon: true, iconPath: '/folder-icon.png' },
    { id: 'calendar', name: 'Calendar', icon: null, section: 'calendar', isCustomIcon: true, isDynamic: true },
    { id: 'github', name: 'GitHub', icon: null, section: 'github', isCustomIcon: true, iconPath: '/github.png' },
    { id: 'linkedin', name: 'LinkedIn', icon: null, section: 'linkedin', isCustomIcon: true, iconPath: '/linkedin.webp' },
    { id: 'mail', name: 'Mail', icon: null, section: 'contact', isCustomIcon: true, iconPath: '/mail.png' },
    { id: 'contacts', name: 'Contact Me', icon: null, section: 'contact', isCustomIcon: true, iconPath: '/contact.png' },
    { id: 'folder', name: 'Folder', icon: null, section: 'folder', isCustomIcon: true, iconPath: '/folder-icon.png' },
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
      // Open folder window
      handleDockItemClick('folder', 'Portfolio Files', 'about')
      return
    }
    
    // Handle portfolio folders that should open Finder windows
    const portfolioFolders = ['projects', 'experience', 'education', 'certifications', 'events']
    if (portfolioFolders.includes(sectionId)) {
      handleDockItemClick(sectionId, sectionId.charAt(0).toUpperCase() + sectionId.slice(1), sectionId)
      return
    }
    if (sectionId === 'contact') {
      // Open default email client with your email address
      window.location.href = 'mailto:kravikum1@stevens.edu'
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
    <>
      {/* Finder Windows */}
                  {openWindows.filter(window => !window.isMinimized).map((window) => (
              <MasterFinderWindow
                key={window.id}
                onClose={() => closeFolderWindow(window.id)}
                originX={window.originX}
                originY={window.originY}
                initialFolder={window.folder}
              />
            ))}

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mac-dock-container flex items-end space-x-1 bg-white/10 dark:bg-teal-dark-900/20 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20 dark:border-teal-dark-700/30 shadow-mac-xl"
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
              data-dock-id={item.id}
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
                  {React.createElement(item.icon, { className: "w-7 h-7 text-mac-gray-700" })}
                </div>
              ) : null}
            </motion.button>
            
            {/* Active indicator */}
            {(() => {
              const window = openWindows.find(w => w.id === item.id)
              if (window) {
                return (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    window.isMinimized 
                      ? 'bg-yellow-500 opacity-80' // Yellow dot for minimized
                      : 'bg-white opacity-90'      // White dot for open
                  }`}></div>
                )
              }
              return null
            })()}
          </motion.div>
          </React.Fragment>
        ))}
        </motion.div>
      </div>
    </>
  )
}

export default MacDock
