import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Christian Emanuel Ikajaya",
    role: "Software Engineer & Builder",
    tagline: "Hello im Christian",
    bio: "I am a builder and problem solver at heart who uses tech to turn cool ideas into actual, working projects. Currently exploring autonomous multi-agent AI systems, real-time 3D graphics, and spatial computing. Completed a Minor in Multimedia at Bina Nusantara University, bridging core software systems with interactive game programming, computer graphics, and user experience design.",
    philosophy: "Hello im Christian",
    location: "Indonesia (Bina Nusantara University, Open for Remote)",
    status: "Available for software engineering and builder roles",
    statusAvailable: true,
    avatar: "/avatar.jpg",
    socials: {
      email: "christian@dalonelycat.site",
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
      tagline: "Point of sale and financial accounting software engineered for Fruqita retail and beverage operations.",
      category: "Desktop Application",
      year: "2026",
      overview:
        "A desktop-based point of sale and financial tracking system built from scratch to streamline cashier workflows, track item sales, and automate daily reconciliations for Fruqita.",
      problem:
        "Small food and beverage operations face manual daily sales calculations, inventory discrepancies, and convoluted checkout processes that slow down service.",
      solution:
        "Engineered an offline-capable React and Electron cashier interface with an embedded Express/Node API, local persistent transaction logging, QRIS payment breakdowns, real-time Profit and Loss statements, and a local Ollama AI assistant for store operational queries.",
      impact:
        "Automated daily bookkeeping, eliminated manual register discrepancies, and gave executive leadership instant visibility into revenue and product demand.",
      tags: [
        "React",
        "TypeScript",
        "Electron",
        "Node.js",
        "Express",
        "Ollama (Local LLM)",
        "Tailwind CSS",
        "POS Architecture",
        "Financial Accounting",
      ],
      screenshots: [
        {
          src: "/projects/unicash-cashier.png",
          label: "Cashier Interface",
          caption: "Cashier checkout interface with active order ticket panel and menu catalog",
        },
        {
          src: "/projects/unicash-dashboard.png",
          label: "Sales Analytics",
          caption: "Sales intelligence dashboard tracking gross revenue, peak business hours, and payment distributions",
        },
        {
          src: "/projects/unicash-sales.png",
          label: "Order Ledger",
          caption: "Real-time order ledger table with payment reconciliation and item transaction history",
        },
        {
          src: "/projects/unicash-financials.png",
          label: "Financial Reports",
          caption: "Financial accounting module with statement of profit and loss, operating expense logs, and cash flow balances",
        },
        {
          src: "/projects/unicash-ai-agent.png",
          label: "Store AI Assistant",
          caption: "Local offline LLM agent interface powered by Ollama for restock checks, store queries, and sales summaries",
        },
      ],
      featured: true,
    },
    {
      id: "nestfit-workout",
      title: "NestFit Smart Workout Companion",
      tagline: "Mobile-first workout tracker and customizable dumbbell plate calculator for home gym training.",
      category: "Web App",
      year: "2026",
      overview:
        "A responsive, mobile-first workout companion and equipment manager engineered in 2026 for personal training. NestFit specializes in modular spinlock dumbbells and barbell conversion setups, dynamically calculating symmetrical plate configurations, sleeve limits, and daily workout volume.",
      problem:
        "Training with adjustable spinlock dumbbell sets requires mental math to balance plates symmetrically, account for collar and handle weights, and organize exercises across available equipment without internet connectivity.",
      solution:
        "Engineered a responsive, mobile-first web application featuring an interactive visual plate setup diagram, 16 weight presets, 175-exercise movement database with multi-filter tagging, equipment inventory management (handles, collars, 19kg plates breakdown), and muscle readiness tracking.",
      impact:
        "Streamlined daily home workouts by automating plate math, preventing asymmetrical loading, and delivering an offline-friendly workout workflow on mobile and desktop devices.",
      tags: ["Web App", "React", "Mobile First", "Fitness Tech", "Tailwind CSS", "Algorithm Design"],
      screenshots: [
        {
          src: "/projects/nestfit-calculator.png",
          label: "Weight Calculator",
          caption: "Modular dumbbell plate setup diagram with sleeve capacity and symmetrical weight distribution",
        },
        {
          src: "/projects/nestfit-workout.png",
          label: "Workout Session",
          caption: "Active workout session view with daily directive, readiness telemetry, and exercise set tracking",
        },
        {
          src: "/projects/nestfit-inventory.png",
          label: "Equipment Inventory",
          caption: "Hardware equipment inventory tracking handles, barbell connector adapter, collars, and plate weight breakdown",
        },
        {
          src: "/projects/nestfit-exercises.png",
          label: "Exercise Database",
          caption: "Categorized exercise catalog with 175 movements filtered by muscle group and equipment type",
        },
      ],
      liveUrl: "https://workout.dalonelycat.site/",
      status: "personal",
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
      screenshots: [
        {
          src: "/projects/koya-feed.png",
          label: "Community Feed",
          caption: "Community home feed with restaurant reviews, rating scorecards, and culinary recommendations",
        },
        {
          src: "/projects/koya-profile.png",
          label: "User Profile",
          caption: "User profile dashboard showing personal review history, bookmark collections, and follow telemetry",
        },
      ],
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
      featured: false,
    },
    {
      id: "fruqita-web",
      title: "Fruqita Fruit Chips Storefront",
      tagline: "Brand website and digital storefront for Fruqita fruit chips enterprise.",
      category: "Web App",
      year: "2026",
      overview:
        "Official web storefront built for Fruqita in 2026 to showcase artisan fruit chips, display seasonal product catalogs, and streamline direct ordering through Shopee and WhatsApp channels.",
      problem:
        "Direct-to-consumer fruit chip sales required an authoritative digital brand platform with mobile responsiveness and seamless customer purchasing channels.",
      solution:
        "Engineered a responsive web platform with smooth animations, interactive product displays, Shopee marketplace integration, and direct WhatsApp ordering flow.",
      impact:
        "Established Fruqita's active digital storefront, elevating brand credibility and directing consumer traffic to verified checkout points.",
      tags: ["Web App", "Tailwind CSS", "Vercel", "E-Commerce", "Brand Strategy"],
      screenshots: [
        {
          src: "/projects/fruqita-storefront.png",
          label: "Storefront & Catalog",
          caption: "Artisan fruit chips brand storefront featuring product packaging showcase, Shopee checkout, and direct ordering",
        },
      ],
      liveUrl: "https://fruqitamlg.vercel.app/",
      previewUrl: "https://fruqitamlg.vercel.app/",
      status: "live",
      featured: true,
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
        "Managed the company's budget, cash flow, and all major financial decisions.",
        "Built the web app and custom POS system from scratch to track sales and inventory.",
        "Integrated a local AI using Ollama so the team can chat with the system for instant stock updates and daily summaries.",
      ],
      technologies: ["Financial Management", "Custom POS Architecture", "Cash Flow Planning", "Software Development", "Ollama (Local LLM)"],
    },
    {
      id: "mybeans-ceo",
      role: "CEO & Founder",
      company: "MyBeans",
      location: "Indonesia",
      period: "2026",
      current: false,
      description:
        "As CEO and Founder of MyBeans, I directed daily operations for a coffee supply and beverage venture. My work included product development, vendor negotiations, supply chain logistics, and customer relations.",
      highlights: [
        "Led the team, made key business decisions, and chose which coffee products to sell.",
        "Researched and negotiated deals with local coffee suppliers to get the best beans.",
        "Pitched directly to local restaurants and cafes door-to-door to win early clients.",
        "Built the company website and desktop cashier system to handle daily sales.",
      ],
      technologies: ["Leadership", "Product Strategy", "Supply Logistics", "Vendor Negotiations", "Web & Desktop POS"],
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
      title: "Multimedia & Game Systems (Completed Minor)",
      description: "Completed minor curriculum bridging interactive game programming, computer graphics, and user-centered interface architecture.",
      skills: [
        { name: "Game Programming & Design", context: "Gameplay mechanics, game loops, Unity C# architecture" },
        { name: "Computer Graphics", context: "Rendering pipelines, visual algorithms, 3D coordinate spaces" },
        { name: "User Experience (UX)", context: "Interaction architecture, ergonomics, and visual hierarchy" },
        { name: "Multimedia Systems", context: "Audio/visual data handling and interactive applications" },
      ],
    },
  ],

  education: [
    {
      degree: "Computer Science Undergraduate (Completed Minor in Multimedia)",
      institution: "Bina Nusantara University",
      period: "2023 - 2027",
      notes: "Current GPA: 3.30 / 4.00. Major in Computer Science with a completed Minor in Multimedia. Currently undertaking the Entrepreneurship Track Enrichment Program. The minor curriculum connected core computing with interactive entertainment and visual design, combining game programming, computer graphics pipelines, and user experience design with core software engineering.",
    },
  ],
};
