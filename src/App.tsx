import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MacMenuBar from './components/MacMenuBar'
import MacDesktop from './components/MacDesktop'
import MacDock from './components/MacDock'
import MacBootScreen from './components/MacBootScreen'
import Experience from './components/Experience'

import Publications from './components/Publications'
import Skills from './components/Skills'
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
      </Router>
    </ThemeProvider>
  )
}

export default App
