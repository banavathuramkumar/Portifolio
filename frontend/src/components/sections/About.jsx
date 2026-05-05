import { motion } from "framer-motion";
import { Code, Users, Briefcase } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { profile } from "../../data/profile";

const About = () => {
  const stats = [
    { icon: Briefcase, label: "Experience", value: profile.stats.experience },
    { icon: Code, label: "Projects", value: profile.stats.projects },
    { icon: Users, label: "Happy Clients", value: profile.stats.clients },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="About Me" 
          subtitle="Get to know me and my background in software development."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Profile Image Column */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative z-10 aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 p-2 glass">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name) + "&size=400&background=22d3ee&color=fff";
                  }}
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiM4YjVjZjYiLz48L3N2Zz4=')] bg-[length:20px_20px] opacity-30 z-0" />
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              Designing with passion, building with <span className="text-primary">purpose</span>.
            </h3>
            
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {profile.bio}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <GlassCard key={index} delay={0.3 + (index * 0.1)} className="text-center p-4 md:p-6" hover={true}>
                    <Icon className="mx-auto mb-3 text-primary" size={28} />
                    <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </GlassCard>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
