import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface PDFViewerProps {
  onClose: () => void
  originX: number
  originY: number
  pdfUrl: string
  title: string
}

const PDFViewer = ({ onClose, originX, originY, pdfUrl, title }: PDFViewerProps) => {
  const { isDark } = useTheme()
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 })

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the title bar
    const target = e.target as HTMLElement
    if (target.closest('.pdf-title-bar')) {
      setIsDragging(true)
      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y

    // Constrain to viewport bounds
    const maxX = window.innerWidth - 800 // window width
    const maxY = window.innerHeight - 600 // window height
    const constrainedX = Math.max(0, Math.min(newX, maxX))
    const constrainedY = Math.max(0, Math.min(newY, maxY))

    setWindowPosition({ x: constrainedX, y: constrainedY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.1, 
        x: originX - 400, 
        y: originY - 300,
        scaleY: 0.1,
        scaleX: 0.1,
        skewY: -10,
        rotateX: 45,
        transformOrigin: `${originX}px ${originY}px`
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        y: 0,
        scaleY: 1,
        scaleX: 1,
        skewY: 0,
        rotateX: 0,
        transformOrigin: 'center center'
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.05, 
        x: 0, 
        y: window.innerHeight - 100,
        scaleY: 0.05,
        scaleX: 0.3,
        skewY: -15,
        rotateX: 60,
        transformOrigin: 'center bottom'
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        bounce: 0.1,
        duration: 0.6
      }}
      className="fixed inset-0 z-50 p-4"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* PDF Viewer Window */}
      <div 
        className={`absolute w-[800px] h-[600px] bg-white/95 dark:bg-teal-dark-800/95 backdrop-blur-xl border border-white/30 dark:border-teal-dark-600/30 rounded-xl overflow-hidden shadow-2xl flex flex-col sf-font ${
          isDragging ? 'cursor-grabbing' : 'cursor-default'
        }`}
        style={{
          left: windowPosition.x || '50%',
          top: windowPosition.y || '50%',
          transform: windowPosition.x === 0 && windowPosition.y === 0 ? 'translate(-50%, -50%)' : 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Window Title Bar */}
        <div className="pdf-title-bar flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-teal-dark-700/80 border-b border-gray-200/50 dark:border-teal-dark-600/50 rounded-t-xl cursor-grab active:cursor-grabbing">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
          </div>
          
          {/* Window Title */}
          <div className="flex-1 text-center">
            <h4 className="text-sm font-medium text-gray-700 dark:text-teal-200">
              {title}
            </h4>
          </div>
          
          {/* Toolbar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownload}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-teal-dark-600 rounded transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4 text-gray-500 dark:text-teal-400" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-teal-dark-900/50">
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
              className="w-full h-full border-none"
              title={title}
              style={{ minHeight: '100%' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PDFViewer
