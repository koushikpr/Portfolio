import { motion } from 'framer-motion'
import { Cloud, Code, Database, Settings, Brain, BarChart3 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface SkillCategory {
  id: string
  title: string
  icon: React.ElementType
  skills: string[]
  color: string
}

const Skills = () => {
  const { isDark } = useTheme()
  const skillCategories: SkillCategory[] = [
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'teal',
      skills: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Linux', 'Jenkins', 'Ansible', 'Prometheus', 'Grafana', 'Azure']
    },
    {
      id: 'languages-frameworks',
      title: 'Languages & Frameworks',
      icon: Code,
      color: 'blue',
      skills: ['Python', 'Java', 'SQL', 'Spring Boot', 'ASP.NET', 'React', 'JavaScript', 'C']
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning & Big Data',
      icon: Brain,
      color: 'purple',
      skills: ['PyTorch', 'Neural Networks', 'Data Analysis', 'Hadoop', 'Kafka', 'OpenAI API', 'Graph Attention Networks']
    },
    {
      id: 'databases-tools',
      title: 'Databases & Tools',
      icon: Database,
      color: 'green',
      skills: ['MongoDB', 'Redis', 'S3', 'SQS', 'Maven', 'Android Studio', 'Jupyter Notebook', 'Git']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Networking',
      icon: Settings,
      color: 'orange',
      skills: ['EC2', 'VPC', 'Security Groups', 'Lambda', 'EKS', 'GKE', 'TCP/UDP', 'gRPC', 'Load Balancing']
    },
    {
      id: 'analytics-monitoring',
      title: 'Analytics & Monitoring',
      icon: BarChart3,
      color: 'pink',
      skills: ['Data Engineering', 'Performance Optimization', 'System Monitoring', 'Log Analysis', 'Metrics Collection']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      teal: {
        bg: 'bg-teal-50 dark:bg-teal-dark-900/50',
        text: 'text-teal-700 dark:text-teal-300',
        border: 'border-teal-200/30 dark:border-teal-dark-600/30',
        hover: 'hover:border-teal-300/50 dark:hover:border-teal-dark-500/50'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/50',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200/30 dark:border-blue-600/30',
        hover: 'hover:border-blue-300/50 dark:hover:border-blue-500/50'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/50',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200/30 dark:border-purple-600/30',
        hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/50',
        text: 'text-green-700 dark:text-green-300',
        border: 'border-green-200/30 dark:border-green-600/30',
        hover: 'hover:border-green-300/50 dark:hover:border-green-500/50'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/50',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-200/30 dark:border-orange-600/30',
        hover: 'hover:border-orange-300/50 dark:hover:border-orange-500/50'
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/50',
        text: 'text-pink-700 dark:text-pink-300',
        border: 'border-pink-200/30 dark:border-pink-600/30',
        hover: 'hover:border-pink-300/50 dark:hover:border-pink-500/50'
      }
    }
    return colorMap[color] || colorMap.teal
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mac-gradient-text mb-6">Technical Skills</h2>
          <p className="text-xl text-teal-600 dark:text-teal-300 max-w-3xl mx-auto">
            Comprehensive expertise across cloud platforms, development frameworks, and emerging technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => {
            const colors = getColorClasses(category.color)
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={`mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 hover:border-white/40 dark:hover:border-teal-dark-600/50 transition-all duration-300 p-6 h-full`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 ${colors.bg} rounded-lg`}>
                    <category.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-teal-800 dark:text-teal-100">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                      className={`px-3 py-1 ${colors.bg} ${colors.text} text-sm rounded-full border ${colors.border} hover:scale-105 transition-transform cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Skill Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { skill: 'AWS', level: 90, color: 'bg-orange-500' },
            { skill: 'Python', level: 85, color: 'bg-blue-500' },
            { skill: 'Terraform', level: 88, color: 'bg-purple-500' },
            { skill: 'Docker/K8s', level: 82, color: 'bg-teal-500' }
          ].map((item, index) => (
            <motion.div
              key={item.skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 p-6 text-center"
            >
              <h4 className="text-lg font-bold text-teal-800 dark:text-teal-100 mb-3">
                {item.skill}
              </h4>
              <div className="relative w-full h-2 bg-gray-200 dark:bg-teal-dark-700 rounded-full mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.level}%` }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-full ${item.color} rounded-full`}
                />
              </div>
              <span className="text-sm text-teal-600 dark:text-teal-400">
                {item.level}% Proficiency
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <div className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-8">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">
              Passionate about staying current with emerging technologies and best practices in cloud computing and software development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">☁️</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Cloud Native
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  DevOps Expert
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">🤖</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  ML Engineer
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">💻</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Full Stack Developer
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
