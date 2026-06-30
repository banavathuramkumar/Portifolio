require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Project = require("../models/Project");
const AdminUser = require("../models/AdminUser");
const Profile = require("../models/Profile");
const Experience = require("../models/Experience");
const Skill = require("../models/Skill");

const defaultAdmin = {
  email: "admin@gmail.com",
  password: "admin123"
};

const defaultProfile = {
  name: "Ramkumar Banavathu",
  role: "Full Stack MERN Developer | AI/ML Enthusiast",
  location: "India",
  email: "banavathuramkumar@gmail.com",
  phone: "+91 7416927768",
  bio: "I’m a passionate Full Stack Developer with a strong interest in Artificial Intelligence and Machine Learning. I specialize in building scalable web applications using the MERN Stack, while also exploring intelligent systems powered by Machine Learning, Deep Learning, and Natural Language Processing. I enjoy creating products that combine clean code architecture, premium UI/UX, and practical AI-driven functionality. With experience building real-time dashboards, educational platforms, and modern web applications, I aim to bridge the gap between robust full-stack engineering and intelligent technology.",
  image: "https://placehold.co/400x400/22d3ee/fff?text=Ramkumar",
  social: {
    github: "https://github.com/banavathuramkumar",
    linkedin: "https://www.linkedin.com/in/banavathu-ramkumar/",
  },
  stats: {
    experience: "6 months",
    projects: "15+",
    clients: "2+",
  },
  heroTitle: "Ramkumar Banavathu",
  heroSubtitle: "Full Stack MERN Developer | AI/ML Enthusiast",
  heroDescription: "I craft premium digital experiences using the MERN stack. Focused on building fast, scalable, and visually stunning web applications.",
  aboutTitle: "About Me",
  aboutSubtitle: "Get to know me and my background in software development.",
  aboutHeading: "Designing with passion, building with purpose.",
  skillsTitle: "My Skills",
  skillsSubtitle: "The technologies and tools I use to build scalable web applications.",
  projectsTitle: "Featured Projects",
  projectsSubtitle: "A selection of my recent work. Explore the code or see it live.",
  experienceTitle: "Experience & Education",
  experienceSubtitle: "My professional journey and academic background.",
  certificatesTitle: "Certificates & Achievements",
  certificatesSubtitle: "Honors, certifications, and milestones in my development career.",
  contactTitle: "Get in Touch",
  contactSubtitle: "Have a question or want to work together? Leave a message!"
};

const defaultExperiences = [
  {
    title: "Student Council Member",
    company: "SRM University - Andhra Pradesh",
    period: "2025 - 2026",
    description: "Worked as a Student Council Member at SRM University with a primary focus on post-production and execution of university events, handling on-ground coordination, logistics, and smooth implementation of academic and cultural programs.",
    type: "work",
    order: 1
  },
  {
    title: "B.Tech in Computer Science",
    company: "SRM UNIVERSITY - ANDHRA PRADESH",
    period: "2024 - 2028",
    description: "I am currently pursuing a B.Tech in Computer Science at SRM University - Andhra Pradesh, maintaining a CGPA of 8.52 My academic focus includes developing foundations in software engineering, data structures, algorithms, and emerging technologies. I am actively involved in university events and technical clubs, applying theoretical knowledge to practical challenges.",
    type: "education",
    order: 2
  }
];

const defaultSkills = [
  {
    category: "Programming & Frameworks",
    names: ["C", "C++", "Python", "JavaScript (ES6+)", "Numpy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "OpenCV"],
    order: 1
  },
  {
    category: "Frontend",
    names: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "JavaScript (ES6+)"],
    order: 2
  },
  {
    category: "Backend",
    names: ["Node.js", "Express.js", "RESTful APIs", "GraphQL"],
    order: 3
  },
  {
    category: "Database",
    names: ["MongoDB", "PostgreSQL", "SQL", "Mongoose"],
    order: 4
  },
  {
    category: "Tools",
    names: ["Git & GitHub", "Vercel / Render", "Socket.io", "Postman"],
    order: 5
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // 1. Seed Admin
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      await AdminUser.create(defaultAdmin);
      console.log("Admin user seeded: email: admin@gmail.com, password: admin123");
    } else {
      console.log("Admin user already exists");
    }

    // 2. Seed Profile
    await Profile.deleteMany();
    await Profile.create(defaultProfile);
    console.log("Profile seeded successfully with default heading copy");

    // 3. Seed Experiences
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      await Experience.insertMany(defaultExperiences);
      console.log("Default Experiences seeded");
    } else {
      console.log("Experiences already exist");
    }

    // 4. Seed Skills (Re-seed to accommodate the category group structure)
    await Skill.deleteMany();
    await Skill.insertMany(defaultSkills);
    console.log("Default Skills seeded under category group structure");

    console.log("Database Seeding Completed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
