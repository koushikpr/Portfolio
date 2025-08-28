import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, ExternalLink, BookOpen } from 'lucide-react'

interface CertificationFinderWindowProps {
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
    issuer: string
    issueDate: string
    expiryDate?: string
    credentialId?: string
    certificationBanner?: string
    description: string[]
    skills: string[]
    verificationUrl?: string
    status: string
  }
}

interface FolderContent {
  [key: string]: FileItem[]
}

const CertificationFinderWindow: React.FC<CertificationFinderWindowProps> = ({ 
  onClose, 
  originX, 
  originY, 
  initialFolder = 'certifications' 
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>(initialFolder)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Color coding function for skills
  const getSkillColor = (skill: string) => {
    const cloudSkills = ['aws', 'azure', 'gcp', 'google cloud', 'cloud computing', 'terraform', 'kubernetes', 'docker', 'devops', 'ci/cd', 'jenkins', 'ansible']
    const developmentSkills = ['java', 'python', 'javascript', 'react', 'node.js', 'spring', 'flask', 'api', 'microservices', 'database', 'sql', 'mongodb']
    
    if (cloudSkills.some(cloudSkill => skill.toLowerCase().includes(cloudSkill.toLowerCase()))) {
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/50',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200/30 dark:border-blue-600/30',
        hover: 'hover:border-blue-300/50 dark:hover:border-blue-500/50'
      }
    }
    if (developmentSkills.some(devSkill => skill.toLowerCase().includes(devSkill.toLowerCase()))) {
      return {
        bg: 'bg-green-50 dark:bg-green-900/50',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200/30 dark:border-green-600/30',
        hover: 'hover:border-green-300/50 dark:hover:border-green-500/50'
      }
    }
    return {
      bg: 'bg-purple-50 dark:bg-purple-900/50',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200/30 dark:border-purple-600/30',
      hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
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

  // Define folder contents with certifications data
  const folderContents: FolderContent = {
    about: [
      { id: 'profile', name: 'Professional Profile.pdf', type: 'file', size: '2.3 MB', dateModified: 'Dec 15, 2024', icon: '📄' },
      { id: 'resume', name: 'Resume.pdf', type: 'file', size: '1.8 MB', dateModified: 'Dec 10, 2024', icon: '📄' }
    ],
    certifications: [
      { 
        id: 'aws-solution-architect', 
        name: 'AWS Certified Solution Architect - Associate', 
        type: 'folder', 
        size: '--', 
        dateModified: 'May 15, 2025', 
        icon: '/folder-icon.png',
        content: {
          title: 'AWS Certified Solution Architect - Associate',
          issuer: 'Amazon Web Services (AWS)',
          issueDate: 'May 2025',
          expiryDate: 'May 2028',
          credentialId: 'AWS-SAA-2025-KR001',
          certificationBanner: '/sa03.png',
          description: [
            'Demonstrated expertise in designing distributed systems and applications on AWS platform',
            'Proficient in selecting appropriate AWS services for compute, storage, networking, and database requirements',
            'Skilled in implementing cost-effective, fault-tolerant, and scalable cloud architectures',
            'Knowledge of AWS security best practices and compliance requirements'
          ],
          skills: ['AWS', 'Well Architected Framework', 'EC2', 'S3', 'VPC', 'IAM', 'RDS', 'Lambda', 'SQS/SNS', 'Load Balancing', 'Multi-AZ', 'Cloud Security'],
          verificationUrl: 'https://aws.amazon.com/verification',
          status: 'Active'
        }
      },
      { 
        id: 'stevens-cloud-certificate', 
        name: 'Enterprise & Cloud Computing Graduate Certificate', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Dec 25, 2025', 
        icon: '/folder-icon.png',
        content: {
          title: 'Enterprise & Cloud Computing Graduate Certificate Program',
          issuer: 'Stevens Institute of Technology',
          issueDate: 'December 2025',
          credentialId: 'STEVENS-ECC-2025-KR',
          certificationBanner: '/ec.png',
          description: [
            'Completed comprehensive graduate-level program in enterprise and cloud computing technologies',
            'Gained expertise in cloud architecture, microservices, and enterprise software development',
            'Hands-on experience with containerization, orchestration, and DevOps practices',
            'Advanced knowledge of distributed systems, security, and scalability in cloud environments'
          ],
          skills: ['Enterprise Architecture', 'Cloud Computing', 'Microservices', 'Docker', 'Kubernetes', 'DevOps', 'Distributed Systems', 'Security', 'Scalability'],
          verificationUrl: 'https://stevens.edu/verification',
          status: 'Active'
        }
      }
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
            Certifications
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
                     if (folder.id === 'certifications') {
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
                {/* Certification Banner */}
                {selectedFileDetails.content?.certificationBanner ? (
                  <div className="w-full">
                    <img 
                      src={selectedFileDetails.content.certificationBanner} 
                      alt="certification banner" 
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
                      {selectedFileDetails.type === 'folder' ? 'Certification' : 'Document'}
                    </p>
                  </div>
                )}
                
                {/* Certification Title (only show if banner exists) */}
                {selectedFileDetails.content?.certificationBanner && (
                  <div className="text-center">
                    <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                      {selectedFileDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                      Certification
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

                {/* Content Preview for Certification Items */}
                {selectedFileDetails.content && (
                  <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                    {/* Header */}
                    <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                      <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                        {selectedFileDetails.content.title}
                      </h5>
                      
                      {/* Certification Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span className="font-medium">{selectedFileDetails.content.issuer}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{selectedFileDetails.content.issueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          selectedFileDetails.content.status === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                        }`}>
                          {selectedFileDetails.content.status}
                        </span>
                        {selectedFileDetails.content.expiryDate && (
                          <span className="text-xs text-gray-500 dark:text-teal-400">
                            Expires: {selectedFileDetails.content.expiryDate}
                          </span>
                        )}
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
                        Certification Details
                      </h6>
                      <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                        <ul className="space-y-2">
                          {selectedFileDetails.content.description.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-teal-300">
                              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Credential Information */}
                    {selectedFileDetails.content.credentialId && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                          Credential Information
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                          <p className="text-sm text-gray-600 dark:text-teal-300">
                            <span className="font-medium">Credential ID:</span> {selectedFileDetails.content.credentialId}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Verification Link */}
                    {selectedFileDetails.content.verificationUrl && (
                      <div className="flex justify-center">
                        <a
                          href={selectedFileDetails.content.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Verify Certification
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-gray-500 dark:text-teal-400 text-sm">
                    Select a certification to view details
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

export default CertificationFinderWindow
