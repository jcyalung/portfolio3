export interface HeroContent {
  name: string;
  specialty: string;
  summary: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary: string | string[];
}

export interface ProjectItem {
  name: string;
  summary: string;
  image: string;
  linkPreview?: string;
  linkSource?: string;
}

export interface SkillsContent {
  languages: string;
  frameworks: string;
  interests: string;
}

export interface AboutContent {
  description: string;
  image: string;
}

export const HERO: HeroContent = {
  name: "Joshua Yalung",
  specialty: "CS at UC Irvine",
  summary:
    "Software Engineer specializing in scalable backend and fault-tolerant systems.",
  email: "jyalung1@uci.edu",
  linkedin: "https://www.linkedin.com/in/jcyal/",
  github: "https://github.com/jcyalung",
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Alcon",
    position: "Software Engineer Intern",
    startDate: "May 2026",
    endDate: "Present",
    summary: [
      "I am a software engineer on the Digital Health Software team. I am building scalable Java and Spring Boot backend infrastructure to handle high-traffic loads for 300k customers nationwide. I am also deploying services to AWS EC2 and configuring Strapi on and S3 storage layer, maintaining 99% uptime and reducing frontend media loads by 48%.",
      "I am also working on the Clinical Supply team, analyzing systems end-to-end and modeling risk and failure to ensure high availability and system resilience under load."],
  },
  {
    company: "FUSION at UCI",
    position: "Project Manager",
    startDate: "July 2025",
    endDate: "January 2026",
    summary: [
      "I was the project manager for FUSION at UCI, working with a team of 4 developers and 1 designer to create a digital study tracking application for an organization of 300 members. As the project manager, I led sprint planning, managing 40+ GitHub tasks with 100% on-time completion.",
      "I also trained developers and designers on frameworks such as Next.JS, GitHub, and Figma through documentation and videos, reducing onboarding time by 50% and boosting productivity and collaboration.",
    ],
  },
  {
    company: "Hitachi Vantara",
    position: "Software Engineer Intern",
    startDate: "Aug 2024",
    endDate: "Aug 2025",
    summary: [
      "Created an educational dashboard with Microsoft PowerBI and Azure to generate data summaries on employee training and hours logged, optimizing application performance by 32% and enhancing reporting access, increasing insight retrieval 2x faster.",
      "Developed a C++ script to generate training paths based on employee's career path, using data structures such as decision trees to auto-generate training paths, cutting manual planning time by 13%. The application is currently being utilized to manage all Hitachi Vantara employees (10k).",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    name: "Fu-Stamps",
    summary: "Premier solution for stamp card and attendance logging.",
    linkSource: "https://github.com/jcyalung/fu-stamps",
    image: "/fu-stamps.png",
  },
  {
    name: "senti-IMDB",
    summary: "A sentiment analyzer using NLP for IMDB Movie Reviews.",
    linkSource: "https://github.com/jcyalung/senti-IMDB",
    image: "/senti.png",
  },
  {
    name: "AntEDU",
    summary:
      "A course planning/scheduling chatbot service for UC Irvine students.",
    linkSource: "https://github.com/jcyalung",
    image: "/anteater.png",
  },
];

export const SKILLS: SkillsContent = {
  languages:
    "Python, Java, Javascript, C++, SQL, R, MATLAB, PowerScript, Batch, TypeScript",
  frameworks:
    "JUnit, Git, GitHub, Arduino, MongoDB, Firestore, scikit-learn, biopython, Scrum, Jira, FastAPI, Next, Express, Astro, Fastify, Jupyter, PyTorch, Supabase, Docker, Nginx",
  interests:
    "agile development, cloud computing, medical embedded systems, bioinformatics, computational biology, AI/ML, education, badminton, basketball",
};

export const ABOUT: AboutContent = {
  description: 
`I'm an undergraduate computer science student at the University of California, Irvine. I am passionate about build scalable backend infrastructure and fault-tolerant systems.
This summer I am at Alcon in Fort Worth, Texas, joining the Digital Health Software team. 
Besides software and systems, I enjoy volleyball, cooking, and visiting cool museums.`,
  image: "/josh-big.png",
};
