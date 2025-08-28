import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import EducationFinderWindow from './EducationFinderWindow'
import ProjectsFinderWindow from './ProjectsFinderWindow'
import ExperienceFinderWindow from './ExperienceFinderWindow'
import EventFinderWindow from './EventFinderWindow'
import PDFViewer from './PDFViewer'

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
  const desktopRef = useRef<HTMLDivElement>(null)
  
  const [folders, setFolders] = useState<FolderItem[]>([
    // Left side - Professional folders
    { id: 'about', name: 'About Me', x: 60, y: 120, icon: '/contactme-folder.png', section: 'about' },
    { id: 'projects', name: 'My Projects', x: 60, y: 240, icon: '/cloud.png', section: 'projects' },
    { id: 'experience', name: 'Work Experience', x: 60, y: 360, icon: '/certifications-folder.png', section: 'experience' },
    
    // Right side - Education & Achievements
    { id: 'education', name: 'Education', x: 180, y: 120, icon: '/education-folder.png', section: 'education' },
    { id: 'certifications', name: 'Certifications', x: 180, y: 240, icon: '/achievements-folder.png', section: 'certifications' },
    { id: 'events', name: 'Events and Publications', x: 180, y: 360, icon: '/folder-icon.png', section: 'events' },
    
    // Bottom area - Documents
    { id: 'resume', name: 'Resume.pdf', x: 60, y: 480, icon: '/document.png' },
  ])

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [openFinderWindow, setOpenFinderWindow] = useState(false)
  const [finderWindowOrigin, setFinderWindowOrigin] = useState({ x: 0, y: 0 })
  const [finderWindowFolder, setFinderWindowFolder] = useState<string>('education')
  const [openPDFViewer, setOpenPDFViewer] = useState(false)
  const [pdfViewerOrigin, setPdfViewerOrigin] = useState({ x: 0, y: 0 })

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

  return (
    <section 
      ref={desktopRef}
      className="min-h-screen pt-7 pb-20 relative overflow-hidden select-none"
      style={{
        backgroundImage: isDark 
          ? 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
        backgroundColor: isDark ? '#042f2e' : '#f0f4f8'
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
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src={folder.icon} 
                alt={folder.name}
                className="w-full h-full object-contain drop-shadow-sm"
                draggable={false}
              />
            </div>
            
            {/* Folder name - NO BACKGROUND BOXES */}
            <div className={`text-center px-2 py-1 rounded text-xs font-medium max-w-20 leading-tight ${
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
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
      >
        <div className={`px-6 py-3 rounded-full backdrop-blur-md border ${
          isDark 
            ? 'bg-teal-dark-900/20 border-teal-dark-700/30 text-teal-200/70' 
            : 'bg-white/60 border-white/20 text-mac-gray-600'
        }`}>
          <span className="text-sm font-medium">
            💡 Drag folders around • Double-click to open
          </span>
        </div>
      </motion.div>

      {/* MASSIVE NAME WITH TEAL NEON - SAME SIZE AS BOOT SCREEN "HELLO" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="text-center">
          {/* MAIN WORKSPACE TITLE */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light bumbbled-font leading-none text-mac-gray-800 dark:text-teal-50">
            Koushik's Workspace
          </h1>
        </div>
      </motion.div>

      {/* Finder Window */}
      <AnimatePresence>
        {openFinderWindow && (
          finderWindowFolder === 'projects' ? (
            <ProjectsFinderWindow 
              onClose={() => setOpenFinderWindow(false)}
              originX={finderWindowOrigin.x}
              originY={finderWindowOrigin.y}
              initialFolder={finderWindowFolder}
            />
          ) : finderWindowFolder === 'experience' ? (
            <ExperienceFinderWindow 
              onClose={() => setOpenFinderWindow(false)}
              originX={finderWindowOrigin.x}
              originY={finderWindowOrigin.y}
              initialFolder={finderWindowFolder}
            />
          ) : finderWindowFolder === 'events' ? (
            <EventFinderWindow 
              onClose={() => setOpenFinderWindow(false)}
              originX={finderWindowOrigin.x}
              originY={finderWindowOrigin.y}
              initialFolder={finderWindowFolder}
            />
          ) : (
            <EducationFinderWindow 
              onClose={() => setOpenFinderWindow(false)}
              originX={finderWindowOrigin.x}
              originY={finderWindowOrigin.y}
              initialFolder={finderWindowFolder}
            />
          )
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
  )
}

export default MacDesktop
