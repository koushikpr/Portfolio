import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, MapPin, Briefcase, ChevronRight, BookOpen, File, Folder } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ExperienceFinderWindowProps {
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
  content?: any
}

interface FolderContent {
  [key: string]: FileItem[]
}

const ExperienceFinderWindow = ({ onClose, originX, originY, initialFolder = 'experience' }: ExperienceFinderWindowProps) => {
  const { isDark } = useTheme()
  const [selectedFolder, setSelectedFolder] = useState<string | null>(initialFolder)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 })

  // Function to categorize and color skills
  const getSkillColor = (skill: string) => {
    const cloudSkills = [
      'AWS', 'Azure', 'Terraform', 'Kubernetes', 'Docker', 'Jenkins', 'Ansible', 
      'Prometheus', 'Grafana', 'DevOps', 'Infrastructure Automation', 'Cloud Computing',
      'Data Engineering', 'S3', 'SQS', 'Kafka'
    ]
    
    const developmentSkills = [
      'Java', 'Python', 'JavaScript', 'C', 'Android', 'Maven', 'BouncyCastle', 
      'Payara Micro', 'gRPC', 'OpenAI API', 'LLM'
    ]
    
    // Cloud skills - Blue
    if (cloudSkills.some(cloudSkill => skill.toLowerCase().includes(cloudSkill.toLowerCase()))) {
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/50',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200/30 dark:border-blue-600/30',
        hover: 'hover:border-blue-300/50 dark:hover:border-blue-500/50'
      }
    }
    
    // Development skills - Green
    if (developmentSkills.some(devSkill => skill.toLowerCase().includes(devSkill.toLowerCase()))) {
      return {
        bg: 'bg-green-50 dark:bg-green-900/50',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200/30 dark:border-green-600/30',
        hover: 'hover:border-green-300/50 dark:hover:border-green-500/50'
      }
    }
    
    // Everything else - Purple
    return {
      bg: 'bg-purple-50 dark:bg-purple-900/50',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200/30 dark:border-purple-600/30',
      hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
    }
  }

  const sidebarFolders = [
    { id: 'about', name: 'About Me', icon: '/folder-icon.png' },
    { id: 'experience', name: 'Experience', icon: '/folder-icon.png' },
    { id: 'projects', name: 'Projects', icon: '/folder-icon.png' },
    { id: 'achievements', name: 'Achievements', icon: '/folder-icon.png' },
    { id: 'certifications', name: 'Certifications', icon: '/folder-icon.png' },
    { id: 'education', name: 'Education', icon: '/folder-icon.png' }
  ]

  // Define folder contents with experience data
  const folderContents: FolderContent = {
    about: [
      { id: 'profile', name: 'Professional Profile.pdf', type: 'file', size: '2.3 MB', dateModified: 'Dec 15, 2024', icon: '📄' },
      { id: 'resume', name: 'Resume - Koushik Ravikumar.pdf', type: 'file', size: '1.8 MB', dateModified: 'Dec 10, 2024', icon: '📄' },
      { id: 'cover-letter', name: 'Cover Letter Template.docx', type: 'file', size: '45 KB', dateModified: 'Nov 28, 2024', icon: '📝' }
    ],
    experience: [
      { 
        id: 'stevens-ta', 
        name: 'Teaching Assistant (Enterprise and Cloud Computing)', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
                 content: {
           title: 'Teaching Assistant (Enterprise and Cloud Computing)',
           company: 'Stevens Institute of Technology',
           location: 'Hoboken, New Jersey',
           duration: 'September 2025 – Present',
           type: 'Academic',
           companyBanner: '/stevensb.webp',
           description: [
             'Assisted 40+ students with projects using BouncyCastle, Payara Micro, and Maven for Java and Android applications',
             'Guided teams in deploying gRPC-based client-server applications on AWS using Docker with secure configurations',
             'Conducted weekly 2-hour office hours, providing technical mentorship and troubleshooting support'
           ],
           skills: ['Java', 'Android', 'AWS', 'Docker', 'gRPC', 'Maven', 'BouncyCastle', 'Payara Micro', 'Teaching', 'Mentoring']
         }
      },
      { 
        id: 'sellwizr', 
        name: 'Summer Internship - Software Development (Infrastructure)', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Aug 26, 2025', 
        icon: '/folder-icon.png',
                 content: {
           title: 'Summer Internship - Software Development (Infrastructure)',
           company: 'SellWizr',
           location: 'Manhattan, New York',
           duration: 'June 2025 – August 2025',
           type: 'Internship',
           companyBanner: '/image.png',
           description: [
             'Built Terraform modules to automate deployment of a 3-tier application, cutting deployment time to under 10 minutes',
             'Designed a Kafka-S3 logging system to stream 100K+ user journeys/day to S3 for feedback system training',
             'Created multiple data scrapers to feed raw data into an S3 data lake via AWS SQS, processing upto 10TB per day'
           ],
           skills: ['Terraform', 'AWS', 'Kafka', 'S3', 'SQS', 'Data Engineering', 'Infrastructure Automation', 'Python', 'DevOps']
         }
      },
      { 
        id: 'antwalk', 
        name: 'Research and Development Intern', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Jul 30, 2024', 
        icon: '/folder-icon.png',
                 content: {
           title: 'Research and Development Intern',
           company: 'Antwalk',
           location: 'Bangalore, India',
           duration: 'December 2023 – July 2024',
           type: 'Internship',
           companyBanner: '/antwalk.png',
           description: [
             'Created competency frameworks for QA, DevOps, Cloud, and SDE roles, for internal training and client onboarding',
             'Reviewed and validated cloud and DevOps content with client teams as an SME, ensuring practical applicability',
             'Developed prototypes of LLM-based applications using OpenAI API for competency assessment, for client use cases'
           ],
           skills: ['Research', 'DevOps', 'Cloud Computing', 'OpenAI API', 'LLM', 'Content Development', 'SME Consultation', 'Training']
         }
      }
    ],
    projects: [
      { id: 'ai-ml-pipeline', name: 'Cross Platform Model Development Pipeline', type: 'folder', size: '--', dateModified: 'Jan 15, 2025', icon: '/folder-icon.png' },
      { id: 'wifi-prediction', name: 'WiFi Throughput Prediction Challenge', type: 'folder', size: '--', dateModified: 'Dec 10, 2024', icon: '/folder-icon.png' },
      { id: 'aws-terraform', name: 'AWS Infrastructure with Terraform', type: 'folder', size: '--', dateModified: 'Nov 15, 2024', icon: '/folder-icon.png' }
    ],
    achievements: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate.pdf', type: 'file', size: '1.2 MB', dateModified: 'May 15, 2025', icon: '🏆' },
      { id: 'hackathon', name: 'Duckathon 2024 Runner-up.jpg', type: 'file', size: '3.5 MB', dateModified: 'Oct 12, 2024', icon: '🥈' },
      { id: 'publications', name: 'Research Publications', type: 'folder', size: '--', dateModified: 'Nov 25, 2025', icon: '/folder-icon.png' }
    ],
    certifications: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate.pdf', type: 'file', size: '1.2 MB', dateModified: 'May 15, 2025', icon: '🏆' },
      { id: 'stevens-cert', name: 'Enterprise & Cloud Computing Certificate.pdf', type: 'file', size: '890 KB', dateModified: 'Dec 25, 2025', icon: '🎓' }
    ],
    education: [
      { id: 'stevens', name: 'Stevens Institute of Technology', type: 'folder', size: '--', dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: '/folder-icon.png' },
      { id: 'pes', name: 'PES University', type: 'folder', size: '--', dateModified: 'May 20, 2024', icon: '/folder-icon.png' }
    ]
  }

  // Get current folder contents
  const currentFolderContents = selectedFolder ? folderContents[selectedFolder] || [] : []
  
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

      {/* Finder Window */}
      <div 
        className={`absolute w-[1000px] h-[700px] bg-white/90 dark:bg-teal-dark-800/90 backdrop-blur-xl border border-white/30 dark:border-teal-dark-600/30 rounded-xl overflow-hidden shadow-2xl flex flex-col sf-font ${
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
        <div className="finder-title-bar flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-teal-dark-700/80 border-b border-gray-200/50 dark:border-teal-dark-600/50 rounded-t-xl cursor-grab active:cursor-grabbing">
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
              {selectedFolder ? sidebarFolders.find(f => f.id === selectedFolder)?.name || 'Finder' : 'Finder'}
            </h4>
          </div>
          
          {/* Empty space to balance the layout */}
          <div className="w-12"></div>
        </div>

        {/* Finder Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0 bg-gray-50/80 dark:bg-teal-dark-900/40 border-r border-gray-200/50 dark:border-teal-dark-600/50">
            <div className="p-3">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-teal-400 uppercase tracking-wide mb-2">
                Favorites
              </h5>
              <div className="space-y-0.5">
                {sidebarFolders.map((folder) => (
                  <motion.button
                    key={folder.id}
                    onClick={() => {
                      setSelectedFolder(folder.id)
                      setSelectedFile(null) // Reset file selection when changing folders
                    }}
                    className={`w-full px-2 py-1 text-left rounded text-xs flex items-center gap-2 transition-all duration-100 ${
                      selectedFolder === folder.id
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-200/60 dark:hover:bg-teal-dark-700/40 text-gray-700 dark:text-teal-200'
                    }`}
                  >
                    <img src={folder.icon} alt="folder" className="w-4 h-4" />
                    <span className="font-medium">{folder.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* List View */}
          <div className="w-96 flex-shrink-0 bg-white/90 dark:bg-teal-dark-900/20 border-r border-gray-200/50 dark:border-teal-dark-600/50">
            {/* Column Headers */}
            <div className="flex items-center px-4 py-2 bg-gray-100/60 dark:bg-teal-dark-800/40 border-b border-gray-200/50 dark:border-teal-dark-600/50 text-xs font-medium text-gray-600 dark:text-teal-300">
              <div className="flex-1">Name</div>
              <div className="w-24 text-right">Last Modified</div>
              <div className="w-20 text-right">Size</div>
            </div>

            {/* File List */}
            <div className="overflow-y-auto h-full">
              {currentFolderContents.map((file, index) => (
                <motion.div
                  key={file.id}
                  onClick={() => setSelectedFile(file.id)}
                  className={`flex items-center px-4 py-1.5 cursor-pointer text-sm transition-all duration-100 ${
                    selectedFile === file.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                      : index % 2 === 0
                        ? 'bg-white/50 dark:bg-teal-dark-900/10 hover:bg-gray-50 dark:hover:bg-teal-dark-800/20 text-gray-700 dark:text-teal-200'
                        : 'bg-gray-50/30 dark:bg-teal-dark-800/10 hover:bg-gray-100/50 dark:hover:bg-teal-dark-700/20 text-gray-700 dark:text-teal-200'
                  }`}
                  whileHover={{ backgroundColor: selectedFile === file.id ? undefined : 'rgba(0,0,0,0.02)' }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {file.icon.startsWith('/') ? (
                      <img src={file.icon} alt="icon" className="w-4 h-4" />
                    ) : (
                      <span className="text-base">{file.icon}</span>
                    )}
                    <span className="truncate font-medium">{file.name}</span>
                  </div>
                  <div className="w-24 text-right text-xs text-gray-500 dark:text-teal-400">
                    {file.dateModified}
                  </div>
                  <div className="w-20 text-right text-xs text-gray-500 dark:text-teal-400">
                    {file.size}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Preview Pane */}
          <div className="flex-1 min-w-0 bg-gray-50/80 dark:bg-teal-dark-900/40 border-l border-gray-200/50 dark:border-teal-dark-600/50">
            <div className="p-4 h-full overflow-y-auto">
              {selectedFileDetails ? (
                <div className="space-y-4">
                                     {/* Experience Banner */}
                   {selectedFileDetails.content?.companyBanner ? (
                     <div className="w-full">
                       <img 
                         src={selectedFileDetails.content.companyBanner} 
                         alt="company banner" 
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
                         {selectedFileDetails.type === 'folder' ? 'Experience Folder' : 'Document'}
                       </p>
                     </div>
                   )}
                   
                   {/* Experience Title (only show if banner exists) */}
                   {selectedFileDetails.content?.companyBanner && (
                     <div className="text-center">
                       <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                         {selectedFileDetails.name}
                       </h4>
                       <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                         {selectedFileDetails.type === 'folder' ? 'Experience Folder' : 'Document'}
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

                  {/* Content Preview for Experience Items */}
                  {selectedFileDetails.content && (
                    <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                      {/* Experience Header */}
                      <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                        <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                          {selectedFileDetails.content.title}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            <span className="font-medium">{selectedFileDetails.content.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{selectedFileDetails.content.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-3 h-3 text-teal-500" />
                          <span className="text-sm text-gray-600 dark:text-teal-400">{selectedFileDetails.content.duration}</span>
                          <span className="px-2 py-1 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-full">
                            {selectedFileDetails.content.type}
                          </span>
                        </div>
                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {selectedFileDetails.content.skills.map((skill: string, index: number) => {
                            const colors = getSkillColor(skill)
                            return (
                              <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full border ${colors.border} ${colors.hover} hover:scale-105 transition-all cursor-default`}
                              >
                                {skill}
                              </motion.span>
                            )
                          })}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Key Responsibilities
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                          <ul className="space-y-2">
                            {selectedFileDetails.content.description.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-teal-300">
                                <ChevronRight className="w-3 h-3 text-teal-500 mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💼</div>
                    <p className="text-xs text-gray-500 dark:text-teal-400">
                      Select an item to preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceFinderWindow
