import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MacMenuBar from './components/MacMenuBar'
import MacDesktop from './components/MacDesktop'
import MacDock from './components/MacDock'
import MacBootScreen from './components/MacBootScreen'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [showBootScreen, setShowBootScreen] = useState(true)

  const handleBootComplete = () => {
    setShowBootScreen(false)
  }

  return (
    <ThemeProvider>
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
            
            {/* Placeholder sections for now */}
            <div id="projects" className="min-h-screen bg-white dark:bg-teal-dark-900 flex items-center justify-center">
              <div className="mac-card max-w-2xl text-center">
                <h2 className="text-4xl font-bold mac-gradient-text mb-4">Projects</h2>
                <p className="text-mac-gray-600 dark:text-teal-100">Coming soon...</p>
              </div>
            </div>
            
            <div id="experience" className="min-h-screen bg-mac-gray-50 dark:bg-teal-dark-950 flex items-center justify-center">
              <div className="mac-card max-w-2xl text-center">
                <h2 className="text-4xl font-bold mac-gradient-text mb-4">Experience</h2>
                <p className="text-mac-gray-600 dark:text-teal-100">Coming soon...</p>
              </div>
            </div>
            
            <div id="education" className="min-h-screen bg-white dark:bg-teal-dark-900 flex items-center justify-center">
              <div className="mac-card max-w-2xl text-center">
                <h2 className="text-4xl font-bold mac-gradient-text mb-4">Education</h2>
                <p className="text-mac-gray-600 dark:text-teal-100">Coming soon...</p>
              </div>
            </div>
            
            <div id="certifications" className="min-h-screen bg-mac-gray-50 dark:bg-teal-dark-950 flex items-center justify-center">
              <div className="mac-card max-w-2xl text-center">
                <h2 className="text-4xl font-bold mac-gradient-text mb-4">Certifications</h2>
                <p className="text-mac-gray-600 dark:text-teal-100">Coming soon...</p>
              </div>
            </div>
            
            <div id="achievements" className="min-h-screen bg-white dark:bg-teal-dark-900 flex items-center justify-center">
              <div className="mac-card max-w-2xl text-center">
                <h2 className="text-4xl font-bold mac-gradient-text mb-4">Achievements</h2>
                <p className="text-mac-gray-600 dark:text-teal-100">Coming soon...</p>
              </div>
            </div>
          </main>
          
          {/* macOS Dock */}
          <MacDock />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
