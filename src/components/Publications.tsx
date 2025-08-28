import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, BookOpen, Users, Award } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface Publication {
  id: string
  title: string
  authors: string[]
  conference: string
  location: string
  date: string
  type: string
  status: string
  abstract: string
  keywords: string[]
  doi?: string
  url?: string
}

const Publications = () => {
  const { isDark } = useTheme()
  const publications: Publication[] = [
    {
      id: 'ml-daas-framework',
      title: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud',
      authors: ['Koushik Ravikumar', 'Co-authors'],
      conference: 'IEEE CS Cloud Conference 2025',
      location: 'New York, USA',
      date: 'November 2025',
      type: 'Conference Paper',
      status: 'Accepted',
      abstract: 'This paper presents ML-DaaS, a comprehensive framework for secure machine learning model training and deployment in cloud environments. The framework addresses key challenges in cloud-based ML workflows including security, scalability, and resource optimization.',
      keywords: ['Machine Learning', 'Cloud Computing', 'Security', 'DevOps', 'ML Deployment', 'Framework Design']
    },
    {
      id: 'wlan-throughput-prediction',
      title: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks',
      authors: ['Koushik Ravikumar', 'Research Team'],
      conference: '12th International Conference on Information Technology and Science (ICITS 2024)',
      location: 'Phuket, Thailand',
      date: 'July 2024',
      type: 'Conference Paper',
      status: 'Published',
      abstract: 'This research proposes a novel approach using Graph Attention Networks (GANs) to predict throughput in densely deployed Wireless Local Area Networks (WLAN). The method demonstrates significant improvements in prediction accuracy compared to traditional approaches.',
      keywords: ['WLAN', 'Graph Attention Networks', 'Throughput Prediction', 'Wireless Networks', '5G', 'Network Optimization']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
          <h2 className="text-5xl font-bold mac-gradient-text mb-6">Publications</h2>
          <p className="text-xl text-teal-600 dark:text-teal-300 max-w-3xl mx-auto">
            Research contributions in machine learning, cloud computing, and network optimization
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-16"
        >
          {publications.map((publication) => (
            <motion.div
              key={publication.id}
              variants={itemVariants}
              className="mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 hover:border-white/40 dark:hover:border-teal-dark-600/50 transition-all duration-300 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-teal-500" />
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      publication.status === 'Published' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {publication.status}
                    </span>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-full">
                      {publication.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-teal-800 dark:text-teal-100 mb-2 leading-tight">
                    {publication.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-2 text-sm text-teal-600 dark:text-teal-400">
                    <Users className="w-4 h-4" />
                    <span>{publication.authors.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Conference Details */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-teal-600 dark:text-teal-400">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">{publication.conference}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{publication.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{publication.date}</span>
                </div>
              </div>

              {/* Abstract */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
                  Abstract
                </h4>
                <p className="text-teal-700 dark:text-teal-200 text-sm leading-relaxed">
                  {publication.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
                  Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {publication.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      className="px-2 py-1 bg-teal-50 dark:bg-teal-dark-900/50 text-teal-700 dark:text-teal-300 text-xs rounded-full border border-teal-200/30 dark:border-teal-dark-600/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {publication.url && (
                <div className="flex gap-2">
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Publication
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Research Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { label: 'Publications', value: '2', icon: '📄' },
            { label: 'Conferences', value: '2', icon: '🏆' },
            { label: 'Research Areas', value: '3', icon: '🔬' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-6 text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-teal-600 dark:text-teal-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-8">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-4">
              Research Interests
            </h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">
              Focused on advancing the intersection of machine learning, cloud computing, and network optimization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">🤖</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Machine Learning
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">☁️</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Cloud Computing
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-teal-dark-700/50 rounded-lg">
                <span className="text-2xl">📡</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                  Network Optimization
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Publications
