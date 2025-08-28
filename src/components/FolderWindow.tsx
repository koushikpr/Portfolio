import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Square, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

interface FolderWindowProps {
  isOpen: boolean
  onClose: () => void
  title: string
  folderId: string
  originX: number
  originY: number
}

const FolderWindow: React.FC<FolderWindowProps> = ({ isOpen, onClose, title, folderId, originX, originY }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [windowPosition, setWindowPosition] = useState({ x: 200, y: 150 })
  const [viewMode, setViewMode] = useState<'icon' | 'list' | 'column' | 'gallery'>('icon')
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Desktop')

  const getFolderContent = (folderId: string) => {
    switch (folderId) {
      case 'folder':
        return [
          { name: 'Documents', type: 'folder', icon: '📁' },
          { name: 'Projects', type: 'folder', icon: '📁' },
          { name: 'Resources', type: 'folder', icon: '📁' },
          { name: 'README.txt', type: 'file', icon: '📄' }
        ]
      default:
        return [
          { name: 'File 1.txt', type: 'file', icon: '📄' },
          { name: 'File 2.pdf', type: 'file', icon: '📄' },
          { name: 'Subfolder', type: 'folder', icon: '📁' }
        ]
    }
  }

  const folderContent = getFolderContent(folderId)

  const sidebarItems = {
    favorites: [
      { name: 'Documents', icon: '📄', active: false },
      { name: 'Downloads', icon: '⬇️', active: false },
      { name: 'Desktop', icon: '🖥️', active: true },
      { name: 'Applications', icon: '📱', active: false },
      { name: 'AirDrop', icon: '📡', active: false }
    ],
    locations: [
      { name: 'Macintosh HD', icon: '💾', active: false },
      { name: 'Network', icon: '🌐', active: false },
      { name: 'Jason\'s MacBook', icon: '💻', active: false }
    ],
    tags: [
      { name: 'Red', color: 'bg-red-500', active: false },
      { name: 'Orange', color: 'bg-orange-500', active: false },
      { name: 'Yellow', color: 'bg-yellow-500', active: false },
      { name: 'Green', color: 'bg-green-500', active: false },
      { name: 'Blue', color: 'bg-blue-500', active: false }
    ]
  }

  const renderMainContent = () => {
    switch (viewMode) {
      case 'icon':
        return (
          <div className="grid grid-cols-6 gap-4 p-4">
            {folderContent.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="flex flex-col items-center p-2 hover:bg-teal-100/30 dark:hover:bg-teal-dark-800/30 rounded-lg cursor-pointer transition-colors"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <span className="text-xs text-center text-teal-700 dark:text-teal-300 break-words max-w-16">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        )
      
      case 'list':
        return (
          <div className="p-4">
            <div className="space-y-1">
              {folderContent.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.2 }}
                  className="flex items-center space-x-3 p-2 hover:bg-teal-100/30 dark:hover:bg-teal-dark-800/30 rounded cursor-pointer transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-teal-700 dark:text-teal-300 flex-1">{item.name}</span>
                  <span className="text-xs text-teal-500 dark:text-teal-500">{item.type === 'folder' ? 'Folder' : 'Document'}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'column':
        return (
          <div className="flex h-full">
            <div className="w-1/3 border-r border-teal-200/30 dark:border-teal-dark-600/30 p-2">
              <div className="space-y-1">
                {folderContent.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-1 hover:bg-teal-100/30 dark:hover:bg-teal-dark-800/30 rounded cursor-pointer transition-colors">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-xs text-teal-700 dark:text-teal-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-teal-500 dark:text-teal-400">
              <span className="text-sm">Select an item to preview</span>
            </div>
          </div>
        )
      
      case 'gallery':
        return (
          <div className="grid grid-cols-4 gap-6 p-4">
            {folderContent.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex flex-col items-center p-4 bg-teal-50/30 dark:bg-teal-dark-800/30 rounded-lg hover:bg-teal-100/40 dark:hover:bg-teal-dark-700/40 cursor-pointer transition-colors"
              >
                <div className="text-6xl mb-3">{item.icon}</div>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300 text-center">
                  {item.name}
                </span>
                <span className="text-xs text-teal-500 dark:text-teal-500 mt-1">
                  {item.type === 'folder' ? 'Folder' : 'Document'}
                </span>
              </motion.div>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.1,
            scaleY: 0.1,
            scaleX: 0.3,
            x: originX - 400, // Updated for larger window (800px / 2)
            y: originY - 250, // Updated for larger window (500px / 2)
            skewY: 15,
            rotateX: 45,
            transformOrigin: "bottom center"
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            scaleY: 1,
            scaleX: 1,
            x: windowPosition.x, 
            y: windowPosition.y,
            skewY: 0,
            rotateX: 0,
            transformOrigin: "center center"
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.1,
            scaleY: 0.1,
            scaleX: 0.3,
            x: originX - 400,
            y: originY - 250,
            skewY: 15,
            rotateX: 45,
            transformOrigin: "bottom center",
            transition: { 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.6, 1]
            }
          }}
          transition={{ 
            type: "spring", 
            stiffness: 280, 
            damping: 22,
            duration: 0.7,
            opacity: { duration: 0.15, ease: "easeOut" },
            scale: { 
              type: "spring", 
              stiffness: 350, 
              damping: 25,
              bounce: 0.3
            },
            scaleY: { 
              type: "spring", 
              stiffness: 320, 
              damping: 24,
              bounce: 0.25
            },
            scaleX: { 
              type: "spring", 
              stiffness: 340, 
              damping: 26,
              bounce: 0.2
            },
            skewY: { 
              type: "spring", 
              stiffness: 300, 
              damping: 28,
              bounce: 0.1
            },
            rotateX: { 
              type: "spring", 
              stiffness: 310, 
              damping: 25,
              bounce: 0.15
            },
            x: { 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              bounce: 0.1
            },
            y: { 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              bounce: 0.1
            }
          }}
          className="fixed z-50 bg-white/95 dark:bg-teal-dark-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-teal-200/30 dark:border-teal-dark-700/50 overflow-hidden"
          style={{
            width: '800px',
            height: '500px',
            left: windowPosition.x,
            top: windowPosition.y,
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
          drag
          dragMomentum={false}
          onDrag={(_, info) => {
            setWindowPosition({
              x: windowPosition.x + info.delta.x,
              y: windowPosition.y + info.delta.y
            })
          }}
        >
          {/* Window Title Bar */}
          <div className="flex items-center justify-between h-8 bg-teal-50/80 dark:bg-teal-dark-800/80 px-4 border-b border-teal-200/50 dark:border-teal-dark-600/50 cursor-move">
            {/* Traffic Light Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
              />
              <button
                onClick={() => setIsMinimized(true)}
                className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors"
              />
              <button className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors" />
            </div>

            {/* Window Title */}
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-teal-800 dark:text-teal-100">
                {title}
              </span>
            </div>

            {/* Window Controls Placeholder */}
            <div className="w-16"></div>
          </div>

          {/* Finder Toolbar */}
          <div className="flex items-center h-12 bg-teal-100/60 dark:bg-teal-dark-800/60 border-b border-teal-200/40 dark:border-teal-dark-600/40 px-4">
            {/* Navigation Controls */}
            <div className="flex items-center space-x-1">
              <button className="p-1.5 hover:bg-teal-200/50 dark:hover:bg-teal-dark-700/50 rounded transition-colors">
                <ChevronLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </button>
              <button className="p-1.5 hover:bg-teal-200/50 dark:hover:bg-teal-dark-700/50 rounded transition-colors">
                <ChevronRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </button>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center ml-4 bg-teal-200/30 dark:bg-teal-dark-700/30 rounded-md p-1">
              {[
                { mode: 'icon', icon: '⊞', tooltip: 'Icon View' },
                { mode: 'list', icon: '☰', tooltip: 'List View' },
                { mode: 'column', icon: '⫸', tooltip: 'Column View' },
                { mode: 'gallery', icon: '⊡', tooltip: 'Gallery View' }
              ].map((view) => (
                <button
                  key={view.mode}
                  onClick={() => setViewMode(view.mode as any)}
                  className={`p-1.5 rounded text-sm transition-all duration-150 ${
                    viewMode === view.mode
                      ? 'bg-teal-300/60 dark:bg-teal-dark-600/60 text-teal-800 dark:text-teal-100'
                      : 'text-teal-600 dark:text-teal-400 hover:bg-teal-250/40 dark:hover:bg-teal-dark-650/40'
                  }`}
                  title={view.tooltip}
                >
                  {view.icon}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 flex justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-500 dark:text-teal-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-1.5 bg-teal-200/30 dark:bg-teal-dark-700/30 border border-teal-300/40 dark:border-teal-dark-600/40 rounded-md text-sm text-teal-800 dark:text-teal-200 placeholder-teal-500 dark:placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 dark:focus:ring-teal-500/50"
                />
              </div>
            </div>
          </div>

          {/* Finder Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-teal-50/40 dark:bg-teal-dark-850/40 border-r border-teal-200/30 dark:border-teal-dark-600/30 overflow-y-auto">
              {/* Favorites */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wide">Favorites</h3>
                <div className="space-y-1">
                  {sidebarItems.favorites.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSidebarItem(item.name)}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 text-left rounded transition-colors ${
                        selectedSidebarItem === item.name
                          ? 'bg-teal-200/60 dark:bg-teal-dark-700/60 text-teal-800 dark:text-teal-100'
                          : 'text-teal-700 dark:text-teal-300 hover:bg-teal-100/40 dark:hover:bg-teal-dark-800/40'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="p-3 border-t border-teal-200/20 dark:border-teal-dark-600/20">
                <h3 className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wide">Locations</h3>
                <div className="space-y-1">
                  {sidebarItems.locations.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSidebarItem(item.name)}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 text-left rounded transition-colors ${
                        selectedSidebarItem === item.name
                          ? 'bg-teal-200/60 dark:bg-teal-dark-700/60 text-teal-800 dark:text-teal-100'
                          : 'text-teal-700 dark:text-teal-300 hover:bg-teal-100/40 dark:hover:bg-teal-dark-800/40'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="p-3 border-t border-teal-200/20 dark:border-teal-dark-600/20">
                <h3 className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wide">Tags</h3>
                <div className="space-y-1">
                  {sidebarItems.tags.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-2 px-2 py-1.5 text-left rounded hover:bg-teal-100/40 dark:hover:bg-teal-dark-800/40 transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-xs text-teal-700 dark:text-teal-300">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white/20 dark:bg-teal-dark-900/20 overflow-auto">
              {renderMainContent()}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FolderWindow
