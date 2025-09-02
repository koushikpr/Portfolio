import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Download
} from 'lucide-react'

interface MobileSection {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  items: any[]
}

const MobilePortfolio = () => {
  const { isDark } = useTheme()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections: MobileSection[] = [
    {
      id: 'about',
      title: 'About Me',
      icon: <User className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          title: 'Koushik Ravikumar',
          subtitle: 'AWS Certified Software Engineer',
          description: 'AWS Certified Software Developer with hands-on experience in software and cloud architecture, full-stack development, and production deployments. Skilled in building enterprise-level applications and automating cloud infrastructure.',
          location: '29 Thorne St, Jersey City, New Jersey 07307',
          email: 'kravikum1@stevens.edu',
          phone: '+1 (201) 484-6809',
          yearsExperience: '1+ Years',
          currentRole: 'Teaching Assistant - Enterprise & Cloud Computing'
        }
      ]
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          company: 'Stevens Institute of Technology',
          position: 'Teaching Assistant (Enterprise and Cloud Computing)',
          duration: 'Sep 2025',
          description: 'Assisted 40+ students with projects using BouncyCastle, Payara Micro, and Maven for Java and Android applications. Guided teams in deploying gRPC-based client-server applications on AWS using Docker with secure configurations.',
          technologies: ['Teaching', 'Mentoring', 'Java', 'Android Development', 'AWS', 'Docker', 'gRPC', 'Maven', 'BouncyCastle', 'Payara Micro']
        },
        {
          company: 'SellWizr',
          position: 'Software Development Intern (Infrastructure)',
          duration: 'June 2025 – Aug 2025',
          description: 'Built Terraform modules to automate deployment of a 3-tier application, cutting deployment time to under 10 minutes. Designed a Kafka-S3 logging system to stream 100K+ user journeys/day to S3 for feedback system training.',
          technologies: ['Terraform', 'AWS', 'Kafka', 'S3', 'SQS', 'Data Engineering', 'Infrastructure', 'Python', 'Automation', 'DevOps']
        },
        {
          company: 'Antwalk',
          position: 'Research and Development Intern',
          duration: 'Dec 2023 – July 2024',
          description: 'Created competency frameworks for QA, DevOps, Cloud, and SDE roles, for internal training and client onboarding. Developed prototypes of LLM-based applications using OpenAI API for competency assessment.',
          technologies: ['Research', 'Framework Development', 'OpenAI API', 'LLM Applications', 'Cloud Computing', 'DevOps', 'Quality Assurance', 'Content Validation']
        }
      ]
    },
    {
      id: 'education',
      title: 'Education',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          institution: 'Stevens Institute of Technology',
          degree: 'Master of Science in Computer Science',
          duration: 'Sep 2024 – Dec 2025',
          status: 'In Progress',
          location: 'Hoboken, New Jersey',
          courses: ['Enterprise Software Architecture', 'Mobile Systems and Application', 'Algorithms', 'Distributed Systems and Cloud Computing', 'Enterprise and Cloud Computing', 'Enterprise Cloud Security', 'Object Oriented Analysis', 'Research Project'],
          achievements: ['Hackathon Runner up Duckathon 2024', 'Published research paper to IEEE CS Cloud 2025', 'Teaching assistant for enterprise and cloud computing']
        },
        {
          institution: 'PES University',
          degree: 'Bachelor of Engineering in Computer Science',
          duration: 'Aug 2020 – May 2024',
          status: 'Completed',
          location: 'Bangalore, India',
          courses: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Management', 'Computer Networks', 'Operating Systems'],
          achievements: ['Graduated with distinction', 'Active in technical clubs and events']
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          name: 'Cross Platform Model Development and Deployment Pipeline',
          description: 'Automated instance setup with Ansible playbooks, including Jupyter Notebook and CUDA toolkit within 5 minutes. Integrated Terraform and Jenkins to enable dashboard access and streamline instance launch.',
          technologies: ['Jenkins', 'Terraform', 'Ansible', 'Docker', 'Flask', 'CUDA', 'Jupyter Notebook'],
          link: 'https://github.com/koushikpr/Cross-Platform-Model-Development-and-Deployment-Pipeline',
          status: 'Active'
        },
        {
          name: 'CI/CD Pipeline for Multi-Container Web Application',
          description: 'Demonstrates how to deploy a Python Flask Application on AWS. Includes building with Pip, containerizing with Docker, creating AWS resources with Terraform, configuration management with Ansible, and deployment using Kubernetes.',
          technologies: ['Terraform', 'Ansible', 'Flask', 'Kubernetes', 'Jenkins', 'DevOps', 'AWS', 'Docker', 'Python'],
          link: 'https://github.com/koushikpr/CI-CD-Pipeline-for-Flask-App-Using-Git-and-Jenkins',
          status: 'Completed'
        },
        {
          name: 'Next-Gen WiFi Throughput Prediction Challenge',
          description: 'Machine Learning project for predicting WiFi throughput performance as part of the ITU AI/ML in 5G Challenge. Implements advanced ML algorithms for network performance optimization.',
          technologies: ['Machine Learning', 'Python', 'Jupyter Notebook', '5G Networks', 'WiFi Optimization', 'Data Science', 'Network Analysis'],
          link: 'https://github.com/koushikpr/Next-Gen-WiFi-Throughput-Prediction-Challenge-by-ITU-AI-ML-in-5G-Challenge',
          status: 'Completed'
        },
        {
          name: 'Mobile Chat Application',
          description: 'Developed an Android chat application using Java, supporting TCP, UDP, and gRPC messaging. Implemented complex UI features including menu inflaters, lazy loading, and dynamic view updates.',
          technologies: ['Java', 'Android Studio', 'TCP/UDP', 'gRPC', 'AWS', 'Android Development', 'UI/UX'],
          link: 'https://github.com/koushikpr/Mobile-Chat-Application',
          status: 'Completed'
        }
      ]
    },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: <Award className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          name: 'AWS Solutions Architect Associate',
          issuer: 'Amazon Web Services',
          date: 'May 2025',
          credentialId: 'AWS-SAA-C03',
          description: 'Validates expertise in designing distributed systems on AWS'
        },
        {
          name: 'Enterprise & Cloud Computing Certificate',
          issuer: 'Stevens Institute of Technology',
          date: 'December 2025',
          credentialId: 'STEVENS-ECC-2025',
          description: 'Specialized certificate in enterprise cloud computing and architecture'
        }
      ]
    },
    {
      id: 'resume',
      title: 'Online Resume',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-700',
      items: [
        {
          title: 'Interactive Resume Viewer',
          description: 'View my complete professional resume in an interactive format. Includes detailed work experience, technical skills, education, and achievements.',
          type: 'resume-viewer'
        }
      ]
    }
  ]

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  const handleDownloadResume = () => {
    // Trigger resume download
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Koushik_Ravikumar_Resume.pdf'
    link.click()
  }

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gradient-to-br from-teal-900 to-gray-900' : 'bg-gradient-to-br from-teal-50 to-white'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        isDark 
          ? 'bg-teal-900/80 border-teal-700' 
          : 'bg-white/80 border-teal-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Koushik's Portfolio
              </h1>
              <p className={`text-sm ${
                isDark ? 'text-teal-300' : 'text-teal-600'
              }`}>
                AWS Certified Software Engineer
              </p>
            </div>
            <button
              onClick={handleDownloadResume}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                  : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
              }`}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Mobile Portfolio Greeting */}
        <div className={`text-center p-6 rounded-2xl ${
          isDark 
            ? 'bg-teal-800/30 border border-teal-700/50' 
            : 'bg-white border border-teal-100'
        } shadow-lg`}>
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
                isDark ? 'border-teal-400' : 'border-teal-500'
              } shadow-lg`}>
                <img 
                  src="/kpr.jpg" 
                  alt="Koushik Ravikumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Hi I'm Koushik
            </h2>
            <p className={`text-sm ${
              isDark ? 'text-teal-300' : 'text-teal-600'
            }`}>
              A Software Engineer who can deploy software on any cloud platform. This is my mobile portfolio. Try using the desktop version for a better experience.
            </p>
            <p className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Explore the sections below to learn more about me
            </p>
          </div>
        </div>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            layout
            className={`rounded-2xl overflow-hidden shadow-lg ${
              isDark 
                ? 'bg-teal-800/30 border border-teal-700/50' 
                : 'bg-white border border-teal-100'
            }`}
          >
            {/* Section Header */}
            <motion.button
              onClick={() => handleSectionClick(section.id)}
              className={`w-full p-6 flex items-center justify-between transition-colors ${
                isDark 
                  ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                  : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <span className="text-lg font-semibold">{section.title}</span>
              </div>
              <motion.div
                animate={{ rotate: activeSection === section.id ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            {/* Section Content */}
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-6 space-y-4">
                    {section.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 sm:p-4 rounded-xl ${
                          isDark 
                            ? 'bg-teal-700/30' 
                            : 'bg-teal-50/50'
                        }`}
                      >
                        {section.id === 'about' && (
                          <div className="space-y-3">
                            <h3 className={`text-lg font-semibold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm ${
                              isDark ? 'text-teal-400' : 'text-teal-600'
                            }`}>
                              {item.subtitle}
                            </p>
                            <p className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {item.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <MapPin className={`w-4 h-4 ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <span className={`text-sm ${
                                  isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {item.location}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className={`w-4 h-4 ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <a 
                                  href={`mailto:${item.email}`}
                                  className={`text-sm ${
                                    isDark ? 'text-teal-400' : 'text-teal-600'
                                  } hover:underline`}
                                >
                                  {item.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {section.id === 'experience' && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <h3 className={`font-semibold text-base sm:text-lg leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.position}
                              </h3>
                              <div className="flex justify-between items-center">
                                <p className={`text-sm font-medium ${
                                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                                }`}>
                                  {item.company}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  isDark 
                                    ? 'bg-teal-700/50 text-teal-300' 
                                    : 'bg-teal-100 text-teal-700'
                                }`}>
                                  {item.duration}
                                </span>
                              </div>
                            </div>
                            <p className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    isDark 
                                      ? 'bg-blue-900/50 text-blue-300' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.id === 'education' && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <h3 className={`font-semibold text-base sm:text-lg leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.degree}
                              </h3>
                              <div className="flex justify-between items-center">
                                <p className={`text-sm font-medium ${
                                  isDark ? 'text-blue-400' : 'text-blue-600'
                                }`}>
                                  {item.institution}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  isDark 
                                    ? 'bg-teal-700/50 text-teal-300' 
                                    : 'bg-teal-100 text-teal-700'
                                }`}>
                                  {item.duration}
                                </span>
                              </div>
                            </div>
                            {item.status && (
                              <p className={`text-sm ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                Status: {item.status}
                              </p>
                            )}
                            {item.location && (
                              <p className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                📍 {item.location}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {item.courses.map((course: string, courseIndex: number) => (
                                <span
                                  key={courseIndex}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    isDark 
                                      ? 'bg-blue-900/50 text-blue-300' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                            {item.achievements && (
                              <div className="mt-3">
                                <h4 className={`text-sm font-semibold mb-2 ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                  Key Achievements:
                                </h4>
                                <div className="space-y-1">
                                  {item.achievements.map((achievement: string, achIndex: number) => (
                                    <p key={achIndex} className={`text-xs ${
                                      isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                      • {achievement}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {section.id === 'projects' && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start gap-2">
                                <h3 className={`font-semibold text-base sm:text-lg flex-1 leading-tight ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {item.name}
                                </h3>
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-1 rounded-full ml-2 ${
                                    isDark 
                                      ? 'text-teal-400 hover:text-teal-300' 
                                      : 'text-teal-600 hover:text-teal-700'
                                  } transition-colors`}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                              {item.status && (
                                <span className={`text-xs px-2 py-1 rounded-full inline-block ${
                                  item.status === 'Active' 
                                    ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                                    : (isDark ? 'bg-teal-700/50 text-teal-300' : 'bg-teal-100 text-teal-700')
                                }`}>
                                  {item.status}
                                </span>
                              )}
                            </div>
                            <p className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    isDark 
                                      ? 'bg-orange-900/50 text-orange-300' 
                                      : 'bg-orange-100 text-orange-700'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.id === 'certifications' && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <h3 className={`font-semibold text-base sm:text-lg leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.name}
                              </h3>
                              <div className="flex justify-between items-center">
                                <p className={`text-sm font-medium ${
                                  isDark ? 'text-purple-400' : 'text-purple-600'
                                }`}>
                                  {item.issuer}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  isDark 
                                    ? 'bg-teal-700/50 text-teal-300' 
                                    : 'bg-teal-100 text-teal-700'
                                }`}>
                                  {item.date}
                                </span>
                              </div>
                            </div>
                            <p className={`text-xs ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Credential ID: {item.credentialId}
                            </p>
                            {item.description && (
                              <p className={`text-sm mt-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        )}

                        {section.id === 'resume' && (
                          <div className="space-y-4">
                            <h3 className={`font-semibold text-base sm:text-lg leading-tight ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {item.description}
                            </p>
                            <div className="space-y-3">
                              <button
                                onClick={handleDownloadResume}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                                  isDark 
                                    ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                                    : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
                                }`}
                              >
                                <Download className="w-4 h-4" />
                                <span className="font-medium">Download PDF Resume</span>
                              </button>
                              <div className={`p-4 rounded-lg border-2 border-dashed ${
                                isDark 
                                  ? 'border-teal-600/50 bg-teal-800/20' 
                                  : 'border-teal-300 bg-teal-50'
                              }`}>
                                <div className="text-center">
                                  <FileText className={`w-8 h-8 mx-auto mb-2 ${
                                    isDark ? 'text-teal-400' : 'text-teal-600'
                                  }`} />
                                  <p className={`text-sm font-medium ${
                                    isDark ? 'text-teal-300' : 'text-teal-700'
                                  }`}>
                                    Interactive Resume Viewer
                                  </p>
                                  <p className={`text-xs mt-1 ${
                                    isDark ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    Coming Soon - View resume in browser
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Social Links Footer */}
      <div className="px-6 py-8">
        <div className={`p-6 rounded-2xl ${
          isDark 
            ? 'bg-teal-800/30 border border-teal-700/50' 
            : 'bg-white border border-teal-100'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Connect With Me
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/koushikpr"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDark 
                  ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                  : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
              } transition-colors`}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/koushikpr"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${
                isDark 
                  ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                  : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
              } transition-colors`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:kravikum1@stevens.edu"
              className={`p-3 rounded-full ${
                isDark 
                  ? 'bg-teal-800/30 border border-teal-700/50 text-teal-300 hover:bg-teal-700/40' 
                  : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
              } transition-colors`}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6">
        <div className={`text-center py-4 border-t ${
          isDark 
            ? 'border-teal-700/50 text-teal-300' 
            : 'border-teal-200 text-teal-600'
        }`}>
          <p className="text-sm font-medium">
            Mobile Portfolio
          </p>
          <p className={`text-xs mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Koushik P R
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobilePortfolio
