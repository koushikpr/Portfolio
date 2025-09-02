import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useDeviceDetection } from '../hooks/useDeviceDetection'
import MasterFinderWindow from './MasterFinderWindow'
import PDFViewer from './PDFViewer'
import MobileLandscapeMessage from './MobileLandscapeMessage'

interface FolderItem {
  id: string
  name: string
  x: number
  y: number
  icon: string
  section?: string
}

const MacDesktop = () => {
  const { isDark } = useTheme()
  const deviceInfo = useDeviceDetection()
  const desktopRef = useRef<HTMLDivElement>(null)
  
  // Calculate responsive folder positions based on device type
  const getInitialFolderPositions = (): FolderItem[] => {
    if (deviceInfo.isMobile && deviceInfo.isLandscape) {
      // Mobile landscape: compact 2-column layout to fit within viewport
      return [
        { id: 'about', name: 'About Me', x: 60, y: 100, icon: '/contactme-folder.png', section: 'about' },
        { id: 'projects', name: 'My Projects', x: 180, y: 100, icon: '/cloud.png', section: 'projects' },
        { id: 'education', name: 'Education', x: 60, y: 200, icon: '/education-folder.png', section: 'education' },
        { id: 'certifications', name: 'Certifications', x: 180, y: 200, icon: '/achievements-folder.png', section: 'certifications' },
        { id: 'experience', name: 'Work Experience', x: 60, y: 300, icon: '/certifications-folder.png', section: 'experience' },
        { id: 'events', name: 'Events and Publications', x: 180, y: 300, icon: '/folder-icon.png', section: 'events' },
        { id: 'resume', name: 'Resume.pdf', x: 60, y: 400, icon: '/document.png' },
      ]
    } else if (deviceInfo.isMobile && deviceInfo.isPortrait) {
      // Mobile portrait: single column layout
      return [
        { id: 'about', name: 'About Me', x: 30, y: 100, icon: '/contactme-folder.png', section: 'about' },
        { id: 'projects', name: 'My Projects', x: 30, y: 200, icon: '/cloud.png', section: 'projects' },
        { id: 'experience', name: 'Work Experience', x: 30, y: 300, icon: '/certifications-folder.png', section: 'experience' },
        { id: 'education', name: 'Education', x: 30, y: 400, icon: '/education-folder.png', section: 'education' },
        { id: 'certifications', name: 'Certifications', x: 30, y: 500, icon: '/achievements-folder.png', section: 'certifications' },
        { id: 'events', name: 'Events and Publications', x: 30, y: 600, icon: '/folder-icon.png', section: 'events' },
        { id: 'resume', name: 'Resume.pdf', x: 30, y: 700, icon: '/document.png' },
      ]
    } else {
      // Desktop: original layout
      return [
        { id: 'about', name: 'About Me', x: 60, y: 120, icon: '/contactme-folder.png', section: 'about' },
        { id: 'projects', name: 'My Projects', x: 60, y: 240, icon: '/cloud.png', section: 'projects' },
        { id: 'experience', name: 'Work Experience', x: 60, y: 360, icon: '/certifications-folder.png', section: 'experience' },
        { id: 'education', name: 'Education', x: 180, y: 120, icon: '/education-folder.png', section: 'education' },
        { id: 'certifications', name: 'Certifications', x: 180, y: 240, icon: '/achievements-folder.png', section: 'certifications' },
        { id: 'events', name: 'Events and Publications', x: 180, y: 360, icon: '/folder-icon.png', section: 'events' },
        { id: 'resume', name: 'Resume.pdf', x: 60, y: 480, icon: '/document.png' },
      ]
    }
  }

  const [folders, setFolders] = useState<FolderItem[]>(getInitialFolderPositions())

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [openFinderWindow, setOpenFinderWindow] = useState(false)
  const [finderWindowOrigin, setFinderWindowOrigin] = useState({ x: 0, y: 0 })
  const [finderWindowFolder, setFinderWindowFolder] = useState<string>('education')
  const [openPDFViewer, setOpenPDFViewer] = useState(false)
  const [pdfViewerOrigin, setPdfViewerOrigin] = useState({ x: 0, y: 0 })

  // Update folder positions when device orientation changes
  useEffect(() => {
    setFolders(getInitialFolderPositions())
  }, [deviceInfo.isLandscape, deviceInfo.isPortrait, deviceInfo.isMobile])



  const handleFolderDoubleClick = (folder: FolderItem) => {
    // Check if folder should open Finder window
    const finderFolders = ['about', 'education', 'achievements', 'projects', 'certifications', 'experience', 'events']
    
    if (finderFolders.includes(folder.id)) {
      // Open Finder Window with appropriate folder
      const folderElement = document.querySelector(`[data-folder-id="${folder.id}"]`)
      if (folderElement) {
        const rect = folderElement.getBoundingClientRect()
        setFinderWindowOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
      setFinderWindowFolder(folder.id)
      setOpenFinderWindow(true)
    } else if (folder.id === 'resume') {
      // Open PDF viewer for resume
      const folderElement = document.querySelector(`[data-folder-id="${folder.id}"]`)
      if (folderElement) {
        const rect = folderElement.getBoundingClientRect()
        setPdfViewerOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
      setOpenPDFViewer(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, folderId: string) => {
    // Disable dragging on mobile devices
    if (deviceInfo.isMobile) return
    
    e.preventDefault()
    const folder = folders.find(f => f.id === folderId)
    if (!folder) return

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setSelectedFolder(folderId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedFolder || !desktopRef.current) return

    const desktopRect = desktopRef.current.getBoundingClientRect()
    const newX = e.clientX - desktopRect.left - dragOffset.x
    const newY = e.clientY - desktopRect.top - dragOffset.y

    // Constrain to desktop bounds
    const constrainedX = Math.max(0, Math.min(newX, desktopRect.width - 100))
    const constrainedY = Math.max(0, Math.min(newY, desktopRect.height - 120))

    setFolders(prev => prev.map(folder => 
      folder.id === selectedFolder 
        ? { ...folder, x: constrainedX, y: constrainedY }
        : folder
    ))
  }

  const handleMouseUp = () => {
    setSelectedFolder(null)
    setDragOffset({ x: 0, y: 0 })
  }

  // Get current time for desktop
  const currentTime = new Date()
  const timeString = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  // Determine if we should show the mobile landscape message
  const showMobileLandscapeMessage = deviceInfo.isMobile && deviceInfo.isPortrait

  return (
    <>
      {/* Mobile Landscape Message */}
      <MobileLandscapeMessage isVisible={showMobileLandscapeMessage} />
      
      <section 
        ref={desktopRef}
        className="min-h-screen pt-7 pb-20 relative overflow-hidden select-none"
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
          backgroundColor: isDark ? '#042f2e' : '#f0f4f8',
          // Apply consistent scaling for mobile landscape
          ...(deviceInfo.isMobile && deviceInfo.isLandscape && {
            transform: 'scale(0.8)',
            transformOrigin: 'top left',
            width: '125%', // Compensate for scale (1/0.8)
            height: '125%', // Compensate for scale (1/0.8)
            paddingLeft: '10px', // Minimal padding
            paddingRight: '10px'
          })
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Desktop Folders */}
      {folders.map((folder) => (
        <motion.div
          key={folder.id}
          data-folder-id={folder.id}
          className={`absolute cursor-pointer group ${
            selectedFolder === folder.id ? 'z-50' : 'z-10'
          }`}
          style={{
            left: folder.x,
            top: folder.y,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: Math.random() * 0.5, duration: 0.3 }}
          onMouseDown={(e) => handleMouseDown(e, folder.id)}
          onDoubleClick={() => handleFolderDoubleClick(folder)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Selection highlight */}
          {selectedFolder === folder.id && (
            <div className="absolute -inset-2 bg-mac-blue-500/20 rounded-lg border border-mac-blue-500/40" />
          )}
          
          {/* Folder icon */}
          <div className="flex flex-col items-center space-y-2 p-2">
            <div className={`flex items-center justify-center ${
              deviceInfo.isMobile ? 'w-12 h-12' : 'w-16 h-16'
            }`}>
              <img 
                src={folder.icon} 
                alt={folder.name}
                className="w-full h-full object-contain drop-shadow-sm"
                draggable={false}
              />
            </div>
            
            {/* Folder name - NO BACKGROUND BOXES */}
            <div className={`text-center px-2 py-1 rounded font-medium leading-tight ${
              deviceInfo.isMobile ? 'text-xs max-w-16' : 'text-xs max-w-20'
            } ${
              selectedFolder === folder.id 
                ? 'bg-mac-blue-500 text-white' 
                : isDark 
                  ? 'text-teal-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]' 
                  : 'text-mac-gray-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>
              {folder.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Desktop Info (bottom right) */}
      <div className="absolute bottom-24 right-8 text-right">
        <div className={`text-sm font-medium ${
          isDark ? 'text-teal-200/70' : 'text-mac-gray-600'
        }`}>
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className={`text-2xl font-light ${
          isDark ? 'text-teal-100' : 'text-mac-gray-800'
        }`}>
          {timeString}
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className={`absolute transform ${
          deviceInfo.isMobile && deviceInfo.isLandscape
            ? 'top-16 left-1/2 -translate-x-1/2' // Higher position for mobile
            : 'top-20 left-1/2 -translate-x-1/2' // Original position for desktop
        }`}
      >
        <div className={`px-6 py-3 rounded-full backdrop-blur-md border ${
          isDark 
            ? 'bg-teal-dark-900/20 border-teal-dark-700/30 text-teal-200/70' 
            : 'bg-white/60 border-white/20 text-mac-gray-600'
        }`}>
          <span className="text-sm font-medium">
            {deviceInfo.isMobile 
              ? '💡 Double-tap to open folders' 
              : '💡 Drag folders around • Double-click to open'
            }
          </span>
        </div>
      </motion.div>

      {/* MASSIVE NAME WITH TEAL NEON - SAME SIZE AS BOOT SCREEN "HELLO" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className={`absolute pointer-events-none ${
          deviceInfo.isMobile && deviceInfo.isLandscape
            ? 'top-1/2 right-8 transform -translate-y-1/2' // Center vertically on the right side
            : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' // Center on desktop
        }`}
      >
        <div className={deviceInfo.isMobile && deviceInfo.isLandscape ? 'text-right' : 'text-center'}>
          {/* MAIN WORKSPACE TITLE */}
          <h1 className={`font-light bumbbled-font leading-none text-mac-gray-800 dark:text-teal-50 ${
            deviceInfo.isMobile 
              ? 'text-2xl sm:text-3xl' 
              : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl'
          }`}>
            Koushik's Workspace
          </h1>
        </div>
      </motion.div>

      {/* Finder Window */}
                  <AnimatePresence>
              {openFinderWindow && (
                <MasterFinderWindow 
                  onClose={() => setOpenFinderWindow(false)}
                  originX={finderWindowOrigin.x}
                  originY={finderWindowOrigin.y}
                  initialFolder={finderWindowFolder}
                />
              )}
            </AnimatePresence>

      {/* PDF Viewer */}
      <AnimatePresence>
        {openPDFViewer && (
          <PDFViewer 
            onClose={() => setOpenPDFViewer(false)}
            originX={pdfViewerOrigin.x}
            originY={pdfViewerOrigin.y}
            pdfUrl="/resume.pdf"
            title="Resume - Koushik Ravikumar.pdf"
          />
        )}
      </AnimatePresence>
    </section>
    </>
  )
}

export default MacDesktop
