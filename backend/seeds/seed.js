require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Project = require("../models/Project");

const sampleProjects = [
  {
    title: "Real-Time Task Management System",
    description: "A comprehensive MERN stack productivity application featuring JWT-based authentication, a real-time task management system, a priority-driven logic engine, and an analytics dashboard.",
    image: "https://placehold.co/600x400/1e1e2d/22d3ee?text=Task+Management",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveUrl: "https://task-manager-1-71wj.onrender.com",
    githubUrl: "https://github.com/banavathuramkumar/Task-Manager",
    featured: true,
    order: 1
  },
  {
    title: "SafeGuard Edu",
    description: "Disaster Preparedness and Response Education System. A platform to educate and prepare individuals for various disaster scenarios using interactive learning modules.",
    image: "https://placehold.co/600x400/1e1e2d/8b5cf6?text=SafeGuard+Edu",
    techStack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    order: 3
  },
  {
    title: "Online Food Ordering System",
    description: "A comprehensive MERN stack application for online food ordering and delivery management system with real-time order tracking and payment gateway integration.",
    image: "https://placehold.co/600x400/1e1e2d/e2e8f0?text=Online+Food+Ordering+System",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://food-del-frontend-4q0b.onrender.com/",
    githubUrl: "https://github.com/banavathuramkumar/food-delivery",
    featured: true,
    order: 2
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    
    await Project.insertMany(sampleProjects);
    
    console.log("Data Imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
