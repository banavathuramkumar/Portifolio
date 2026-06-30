import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, AlertTriangle } from "lucide-react";
import { GithubIcon as Github } from "../ui/Icons";
import axios from "axios";
import SectionHeading from "../ui/SectionHeading";

const resolveUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${apiUrl}${path}`;
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectsAndProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const [projectsRes, profileRes] = await Promise.all([
        axios.get(`${apiUrl}/api/projects`),
        axios.get(`${apiUrl}/api/profile`)
      ]);
      setProjectData(projectsRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error("Could not fetch projects/profile", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndProfile();
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={profile?.projectsTitle || "Featured Projects"} 
          subtitle={profile?.projectsSubtitle || "A selection of my recent work. Explore the code or see it live."}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto text-yellow-500 mb-4 animate-bounce" size={48} />
            <p className="text-slate-400 text-lg mb-4">{error}</p>
            <button onClick={fetchProjectsAndProfile} className="glass px-6 py-2.5 rounded-xl text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-sm font-semibold">
              Retry
            </button>
          </div>
        ) : projectData.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No projects found. Check back later!
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
                    src={resolveUrl(project.image)} 
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
                  <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack?.map((tech, i) => (
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
