// Mirrors public/MichaelChenResume.pdf. Phone number intentionally left off the web version.

export const RESUME_PDF = "/MichaelChenResume.pdf";

export const RESUME = {
  education: {
    school: "University of Georgia",
    location: "Athens, GA",
    degree: "Bachelor of Science in Computer Science",
    date: "Aug. 2020 – May 2024",
  },
  skills: [
    { label: "Languages", items: "Java, Python, C#/C++, SQL, HTML/CSS, JavaScript" },
    { label: "Frameworks", items: "React, Angular, Vue, Node.js, Flask, Express, MongoDB, Tailwind CSS, Bootstrap" },
    { label: "Developer Tools", items: "Git, Adobe Experience Manager, Amazon Web Services (AWS), Navicat, SQL Server, Censhare, Adobe Dynamic Media Classic, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse" },
    { label: "Libraries", items: "pandas, NumPy, Matplotlib, Beautiful Soup, Selenium" },
  ],
  experience: [
    {
      role: "Software Engineer",
      date: "July 2025 – Present",
      co: "Infomedia",
      location: "Atlanta, GA",
      bullets: [
        "Engineered and maintained core front-end and back-end systems powering enterprise e-commerce platforms for major automotive brands and nationwide dealer networks, supporting OEMs including Ford, Toyota, Honda, BMW, and VW.",
        "Developed full-stack features across a large-scale enterprise web platform using HTML/CSS/JavaScript, Vue.js, C#, .NET, and SQL Server to support high-traffic production environments.",
        "Designed, optimized, and refactored complex SQL stored procedures and data pipelines powering pricing logic, metadata systems, shipping integrations, and dynamic content delivery.",
        "Supported critical production systems by diagnosing and resolving real-time failures across checkout flows, APIs, data integrity pipelines, and front-end rendering.",
      ],
    },
    {
      role: "Software Engineer",
      date: "June 2024 – July 2025",
      co: "CoreForceTech",
      location: "Decatur, GA",
      bullets: [
        "Engineered and maintained a .NET C# Windows service and WPF GUI to automate data collection and uploads to our cloud, streamlining data flow and enabling real-time activation of dispatch systems, resulting in a 30% improvement in processing efficiency and a 20% increase in operational performance.",
        "Spearheaded the deployment of streamlined software installations for nationwide public safety agencies, utilizing SQL, XML, and JSON to create tailored configurations, improving integration success rate by 25% and reducing installation time by 40%.",
        "Collaborated on a Java web service hosted on WildFly, integrated with Apache, and deployed in an AWS environment, developing REST APIs for seamless data exchange, contributing to a 15% increase in real-time data accuracy and improving client system uptime by 10%.",
        "Led end-to-end implementations for 20+ concurrent clients, from customized deployments to mission-critical support, ensuring 99%+ system uptime and proactive communication.",
      ],
    },
    {
      role: "Software Engineer Intern",
      date: "June 2023 – August 2023",
      co: "Kohl’s Corporate",
      location: "Milwaukee, WI",
      bullets: [
        "Developed dynamic webpages using React, SASS, and Adobe Experience Manager, integrating SPA architecture for responsive UI’s that reached over 65 million customers.",
        "Utilized AEM’s content fragment models and editable templates to streamline content creation, and implemented A/B testing to analyze and enhance user experiences.",
      ],
    },
  ],
  projects: [
    {
      name: "Barkada Hospitality",
      link: "barkadahospitality.info",
      href: "https://barkadahospitality.info",
      stack: "Next.js, Tailwind CSS, Firebase, Square API",
      date: "2025",
      bullets: [
        "Developed a full-stack reservation and payment platform for a multi-location hospitality brand, enabling customers to explore the brand site, book seatings, and pay deposits seamlessly.",
        "Designed Firestore data models for locations, events, and reservations, supporting dynamic availability, seat counts, and real-time operational updates.",
        "Integrated Square Payments to handle $50 non-refundable deposits, increasing booking reliability and reducing manual coordination for staff.",
        "Built a responsive, mobile-first Next.js + Tailwind interface to showcase the brand experience while optimizing the reservation flow for speed and conversion.",
      ],
    },
  ],
};
