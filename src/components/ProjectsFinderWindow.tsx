import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, MapPin, GraduationCap, Award, BookOpen, Users, Trophy, Star, X, File, Folder, ChevronRight, Github, ExternalLink } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ProjectsFinderWindowProps {
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

const ProjectsFinderWindow = ({ onClose, originX, originY, initialFolder = 'projects' }: ProjectsFinderWindowProps) => {
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
      'Prometheus', 'Grafana', 'DevOps', 'Amazon Web Services (AWS)', 'Amazon EC2', 
      'Amazon VPC', 'Amazon S3', 'Amazon Security Groups', 'AWS Lambda', 'Amazon EKS', 
      'AWS Identity and Access Management (AWS IAM)', 'Google Kubernetes Engine (GKE)', 
      'Google Cloud Platform (GCP)', 'Continuous Integration (CI)', 'HCL', 'CUDA'
    ]
    
    const developmentSkills = [
      'Java', 'Python', 'JavaScript', 'C', 'Spring Framework', 'Spring MVC', 
      'Flask', 'React', 'ASP.NET', 'Spring Boot', 'Maven', 'Android Studio', 
      'Android Development', 'UI/UX', 'TCP/UDP', 'gRPC', 'MongoDB', 'Redis', 
      'Jupyter Notebook', 'Python (Programming Language)'
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
    
    // ML/Data and everything else - Purple
    return {
      bg: 'bg-purple-50 dark:bg-purple-900/50',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200/30 dark:border-purple-600/30',
      hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
    }
  }

  const sidebarFolders = [
    { id: 'about', name: 'About Me', icon: '/folder-icon.png' },
    { id: 'projects', name: 'Projects', icon: '/folder-icon.png' },
    { id: 'achievements', name: 'Achievements', icon: '/folder-icon.png' },
    { id: 'certifications', name: 'Certifications', icon: '/folder-icon.png' },
    { id: 'experience', name: 'Experience', icon: '/folder-icon.png' },
    { id: 'education', name: 'Education', icon: '/folder-icon.png' }
  ]

  // Define folder contents with projects data
  const folderContents: FolderContent = {
    about: [
      { id: 'profile', name: 'Professional Profile.pdf', type: 'file', size: '2.3 MB', dateModified: 'Dec 15, 2024', icon: '📄' },
      { id: 'resume', name: 'Resume - Koushik Ravikumar.pdf', type: 'file', size: '1.8 MB', dateModified: 'Dec 10, 2024', icon: '📄' },
      { id: 'cover-letter', name: 'Cover Letter Template.docx', type: 'file', size: '45 KB', dateModified: 'Nov 28, 2024', icon: '📝' }
    ],
    projects: [
      { 
        id: 'ai-ml-pipeline', 
        name: 'Cross Platform Model Development and Deployment Pipeline', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          title: 'Cross Platform Model Development and Deployment Pipeline',
          duration: 'January 2025',
          organization: 'Stevens Institute of Technology',
          description: 'Automated instance setup with Ansible playbooks, including Jupyter Notebook and CUDA toolkit within 5 minutes. Integrated Terraform and Jenkins to enable dashboard access and streamline instance launch. Dockerized trained models and deployed them via Flask endpoints, reducing deployment cost by 50%.',
          skills: ['Jenkins', 'Terraform', 'Ansible', 'Docker', 'Flask', 'CUDA', 'Jupyter Notebook'],
          githubUrl: 'https://github.com/koushikpr/Cross-Platform-Model-Development-and-Deployment-Pipeline',
          isOngoing: true,
          status: 'Active'
        }
      },
      { 
        id: 'wifi-throughput-prediction', 
        name: 'Next-Gen WiFi Throughput Prediction Challenge', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Dec 10, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Next-Gen WiFi Throughput Prediction Challenge by ITU AI/ML in 5G Challenge',
          duration: '2024',
          organization: 'PES University',
          description: 'Machine Learning project for predicting WiFi throughput performance as part of the ITU AI/ML in 5G Challenge. Implements advanced ML algorithms for network performance optimization.',
          skills: ['Machine Learning', 'Python', 'Jupyter Notebook', '5G Networks', 'WiFi Optimization', 'Data Science', 'Network Analysis'],
          githubUrl: 'https://github.com/koushikpr/Next-Gen-WiFi-Throughput-Prediction-Challenge-by-ITU-AI-ML-in-5G-Challenge',
          status: 'Completed'
        }
      },
      { 
        id: 'aws-terraform', 
        name: 'AWS Infrastructure Building Using Terraform', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Nov 15, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'AWS Infrastructure Building Using Terraform',
          duration: '2024',
          organization: 'Seminarroom',
          description: 'This Project demonstrates how to Deploy AWS Resources such as EC2, Security Groups, Routing Tables, Subnets, VPC, S3, Lambda, and EKS Using Terraform HCL Code',
          skills: ['Terraform', 'Amazon S3', 'Amazon Security Groups', 'AWS', 'AWS Lambda', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Amazon VPC', 'HCL', 'Amazon EKS', 'AWS Identity and Access Management (AWS IAM)'],
          githubUrl: 'https://github.com/koushikpr/AWS-Configuration-Using-Terraform',
          status: 'Completed'
        }
      },
      { 
        id: 'cicd-pipeline', 
        name: 'CI/CD Pipeline for Deploying a Multi-Container Web Application', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Oct 25, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'CI/CD Pipeline for Deploying a Multi-Container Web Application on AWS EC2 Using Jenkins, Terraform and Kubernetes',
          duration: '2024',
          organization: 'Personal Project',
          description: 'This Project demonstrates how to deploy a Python Flask Application on an AWS. The Pipeline Includes: 1. Building the Project Using Pip 2. Containerizing the Application using Docker 3. Creating AWS Resources Such as EC2 instance, Routing Tables, Security Groups and VPC Using Terraform 4. Configuration Management Using Ansible 5. Deployment using Kubernetes 6. CI/CD Using Git Webhook and Jenkins',
          skills: ['Terraform', 'Ansible', 'Flask', 'Kubernetes', 'Jenkins', 'DevOps', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Amazon VPC', 'Continuous Integration (CI)', 'Docker', 'Python (Programming Language)'],
          githubUrl: 'https://github.com/koushikpr/CI-CD-Pipeline-for-Flask-App-Using-Git-and-Jenkins',
          status: 'Completed'
        }
      },
      { 
        id: 'containerized-flask', 
        name: 'Containerized Flask App Deployed On AWS EC2', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Sep 18, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Containerized Flask App Deployed On AWS EC2 Using Docker, Kubernetes and Ansible',
          duration: '2024',
          organization: 'Personal Project',
          description: 'This Project demonstrated how to deploy a Flask App automatically using Ansible Configuration Management.',
          skills: ['Ansible', 'Flask', 'Kubernetes', 'Google Kubernetes Engine (GKE)', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Docker', 'Python (Programming Language)'],
          githubUrl: 'https://github.com/koushikpr/Containerized-Flask-App-Deployed-On-AWS-and-GKE',
          status: 'Completed'
        }
      },
      { 
        id: 'spring-boot-gke', 
        name: 'Multi-Container Spring Boot Application on GKE', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Aug 30, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Deploying a Multi-Container Spring Boot Application on GKE using Docker and Kubernetes',
          duration: '2024',
          organization: 'Personal Project',
          description: 'This Project demonstrates how to Deploy a Spring Boot Application with MongoDB dependencies On GKE by containerizing the application and Hosting on Google Kubernetes Engine.',
          skills: ['Spring Framework', 'Redis', 'Maven', 'Kubernetes', 'Google Kubernetes Engine (GKE)', 'Spring MVC', 'Docker', 'MongoDB', 'Google Cloud Platform (GCP)', 'Java'],
          githubUrl: 'https://github.com/koushikpr/Spring-Boot-Application-deployed-on-AWS-with-Ansible-Configuration',
          status: 'Completed'
        }
      },
      { 
        id: 'mobile-chat-app', 
        name: 'Mobile Chat Application', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Aug 20, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Mobile Chat Application',
          duration: 'August 2024',
          organization: 'Stevens Institute of Technology',
          description: 'Developed an Android chat application using Java, supporting TCP, UDP, and gRPC messaging. Implemented complex UI features including menu inflaters, lazy loading, and dynamic view updates. Deployed an AWS-based server mediator to handle communication upto 10 Android clients.',
          skills: ['Java', 'Android Studio', 'TCP/UDP', 'gRPC', 'AWS', 'Android Development', 'UI/UX'],
          githubUrl: 'https://github.com/koushikpr/Mobile-Chat-Application',
          status: 'Completed'
        }
      }
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
    experience: [
      { id: 'stevens-ta', name: 'Stevens Institute - Teaching Assistant', type: 'folder', size: '--', dateModified: 'Sep 15, 2025', icon: '/folder-icon.png' },
      { id: 'sellwizr', name: 'SellWizr - Software Development Intern', type: 'folder', size: '--', dateModified: 'Aug 25, 2025', icon: '/folder-icon.png' },
      { id: 'antwalk', name: 'Antwalk - R&D Intern', type: 'folder', size: '--', dateModified: 'Jul 24, 2024', icon: '/folder-icon.png' }
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
                  {/* File Icon and Name */}
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
                      {selectedFileDetails.type === 'folder' ? 'Project Folder' : 'Document'}
                    </p>
                  </div>

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

                  {/* Content Preview for Project Items */}
                  {selectedFileDetails.content && (
                    <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                      {/* Project Header */}
                      <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                        <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                          {selectedFileDetails.content.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-teal-400 mb-3">
                          {selectedFileDetails.content.organization || 'Personal Project'}
                        </p>
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
                          Description
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                          <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                            {selectedFileDetails.content.description}
                          </p>
                        </div>
                      </div>

                      {/* GitHub Button */}
                      {selectedFileDetails.content.githubUrl && (
                        <div className="flex justify-center">
                          <a
                            href={selectedFileDetails.content.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-medium">GitHub</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
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

export default ProjectsFinderWindow
