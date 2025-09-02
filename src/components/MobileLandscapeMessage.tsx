import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface MobileLandscapeMessageProps {
  isVisible: boolean
}

const MobileLandscapeMessage: React.FC<MobileLandscapeMessageProps> = ({ isVisible }) => {
  const { isDark } = useTheme()

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        backgroundColor: isDark ? 'rgba(4, 47, 46, 0.95)' : 'rgba(240, 244, 248, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className={`text-center max-w-sm mx-auto p-8 rounded-3xl border ${
          isDark 
            ? 'bg-teal-dark-900/40 border-teal-dark-700/30 text-teal-100' 
            : 'bg-white/60 border-white/20 text-mac-gray-800'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Rotation Icon */}
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 w-16 h-16 flex items-center justify-center"
        >
          <div className={`text-4xl ${isDark ? 'text-teal-300' : 'text-mac-blue-500'}`}>
            📱
          </div>
        </motion.div>

        {/* Hello Message */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`text-3xl font-light mb-4 ${
            isDark ? 'text-teal-50' : 'text-mac-gray-800'
          }`}
        >
          Hello! 👋
        </motion.h1>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <p className={`text-lg leading-relaxed ${
            isDark ? 'text-teal-200/80' : 'text-mac-gray-600'
          }`}>
            For the best experience with Koushik's macOS-style portfolio:
          </p>
          
          <div className={`flex items-center justify-center space-x-2 text-sm font-medium px-4 py-2 rounded-full ${
            isDark 
              ? 'bg-teal-dark-800/50 text-teal-300' 
              : 'bg-mac-blue-50 text-mac-blue-600'
          }`}>
            <span>🔄</span>
            <span>Please rotate to landscape</span>
          </div>

          <p className={`text-sm ${
            isDark ? 'text-teal-300/60' : 'text-mac-gray-500'
          }`}>
            The desktop interface will automatically resize to fit your screen perfectly!
          </p>
        </motion.div>

        {/* Animated Arrow */}
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-2xl"
        >
          ↻
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MobileLandscapeMessage
