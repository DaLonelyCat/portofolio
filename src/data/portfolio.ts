import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Christian Emanuel Ikajaya",
    role: "Software Engineer & Builder",
    tagline: "Builder and problem solver turning cool ideas into working projects.",
    bio: "I am a builder and problem solver at heart who uses tech to turn cool ideas into actual, working projects. Currently exploring 3D brain scans of flies (connectomics) and agentic AI systems. Minoring in Multimedia at Bina Nusantara University with an emphasis on UI/UX architecture, game design, and multimedia computing.",
    location: "Indonesia (Bina Nusantara University, Open for Remote)",
    status: "Available for software engineering and builder roles",
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
      id: "unicash-pos",
      title: "UniCash POS System",
      tagline: "Point of sale and transaction logging software built for retail and beverage operations.",
      category: "Desktop Application",
      year: "2026",
      overview:
        "A desktop-based point of sale system engineered to streamline cashier workflows, track item sales, and automate daily reconciliations for growing ventures.",
      problem:
        "Small businesses struggle with manual daily sales reconciliation, inventory discrepancies, and convoluted checkout interfaces.",
      solution:
        "Engineered an offline-capable React and Electron cashier interface with an embedded Express/Node API, local persistent logging, and structured receipt generation.",
      impact:
        "Automated daily bookkeeping and reduced checkout transaction duration with zero cloud dependency.",
      tags: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "Electron",
        "Tailwind CSS",
        "POS Architecture",
      ],
      featured: true,
    },
    {
      id: "koya-food-review",
      title: "KOYA Food Review WebApp",
      tagline: "Next.js community platform for sharing dining experiences and restaurant ratings.",
      category: "Web App",
      year: "2025",
      overview:
        "A full-stack web application enabling users to discover food establishments, submit reviews, and view community ratings with real-time filtering.",
      problem:
        "Users frequently encounter biased reviews and clunky interfaces when trying to find honest restaurant recommendations.",
      solution:
        "Implemented user authentication, search and cuisine filtering, review submission flows, and MongoDB persistence.",
      impact:
        "Created an engaging community platform with fast browsing and transparent dining ratings.",
      tags: ["Next.js", "React", "Tailwind CSS", "MongoDB", "User Auth"],
      repoUrl: "https://github.com/DaLonelyCat/KOYA_Food_Review_Webapp",
      featured: true,
    },
    {
      id: "gym-buddy",
      title: "GymBuddy Fitness Tracker",
      tagline: "Offline-first Android workout tracker that customizes routines based on available equipment.",
      category: "Android App",
      year: "2025",
      overview:
        "A native Android application that lets users select available gym equipment and generates tailored workout routines while tracking reps and sets offline.",
      problem:
        "Most workout apps require internet access and complex account setups that disrupt gym sessions.",
      solution:
        "Developed an offline-first native Android app with local database persistence, intuitive exercise logging, and equipment-filtered routines.",
      impact:
        "Eliminated connectivity dependencies during workouts and simplified set and rep logging into a fast mobile interface.",
      tags: ["Java", "Android Studio", "SQLite", "Offline-first"],
      liveUrl: "https://github.com/DaLonelyCat/GymBuddy/releases",
      repoUrl: "https://github.com/DaLonelyCat/GymBuddy",
      featured: true,
    },
    {
      id: "alpha-pos",
      title: "Alpha POS (alphaCashier)",
      tagline: "Java desktop point of sale application for managing restaurant orders and inventory.",
      category: "Desktop Application",
      year: "2025",
      overview:
        "A Java-based point of sale system designed to streamline restaurant operations, including order management, inventory tracking, and sales analytics.",
      problem:
        "Restaurants face operational delays and revenue leakage when order entry and inventory are managed on paper.",
      solution:
        "Developed a standalone POS system integrating order processing, real-time inventory deduction, and sales reporting into a desktop application.",
      impact:
        "Improved operational efficiency, reduced order processing time, and eliminated inventory calculation mistakes.",
      tags: ["Java", "Swing", "POS System", "Inventory Tracking"],
      liveUrl: "https://github.com/DaLonelyCat/CashierProgram/releases/download/Program/MyBeansCashierV6.2.exe",
      repoUrl: "https://github.com/DaLonelyCat/CashierProgram",
      featured: true,
    },
    {
      id: "skin-cancer-cnn",
      title: "Skin Cancer Detection App using CNN",
      tagline: "Computer vision application employing Convolutional Neural Networks to classify dermatological lesions.",
      category: "AI & Machine Learning",
      year: "2025",
      overview:
        "A deep learning computer vision model that classifies dermoscopic images to assist in early detection of skin lesions and potential malignancies.",
      problem:
        "Early diagnostic screening of skin lesions is vital for patient outcomes but often inaccessible without specialized software.",
      solution:
        "Trained a Convolutional Neural Network (CNN) with image preprocessing, data augmentation, and feature extraction to classify lesion types.",
      impact:
        "Demonstrated strong classification accuracy and diagnostic confidence scoring across evaluation image sets.",
      tags: ["Python", "CNN", "Deep Learning", "Computer Vision", "TensorFlow", "Android Studio"],
      repoUrl: "https://github.com/dalonelycat",
      featured: true,
    },
    {
      id: "zombie-garden-game",
      title: "Zombie Garden Game",
      tagline: "Unity 2D defense game challenging players to protect their garden from enemy waves.",
      category: "Game Development",
      year: "2025",
      overview:
        "A 2D top-down defense game built in Unity with custom C# scripts for wave spawning, projectile collision physics, health systems, and particle effects.",
      problem:
        "Static defense games can feel predictable without dynamic wave scaling, varied enemy traits, and responsive feedback.",
      solution:
        "Crafted custom C# wave controllers, projectile damage mechanics, interactive plant defenses, and responsive animations.",
      impact:
        "Delivered a responsive 2D survival experience with fluid animations and clear gameplay loops.",
      tags: ["Unity", "C#", "Game Development", "2D Physics"],
      repoUrl: "https://github.com/DaLonelyCat/UNITY_GardenGame",
      featured: false,
    },
    {
      id: "interactive-js-game",
      title: "Interactive JavaScript Game",
      tagline: "Browser arcade game engineered using vanilla JavaScript and HTML5 Canvas.",
      category: "Game Development",
      year: "2025",
      overview:
        "An engaging browser-based game featuring a 60fps requestAnimationFrame loop, real-time collision detection, and canvas physics.",
      problem:
        "Building engaging browser games without external game engines requires careful memory management and efficient rendering loops.",
      solution:
        "Built a zero-dependency HTML5 Canvas engine with state-driven gameplay, sound effects, sprite animations, and keyboard controls.",
      impact:
        "Achieved smooth 60fps performance across desktop and mobile web browsers without third-party dependencies.",
      tags: ["JavaScript", "HTML5 Canvas", "Game Physics"],
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
        "An educational Augmented Reality web experience allowing users to explore planets, orbits, and astronomical data directly in their room through their camera.",
      problem:
        "Textbooks and static 2D diagrams struggle to convey the spatial depth, orbital speeds, and scale of solar system bodies.",
      solution:
        "Leveraged WebXR and Three.js to render interactive 3D celestial models anchored to real-world markers with lighting and orbital paths.",
      impact:
        "Enabled immersive astronomy exploration on mobile browsers without requiring specialized hardware.",
      tags: ["WebXR", "Three.js", "Augmented Reality", "JavaScript"],
      repoUrl: "https://github.com/dalonelycat",
      featured: false,
    },
  ],

  experiences: [
    {
      id: "fruqita-cfo",
      role: "CFO & Software Developer",
      company: "Fruqita",
      location: "Indonesia",
      period: "2026 - Present",
      current: true,
      description:
        "As CFO and software developer at Fruqita, I manage company budgeting, cash flow, and financial forecasting while building our internal software tools. I developed our proprietary point of sale and cash tracking software from scratch to automate daily financial records and track product sales.",
      highlights: [
        "Manage company budget, cash flow, and financial planning to maintain steady business operations.",
        "Built custom cashier and bookkeeping software from scratch, automating daily sales logging.",
        "Provided real-time visibility into product inventory and revenue figures.",
      ],
      technologies: ["Financial Management", "Custom POS Architecture", "Cash Flow Planning", "Software Development"],
    },
    {
      id: "mybeans-ceo",
      role: "Founder & CEO",
      company: "MyBeans",
      location: "Indonesia",
      period: "2026",
      current: false,
      description:
        "As Founder and CEO of MyBeans, I directed daily operations for a coffee supply and beverage venture. My work included product development, vendor negotiations, supply chain logistics, and customer relations.",
      highlights: [
        "Directed daily operations, product development, and brand strategy.",
        "Managed supplier relationships and negotiated raw material pricing.",
        "Oversaw product quality assurance and daily order fulfillment.",
      ],
      technologies: ["Leadership", "Product Strategy", "Supply Logistics", "Vendor Negotiations"],
    },
  ],

  skillCategories: [
    {
      title: "Languages & Frameworks",
      description: "Core programming languages and frameworks used in building desktop, web, and mobile projects.",
      skills: [
        { name: "Java & Android Studio", context: "Desktop Swing POS systems and native Android apps" },
        { name: "Next.js & React", context: "Full-stack web applications, TypeScript, Tailwind CSS" },
        { name: "Python & Machine Learning", context: "CNNs, computer vision models, data preprocessing" },
        { name: "C# & Unity Engine", context: "2D game physics, wave mechanics, gameplay loops" },
        { name: "JavaScript & HTML5 Canvas", context: "Browser game physics, WebXR, Three.js" },
      ],
    },
    {
      title: "Systems & Databases",
      description: "Database architectures, point of sale software, and emerging technical domains.",
      skills: [
        { name: "Point of Sale Systems", context: "Transaction logging, receipt generation, inventory management" },
        { name: "MongoDB & SQL", context: "Data modeling, CRUD endpoints, local persistence" },
        { name: "Convolutional Neural Networks", context: "Image classification and computer vision evaluation" },
        { name: "WebXR & Three.js", context: "3D camera anchoring and interactive celestial models" },
        { name: "Git & Version Control", context: "Repository management and collaborative software workflows" },
      ],
    },
    {
      title: "Business & Venture Operations",
      description: "Operational leadership, financial planning, and direct product development experience.",
      skills: [
        { name: "Budgeting & Cash Flow", context: "CFO at Fruqita, runway planning, and expense tracking" },
        { name: "Venture Leadership", context: "Founder and CEO at MyBeans, operational direction" },
        { name: "Product Development", context: "Taking software and consumer products from concept to launch" },
        { name: "Vendor Negotiations", context: "Managing suppliers, contracts, and inventory logistics" },
      ],
    },
    {
      title: "Multimedia & Interactive Systems (Minor)",
      description: "Academic minor specialization at Bina Nusantara University bridging interaction design and game engineering.",
      skills: [
        { name: "UI & UX Design Systems", context: "Interface design, design tokens, WCAG AA accessibility" },
        { name: "Game Design & Programming", context: "Unity C# 2D/3D physics, collision handling, wave systems" },
        { name: "Multimedia Perception", context: "Computer graphics pipelines, audio/video processing, WebXR" },
        { name: "Interactive Prototyping", context: "Rapid design iterations and responsive canvas interfaces" },
      ],
    },
  ],

  education: [
    {
      degree: "Computer Science Undergraduate (Minor in Multimedia)",
      institution: "Bina Nusantara University",
      period: "2023 - 2027",
      notes: "Current GPA: 3.30 / 4.00. Major in Computer Science with a formal Minor in Multimedia specializing in UI/UX architecture, game design, and multimedia systems.",
    },
  ],
};
