import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Briefcase, ChevronRight } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ExperienceItem {
  id: string
  title: string
  company: string
  location: string
  duration: string
  type: string
  description: string[]
  skills: string[]
  companyLogo: string
}

const Experience = () => {
  const { isDark } = useTheme()
  const experiences: ExperienceItem[] = [
    {
      id: 'stevens-ta',
      title: 'Teaching Assistant (Enterprise and Cloud Computing)',
      company: 'Stevens Institute of Technology',
      location: 'Hoboken, New Jersey',
      duration: 'September 2025 – Present',
      type: 'Academic',
      companyLogo: '🏫',
      description: [
        'Assisted 40+ students with projects using BouncyCastle, Payara Micro, and Maven for Java and Android applications',
        'Guided teams in deploying gRPC-based client-server applications on AWS using Docker with secure configurations',
        'Conducted weekly 2-hour office hours, providing technical mentorship and troubleshooting support'
      ],
      skills: ['Java', 'Android', 'AWS', 'Docker', 'gRPC', 'Maven', 'BouncyCastle', 'Payara Micro', 'Teaching', 'Mentoring']
    },
    {
      id: 'sellwizr',
      title: 'Summer Internship - Software Development (Infrastructure)',
      company: 'SellWizr',
      location: 'Manhattan, New York',
      duration: 'June 2025 – August 2025',
      type: 'Internship',
      companyLogo: '🏢',
      description: [
        'Built Terraform modules to automate deployment of a 3-tier application, cutting deployment time to under 10 minutes',
        'Designed a Kafka-S3 logging system to stream 100K+ user journeys/day to S3 for feedback system training',
        'Created multiple data scrapers to feed raw data into an S3 data lake via AWS SQS, processing upto 10TB per day'
      ],
      skills: ['Terraform', 'AWS', 'Kafka', 'S3', 'SQS', 'Data Engineering', 'Infrastructure Automation', 'Python', 'DevOps']
    },
    {
      id: 'antwalk',
      title: 'Research and Development Intern',
      company: 'Antwalk',
      location: 'Bangalore, India',
      duration: 'December 2023 – July 2024',
      type: 'Internship',
      companyLogo: '🏢',
      description: [
        'Created competency frameworks for QA, DevOps, Cloud, and SDE roles, for internal training and client onboarding',
        'Reviewed and validated cloud and DevOps content with client teams as an SME, ensuring practical applicability',
        'Developed prototypes of LLM-based applications using OpenAI API for competency assessment, for client use cases'
      ],
      skills: ['Research', 'DevOps', 'Cloud Computing', 'OpenAI API', 'LLM', 'Content Development', 'SME Consultation', 'Training']
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
          <h2 className="text-5xl font-bold mac-gradient-text mb-6">Experience</h2>
          <p className="text-xl text-teal-600 dark:text-teal-300 max-w-3xl mx-auto">
            Professional journey in software development, cloud infrastructure, and research
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500"></div>

          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className="relative mb-12 ml-20"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-14 top-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-white dark:border-teal-dark-900 shadow-lg"></div>

              {/* Experience Card */}
              <div className="mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 hover:border-white/40 dark:hover:border-teal-dark-600/50 transition-all duration-300 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{experience.companyLogo}</span>
                      <h3 className="text-xl font-bold text-teal-800 dark:text-teal-100">
                        {experience.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-teal-600 dark:text-teal-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span className="text-sm text-teal-600 dark:text-teal-400">{experience.duration}</span>
                      <span className="px-2 py-1 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-full">
                        {experience.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <ul className="space-y-2">
                    {experience.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-teal-700 dark:text-teal-200 text-sm">
                        <ChevronRight className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-teal-50 dark:bg-teal-dark-900/50 text-teal-700 dark:text-teal-300 text-xs rounded-full border border-teal-200/30 dark:border-teal-dark-600/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-8">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-4">
              Ready for the next challenge
            </h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">
              Looking for opportunities to contribute to innovative projects and grow with a dynamic team.
            </p>
            <a
              href="mailto:kravikum1@stevens.edu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              <Users className="w-5 h-5" />
              Let's Connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
