import { Code2, Database, Layout, Server, Wrench, LaptopMinimal } from "lucide-react";

export const skillCategories = [
  {
    title: "Programming & Frameworks",
    icon: LaptopMinimal,
    skills: [
      { name: "C", level: 85 },
      { name: "C++", level: 95 },
      { name: "Python", level: 90 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Numpy",level: 80 },
      { name: "Pandas",level: 80 },
      { name: "Matplotlib",level: 80 },
      { name: "Scikit-learn",level: 80 },
      { name: "TensorFlow",level: 80 },
      { name: "OpenCV",level: 80 },
    ]
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 85 },
      { name: "JavaScript (ES6+)", level: 90 },
    ]
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ]
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "SQL", level: 70 },
      { name: "Mongoose", level: 90 },
    ]
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel / Render", level: 85 },
      { name: "Socket.io", level: 80 },
      { name: "Postman", level: 95 },
    ]
  }
];
