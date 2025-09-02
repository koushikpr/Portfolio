import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { useDeviceDetection } from './hooks/useDeviceDetection'
import MacMenuBar from './components/MacMenuBar'
import MacDesktop from './components/MacDesktop'
import MacDock from './components/MacDock'
import MacBootScreen from './components/MacBootScreen'
import MobilePortfolio from './components/MobilePortfolio'
import Experience from './components/Experience'

import Publications from './components/Publications'
import Skills from './components/Skills'
import { ThemeProvider } from './contexts/ThemeContext'

const AppContent = () => {
  const [showBootScreen, setShowBootScreen] = useState(true)
  const deviceInfo = useDeviceDetection()

  const handleBootComplete = () => {
    setShowBootScreen(false)
  }

  // Show mobile UI for mobile devices
  if (deviceInfo.isMobile) {
    return (
      <Router>
        <MobilePortfolio />
        <Analytics />
      </Router>
    )
  }

  // Show desktop UI for desktop devices
  return (
    <Router>
      {/* Boot Screen */}
      {showBootScreen && <MacBootScreen onComplete={handleBootComplete} />}
      
      {/* Main Portfolio */}
      <div className="min-h-screen bg-mac-gray-50 dark:bg-teal-dark-950 transition-colors duration-300">
        {/* macOS Menu Bar */}
        <MacMenuBar />
        
        {/* Main content */}
        <main>
          <div id="hero">
            <MacDesktop />
          </div>
          

          <div id="skills">
            <Skills />
          </div>
          
          <div id="experience">
            <Experience />
          </div>
          
          <div id="achievements">
            <Publications />
          </div>
        </main>
        
        {/* macOS Dock */}
        <MacDock />
      </div>
      <Analytics />
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
