import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen, MapPin, User, Mail, Phone, Github, Linkedin, Download } from 'lucide-react'

interface AboutFinderWindowProps {
  onClose: () => void
  originX: number
  originY: number
  initialFolder?: string
}

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size: string
  dateModified: string
  icon: string
  content?: {
    title: string
    profileBanner?: string
    summary?: string
    contact?: {
      email: string
      phone: string
      location: string
      linkedin: string
      github: string
    }
    stats?: {
      label: string
      value: string
      icon: string
    }[]
    interests?: string[]
    personalInfo?: {
      fullName: string
      title: string
      location: string
      yearsExperience: string
      education: string
      currentRole: string
    }
    downloadUrl?: string
  }
}

interface FolderContent {
  [key: string]: FileItem[]
}

const AboutFinderWindow: React.FC<AboutFinderWindowProps> = ({ 
  onClose, 
  originX, 
  originY, 
  initialFolder = 'about' 
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>(initialFolder)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Color coding function for interests
  const getInterestColor = (interest: string) => {
    const techInterests = ['cloud computing', 'machine learning', 'devops', 'software architecture', 'ai', 'automation', 'microservices', 'kubernetes', 'aws']
    const researchInterests = ['research', 'publications', 'innovation', 'optimization', 'algorithms', 'data science', 'neural networks']
    
    if (techInterests.some(tech => interest.toLowerCase().includes(tech.toLowerCase()))) {
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/50',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200/30 dark:border-blue-600/30',
        hover: 'hover:border-blue-300/50 dark:hover:border-blue-500/50'
      }
    }
    if (researchInterests.some(research => interest.toLowerCase().includes(research.toLowerCase()))) {
      return {
        bg: 'bg-purple-50 dark:bg-purple-900/50',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200/30 dark:border-purple-600/30',
        hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
      }
    }
    return {
      bg: 'bg-green-50 dark:bg-green-900/50',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200/30 dark:border-green-600/30',
      hover: 'hover:border-green-300/50 dark:hover:border-green-500/50'
    }
  }

  const sidebarFolders = [
    { id: 'about', name: 'About Me', icon: '/folder-icon.png' },
    { id: 'certifications', name: 'Certifications', icon: '/folder-icon.png' },
    { id: 'experience', name: 'Experience', icon: '/folder-icon.png' },
    { id: 'projects', name: 'Projects', icon: '/folder-icon.png' },
    { id: 'achievements', name: 'Achievements', icon: '/folder-icon.png' },
    { id: 'education', name: 'Education', icon: '/folder-icon.png' },
    { id: 'events', name: 'Events and Publications', icon: '/folder-icon.png' }
  ]

  // Define folder contents with about me data
  const folderContents: FolderContent = {
    about: [
      { 
        id: 'professional-profile', 
        name: 'Professional Profile', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          title: 'Professional Profile',
          profileBanner: '/kpr.jpg',
          personalInfo: {
            fullName: 'Koushik Ravikumar',
            title: 'AWS Certified Software Developer & Cloud Architect',
            location: '29 Thorne St, Jersey City, New Jersey 07307',
            yearsExperience: '2+ Years',
            education: 'MS Computer Science (Stevens Institute of Technology)',
            currentRole: 'Teaching Assistant - Enterprise & Cloud Computing'
          },
          summary: 'AWS Certified Software Developer with hands-on experience in software and cloud architecture, full-stack development, and production deployments. Skilled in building enterprise-level applications and automating cloud infrastructure. Eager to contribute to SDE and cloud infrastructure projects using AWS and DevOps best practices.',
          contact: {
            email: 'kravikum1@stevens.edu',
            phone: '201-484-6809',
            location: 'Jersey City, New Jersey',
            linkedin: 'linkedin.com/in/koushikpr',
            github: 'github.com/koushikpr'
          },
          stats: [
            { label: 'Years Experience', value: '2+', icon: '💼' },
            { label: 'Projects Completed', value: '7+', icon: '🚀' },
            { label: 'Certifications', value: '2', icon: '🏆' },
            { label: 'Publications', value: '2', icon: '📄' }
          ],
          interests: [
            'Cloud Computing', 'Machine Learning', 'DevOps', 'Software Architecture', 
            'Research & Publications', 'Teaching & Mentoring', 'Innovation', 'Automation',
            'Microservices', 'Kubernetes', 'AWS Solutions', 'Data Science'
          ]
        }
      },
      { 
        id: 'resume', 
        name: 'Resume.pdf', 
        type: 'file', 
        size: '1.8 MB', 
        dateModified: 'Dec 10, 2024', 
        icon: '📄',
        content: {
          title: 'Professional Resume',
          summary: 'Comprehensive resume showcasing professional experience, technical skills, education, and achievements in software development and cloud computing.',
          downloadUrl: '/resume.pdf'
        }
      },
      { 
        id: 'contact-info', 
        name: 'Contact Information', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          title: 'Contact Information',
          contact: {
            email: 'kravikum1@stevens.edu',
            phone: '201-484-6809',
            location: '29 Thorne St, Jersey City, New Jersey 07307',
            linkedin: 'linkedin.com/in/koushikpr',
            github: 'github.com/koushikpr'
          }
        }
      }
    ],
    certifications: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate', type: 'folder', size: '--', dateModified: 'May 15, 2025', icon: '/folder-icon.png' },
      { id: 'stevens-cert', name: 'Stevens Cloud Certificate', type: 'folder', size: '--', dateModified: 'Dec 25, 2025', icon: '/folder-icon.png' }
    ],
    experience: [
      { id: 'stevens-ta', name: 'Teaching Assistant - Stevens', type: 'folder', size: '--', dateModified: 'Dec 17, 2024', icon: '/folder-icon.png' },
      { id: 'sellwizr', name: 'SellWizr - Software Development Intern', type: 'folder', size: '--', dateModified: 'Aug 25, 2025', icon: '/folder-icon.png' },
      { id: 'antwalk', name: 'Antwalk - R&D Intern', type: 'folder', size: '--', dateModified: 'Jul 24, 2024', icon: '/folder-icon.png' }
    ],
    projects: [
      { id: 'ml-pipeline', name: 'Cross Platform Model Development Pipeline', type: 'folder', size: '--', dateModified: 'Jan 15, 2025', icon: '/folder-icon.png' },
      { id: 'wifi-prediction', name: 'WiFi Throughput Prediction', type: 'folder', size: '--', dateModified: 'Dec 10, 2024', icon: '/folder-icon.png' }
    ],
    achievements: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate.pdf', type: 'file', size: '1.2 MB', dateModified: 'May 15, 2025', icon: '🏆' },
      { id: 'stevens-cert', name: 'Stevens Cloud Certificate.pdf', type: 'file', size: '980 KB', dateModified: 'Dec 25, 2025', icon: '🎓' }
    ],
    education: [
      { id: 'stevens', name: 'Stevens Institute of Technology', type: 'folder', size: '--', dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: '/folder-icon.png' },
      { id: 'pes', name: 'PES University', type: 'folder', size: '--', dateModified: 'May 24, 2024', icon: '/folder-icon.png' }
    ],
    events: [
      { id: 'aws-summit', name: 'AWS Summit NYC 2025', type: 'folder', size: '--', dateModified: 'Mar 15, 2025', icon: '/folder-icon.png' },
      { id: 'google-cloud', name: 'Google Cloud Bronx 2024', type: 'folder', size: '--', dateModified: 'Oct 20, 2024', icon: '/folder-icon.png' }
    ]
  }

  // Get current folder contents
  const currentFolderContents = selectedFolder ? folderContents[selectedFolder] || [] : []
  
  // Auto-select first item when folder changes
  useEffect(() => {
    if (currentFolderContents.length > 0) {
      setSelectedFile(currentFolderContents[0].id)
    }
  }, [selectedFolder, currentFolderContents])
  
  // Get selected file details
  const selectedFileDetails = selectedFile ? currentFolderContents.find(file => file.id === selectedFile) : null

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the title bar
    const target = e.target as HTMLElement
    if (target.closest('.finder-title-bar')) {
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
    const maxX = window.innerWidth - 1000 // window width
    const maxY = window.innerHeight - 700 // window height
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
        x: originX - 500,
        y: originY - 350
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: windowPosition.x,
        y: windowPosition.y
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.1,
        x: originX - 500,
        y: originY - 350,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.4
      }}
      className="fixed z-50 w-[1000px] h-[700px] bg-white/95 dark:bg-teal-dark-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-teal-dark-600/50 rounded-xl shadow-2xl overflow-hidden select-none sf-font"
      style={{
        left: 0,
        top: 0
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div className="finder-title-bar flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-teal-dark-700/80 border-b border-gray-200/50 dark:border-teal-dark-600/50 rounded-t-xl cursor-move">
        <div className="flex items-center space-x-2">
          {/* Traffic Light Buttons */}
          <button 
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        
        <div className="flex-1 text-center">
          <h3 className="text-sm font-medium text-gray-700 dark:text-teal-200">
            About Me
          </h3>
        </div>
        
        <div className="w-16"></div> {/* Balance the traffic lights */}
      </div>

      {/* Main Content */}
      <div className="flex h-full overflow-hidden rounded-b-xl">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50/80 dark:bg-teal-dark-900/40 border-r border-gray-200/50 dark:border-teal-dark-600/50">
          <div className="p-3">
            <div className="space-y-1">
              {sidebarFolders.map((folder) => (
                                 <button
                   key={folder.id}
                   onClick={() => {
                     if (folder.id === 'about') {
                       // Stay in current window, just switch folder
                       setSelectedFolder(folder.id)
                       setSelectedFile(null)
                     } else {
                       // Close current window and trigger opening of the appropriate FinderWindow
                       onClose()
                       // Dispatch custom event to open the corresponding FinderWindow
                       window.dispatchEvent(new CustomEvent('openFinderWindow', { 
                         detail: { folder: folder.id } 
                       }))
                     }
                   }}
                   className={`w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm rounded-md transition-colors ${
                     selectedFolder === folder.id
                       ? 'bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200'
                       : 'text-gray-600 dark:text-teal-400 hover:bg-gray-100 dark:hover:bg-teal-dark-800'
                   }`}
                 >
                  <img src={folder.icon} alt="folder" className="w-4 h-4" />
                  <span className="truncate">{folder.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 min-w-0 bg-white/60 dark:bg-teal-dark-900/20">
          {/* Column Headers */}
          <div className="flex items-center px-4 py-2 bg-gray-50/80 dark:bg-teal-dark-800/40 border-b border-gray-200/30 dark:border-teal-dark-600/30 text-xs font-medium text-gray-500 dark:text-teal-400">
            <div className="flex-1">Name</div>
            <div className="w-24 text-right">Last Modified</div>
            <div className="w-16 text-right">Size</div>
          </div>

          {/* File List Content */}
          <div className="overflow-y-auto h-full">
            {currentFolderContents.map((file, index) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file.id)}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors ${
                  selectedFile === file.id
                    ? 'bg-teal-100 dark:bg-teal-dark-700/50'
                    : index % 2 === 0 
                      ? 'bg-white/40 dark:bg-teal-dark-900/10 hover:bg-gray-50/60 dark:hover:bg-teal-dark-800/30'
                      : 'bg-gray-50/40 dark:bg-teal-dark-900/20 hover:bg-gray-100/60 dark:hover:bg-teal-dark-800/40'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {file.icon.startsWith('/') ? (
                    <img src={file.icon} alt="icon" className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <span className="text-base flex-shrink-0">{file.icon}</span>
                  )}
                  <span className="truncate text-gray-700 dark:text-teal-200">{file.name}</span>
                </div>
                <div className="w-24 text-right text-gray-500 dark:text-teal-400 text-xs">
                  {file.dateModified}
                </div>
                <div className="w-16 text-right text-gray-500 dark:text-teal-400 text-xs">
                  {file.size}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Pane */}
        <div className="flex-1 min-w-0 bg-gray-50/80 dark:bg-teal-dark-900/40 border-l border-gray-200/50 dark:border-teal-dark-600/50">
          <div className="p-4 h-full overflow-y-auto">
            {selectedFileDetails ? (
              <div className="space-y-4">
                {/* Profile Banner */}
                {selectedFileDetails.content?.profileBanner ? (
                  <div className="w-full">
                    <img 
                      src={selectedFileDetails.content.profileBanner} 
                      alt="profile banner" 
                      className="w-full h-32 object-cover rounded-lg shadow-md" 
                    />
                  </div>
                ) : (
                  /* File Icon and Name */
                  <div className="text-center">
                    {selectedFileDetails.icon.startsWith('/') ? (
                      <img src={selectedFileDetails.icon} alt="icon" className="w-16 h-16 mx-auto mb-2 object-contain" />
                    ) : (
                      <div className="text-6xl mb-2">{selectedFileDetails.icon}</div>
                    )}
                    <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                      {selectedFileDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                      {selectedFileDetails.type === 'folder' ? 'Profile' : 'Document'}
                    </p>
                  </div>
                )}
                
                {/* Title (only show if banner exists) */}
                {selectedFileDetails.content?.profileBanner && (
                  <div className="text-center">
                    <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                      {selectedFileDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                      Professional Profile
                    </p>
                  </div>
                )}

                {/* File Details */}
                <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-3 space-y-2 text-sm border border-gray-200/30 dark:border-teal-dark-600/30">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-teal-400 font-medium">Last Modified:</span>
                    <span className="text-gray-700 dark:text-teal-200">{selectedFileDetails.dateModified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-teal-400 font-medium">Size:</span>
                    <span className="text-gray-700 dark:text-teal-200">{selectedFileDetails.size}</span>
                  </div>
                </div>

                {/* Content Preview */}
                {selectedFileDetails.content && (
                  <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                    {/* Personal Information */}
                    {selectedFileDetails.content.personalInfo && (
                      <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                        <h5 className="font-bold text-gray-800 dark:text-teal-100 text-lg mb-3">
                          {selectedFileDetails.content.personalInfo.fullName}
                        </h5>
                        <p className="text-teal-600 dark:text-teal-300 font-medium mb-2">
                          {selectedFileDetails.content.personalInfo.title}
                        </p>
                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-teal-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{selectedFileDetails.content.personalInfo.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-3 h-3" />
                            <span>{selectedFileDetails.content.personalInfo.education}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{selectedFileDetails.content.personalInfo.currentRole}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Professional Summary */}
                    {selectedFileDetails.content.summary && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Professional Summary
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                          <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                            {selectedFileDetails.content.summary}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    {selectedFileDetails.content.contact && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                          Contact Information
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${selectedFileDetails.content.contact.email}`} className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Phone className="w-3 h-3" />
                            <span>{selectedFileDetails.content.contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Linkedin className="w-3 h-3" />
                            <a href={`https://${selectedFileDetails.content.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.linkedin}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Github className="w-3 h-3" />
                            <a href={`https://${selectedFileDetails.content.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.github}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Professional Stats */}
                    {selectedFileDetails.content.stats && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                          Professional Highlights
                        </h6>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedFileDetails.content.stats.map((stat, index) => (
                            <div key={index} className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3 text-center">
                              <div className="text-lg mb-1">{stat.icon}</div>
                              <div className="text-lg font-bold text-teal-600 dark:text-teal-300">{stat.value}</div>
                              <div className="text-xs text-gray-500 dark:text-teal-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interests */}
                    {selectedFileDetails.content.interests && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                          Professional Interests
                        </h6>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedFileDetails.content.interests.map((interest: string, index: number) => {
                            const colors = getInterestColor(interest)
                            return (
                              <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full border ${colors.border} ${colors.hover} hover:scale-105 transition-all cursor-default`}
                              >
                                {interest}
                              </motion.span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Download Resume */}
                    {selectedFileDetails.content.downloadUrl && (
                      <div className="flex justify-center">
                        <a
                          href={selectedFileDetails.content.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download Resume
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">👋</div>
                  <p className="text-gray-500 dark:text-teal-400 text-sm">
                    Select an item to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutFinderWindow
