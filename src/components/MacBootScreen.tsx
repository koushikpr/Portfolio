import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MacBootScreenProps {
  onComplete: () => void
}

const MacBootScreen = ({ onComplete }: MacBootScreenProps) => {
  const [showHello, setShowHello] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showLoadingDots, setShowLoadingDots] = useState(false)

  useEffect(() => {
    // Show "hello" for 3 seconds
    const helloTimer = setTimeout(() => {
      setShowSubtitle(true)
      setShowLoadingDots(true)
    }, 1500); // Show subtitle and dots after 1.5s

    const fadeOutTimer = setTimeout(() => {
      setShowHello(false)
    }, 4500); // Fade out after 4.5s total

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 5500); // Transition to main app after 5.5s total

    return () => {
      clearTimeout(helloTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {showHello && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-mac-gray-50 via-white to-mac-blue-50 dark:from-teal-dark-950 dark:via-teal-dark-900 dark:to-teal-dark-800 transition-colors duration-300"
        >
          {/* Apple Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-8 left-8 w-6 h-6"
          >
            <img 
              src="/logo.png" 
              alt="Apple Logo" 
              className="w-full h-full object-contain opacity-30"
            />
          </motion.div>

          {/* Big Hello - EXACT SAME SIZE AS REQUESTED */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="text-8xl sm:text-9xl lg:text-[12rem] xl:text-[14rem] font-light text-mac-gray-800 dark:text-teal-50 bumbbled-font leading-none"
          >
            hello
          </motion.h1>

          {/* Subtitle */}
          <AnimatePresence>
            {showSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl sm:text-2xl text-mac-gray-600 dark:text-teal-200 mt-8 font-medium"
              >
                Welcome to Koushik's Portfolio
              </motion.p>
            )}
          </AnimatePresence>

          {/* Loading Dots */}
          <AnimatePresence>
            {showLoadingDots && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex space-x-2 mt-8"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                    className="w-3 h-3 bg-mac-blue-500 rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MacBootScreen
