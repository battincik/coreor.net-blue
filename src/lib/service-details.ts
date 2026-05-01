export const DETAILED_SERVICES = {
  "web-development": {
    benefits: ["Fast, SEO-optimized applications with Next.js", "Responsive design that works on all devices", "TypeScript for type-safe development", "Component-driven architecture for maintainability", "API integration and backend connectivity", "Performance optimization and Core Web Vitals", "Accessibility (a11y) compliance", "CI/CD pipelines and automated testing"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel", "Docker"],
    process: ["Discovery & requirements gathering", "Architecture and design system planning", "Component development and prototyping", "API and backend integration", "Testing and quality assurance", "Performance optimization", "Deployment and monitoring"],
    caseStudy: {
      title: "E-commerce Platform Rebuild",
      challenge: "A legacy e-commerce site was slow, difficult to maintain, and had poor mobile experience.",
      solution: "Rebuilt using Next.js with server-side rendering, implemented real-time inventory, added personalization engine, and optimized images.",
      results: ["60% faster page load times", "40% increase in mobile conversions", "3x improvement in deployment frequency", "Reduced maintenance overhead by 50%"]
    },
    pricing: [
      { name: "Starter", price: "$5,000", features: ["5-page informational site", "Mobile responsive design", "Basic SEO optimization", "SSL certificate & hosting (1 year)", "Contact form integration", "Basic analytics setup"] },
      { name: "Professional", price: "$15,000", features: ["Full-featured web application", "Custom API integration", "Advanced performance optimization", "Authentication & user management", "Database design and setup", "6 months of support", "Staging environment"], popular: true },
      { name: "Enterprise", price: "Custom", features: ["Complex, scalable platforms", "Real-time features & WebSockets", "Advanced security & compliance", "Load testing & optimization", "12 months of dedicated support", "Training & documentation", "Custom integrations & migrations"] }
    ],
    faqs: [
      { question: "How long does a typical web development project take?", answer: "Timeline depends on scope and complexity. A simple 5-page site takes 4-6 weeks. A full-featured application typically takes 3-6 months." },
      { question: "Do you provide hosting and maintenance?", answer: "Yes, we can set up hosting on Vercel, AWS, or your preferred platform. We also offer ongoing maintenance, updates, and support packages." },
      { question: "Can you integrate with existing systems?", answer: "Absolutely. We work with legacy systems, APIs, and databases. We specialize in migrations and system integrations with minimal downtime." }
    ]
  },
  "mobile-apps": {
    benefits: ["Cross-platform development with React Native", "Native iOS and Android apps when needed", "Offline-first architecture", "Push notifications and real-time updates", "Biometric authentication support", "App Store and Google Play optimization", "Performance profiling and optimization", "Deep linking and app analytics"],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "GraphQL", "Redux", "Expo", "TestFlight"],
    process: ["Mobile UX research and wireframing", "Native module development (if needed)", "Cross-platform testing on real devices", "App Store Optimization (ASO)", "Beta testing and release management", "Post-launch monitoring and updates"],
    caseStudy: {
      title: "Fitness Tracking App Launch",
      challenge: "Client needed a mobile-first fitness app with wearable integration, offline tracking, and social features.",
      solution: "Developed with React Native for iOS/Android, integrated Apple Health and Google Fit, implemented offline-first data sync.",
      results: ["Launched on both app stores in 4 months", "10,000+ downloads in first month", "4.8-star rating across app stores", "99.5% uptime with zero critical crashes"]
    },
    pricing: [
      { name: "MVP", price: "$25,000", features: ["Single platform (iOS or Android)", "Core features only", "Basic analytics", "App store submission", "1 month post-launch support"] },
      { name: "Full Stack", price: "$60,000", features: ["iOS and Android (React Native)", "Push notifications", "User authentication", "Analytics and crash reporting", "3 months of support & updates"], popular: true },
      { name: "Premium", price: "$100,000+", features: ["Native iOS + Android apps", "Wearable integration", "Advanced offline support", "Custom performance tuning", "6 months of support", "Training and handoff documentation"] }
    ],
    faqs: [
      { question: "Should we build React Native or native apps?", answer: "React Native is great for cross-platform apps with faster time-to-market. Native is better for apps requiring deep OS integration or extreme performance." },
      { question: "How do you handle app store rejections?", answer: "We follow all App Store and Play Store guidelines from the start. Our QA process includes compliance checks." }
    ]
  },
  "cloud-solutions": {
    benefits: ["Multi-cloud architecture (AWS, GCP, Azure)", "Infrastructure as Code (Terraform, CloudFormation)", "Cost optimization and FinOps", "Auto-scaling and load balancing", "Disaster recovery and business continuity", "Security best practices and compliance", "Monitoring and alerting setup", "Serverless architecture design"],
    technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Kubernetes", "Docker", "CloudFormation", "Ansible"],
    process: ["Current infrastructure audit and assessment", "Cloud architecture design", "Infrastructure as Code implementation", "Security and compliance review", "Migration planning and execution", "Testing and validation", "Post-migration optimization and training"],
    caseStudy: {
      title: "Legacy System Migration to AWS",
      challenge: "Client's on-premises infrastructure was costly, inflexible, and approaching capacity limits.",
      solution: "Designed cloud-native architecture on AWS, migrated databases, implemented auto-scaling, and set up comprehensive monitoring.",
      results: ["50% reduction in infrastructure costs", "Automatic scaling handles 10x traffic spikes", "99.99% uptime SLA achieved", "Deployment time reduced from 2 hours to 5 minutes"]
    },
    pricing: [
      { name: "Assessment", price: "$5,000", features: ["Infrastructure audit (1-2 weeks)", "Cost analysis report", "Architecture recommendations", "Risk assessment", "Optimization roadmap"] },
      { name: "Migration", price: "$30,000+", features: ["Full infrastructure migration", "Database migration", "DNS and networking setup", "Security configuration", "1 month of post-migration support"], popular: true },
      { name: "Managed", price: "$3,000/month", features: ["24/7 monitoring and support", "Monthly optimization reviews", "Security patches and updates", "Cost management and reporting", "Incident response and on-call support"] }
    ],
    faqs: [
      { question: "How much will cloud cost us?", answer: "Costs vary by workload. We perform detailed cost analysis. Most clients save 30-50% compared to on-premises." },
      { question: "What about cloud vendor lock-in?", answer: "We design cloud-agnostic architectures using containerization and infrastructure-as-code." }
    ]
  },
  "ai-integration": {
    benefits: ["LLM integration (GPT, Claude, custom models)", "Computer vision and image processing", "Natural language processing (NLP)", "Recommendation engines", "Predictive analytics", "Custom model training and fine-tuning", "RAG (Retrieval-Augmented Generation) systems", "Cost-effective inference scaling"],
    technologies: ["OpenAI API", "Anthropic Claude", "LangChain", "TensorFlow", "PyTorch", "Hugging Face", "Pinecone", "Modal"],
    process: ["Problem definition and feasibility study", "Data preparation and pipeline setup", "Model selection and evaluation", "Integration into your application", "Testing and refinement", "Monitoring for drift and performance", "Continuous improvement cycle"],
    caseStudy: {
      title: "Customer Support AI Assistant",
      challenge: "Client's support team was overwhelmed; response times were slow and customer satisfaction was declining.",
      solution: "Built AI assistant using GPT-4, RAG, and company knowledge base. System handles 60% of questions, escalates complex cases.",
      results: ["60% of support tickets resolved automatically", "Average response time from 4 hours to 2 minutes", "Customer satisfaction increased to 92%", "Support team focused on complex issues"]
    },
    pricing: [
      { name: "Pilot", price: "$10,000", features: ["LLM integration (OpenAI/Claude)", "Single feature/use case", "Proof of concept", "Cost estimation", "2 weeks delivery"] },
      { name: "Production", price: "$40,000", features: ["Production-ready AI feature", "Custom fine-tuning", "Data pipeline setup", "Cost optimization", "Monitoring and logging", "1 month of support"], popular: true },
      { name: "Enterprise", price: "$100,000+", features: ["Multiple AI features", "Custom model training", "On-premises deployment option", "Advanced security & compliance", "Ongoing optimization", "6 months of dedicated support"] }
    ],
    faqs: [
      { question: "What about data privacy with AI?", answer: "We design systems that minimize data exposure. Options include on-premises models, API caching, and data anonymization." },
      { question: "How do we ensure AI accuracy?", answer: "We implement continuous monitoring, user feedback loops, and regular retraining. We set confidence thresholds appropriately." }
    ]
  },
  "database-management": {
    benefits: ["Expert schema and data modeling", "Query performance optimization", "Indexing strategies for scale", "Replication and high-availability setup", "Backup and disaster recovery", "Database migration planning", "NoSQL and relational database expertise", "Data pipeline design for analytics"],
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB", "BigQuery", "pg_stat_statements"],
    process: ["Data audit and analysis", "Schema design/review", "Query analysis and optimization", "Index strategy development", "Performance baseline and SLO definition", "Monitoring and alerting setup", "Regular tuning and maintenance"],
    caseStudy: {
      title: "Scaling Database for 10M+ Records",
      challenge: "Growing SaaS platform's Postgres database was becoming a bottleneck. Queries that took seconds, performance was degrading.",
      solution: "Redesigned schema, added strategic indexes, partitioned large tables, implemented read replicas and caching layer.",
      results: ["Query performance improved 100x", "Database handles 10M+ records efficiently", "No downtime required during optimization", "Annual infrastructure costs reduced by $50k"]
    },
    pricing: [
      { name: "Audit", price: "$3,000", features: ["Database analysis (1 week)", "Performance report", "Optimization recommendations", "Risk assessment", "Action plan with estimates"] },
      { name: "Optimization", price: "$15,000", features: ["Schema redesign and implementation", "Query optimization", "Index tuning", "Replication setup", "Performance testing", "1 month of support"], popular: true },
      { name: "Managed", price: "$2,000/month", features: ["24/7 monitoring", "Monthly optimization reviews", "Backup management", "Performance tuning", "Incident response", "Scaling consultation"] }
    ],
    faqs: [
      { question: "When should we shard or partition data?", answer: "Sharding is needed when single-server storage/performance limits are reached. We help determine thresholds and design strategies." },
      { question: "How often should we back up?", answer: "We recommend hourly incremental + daily full backups for most applications. Test restores monthly." }
    ]
  },
  "server-hosting": {
    benefits: ["Kubernetes cluster management", "Serverless deployment (Functions, Workers)", "Automated CI/CD pipelines", "Load balancing and auto-scaling", "Zero-downtime deployments", "Multi-region failover", "Cost optimization and right-sizing", "Security hardening and compliance"],
    technologies: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "AWS ECS", "Vercel", "Cloudflare Workers", "DigitalOcean"],
    process: ["Infrastructure assessment and planning", "Kubernetes cluster provisioning", "CI/CD pipeline setup", "Deployment automation", "Monitoring and alerting configuration", "Runbook and incident procedures", "Team training and handoff"],
    caseStudy: {
      title: "E-Learning Platform Operations",
      challenge: "Platform had unpredictable traffic spikes during course launches; infrastructure couldn't scale, causing downtime.",
      solution: "Migrated to Kubernetes with autoscaling, implemented canary deployments, set up comprehensive observability.",
      results: ["Handles 100x traffic spikes automatically", "Deployment frequency increased to 50+ per day", "99.95% uptime achieved consistently", "Infrastructure costs stable despite 10x growth"]
    },
    pricing: [
      { name: "Starter", price: "$1,500/month", features: ["Single server hosting", "Basic monitoring", "Daily backups", "Email support", "99.5% uptime SLA"] },
      { name: "Production", price: "$4,000/month", features: ["Kubernetes cluster (managed)", "Auto-scaling configuration", "CI/CD pipeline setup", "Advanced monitoring", "24/7 email & Slack support", "99.95% uptime SLA"], popular: true },
      { name: "Enterprise", price: "$8,000+/month", features: ["Multi-region deployment", "Dedicated Kubernetes clusters", "Custom scaling policies", "24/7 phone support", "Dedicated DevOps engineer", "99.99% uptime SLA", "Disaster recovery included"] }
    ],
    faqs: [
      { question: "Do we need Kubernetes or is serverless better?", answer: "Serverless is great for variable workloads and cost. Kubernetes is better for consistent traffic and complex deployments." },
      { question: "What's included in managed hosting?", answer: "Infrastructure provisioning, monitoring, log aggregation, security updates, backups, on-call support, and incident response." }
    ]
  }
}
