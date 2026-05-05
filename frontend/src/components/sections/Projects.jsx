import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "../ui/Icons";
import axios from "axios";
import SectionHeading from "../ui/SectionHeading";
import { projects as fallbackProjects } from "../../data/projects";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
        setProjectData(response.data);
      } catch (error) {
        console.warn("Could not fetch projects from API, using fallback data");
        setProjectData(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my recent work. Explore the code or see it live."
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projectData.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border-glass-border hover:border-primary/40"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/1e1e2d/22d3ee?text=Project+Preview";
                    }}
                  />
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-900/60 backdrop-blur-sm">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-dark-900 rounded-full hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-dark-900 rounded-full hover:scale-110 transition-transform">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-dark-700/50 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
