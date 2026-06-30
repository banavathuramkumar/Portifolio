import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { LaptopMinimal, Layout, Server, Database, Wrench, Code2, AlertTriangle } from "lucide-react";

const iconMap = {
  LaptopMinimal,
  Layout,
  Server,
  Database,
  Wrench,
  Code2
};

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkillsAndProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const [skillsRes, profileRes] = await Promise.all([
        axios.get(`${apiUrl}/api/skills`),
        axios.get(`${apiUrl}/api/profile`)
      ]);
      setSkillCategories(skillsRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error("Failed to fetch skills/profile", error);
      setError("Unable to load skills at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsAndProfile();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 relative bg-dark-800/50">
        <div className="container mx-auto px-6 md:px-12 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-24 relative bg-dark-800/50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AlertTriangle className="mx-auto text-yellow-500 mb-4 animate-bounce" size={48} />
          <p className="text-slate-400 text-lg mb-4">{error}</p>
          <button onClick={fetchSkillsAndProfile} className="glass px-6 py-2.5 rounded-xl text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-sm font-semibold">
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  if (skillCategories.length === 0) {
    return (
      <section id="skills" className="py-24 relative bg-dark-800/50">
        <div className="container mx-auto px-6 md:px-12 text-center text-slate-400">
          No skills registered in the portfolio.
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 relative bg-dark-800/50">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={profile?.skillsTitle || "My Skills"} 
          subtitle={profile?.skillsSubtitle || "The technologies and tools I use to build scalable web applications."}
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = iconMap[category.icon] || Code2;
            const skillsList = category.skills || [];
            const categoryLevel = skillsList[0]?.level || 90; // Category percentage
            
            return (
              <motion.div 
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Category Header with single percentage display */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl">
                      {categoryLevel}%
                    </span>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-3">
                    {skillsList.map((skill, index) => (
                      <motion.span 
                        key={skill._id || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="glass px-4 py-2 rounded-xl text-sm font-medium text-slate-200 border border-glass-border hover:border-primary/50 hover:text-white transition-all duration-200 cursor-default"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Background Accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
