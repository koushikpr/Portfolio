import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, MapPin, GraduationCap, Award, BookOpen, Users, Trophy, Star, X, File, Folder, ChevronRight } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface EducationFinderWindowProps {
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

const EducationFinderWindow = ({ onClose, originX, originY, initialFolder = 'education' }: EducationFinderWindowProps) => {
  const { isDark } = useTheme()
  const [selectedFolder, setSelectedFolder] = useState<string | null>(initialFolder)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const sidebarFolders = [
    { id: 'about', name: 'About Me', icon: '/folder-icon.png' },
    { id: 'education', name: 'Education', icon: '/folder-icon.png' },
    { id: 'achievements', name: 'Achievements', icon: '/folder-icon.png' },
    { id: 'projects', name: 'Projects', icon: '/folder-icon.png' },
    { id: 'certifications', name: 'Certifications', icon: '/folder-icon.png' },
    { id: 'experience', name: 'Experience', icon: '/folder-icon.png' }
  ]

  // Define folder contents
  const folderContents: FolderContent = {
    about: [
      { id: 'profile', name: 'Professional Profile.pdf', type: 'file', size: '2.3 MB', dateModified: 'Dec 15, 2024', icon: '📄' },
      { id: 'resume', name: 'Resume - Koushik Ravikumar.pdf', type: 'file', size: '1.8 MB', dateModified: 'Dec 10, 2024', icon: '📄' },
      { id: 'cover-letter', name: 'Cover Letter Template.docx', type: 'file', size: '45 KB', dateModified: 'Nov 28, 2024', icon: '📝' }
    ],
    education: [
      { 
        id: 'stevens', 
        name: 'Stevens Institute of Technology', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Dec 15, 2024', 
        icon: '/folder-icon.png',
        content: {
          degree: 'Master of Science',
          field: 'Computer Science',
          institution: 'Stevens Institute of Technology',
          location: 'Hoboken, New Jersey',
          duration: 'September 2024 – December 2025',
          status: 'In Progress',
          collegeLogo: '/stevens.png',
          overview: 'Currently pursuing a Master\'s degree in Computer Science with a specialization in Enterprise and Cloud Computing. This program combines theoretical foundations with hands-on experience in modern cloud technologies and enterprise systems.',
          courses: [
            'Enterprise Software Architecture',
            'Mobile Systems and Application',
            'Algorithms',
            'Object Oriented Analysis',
            'Distributed Systems and Cloud Computing',
            'Enterprise Cloud Security'
          ],
          achievements: [
            'Developed comprehensive expertise in enterprise cloud systems and distributed architectures',
            'Advanced proficiency in software development, system architecture, and scalable design patterns',
            'Published research paper under the mentorship of Prof. Norman Ahmed for IEEE CS Cloud Conference 2025',
            'Appointed as Teaching Assistant for Enterprise and Cloud Computing course',
            'Mentored 40+ graduate students in complex cloud deployment projects and system design'
          ],
          publications: [
            {
              title: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud',
              conference: 'IEEE CS Cloud Conference',
              year: '2025'
            }
          ]
        }
      },
      { 
        id: 'pes', 
        name: 'PES University', 
        type: 'folder', 
        size: '--', 
        dateModified: 'May 20, 2024', 
        icon: '/folder-icon.png',
        content: {
          degree: 'Bachelor of Technology',
          field: 'Electronics and Communications',
          institution: 'PES University',
          location: 'Bangalore, India',
          duration: 'December 2020 – May 2024',
          status: 'Completed',
          collegeLogo: '/pes.webp',
          overview: 'Completed Bachelor\'s degree in Electronics and Communications Engineering with a strong focus on both hardware and software aspects. Developed expertise in signal processing, communication systems, and programming that laid the foundation for my transition into software development and cloud computing.',
          courses: [
            'Digital Signal Processing',
            'Communication Systems',
            'Microprocessors and Microcontrollers',
            'VLSI Design',
            'Wireless Communication',
            'Network Theory',
            'Data Structures and Algorithms',
            'Object-Oriented Programming',
            'Database Management Systems',
            'Computer Networks'
          ],
          achievements: [
            'Successfully completed 4-year engineering program',
            'Strong performance in both theoretical and practical coursework',
            'Developed multiple projects combining hardware and software',
            'Active participation in technical workshops and seminars'
          ],
          publications: [
            {
              title: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks',
              conference: 'ICITS 2024',
              year: '2024'
            }
          ]
        }
      }
    ],
    achievements: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate.pdf', type: 'file', size: '1.2 MB', dateModified: 'May 15, 2025', icon: '🏆' },
      { id: 'hackathon', name: 'Duckathon 2024 Runner-up.jpg', type: 'file', size: '3.5 MB', dateModified: 'Oct 12, 2024', icon: '🥈' },
      { id: 'publications', name: 'Research Publications', type: 'folder', size: '--', dateModified: 'Nov 25, 2025', icon: '/folder-icon.png' }
    ],
    projects: [
      { id: 'ml-pipeline', name: 'AI-ML Pipeline Project', type: 'folder', size: '--', dateModified: 'Jan 15, 2025', icon: '/folder-icon.png' },
      { id: 'mobile-chat', name: 'Mobile Chat Application', type: 'folder', size: '--', dateModified: 'Aug 20, 2024', icon: '/folder-icon.png' },
      { id: 'aws-terraform', name: 'AWS Infrastructure with Terraform', type: 'folder', size: '--', dateModified: 'Jul 10, 2024', icon: '/folder-icon.png' }
    ],
    certifications: [
      { id: 'aws-cert', name: 'AWS Solution Architect Certificate.pdf', type: 'file', size: '1.2 MB', dateModified: 'May 15, 2025', icon: '🏆' },
      { id: 'stevens-cert', name: 'Enterprise & Cloud Computing Certificate.pdf', type: 'file', size: '890 KB', dateModified: 'Dec 25, 2025', icon: '🎓' }
    ],
    experience: [
      { id: 'stevens-ta', name: 'Stevens Institute - Teaching Assistant', type: 'folder', size: '--', dateModified: 'Sep 15, 2025', icon: '/folder-icon.png' },
      { id: 'sellwizr', name: 'SellWizr - Software Development Intern', type: 'folder', size: '--', dateModified: 'Aug 25, 2025', icon: '/folder-icon.png' },
      { id: 'antwalk', name: 'Antwalk - R&D Intern', type: 'folder', size: '--', dateModified: 'Jul 24, 2024', icon: '/folder-icon.png' }
    ]
  }



  // Get current folder contents
  const currentFolderContents = selectedFolder ? folderContents[selectedFolder] || [] : []
  
  // Get selected file details
  const selectedFileDetails = selectedFile ? currentFolderContents.find(file => file.id === selectedFile) : null

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Finder Window */}
      <div className="relative w-full max-w-7xl h-[700px] bg-white/90 dark:bg-teal-dark-800/90 backdrop-blur-xl border border-white/30 dark:border-teal-dark-600/30 rounded-xl overflow-hidden shadow-2xl flex flex-col sf-font">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-teal-dark-700/80 border-b border-gray-200/50 dark:border-teal-dark-600/50 rounded-t-xl">
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
                    {selectedFileDetails.content?.collegeLogo ? (
                      <img src={selectedFileDetails.content.collegeLogo} alt="institution logo" className="w-16 h-16 mx-auto mb-2 object-contain" />
                    ) : selectedFileDetails.icon.startsWith('/') ? (
                      <img src={selectedFileDetails.icon} alt="icon" className="w-16 h-16 mx-auto mb-2" />
                    ) : (
                      <div className="text-6xl mb-2">{selectedFileDetails.icon}</div>
                    )}
                    <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                      {selectedFileDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                      {selectedFileDetails.type === 'folder' ? 'Folder' : 'Document'}
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

                  {/* Content Preview for Education Items */}
                  {selectedFileDetails.content && (
                    <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                      {/* Institution Header */}
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                        {selectedFileDetails.content.collegeLogo?.startsWith('/') ? (
                          <img 
                            src={selectedFileDetails.content.collegeLogo} 
                            alt={`${selectedFileDetails.content.institution} logo`}
                            className="w-12 h-12 object-contain rounded-lg bg-white/60 dark:bg-teal-dark-700/40 p-1"
                          />
                        ) : (
                          <span className="text-3xl">{selectedFileDetails.content.collegeLogo}</span>
                        )}
                        <div>
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base">
                            {selectedFileDetails.content.institution}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-teal-400">
                            {selectedFileDetails.content.degree} in {selectedFileDetails.content.field}
                          </p>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="bg-gray-50/60 dark:bg-teal-dark-900/30 rounded-md p-3 mb-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-teal-400">
                          <MapPin className="w-3 h-3" />
                          <span>{selectedFileDetails.content.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-teal-400">
                          <Calendar className="w-3 h-3" />
                          <span>{selectedFileDetails.content.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedFileDetails.content.status === 'In Progress' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          }`}>
                            {selectedFileDetails.content.status}
                          </span>
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Overview
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                          <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                            {selectedFileDetails.content.overview}
                          </p>
                        </div>
                      </div>

                      {/* Key Courses and Publications */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Key Courses */}
                        <div>
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            Key Courses
                          </h6>
                          <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                            <div className="space-y-1">
                              {selectedFileDetails.content.courses.slice(0, 4).map((course: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></span>
                                  <span>{course}</span>
                                </div>
                              ))}
                              {selectedFileDetails.content.courses.length > 4 && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-teal-400 italic mt-2 pt-2 border-t border-gray-200/30 dark:border-teal-dark-600/30">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                                  <span>+{selectedFileDetails.content.courses.length - 4} more courses</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Publications */}
                        <div>
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Publications
                          </h6>
                          <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                            <div className="space-y-2">
                              {selectedFileDetails.content.publications?.map((publication: any, index: number) => (
                                <div key={index} className="space-y-1">
                                  <div className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                                    <div>
                                      <p className="text-gray-700 dark:text-teal-200 font-medium leading-tight">
                                        {publication.title}
                                      </p>
                                      <p className="text-gray-500 dark:text-teal-400 text-sm">
                                        {publication.conference} ({publication.year})
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )) || (
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-teal-400">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                                  <span>No publications yet</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
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

export default EducationFinderWindow
