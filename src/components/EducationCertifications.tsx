import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, MapPin, GraduationCap, Award, BookOpen, Shield, ExternalLink, Cloud, Trophy, Star } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface EducationItem {
  id: string
  degree: string
  field: string
  institution: string
  location: string
  duration: string
  status: string
  institutionLogo: string
  collegeLogo?: string
  highlights?: string[]
  journey?: {
    overview: string
    courses: string[]
    achievements: string[]
    publications?: string[]
    activities?: string[]
    gpa?: string
    thesis?: string
  }
}

interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  status: string
  credentialId?: string
  verificationUrl?: string
  icon: string
  description: string
  skills: string[]
}

const EducationCertifications = () => {
  const { isDark } = useTheme()
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null)

  const researchActivities = {
    id: 'research-activities',
    title: 'Research & Activities',
    icon: '🔬',
    publications: [
      {
        title: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud',
        conference: 'IEEE CS Cloud Conference 2025',
        authors: 'Koushik Ravikumar, Prof. Norman Ahmed',
        status: 'Published',
        description: 'Research paper focusing on secure machine learning deployment frameworks in cloud environments under the guidance of Prof. Norman Ahmed.'
      },
      {
        title: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks',
        conference: 'ICITS 2024, Phuket, Thailand',
        authors: 'Koushik Ravikumar, Research Team',
        status: 'Published',
        description: 'Research conducted during undergraduate studies at PES University on wireless network optimization using advanced ML techniques.'
      }
    ],
    activities: [
      {
        category: 'Academic',
        items: ['Graduate Student Association Member', 'Research Seminar Participant']
      },
      {
        category: 'Competitions',
        items: ['Hackathon Runner-up (Duckathon 2024)', 'Coding Competition Participant']
      },
      {
        category: 'Professional',
        items: ['Industry Networking Events', 'Tech Conference Attendee']
      }
    ]
  }

  const educationItems: EducationItem[] = [
    {
      id: 'stevens-ms',
      degree: 'Master of Science',
      field: 'Computer Science',
      institution: 'Stevens Institute of Technology',
      location: 'Hoboken, New Jersey',
      duration: 'September 2024 – December 2025',
      status: 'In Progress',
      institutionLogo: '🏫',
      collegeLogo: '/stevens.webp', // Stevens Institute logo
      highlights: [
        'Enterprise & Cloud Computing Graduate Certificate Program',
        'Focus on Cloud Architecture and DevOps',
        'Advanced Software Engineering Practices'
      ],
      journey: {
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
          
        ]
      }
    },
    {
      id: 'pes-btech',
      degree: 'Bachelor of Technology',
      field: 'Electronics and Communications',
      institution: 'PES University',
      location: 'Bangalore, India',
      duration: 'December 2020 – May 2024',
      status: 'Completed',
      institutionLogo: '🏫',
      collegeLogo: '/pes.webp', // PES University logo
      highlights: [
        'Strong foundation in Engineering Mathematics',
        'Signal Processing and Communication Systems',
        'Programming and Software Development'
      ],
      journey: {
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
        ]
      }
    }
  ]

  const certifications: Certification[] = [
    {
      id: 'aws-solution-architect',
      title: 'AWS Certified Solution Architect - Associate',
      issuer: 'Amazon Web Services',
      issueDate: 'May 2025',
      status: 'Expected',
      icon: '☁️',
      description: 'Validates expertise in designing distributed systems and applications on the AWS platform.',
      skills: ['AWS Architecture', 'Cloud Security', 'Cost Optimization', 'High Availability', 'Scalability']
    },
    {
      id: 'enterprise-cloud-computing',
      title: 'Enterprise & Cloud Computing Graduate Certificate Program',
      issuer: 'Stevens Institute of Technology',
      issueDate: 'December 2025',
      status: 'Expected',
      icon: '🎓',
      description: 'Comprehensive program covering enterprise-level cloud computing concepts and practical implementations.',
      skills: ['Enterprise Architecture', 'Cloud Migration', 'DevOps', 'Microservices', 'Container Orchestration']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section 
      className="min-h-screen pt-7 pb-20 relative overflow-hidden select-none"
      style={{
        backgroundImage: isDark 
          ? 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
        backgroundColor: isDark ? '#042f2e' : '#f0f4f8'
      }}
    >
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mac-gradient-text mb-6">Education & Certifications</h2>
          <p className="text-xl text-teal-600 dark:text-teal-300 max-w-3xl mx-auto">
            My Academic foundation and professional certifications
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-teal-500" />
            <h3 className="text-3xl font-bold text-teal-800 dark:text-teal-100">Education</h3>
          </div>

          {/* Finder Window */}
          <div className="mac-card bg-white/90 dark:bg-teal-dark-800/90 backdrop-blur-xl border border-white/30 dark:border-teal-dark-600/30 rounded-xl overflow-hidden shadow-2xl">
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-teal-dark-700/80 border-b border-gray-200/50 dark:border-teal-dark-600/50">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              
              {/* Window Title */}
              <div className="flex-1 text-center">
                <h4 className="text-sm font-medium text-gray-700 dark:text-teal-200">
                  Education & Research
                </h4>
              </div>
              
              {/* Window Controls */}
              <div className="flex items-center gap-2 opacity-60">
                <div className="w-4 h-4"></div> {/* Spacer for symmetry */}
              </div>
            </div>

            {/* Finder Content */}
            <div className="flex min-h-[600px]">
              {/* Sidebar */}
              <div className="w-72 flex-shrink-0 bg-gray-50/50 dark:bg-teal-dark-900/30 border-r border-gray-200/30 dark:border-teal-dark-600/30">
                <div className="p-4">
                  <h5 className="text-xs font-semibold text-gray-500 dark:text-teal-400 uppercase tracking-wide mb-3">
                    Institutions
                  </h5>
                  <div className="space-y-2">
                    {educationItems.map((education) => (
                      <motion.button
                        key={education.id}
                        onClick={() => setSelectedEducation(selectedEducation === education.id ? null : education.id)}
                        className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                          selectedEducation === education.id
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'hover:bg-gray-100 dark:hover:bg-teal-dark-800/50 text-gray-700 dark:text-teal-200'
                        }`}
                        whileHover={{ scale: selectedEducation === education.id ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          {education.collegeLogo?.startsWith('/') ? (
                            <img 
                              src={education.collegeLogo} 
                              alt={`${education.institution} logo`}
                              className="w-8 h-8 object-contain rounded"
                            />
                          ) : (
                            <span className="text-2xl">{education.collegeLogo}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">
                              {education.institution.split(' ').slice(0, 2).join(' ')}
                            </h4>
                            <p className="text-xs opacity-75 truncate">
                              {education.degree}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0 bg-white/30 dark:bg-teal-dark-900/20">
                {selectedEducation ? (
                  <motion.div
                    key={selectedEducation}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 h-full overflow-y-auto"
                  >
                  {(() => {
                    const education = educationItems.find(edu => edu.id === selectedEducation)
                    if (!education || !education.journey) return null

                    return (
                      <div className="space-y-8">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                          {education.collegeLogo?.startsWith('/') ? (
                            <img 
                              src={education.collegeLogo} 
                              alt={`${education.institution} logo`}
                              className="w-20 h-20 object-contain rounded-xl"
                            />
                          ) : (
                            <span className="text-6xl">{education.collegeLogo}</span>
                          )}
                          <div>
                            <h4 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-1">
                              {education.institution}
                            </h4>
                            <p className="text-lg text-teal-600 dark:text-teal-400 font-medium">
                              {education.degree} in {education.field}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-teal-600 dark:text-teal-400 mt-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{education.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{education.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Overview */}
                        <div>
                          <h5 className="text-lg font-semibold text-teal-800 dark:text-teal-100 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-teal-500" />
                            Overview
                          </h5>
                          <p className="text-teal-700 dark:text-teal-200 leading-relaxed">
                            {education.journey.overview}
                          </p>
                        </div>

                        {/* Courses */}
                        <div>
                          <h5 className="text-lg font-semibold text-teal-800 dark:text-teal-100 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-teal-500" />
                            Key Courses
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {education.journey.courses.map((course, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-teal-700 dark:text-teal-200">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></span>
                                <span>{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h5 className="text-lg font-semibold text-teal-800 dark:text-teal-100 mb-3 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-teal-500" />
                            Achievements
                          </h5>
                          <div className="space-y-2">
                            {education.journey.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm text-teal-700 dark:text-teal-200">
                                <Star className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>


                      </div>
                    )
                  })()}
                </motion.div>
                              ) : (
                  <div className="p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <GraduationCap className="w-16 h-16 text-gray-400 dark:text-teal-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-600 dark:text-teal-200 mb-2">
                        Select an Institution
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-teal-400">
                        Choose Stevens or PES from the sidebar to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Publications & Activities */}
              <div className="w-80 flex-shrink-0 bg-gray-50/50 dark:bg-teal-dark-900/30 border-l border-gray-200/30 dark:border-teal-dark-600/30">
                <div className="p-4 h-full overflow-y-auto">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h5 className="text-xs font-semibold text-gray-500 dark:text-teal-400 uppercase tracking-wide mb-3">
                        Research & Activities
                      </h5>
                    </div>

                    {/* Publications */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 dark:text-teal-300 mb-3">
                        Publications
                      </h6>
                    <div className="space-y-3">
                      {researchActivities.publications.map((publication, index) => {
                        const isHighlighted = 
                          (selectedEducation === 'stevens-ms' && publication.conference.includes('IEEE')) ||
                          (selectedEducation === 'pes-btech' && publication.conference.includes('ICITS'))
                        
                        return (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg border transition-all duration-300 ${
                              isHighlighted 
                                ? 'bg-teal-100 dark:bg-teal-dark-700/50 border-teal-300 dark:border-teal-dark-500 ring-2 ring-teal-200 dark:ring-teal-dark-600' 
                                : 'bg-teal-50 dark:bg-teal-dark-900/30 border-teal-200/30 dark:border-teal-dark-600/30'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h6 className="font-medium text-teal-800 dark:text-teal-100 text-xs leading-tight">
                                {publication.title}
                              </h6>
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full ml-2 flex-shrink-0">
                                {publication.status}
                              </span>
                            </div>
                            <p className="text-xs text-teal-600 dark:text-teal-400 mb-1">
                              <strong>{publication.conference}</strong>
                            </p>
                            <p className="text-xs text-teal-700 dark:text-teal-200">
                              {publication.description}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                    {/* Activities */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 dark:text-teal-300 mb-3">
                        Activities
                      </h6>
                    <div className="space-y-3">
                      {researchActivities.activities.map((category, index) => {
                        const isHighlighted = 
                          (selectedEducation === 'stevens-ms' && (category.category === 'Academic' || category.category === 'Competitions')) ||
                          (selectedEducation === 'pes-btech' && (category.category === 'Competitions' || category.category === 'Professional'))
                        
                        return (
                          <div key={index} className={`p-3 rounded-lg transition-all duration-300 ${
                            isHighlighted 
                              ? 'bg-teal-100 dark:bg-teal-dark-700/50 border border-teal-300 dark:border-teal-dark-500' 
                              : 'bg-teal-50 dark:bg-teal-dark-900/30'
                          }`}>
                            <h6 className="font-medium text-teal-700 dark:text-teal-300 mb-2 text-sm">
                              {category.category}
                            </h6>
                            <div className="space-y-1">
                              {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-2 text-xs text-teal-700 dark:text-teal-200">
                                  <Star className="w-2 h-2 text-teal-500 flex-shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-teal-500" />
            <h3 className="text-3xl font-bold text-teal-800 dark:text-teal-100">Certifications</h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                  className="mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 hover:border-white/40 dark:hover:border-teal-dark-600/50 transition-all duration-300 p-6 h-full"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{cert.icon}</span>
                    <div>
                      <h4 className="text-lg font-bold text-teal-800 dark:text-teal-100 leading-tight">
                        {cert.title}
                      </h4>
                      <p className="text-teal-600 dark:text-teal-400 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    cert.status === 'Expected' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {cert.status}
                  </span>
                </div>

                {/* Issue Date */}
                <div className="flex items-center gap-2 mb-4 text-sm text-teal-600 dark:text-teal-400">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.issueDate}</span>
                </div>

                {/* Description */}
                <p className="text-teal-700 dark:text-teal-200 mb-4 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Key Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-teal-50 dark:bg-teal-dark-900/50 text-teal-700 dark:text-teal-300 text-xs rounded-full border border-teal-200/30 dark:border-teal-dark-600/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Link */}
                {cert.verificationUrl && (
                  <div className="mt-auto">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Credential
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Combined Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: GraduationCap, label: 'Degrees', value: '2' },
            { icon: Cloud, label: 'Cloud Platforms', value: 'AWS' },
            { icon: Award, label: 'Certifications', value: '2+' },
            { icon: BookOpen, label: 'Academic Programs', value: '1' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-teal-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-teal-600 dark:text-teal-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-8">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">
              Committed to advancing knowledge in computer science and staying current with cloud technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">🎓</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Graduate Student
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">☁️</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  AWS Certified
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">📚</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Lifelong Learner
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EducationCertifications
