import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const resolveUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${apiUrl}${path}`;
};

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const { data } = await axios.get(`${apiUrl}/api/profile`);
        setProfile(data);
      } catch (error) {
        console.warn("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (loading || !profile) {
    return (
      <section id="home" className="min-h-[85vh] md:min-h-screen flex items-center justify-center pt-28 pb-12 md:py-0 relative animate-pulse overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center text-slate-400">
          Loading profile...
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-0 md:min-h-screen flex items-center justify-center pt-24 pb-4 md:py-0 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-3xl md:text-5xl lg:text-6xl text-white block mb-2 leading-tight">
              Hi, I'm {profile.heroTitle || profile.name}
            </span>
            <span className="text-gradient text-lg md:text-2xl lg:text-3xl leading-tight block">
              {profile.heroSubtitle || profile.role}
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {profile.heroDescription || "I craft premium digital experiences using the MERN stack."}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto w-full">
            <Button 
              variant="primary" 
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work <ArrowRight size={18} />
            </Button>
            <Button
              variant="glass"
              className="w-full sm:w-auto"
              onClick={() => {
                const link = document.createElement("a");
                link.href = resolveUrl(profile.resumeLink) || "/resume.pdf";
                link.download = `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`;
                link.target = "_blank";
                link.click();
              }}
            >
              Download Resume <Download size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
