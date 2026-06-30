import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, AlertTriangle } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperienceAndProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const [expRes, profileRes] = await Promise.all([
        axios.get(`${apiUrl}/api/experience`),
        axios.get(`${apiUrl}/api/profile`)
      ]);
      setExperience(expRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error("Failed to fetch experience/profile", error);
      setError("Failed to load experience timeline.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceAndProfile();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-16 md:py-24 relative bg-dark-800/50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-16 md:py-24 relative bg-dark-800/50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AlertTriangle className="mx-auto text-yellow-500 mb-4 animate-bounce" size={48} />
          <p className="text-slate-400 text-lg mb-4">{error}</p>
          <button onClick={fetchExperienceAndProfile} className="glass px-6 py-2.5 rounded-xl text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-sm font-semibold">
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  if (experience.length === 0) {
    return (
      <section id="experience" className="py-16 md:py-24 relative bg-dark-800/50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center text-slate-400">
          No experience details added yet.
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 md:py-24 relative bg-dark-800/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={profile?.experienceTitle || "Experience & Education"} 
          subtitle={profile?.experienceSubtitle || "My professional journey and academic background."}
          align="center"
        />

        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Timeline central line */}
          <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-dark-800 md:-translate-x-1/2 rounded-full" />

          {experience.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.type === "work" ? Briefcase : GraduationCap;
            
            return (
              <div key={item._id || item.id || index} className={`relative flex flex-col md:flex-row mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-[4px] md:left-1/2 top-0 w-7 h-7 rounded-full bg-dark-900 border-4 border-primary md:-translate-x-1/2 z-10"
                />

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
                >
                  <div className="glass p-6 md:p-8 rounded-2xl relative group hover:border-primary/50 transition-colors">
                    
                    {/* decorative arrow pointing to timeline */}
                    <div className={`hidden md:block absolute top-3 w-4 h-4 glass border-t-0 border-r-0 rotate-45 ${isEven ? '-left-2' : '-right-2 border-l-0 border-b-0 rotate-[-45deg]'}`} />
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-primary">
                        <Icon size={24} />
                        <span className="font-bold text-lg">{item.type === "work" ? "Experience" : "Education"}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all">{item.title}</h3>
                        <h4 className="text-lg text-slate-300 font-medium">{item.company}</h4>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-accent font-medium bg-accent/10 w-fit px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        <span>{item.period}</span>
                      </div>
                      
                      <p className="text-slate-400 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
