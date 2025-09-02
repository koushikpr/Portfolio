import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen, MapPin, User, Mail, Phone, Github, Linkedin, Download, Calendar, ExternalLink, Briefcase, Users, Clock } from 'lucide-react'
import { useDeviceDetection } from '../hooks/useDeviceDetection'

interface MasterFinderWindowProps {
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

const MasterFinderWindow: React.FC<MasterFinderWindowProps> = ({ 
  onClose, 
  originX, 
  originY, 
  initialFolder = 'about' 
}) => {
  const deviceInfo = useDeviceDetection()
  const [selectedFolder, setSelectedFolder] = useState<string>(initialFolder)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Color coding function for skills/interests
  const getSkillColor = (skill: string) => {
    const cloudSkills = ['aws', 'azure', 'gcp', 'google cloud', 'cloud computing', 'terraform', 'kubernetes', 'docker', 'devops', 'ci/cd', 'jenkins', 'ansible']
    const developmentSkills = ['java', 'python', 'javascript', 'react', 'node.js', 'spring', 'flask', 'api', 'microservices', 'database', 'sql', 'mongodb']
    const researchSkills = ['research', 'publications', 'innovation', 'optimization', 'algorithms', 'data science', 'neural networks', 'machine learning']
    
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
    if (researchSkills.some(researchSkill => skill.toLowerCase().includes(researchSkill.toLowerCase()))) {
      return {
        bg: 'bg-purple-50 dark:bg-purple-900/50',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200/30 dark:border-purple-600/30',
        hover: 'hover:border-purple-300/50 dark:hover:border-purple-500/50'
      }
    }
    return {
      bg: 'bg-gray-50 dark:bg-gray-900/50',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200/30 dark:border-gray-600/30',
      hover: 'hover:border-gray-300/50 dark:hover:border-gray-500/50'
    }
  }

  const sidebarFolders = [
    { id: 'about', name: 'About Me', icon: '/folder-icon.png' },
    { id: 'education', name: 'Education', icon: '/folder-icon.png' },
    { id: 'certifications', name: 'Certifications', icon: '/folder-icon.png' },
    { id: 'experience', name: 'Experience', icon: '/folder-icon.png' },
    { id: 'projects', name: 'Projects', icon: '/folder-icon.png' },
    { id: 'events', name: 'Events and Publications', icon: '/folder-icon.png' }
  ]

  // Consolidated folder contents from all FinderWindows
  const folderContents: FolderContent = {
    about: [
      { 
        id: 'professional-profile', 
        name: 'Professional Profile', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          title: 'Professional Profile',
          profileBanner: '/kpr.jpg',
          personalInfo: {
            fullName: 'Koushik Ravikumar',
            title: 'AWS Certified Software Developer & Cloud Architect',
            location: '29 Thorne St, Jersey City, New Jersey 07307',
            yearsExperience: '2+ Years',
            education: 'MS Computer Science (Stevens Institute of Technology)',
            currentRole: 'Teaching Assistant - Enterprise & Cloud Computing'
          },
          summary: 'AWS Certified Software Developer with hands-on experience in software and cloud architecture, full-stack development, and production deployments. Skilled in building enterprise-level applications and automating cloud infrastructure. Eager to contribute to SDE and cloud infrastructure projects using AWS and DevOps best practices.',
          contact: {
            email: 'kravikum1@stevens.edu',
            phone: '201-484-6809',
            location: 'Jersey City, New Jersey',
            linkedin: 'linkedin.com/in/koushikpr',
            github: 'github.com/koushikpr'
          },
          stats: [
            { label: 'Years Experience', value: '2+', icon: '💼' },
            { label: 'Projects Completed', value: '7+', icon: '🚀' },
            { label: 'Certifications', value: '2', icon: '🏆' },
            { label: 'Publications', value: '2', icon: '📄' }
          ],
          interests: [
            'Cloud Computing', 'Machine Learning', 'DevOps', 'Software Architecture', 
            'Research & Publications', 'Teaching & Mentoring', 'Innovation', 'Automation',
            'Microservices', 'Kubernetes', 'AWS Solutions', 'Data Science'
          ]
        }
      },
      { 
        id: 'resume', 
        name: 'Resume.pdf', 
        type: 'file', 
        size: '1.8 MB', 
        dateModified: 'Dec 10, 2024', 
        icon: '📄',
        content: {
          title: 'Professional Resume',
          summary: 'Comprehensive resume showcasing professional experience, technical skills, education, and achievements in software development and cloud computing.',
          downloadUrl: '/resume.pdf'
        }
      },
      { 
        id: 'contact-info', 
        name: 'Contact Information', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          title: 'Contact Information',
          contact: {
            email: 'kravikum1@stevens.edu',
            phone: '201-484-6809',
            location: '29 Thorne St, Jersey City, New Jersey 07307',
            linkedin: 'linkedin.com/in/koushikpr',
            github: 'github.com/koushikpr'
          }
        }
      }
    ],
    education: [
      { 
        id: 'stevens', 
        name: 'Stevens Institute of Technology', 
        type: 'folder', 
        size: '--', 
        dateModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        icon: '/folder-icon.png',
        content: {
          degree: 'Master of Science',
          field: 'Computer Science',
          institution: 'Stevens Institute of Technology',
          location: 'Hoboken, New Jersey',
          duration: 'September 2024 – December 2025',
          status: 'In Progress',
          collegeLogo: '/stevens.png',
          institutionBanner: '/stevensb.webp',
          overview: 'Currently pursuing a Master\'s degree in Computer Science with a specialization in Enterprise and Cloud Computing. This program combines theoretical foundations with hands-on experience in modern cloud technologies and enterprise systems.',
          courses: [
            'Enterprise Software Architecture',
            'Mobile Systems and Application',
            'Algorithms',
            'Distributed Systems and Cloud Computing',
            'Enterprise and Cloud Computing',
            'Enterprise Cloud Security',
            'Object Oriented Analysis',
            'Research Project'
          ],
          achievements: [
            'Gained expertise in Enterprise cloud systems',
            'Deepened knowledge in advanced software development, architecture and system design',
            'Hackathon Runner up Duckathon 2024',
            'Published a research paper under guidance of Prof Norman Ahmed to IEEE CS Cloud 2025',
            'Joined as a Teaching assistant for enterprise and cloud computing'
          ],
          publications: [
            {
              title: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud',
              conference: 'IEEE CS Cloud Conference 2025',
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
        dateModified: 'May 24, 2024', 
        icon: '/folder-icon.png',
        content: {
          degree: 'Bachelor of Technology',
          field: 'Electronics and Communications',
          institution: 'PES University',
          location: 'Bangalore, India',
          duration: 'December 2020 – May 2024',
          status: 'Completed',
          collegeLogo: '/pes.webp',
          institutionBanner: '/pes.png',
          overview: 'Completed Bachelor\'s degree in Electronics and Communications Engineering with a strong focus on both hardware and software aspects. Developed expertise in signal processing, communication systems, and programming that laid the foundation for my transition into software development and cloud computing.',
          courses: [
            'Computer Networks',
            'Machine Learning',
            'Comp. Architecture',
            'Data Structures and Algorithms',
            'Database Management Systems',
            'Software Engineering'
          ],
          achievements: [
            'Strong foundation in electronics and communications engineering',
            'Developed programming skills in multiple languages',
            'Completed projects in signal processing and network analysis',
            'Built expertise in both hardware and software systems'
          ],
          publications: [
            {
              title: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks',
              conference: '12th International Conference on Information Technology and Science (ICITS 2024)',
              year: '2024'
            }
          ]
        }
      }
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
      { 
        id: 'stevens-ta', 
        name: 'Teaching Assistant - Stevens', 
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
          skills: ['Teaching', 'Mentoring', 'Java', 'Android Development', 'AWS', 'Docker', 'gRPC', 'Maven', 'BouncyCastle', 'Payara Micro']
        }
      },
      { 
        id: 'sellwizr', 
        name: 'SellWizr - Software Development Intern', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Aug 25, 2025', 
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
          skills: ['Terraform', 'AWS', 'Kafka', 'S3', 'SQS', 'Data Engineering', 'Infrastructure', 'Python', 'Automation', 'DevOps']
        }
      },
      { 
        id: 'antwalk', 
        name: 'Antwalk - R&D Intern', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Jul 24, 2024', 
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
          skills: ['Research', 'Framework Development', 'OpenAI API', 'LLM Applications', 'Cloud Computing', 'DevOps', 'Quality Assurance', 'Content Validation']
        }
      }
    ],
    projects: [
      { 
        id: 'ml-pipeline', 
        name: 'Cross Platform Model Development and Deployment Pipeline', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Jan 15, 2025', 
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
        id: 'wifi-prediction', 
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
    events: [
      { 
        id: 'aws-summit-nyc-2025', 
        name: 'AWS Summit NYC 2025', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Mar 15, 2025', 
        icon: '/folder-icon.png',
        content: {
          title: 'AWS Summit NYC 2025',
          eventType: 'Technology Conference',
          location: 'New York City, NY',
          date: 'March 2025',
          duration: '1 Day',
          eventBanner: '/awssummit.webp',
          description: [
            'Attended AWS Summit NYC 2025, focusing on latest cloud technologies and AWS services',
            'Participated in hands-on workshops covering serverless computing, machine learning, and container orchestration',
            'Networked with cloud professionals and learned about emerging trends in cloud infrastructure',
            'Gained insights into AWS best practices for enterprise-scale applications and cost optimization strategies'
          ],
          topics: ['AWS', 'Cloud Computing', 'Serverless', 'Machine Learning', 'Containers', 'DevOps', 'Infrastructure', 'Cost Optimization']
        }
      },
      { 
        id: 'google-cloud-bronx-2024', 
        name: 'Google Cloud Bronx 2024', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Oct 20, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Google Cloud Bronx 2024',
          eventType: 'Developer Conference',
          location: 'Bronx, NY',
          date: 'October 2024',
          duration: '1 Day',
          eventBanner: '/devfestbanner.webp',
          description: [
            'Participated in Google Cloud Bronx 2024 workshop focusing on Google Cloud Platform services and solutions',
            'Hands-on experience with Google Kubernetes Engine (GKE) and Cloud Run for containerized applications',
            'Learned about BigQuery for data analytics and Cloud AI/ML services for intelligent applications',
            'Collaborated with fellow developers on cloud-native application development and deployment strategies'
          ],
          topics: ['Google Cloud', 'Kubernetes', 'BigQuery', 'Cloud AI/ML', 'Cloud Run', 'Data Analytics', 'Container Orchestration', 'Cloud Native']
        }
      },
      { 
        id: 'ml-daas-framework', 
        name: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Nov 25, 2025', 
        icon: '/folder-icon.png',
        content: {
          title: 'ML-DaaS: A Secure Integrated ML Training and Deployment Framework for Cloud',
          publicationType: 'Conference Paper',
          conference: 'IEEE CS Cloud Conference 2025',
          location: 'New York, USA',
          date: 'November 2025',
          status: 'Accepted',
          publicationBanner: '/ieee.jpg',
          abstract: 'This paper presents ML-DaaS, a comprehensive framework for secure machine learning model training and deployment in cloud environments. The framework addresses key challenges in cloud-based ML workflows including security, scalability, and resource optimization.',
          authors: ['Koushik Ravikumar', 'Co-authors'],
          keywords: ['Machine Learning', 'Cloud Computing', 'Security', 'DevOps', 'ML Deployment', 'Framework Design']
        }
      },
      { 
        id: 'wlan-throughput-prediction', 
        name: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks', 
        type: 'folder', 
        size: '--', 
        dateModified: 'Jul 15, 2024', 
        icon: '/folder-icon.png',
        content: {
          title: 'Throughput Prediction of Densely Deployed WLAN Using Graph Attention Networks',
          publicationType: 'Conference Paper',
          conference: '12th International Conference on Information Technology and Science (ICITS 2024)',
          location: 'Phuket, Thailand',
          date: 'July 2024',
          status: 'Published',
          publicationBanner: '/wsce.jpg',
          abstract: 'This research proposes a novel approach using Graph Attention Networks (GANs) to predict throughput in densely deployed Wireless Local Area Networks (WLAN). The method demonstrates significant improvements in prediction accuracy compared to traditional approaches.',
          authors: ['Koushik Ravikumar', 'Research Team'],
          keywords: ['WLAN', 'Graph Attention Networks', 'Throughput Prediction', 'Wireless Networks', '5G', 'Network Optimization']
        }
      }
    ]
  }

  // Get current folder contents
  const currentFolderContents = selectedFolder ? folderContents[selectedFolder] || [] : []
  
  // Auto-select first item when folder changes (not when contents change)
  useEffect(() => {
    if (currentFolderContents.length > 0) {
      setSelectedFile(currentFolderContents[0].id)
    }
  }, [selectedFolder]) // Only depend on selectedFolder, not currentFolderContents
  
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

  // Get folder display name
  const getFolderDisplayName = () => {
    const folderNames: { [key: string]: string } = {
      about: 'About Me',
      education: 'Education',
      certifications: 'Certifications', 
      experience: 'Experience',
      projects: 'Projects',
      events: 'Events and Publications'
    }
    return folderNames[selectedFolder] || 'Portfolio'
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
      className={`fixed z-50 bg-white/95 dark:bg-teal-dark-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-teal-dark-600/50 rounded-xl shadow-2xl overflow-hidden select-none sf-font ${
        deviceInfo.isMobile 
          ? 'w-[90vw] h-[80vh] max-w-[600px] max-h-[500px]' 
          : 'w-[1000px] h-[700px]'
      }`}
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
            {getFolderDisplayName()}
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
                    setSelectedFolder(folder.id)
                    setSelectedFile(null)
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
                {/* Dynamic Banner Display */}
                {(selectedFileDetails.content?.profileBanner || 
                  selectedFileDetails.content?.institutionBanner || 
                  selectedFileDetails.content?.certificationBanner || 
                  selectedFileDetails.content?.companyBanner || 
                  selectedFileDetails.content?.eventBanner || 
                  selectedFileDetails.content?.publicationBanner) ? (
                  <div className="w-full">
                    <img 
                      src={
                        selectedFileDetails.content.profileBanner || 
                        selectedFileDetails.content.institutionBanner || 
                        selectedFileDetails.content.certificationBanner || 
                        selectedFileDetails.content.companyBanner || 
                        selectedFileDetails.content.eventBanner || 
                        selectedFileDetails.content.publicationBanner
                      } 
                      alt="banner" 
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
                      {selectedFileDetails.type === 'folder' ? 'Folder' : 'Document'}
                    </p>
                  </div>
                )}
                
                {/* Title (only show if banner exists) */}
                {(selectedFileDetails.content?.profileBanner || 
                  selectedFileDetails.content?.institutionBanner || 
                  selectedFileDetails.content?.certificationBanner || 
                  selectedFileDetails.content?.companyBanner || 
                  selectedFileDetails.content?.eventBanner || 
                  selectedFileDetails.content?.publicationBanner) && (
                  <div className="text-center">
                    <h4 className="font-medium text-gray-800 dark:text-teal-100 text-base">
                      {selectedFileDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-teal-400 mt-1">
                      {selectedFileDetails.content?.publicationType ? 'Publication' : 
                       selectedFileDetails.content?.eventType ? 'Event' :
                       selectedFileDetails.content?.degree ? 'Education' :
                       selectedFileDetails.content?.issuer ? 'Certification' :
                       selectedFileDetails.content?.company ? 'Experience' :
                       selectedFileDetails.content?.organization ? 'Project' : 'Profile'}
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

                {/* Dynamic Content Preview */}
                {selectedFileDetails.content && (
                  <div className="bg-white/40 dark:bg-teal-dark-800/20 rounded-lg p-4 border border-gray-200/30 dark:border-teal-dark-600/30">
                    
                    {/* About Me Content */}
                    {selectedFileDetails.content.personalInfo && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-lg mb-3">
                            {selectedFileDetails.content.personalInfo.fullName}
                          </h5>
                          <p className="text-teal-600 dark:text-teal-300 font-medium mb-2">
                            {selectedFileDetails.content.personalInfo.title}
                          </p>
                          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-teal-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              <span>{selectedFileDetails.content.personalInfo.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3" />
                              <span>{selectedFileDetails.content.personalInfo.education}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              <span>{selectedFileDetails.content.personalInfo.currentRole}</span>
                            </div>
                          </div>
                        </div>

                        {/* Professional Summary */}
                        {selectedFileDetails.content.summary && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              Professional Summary
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                              <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                                {selectedFileDetails.content.summary}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Contact Information */}
                        {selectedFileDetails.content.contact && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Contact Information
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3 space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                                <Mail className="w-3 h-3" />
                                <a href={`mailto:${selectedFileDetails.content.contact.email}`} className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                                  {selectedFileDetails.content.contact.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                                <Phone className="w-3 h-3" />
                                <span>{selectedFileDetails.content.contact.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                                <Linkedin className="w-3 h-3" />
                                <a href={`https://${selectedFileDetails.content.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                                  {selectedFileDetails.content.contact.linkedin}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                                <Github className="w-3 h-3" />
                                <a href={`https://${selectedFileDetails.content.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                                  {selectedFileDetails.content.contact.github}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Professional Stats */}
                        {selectedFileDetails.content.stats && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Professional Highlights
                            </h6>
                            <div className="grid grid-cols-2 gap-3">
                              {selectedFileDetails.content.stats.map((stat: any, index: number) => (
                                <div key={index} className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3 text-center">
                                  <div className="text-lg mb-1">{stat.icon}</div>
                                  <div className="text-lg font-bold text-teal-600 dark:text-teal-300">{stat.value}</div>
                                  <div className="text-xs text-gray-500 dark:text-teal-400">{stat.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interests */}
                        {selectedFileDetails.content.interests && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Professional Interests
                            </h6>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedFileDetails.content.interests.map((interest: string, index: number) => {
                                const colors = getSkillColor(interest)
                                return (
                                  <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                    className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full border ${colors.border} ${colors.hover} hover:scale-105 transition-all cursor-default`}
                                  >
                                    {interest}
                                  </motion.span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Education Content */}
                    {selectedFileDetails.content.degree && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                            {selectedFileDetails.content.degree} in {selectedFileDetails.content.field}
                          </h5>
                          <p className="text-teal-600 dark:text-teal-300 font-medium mb-1">
                            {selectedFileDetails.content.institution}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{selectedFileDetails.content.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{selectedFileDetails.content.duration}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            selectedFileDetails.content.status === 'In Progress' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          }`}>
                            {selectedFileDetails.content.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                            Overview
                          </h6>
                          <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                            <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                              {selectedFileDetails.content.overview}
                            </p>
                          </div>
                        </div>

                        {selectedFileDetails.content.courses && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Key Courses
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                              <div className="grid grid-cols-2 gap-2">
                                {selectedFileDetails.content.courses.map((course: string, index: number) => (
                                  <div key={index} className="text-sm text-gray-600 dark:text-teal-300">
                                    • {course}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedFileDetails.content.achievements && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Achievements
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                              <ul className="space-y-2">
                                {selectedFileDetails.content.achievements.map((achievement: string, index: number) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-teal-300">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {selectedFileDetails.content.publications && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Publications
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                              {selectedFileDetails.content.publications.map((pub: any, index: number) => (
                                <div key={index} className="mb-2 last:mb-0">
                                  <div className="text-sm font-medium text-gray-700 dark:text-teal-200">
                                    {pub.title}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-teal-400">
                                    {pub.conference} ({pub.year})
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Certification Content */}
                    {selectedFileDetails.content.issuer && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                            {selectedFileDetails.content.title}
                          </h5>
                          
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
                      </>
                    )}

                    {/* Experience Content */}
                    {selectedFileDetails.content.company && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                            {selectedFileDetails.content.title}
                          </h5>
                          <p className="text-teal-600 dark:text-teal-300 font-medium mb-2">
                            {selectedFileDetails.content.company}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{selectedFileDetails.content.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{selectedFileDetails.content.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              <span>{selectedFileDetails.content.type}</span>
                            </div>
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

                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Key Responsibilities
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
                      </>
                    )}

                    {/* Project Content */}
                    {selectedFileDetails.content.organization && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                            {selectedFileDetails.content.title}
                          </h5>
                          <p className="text-teal-600 dark:text-teal-300 font-medium mb-2">
                            {selectedFileDetails.content.organization}
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-3 h-3 text-teal-500" />
                            <span className="text-sm text-gray-600 dark:text-teal-400">{selectedFileDetails.content.duration}</span>
                            {selectedFileDetails.content.status && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                                selectedFileDetails.content.status === 'Active' 
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}>
                                {selectedFileDetails.content.status}
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

                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Project Description
                          </h6>
                          <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                            <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                              {selectedFileDetails.content.description}
                            </p>
                          </div>
                        </div>
                        
                        {selectedFileDetails.content.githubUrl && (
                          <div className="flex justify-center">
                            <a
                              href={selectedFileDetails.content.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                            >
                              <Github className="w-4 h-4" />
                              View on GitHub
                            </a>
                          </div>
                        )}
                      </>
                    )}

                    {/* Event/Publication Content */}
                    {(selectedFileDetails.content.eventType || selectedFileDetails.content.publicationType) && (
                      <>
                        <div className="mb-4 pb-3 border-b border-gray-200/30 dark:border-teal-dark-600/30">
                          <h5 className="font-bold text-gray-800 dark:text-teal-100 text-base mb-2">
                            {selectedFileDetails.content.title}
                          </h5>
                          
                          {/* Event Details */}
                          {selectedFileDetails.content.eventType && (
                            <>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span className="font-medium">{selectedFileDetails.content.eventType}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{selectedFileDetails.content.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-3 h-3 text-teal-500" />
                                <span className="text-sm text-gray-600 dark:text-teal-400">{selectedFileDetails.content.date}</span>
                                <Clock className="w-3 h-3 text-teal-500 ml-2" />
                                <span className="text-sm text-gray-600 dark:text-teal-400">{selectedFileDetails.content.duration}</span>
                              </div>
                            </>
                          )}
                          
                          {/* Publication Details */}
                          {selectedFileDetails.content.publicationType && (
                            <>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-teal-400 mb-2">
                                <div className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  <span className="font-medium">{selectedFileDetails.content.publicationType}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{selectedFileDetails.content.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-3 h-3 text-teal-500" />
                                <span className="text-sm text-gray-600 dark:text-teal-400">{selectedFileDetails.content.date}</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                                  selectedFileDetails.content.status === 'Published' 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                }`}>
                                  {selectedFileDetails.content.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-3 text-sm text-gray-600 dark:text-teal-400">
                                <Users className="w-3 h-3" />
                                <span>{selectedFileDetails.content.authors?.join(', ')}</span>
                              </div>
                            </>
                          )}
                          
                          {/* Topics/Keywords */}
                          <div className="flex flex-wrap gap-1.5">
                            {(selectedFileDetails.content.topics || selectedFileDetails.content.keywords)?.map((item: string, index: number) => {
                              const colors = getSkillColor(item)
                              return (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05, duration: 0.3 }}
                                  className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-full border ${colors.border} ${colors.hover} hover:scale-105 transition-all cursor-default`}
                                >
                                  {item}
                                </motion.span>
                              )
                            })}
                          </div>
                        </div>

                        {/* Description/Abstract */}
                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {selectedFileDetails.content.abstract ? 'Abstract' : 'Event Highlights'}
                          </h6>
                          <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                            {selectedFileDetails.content.abstract ? (
                              <p className="text-sm text-gray-600 dark:text-teal-300 leading-relaxed">
                                {selectedFileDetails.content.abstract}
                              </p>
                            ) : (
                              <ul className="space-y-2">
                                {selectedFileDetails.content.description?.map((item: string, itemIndex: number) => (
                                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-teal-300">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        
                        {/* Conference Details for Publications */}
                        {selectedFileDetails.content.conference && (
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                              Conference
                            </h6>
                            <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3">
                              <p className="text-sm text-gray-600 dark:text-teal-300 font-medium">
                                {selectedFileDetails.content.conference}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Download Resume */}
                    {selectedFileDetails.content.downloadUrl && (
                      <div className="flex justify-center">
                        <a
                          href={selectedFileDetails.content.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-dark-700 text-teal-700 dark:text-teal-200 rounded-md hover:bg-teal-200 dark:hover:bg-teal-dark-600 transition-colors text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download Resume
                        </a>
                      </div>
                    )}

                    {/* Contact Only Content */}
                    {selectedFileDetails.content.contact && !selectedFileDetails.content.personalInfo && (
                      <div className="mb-4">
                        <h6 className="font-semibold text-gray-700 dark:text-teal-200 text-sm mb-2">
                          Contact Information
                        </h6>
                        <div className="bg-gray-50/40 dark:bg-teal-dark-900/20 rounded-md p-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${selectedFileDetails.content.contact.email}`} className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Phone className="w-3 h-3" />
                            <span>{selectedFileDetails.content.contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <MapPin className="w-3 h-3" />
                            <span>{selectedFileDetails.content.contact.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Linkedin className="w-3 h-3" />
                            <a href={`https://${selectedFileDetails.content.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.linkedin}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                            <Github className="w-3 h-3" />
                            <a href={`https://${selectedFileDetails.content.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors">
                              {selectedFileDetails.content.contact.github}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-500 dark:text-teal-400 text-sm">
                    Select an item to view details
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

export default MasterFinderWindow
