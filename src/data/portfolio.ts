import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Christian Emanuel Ikajaya",
    role: "Software Engineer & Tech Builder",
    tagline: "Builder and problem solver turning cool ideas into working projects.",
    bio: "I'm a builder and problem solver at heart who uses tech to turn cool ideas into actual, working projects. Currently exploring 3D brain scans of flies (connectomics) and engineering Agentic AI systems for stock trading, daily workflows, and business automation. Minoring in Multimedia with an emphasis on UI/UX architecture, game design & programming, and multimedia computing.",
    location: "Indonesia (BINUS University // Open for Remote)",
    status: "Available for Software Engineering & Builder roles",
    statusAvailable: true,
    socials: {
      email: "christian.emanuel.08@gmail.com",
      github: "https://github.com/dalonelycat",
      linkedin: "https://www.linkedin.com/in/dalonelycat/",
      twitter: "https://twitter.com/dalonelycat",
    },
  },

  categories: [
    "All",
    "Web App",
    "Android App",
    "Desktop Application",
    "Game Development",
    "AI & Machine Learning",
    "Augmented Reality",
  ],

  projects: [
    {
      id: "agentic-trading-automation",
      title: "Agentic AI Market & Task Engine",
      tagline: "Autonomous multi-agent system executing algorithmic stock trading strategies, daily task flows, and business ops.",
      category: "AI & Machine Learning",
      year: "2026 (Active)",
      overview:
        "An autonomous multi-agent framework designed to orchestrate quantitative stock trading telemetry, personal task scheduling, and end-to-end business operations with self-correcting execution loops.",
      problem:
        "Fragmented tools, manual market telemetry, and repetitive administrative overhead cause operational bottlenecks for ventures and traders.",
      solution:
        "Architected cooperating LLM agents with specialized tool-calling capabilities for real-time market data retrieval, algorithmic execution, and automated business schedule dispatching.",
      impact:
        "Streamlined decision pipelines, enabled 24/7 autonomous monitoring of market trends, and automated business workflows.",
      tags: ["Agentic AI", "Stock Trading", "Workflow Automation", "Autonomous Agents", "Python"],
      repoUrl: "https://github.com/dalonelycat",
      featured: true,
    },
    {
      id: "drosophila-connectome-3d",
      title: "3D Fly Brain Connectome Explorer",
      tagline: "Investigating 3D whole-brain electron microscopy scans and synaptic wiring diagrams of Drosophila melanogaster.",
      category: "AI & Machine Learning",
      year: "2026 (Research)",
      overview:
        "Computational neurobiology and 3D volumetric analysis investigating the fruit fly (Drosophila melanogaster) connectome to understand neural wiring topologies and synaptic circuits.",
      problem:
        "Dense biological connectome data requires specialized spatial reconstruction and graph analysis to interpret complex synaptic connections.",
      solution:
        "Exploring 3D volumetric imaging datasets, mapping synaptic circuit graphs, and drawing architectural parallels between biological intelligence and artificial neural networks.",
      impact:
        "Advanced understanding of whole-brain synaptic topologies and bio-inspired computing paradigms.",
      tags: ["Connectomics", "3D Volumetric Imaging", "Drosophila Brain", "Neurobiology", "Graph Analysis"],
      repoUrl: "https://github.com/dalonelycat",
      featured: true,
    },
    {
      id: "unicash-pos",
      title: "UniCash POS",
      tagline: "Point-of-sale and financial transaction tracking system built for streamlined retail and food service operations.",
      category: "Desktop Application",
      year: "2026",
      overview:
        "A desktop-based point-of-sale management system engineered to streamline cashier workflows, track item sales, and automate daily financial reconciliations for growing ventures.",
      problem:
        "Small businesses struggle with manual daily sales reconciliation, inventory discrepancies, and convoluted checkout interfaces.",
      solution:
        "Engineered an offline-capable, intuitive React & Electron cashier interface with an embedded Express/Node API, local JSON/CSV persistent logging, and structured receipt generation.",
      impact:
        "Automated daily bookkeeping and reduced checkout transaction duration for retail and beverage operations with zero-cloud dependency.",
      tags: [
        "React 19",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Electron",
        "Tailwind CSS",
        "POS Architecture",
        "Financial Logging",
      ],
      repoUrl: "https://github.com/dalonelycat",
      featured: true,
    },
    {
      id: "koya-food-review",
      title: "KOYA Food Review WebApp",
      tagline: "Next.js community platform for sharing authentic dining experiences and restaurant ratings.",
      category: "Web App",
      year: "2025",
      overview:
        "A Next.js full-stack web application that enables users to discover food establishments, submit reviews, and view aggregated community ratings with real-time filtering.",
      problem:
        "Users frequently encounter biased reviews and clunky interfaces when trying to find honest restaurant recommendations.",
      solution:
        "Implemented user authentication, search and cuisine filtering, review submission flows, and MongoDB persistence for honest community-driven recommendations.",
      impact:
        "Created an engaging community platform with seamless browsing and transparent dining ratings.",
      tags: ["Next.js", "React", "Tailwind CSS", "MongoDB", "User Auth"],
      repoUrl: "https://github.com/DaLonelyCat/KOYA_Food_Review_Webapp",
      featured: true,
    },
    {
      id: "gym-buddy",
      title: "GymBuddy Fitness Tracker",
      tagline: "Offline-first Android workout tracker that customizes exercise routines based on available equipment.",
      category: "Android App",
      year: "2025",
      overview:
        "A streamlined Android mobile application that lets users select available gym equipment and generates tailored workout routines while tracking reps and sets offline.",
      problem:
        "Most workout apps require mandatory internet access, complex account setups, and feature bloat that interrupts gym sessions.",
      solution:
        "Developed an offline-first native Android app with local database persistence, intuitive exercise logging, and equipment-filtered workout routines.",
      impact:
        "Eliminated connectivity dependencies during workouts and simplified set/rep logging into a fast, one-tap mobile interface.",
      tags: ["Java", "Android Studio", "Offline-first", "Mobile UX"],
      liveUrl: "https://github.com/DaLonelyCat/GymBuddy/releases",
      repoUrl: "https://github.com/DaLonelyCat/GymBuddy",
      featured: true,
    },
    {
      id: "alpha-pos",
      title: "Alpha POS (alphaCashier)",
      tagline: "Java point-of-sale system for managing orders, inventory, and restaurant sales.",
      category: "Desktop Application",
      year: "2025",
      overview:
        "A Java-based point-of-sale (POS) system designed to streamline restaurant operations, including order management, inventory tracking, and sales analytics.",
      problem:
        "Small to medium restaurants face operational delays and revenue leakage when order entry and inventory are managed on paper.",
      solution:
        "Developed a comprehensive POS system integrating order processing, real-time inventory deduction, and sales analytics into a single desktop application.",
      impact:
        "Improved operational efficiency, reduced order processing time, and eliminated inventory calculation mistakes for business owners.",
      tags: ["Java", "Swing", "POS System", "Inventory Tracking"],
      liveUrl: "https://github.com/DaLonelyCat/CashierProgram/releases/download/Program/MyBeansCashierV6.2.exe",
      repoUrl: "https://github.com/DaLonelyCat/CashierProgram",
      featured: true,
    },
    {
      id: "skin-cancer-cnn",
      title: "Skin Cancer Detection App using CNN",
      tagline: "Computer vision application employing Convolutional Neural Networks to classify dermatological skin lesions.",
      category: "AI & Machine Learning",
      year: "2025",
      overview:
        "A deep learning computer vision model that classifies dermoscopic images to assist in early detection of skin lesions and potential malignancies.",
      problem:
        "Early diagnostic pre-screening of skin lesions is vital for patient outcomes but often inaccessible without specialized clinical imaging software.",
      solution:
        "Trained a Convolutional Neural Network (CNN) with image preprocessing, data augmentation, and feature extraction to accurately classify lesion types.",
      impact:
        "Demonstrated strong classification accuracy and diagnostic confidence scoring across dermatological image evaluation sets.",
      tags: ["Python", "CNN", "Deep Learning", "Computer Vision", "TensorFlow"],
      repoUrl: "https://github.com/dalonelycat",
      featured: true,
    },
    {
      id: "zombie-garden-game",
      title: "Zombie Garden Game",
      tagline: "Unity 2D defense game challenging players to protect their garden from relentless enemy waves.",
      category: "Game Development",
      year: "2025",
      overview:
        "A 2D top-down defense game built in Unity with custom C# scripts for wave spawning, projectile collision physics, health systems, and particle effects.",
      problem:
        "Static defense games can feel predictable without dynamic wave scaling, varied enemy traits, and responsive feedback.",
      solution:
        "Crafted custom C# wave controllers, projectile damage mechanics, interactive plant defenses, and responsive particle animations.",
      impact:
        "Delivered a fun, high-performance 2D survival experience with fluid animations and responsive gameplay loops.",
      tags: ["Unity", "C#", "Game Development", "2D Physics"],
      repoUrl: "https://github.com/DaLonelyCat/UNITY_GardenGame",
      featured: false,
    },
    {
      id: "interactive-js-game",
      title: "Interactive JavaScript Game",
      tagline: "Browser-based arcade game engineered using vanilla JavaScript and HTML5 Canvas.",
      category: "Game Development",
      year: "2025",
      overview:
        "An engaging browser-based game featuring a custom 60fps requestAnimationFrame loop, real-time collision detection, and responsive canvas physics.",
      problem:
        "Building engaging browser games without external bloated engines requires careful memory management and efficient rendering loops.",
      solution:
        "Built a zero-dependency HTML5 Canvas engine with state-driven gameplay, sound effects, sprite animations, and keyboard controls.",
      impact:
        "Achieved silky smooth 60fps performance across both desktop and mobile web browsers without any third-party dependencies.",
      tags: ["JavaScript", "HTML5 Canvas", "Game Physics", "Web Audio"],
      repoUrl: "https://github.com/dalonelycat",
      featured: false,
    },
    {
      id: "ar-planetarium",
      title: "AR Planetarium Web App",
      tagline: "Augmented Reality web app projecting interactive 3D planetary models into physical space.",
      category: "Augmented Reality",
      year: "2024",
      overview:
        "An educational Augmented Reality web experience allowing users to explore planets, orbits, and astronomical data directly in their room via their camera.",
      problem:
        "Textbooks and static 2D diagrams struggle to convey the spatial depth, orbital speeds, and scale of solar system bodies.",
      solution:
        "Leveraged WebXR and Three.js to render interactive 3D celestial models anchored to real-world markers with real-time lighting and orbital paths.",
      impact:
        "Enabled immersive astronomy exploration on mobile browsers without requiring specialized hardware or app store downloads.",
      tags: ["WebXR", "Three.js", "Augmented Reality", "JavaScript", "3D Models"],
      repoUrl: "https://github.com/dalonelycat",
      featured: false,
    },
  ],

  experiences: [
    {
      id: "mybeans-ceo",
      role: "Founder & CEO",
      company: "MyBeans",
      location: "Indonesia",
      period: "2026",
      current: false,
      description:
        "As the Founder and CEO of MyBeans, I lead, manage, and strategize day to day operations of a dynamic coffee supply and beverage venture. My responsibilities include product development, quality assurance, vendor negotiations, and brand scaling.",
      highlights: [
        "Lead, manage, and strategize day to day operations of a dynamic coffee supply and beverage venture.",
        "Formulate brand scaling and commercial expansion strategies while managing supplier and vendor relationships.",
        "Oversee product development and quality assurance across daily supply logistics.",
      ],
      technologies: ["Executive Leadership", "Product Strategy", "Supply Logistics", "Vendor Negotiations", "Quality Assurance"],
    },
    {
      id: "fruqita-cfo",
      role: "CFO & Software Developer",
      company: "Fruqita",
      location: "Indonesia",
      period: "2026 - Present",
      current: true,
      description:
        "As Fruqita's CFO, I manage the company's budget, cash flow, and spending to keep the business growing smoothly. Alongside that, I built our custom cashier and money-tracking software from scratch, making daily log keeping automatic and giving us instant insights into our sales.",
      highlights: [
        "Manage company budget, cash flow, and capital expenditures to ensure sustainable business growth.",
        "Built custom proprietary cashier and money-tracking software from scratch, automating daily financial logging.",
        "Provided executive leadership with instant, real-time insights into product sales and revenue trends.",
      ],
      technologies: ["Financial Management", "Custom POS Architecture", "Cash Flow Forecasting", "Software Development", "Process Automation"],
    },
  ],

  skillCategories: [
    {
      title: "Languages & Frameworks",
      description: "Core programming languages and web application frameworks powering production software.",
      skills: [
        { name: "Java & Android Studio", context: "Desktop Swing POS, native offline Android apps" },
        { name: "Next.js & React", context: "Modern full-stack web applications, SSR, Tailwind CSS" },
        { name: "Python & Machine Learning", context: "CNNs, computer vision models, data preprocessing" },
        { name: "C# & Unity Engine", context: "2D game physics, wave mechanics, gameplay loops" },
        { name: "JavaScript & HTML5 Canvas", context: "Interactive 60fps canvas games, WebXR, Three.js" },
      ],
    },
    {
      title: "Systems Architecture & Data",
      description: "Database architectures, point-of-sale systems, and emerging technology stacks.",
      skills: [
        { name: "Agentic AI & Automation", context: "Autonomous workflows for stock trading, daily tasks & business ops" },
        { name: "Connectomics & 3D Imaging", context: "Exploring 3D biological brain scans of fruit flies (Drosophila)" },
        { name: "Custom POS & Cashier Systems", context: "Transaction processing, inventory management" },
        { name: "MongoDB & Database Systems", context: "Data modeling, CRUD endpoints, local persistence" },
        { name: "WebXR & Augmented Reality", context: "3D camera anchoring, interactive celestial models" },
        { name: "Convolutional Neural Networks", context: "Image classification pipelines, dermoscopic analysis" },
        { name: "Git & Version Control", context: "Modular repository architectures, open-source releases" },
      ],
    },
    {
      title: "Venture Leadership & Operations",
      description: "Executive leadership, financial budgeting, and product development experience.",
      skills: [
        { name: "Executive Leadership & Strategy", context: "Founder & CEO at MyBeans, operational direction" },
        { name: "Budgeting & Cash Flow Management", context: "CFO at Fruqita, runway and expenditure planning" },
        { name: "Product Development & QA", context: "From raw concept to shipped, working software" },
        { name: "Vendor Negotiations & Supply", context: "Logistics management, partnership contracts" },
        { name: "Problem Solving & Systems Optimization", context: "Keeping software simple, resilient, and efficient" },
      ],
    },
    {
      title: "Multimedia & Interactive Systems (Minor)",
      description: "Academic minor specialization bridging human-computer interaction, visual design, and real-time game architecture.",
      skills: [
        { name: "UI & UX Design Systems", context: "Tactical HUD designs, design tokens, WCAG accessible ergonomics" },
        { name: "Game Design & Programming", context: "Unity C# 2D/3D physics, collision mechanics, wave controllers" },
        { name: "Multimedia Understanding & Perception", context: "Computer graphics pipelines, sensory audio/video processing, WebXR" },
        { name: "Interactive Prototyping", context: "Figma design tokens, rapid prototypes, 60fps canvas engines" },
      ],
    },
  ],

  education: [
    {
      degree: "Computer Science Undergraduate (Minor in Multimedia)",
      institution: "Bina Nusantara University",
      period: "2023 - 2027",
      notes: "Current GPA: 3.30 / 4.00. Major in Computer Science with a formal Minor in Multimedia specializing in UI/UX architecture, game design & programming, multimedia understanding, and intelligent computing systems.",
    },
  ],
};
