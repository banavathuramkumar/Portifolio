import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Button from "../ui/Button";
import { profile } from "../../data/profile";

const Hero = () => {
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10 ">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-primary border-primary/20">
              👋 Welcome to my portfolio
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
    
            Hi, I'm <span className="text-white ">{profile.name}</span>
            <br />
            <span className="text-gradient leading-tight ">{profile.role}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I craft premium digital experiences using the MERN stack. 
            Focused on building fast, scalable, and visually stunning web applications.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work <ArrowRight size={18} />
            </Button>
           <Button
  variant="glass"
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ram_Kumar_Resume.pdf";
    link.click();
  }}
>
  Download Resume <Download size={18} />
</Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          animate={{ height: ["0px", "48px", "0px"], y: [0, 24, 48] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
