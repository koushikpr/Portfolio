import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, MapPin, Users } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface Project {
  id: string
  title: string
  duration: string
  organization?: string
  organizationLogo?: string
  description: string
  skills: string[]
  githubUrl?: string
  liveUrl?: string
  isOngoing?: boolean
}

const Projects = () => {
  const { isDark } = useTheme()
  const projects: Project[] = [
    {
      id: 'ai-ml-pipeline',
      title: 'Cross Platform Model Development and Deployment Pipeline',
      duration: 'January 2025',
      organization: 'Stevens Institute of Technology',
      organizationLogo: '🏫',
      description: 'Automated instance setup with Ansible playbooks, including Jupyter Notebook and CUDA toolkit within 5 minutes. Integrated Terraform and Jenkins to enable dashboard access and streamline instance launch. Dockerized trained models and deployed them via Flask endpoints, reducing deployment cost by 50%.',
      skills: ['Jenkins', 'Terraform', 'Ansible', 'Docker', 'Flask', 'CUDA', 'Jupyter Notebook'],
      githubUrl: 'https://github.com/koushikpr/Cross-Platform-Model-Development-and-Deployment-Pipeline',
      isOngoing: true
    },
    {
      id: 'wifi-throughput-prediction',
      title: 'Next-Gen WiFi Throughput Prediction Challenge by ITU AI/ML in 5G Challenge',
      duration: '2024',
      organization: 'PES University',
      organizationLogo: '🏫',
      description: 'Machine Learning project for predicting WiFi throughput performance as part of the ITU AI/ML in 5G Challenge. Implements advanced ML algorithms for network performance optimization.',
      skills: ['Machine Learning', 'Python', 'Jupyter Notebook', '5G Networks', 'WiFi Optimization', 'Data Science', 'Network Analysis'],
      githubUrl: 'https://github.com/koushikpr/Next-Gen-WiFi-Throughput-Prediction-Challenge-by-ITU-AI-ML-in-5G-Challenge'
    },
    {
      id: 'aws-terraform',
      title: 'AWS Infrastructure Building Using Terraform',
      duration: '2024',
      organization: 'Seminarroom',
      organizationLogo: '🏢',
      description: 'This Project demonstrates how to Deploy AWS Resources such as EC2, Security Groups, Routing Tables, Subnets, VPC, S3, Lambda, and EKS Using Terraform HCL Code',
      skills: ['Terraform', 'Amazon S3', 'Amazon Security Groups', 'AWS', 'AWS Lambda', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Amazon VPC', 'HCL', 'Amazon EKS', 'AWS Identity and Access Management (AWS IAM)'],
      githubUrl: 'https://github.com/koushikpr/AWS-Configuration-Using-Terraform'
    },
    {
      id: 'cicd-pipeline',
      title: 'CI/CD Pipeline for Deploying a Multi-Container Web Application on AWS EC2 Using Jenkins, Terraform and Kubernetes',
      duration: '2024',
      description: 'This Project demonstrates how to deploy a Python Flask Application on an AWS. The Pipeline Includes: 1. Building the Project Using Pip 2. Containerizing the Application using Docker 3. Creating AWS Resources Such as EC2 instance, Routing Tables, Security Groups and VPC Using Terraform 4. Configuration Management Using Ansible 5. Deployment using Kubernetes 6. CI/CD Using Git Webhook and Jenkins',
      skills: ['Terraform', 'Ansible', 'Flask', 'Kubernetes', 'Jenkins', 'DevOps', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Amazon VPC', 'Continuous Integration (CI)', 'Docker', 'Python (Programming Language)'],
      githubUrl: 'https://github.com/koushikpr/CI-CD-Pipeline-for-Flask-App-Using-Git-and-Jenkins'
    },
    {
      id: 'containerized-flask',
      title: 'Containerized Flask App Deployed On AWS EC2 Using Docker, Kubernetes and Ansible',
      duration: '2024',
      description: 'This Project demonstrated how to deploy a Flask App automatically using Ansible Configuration Management.',
      skills: ['Ansible', 'Flask', 'Kubernetes', 'Google Kubernetes Engine (GKE)', 'Amazon Web Services (AWS)', 'Amazon EC2', 'Docker', 'Python (Programming Language)'],
      githubUrl: 'https://github.com/koushikpr/Containerized-Flask-App-Deployed-On-AWS-and-GKE'
    },
    {
      id: 'spring-boot-gke',
      title: 'Deploying a Multi-Container Spring Boot Application on GKE using Docker and Kubernetes',
      duration: '2024',
      description: 'This Project demonstrates how to Deploy a Spring Boot Application with MongoDB dependencies On GKE by containerizing the application and Hosting on Google Kubernetes Engine.',
      skills: ['Spring Framework', 'Redis', 'Maven', 'Kubernetes', 'Google Kubernetes Engine (GKE)', 'Spring MVC', 'Docker', 'MongoDB', 'Google Cloud Platform (GCP)', 'Java'],
      githubUrl: 'https://github.com/koushikpr/Spring-Boot-Application-deployed-on-AWS-with-Ansible-Configuration'
    },
    {
      id: 'mobile-chat-app',
      title: 'Mobile Chat Application',
      duration: 'August 2024',
      organization: 'Stevens Institute of Technology',
      organizationLogo: '🏫',
      description: 'Developed an Android chat application using Java, supporting TCP, UDP, and gRPC messaging. Implemented complex UI features including menu inflaters, lazy loading, and dynamic view updates. Deployed an AWS-based server mediator to handle communication upto 10 Android clients.',
      skills: ['Java', 'Android Studio', 'TCP/UDP', 'gRPC', 'AWS', 'Android Development', 'UI/UX'],
      githubUrl: 'https://github.com/koushikpr/Mobile-Chat-Application'
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
          <h2 className="text-5xl font-bold mac-gradient-text mb-6">Projects</h2>
          <p className="text-xl text-teal-600 dark:text-teal-300 max-w-3xl mx-auto">
            A collection of my work in DevOps, Cloud Infrastructure, and Full-Stack Development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="mac-card bg-white/60 dark:bg-teal-dark-900/20 backdrop-blur-xl border border-white/20 dark:border-teal-dark-700/30 hover:border-white/40 dark:hover:border-teal-dark-600/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Project Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-teal-800 dark:text-teal-100 leading-tight">
                      {project.title}
                    </h3>
                    {project.isOngoing && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full ml-2 flex-shrink-0">
                        Live
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 text-sm text-teal-600 dark:text-teal-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.duration}</span>
                    </div>
                    
                    {project.organization && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="flex items-center gap-1">
                          <span>{project.organizationLogo}</span>
                          <span className="text-xs">{project.organization}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-teal-700 dark:text-teal-200 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Skills - Show only first 4 */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-teal-50 dark:bg-teal-dark-900/50 text-teal-700 dark:text-teal-300 text-xs rounded-full border border-teal-200/30 dark:border-teal-dark-600/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-2 py-1 bg-teal-100 dark:bg-teal-dark-800/50 text-teal-600 dark:text-teal-400 text-xs rounded-full">
                        +{project.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors flex-1 justify-center"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex-1 justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="mac-card bg-white/40 dark:bg-teal-dark-900/10 backdrop-blur-xl border border-white/15 dark:border-teal-dark-700/20 p-8">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100 mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">
              I'm always open to discussing new opportunities and innovative projects.
            </p>
            <a
              href="https://github.com/koushikpr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              View More on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
