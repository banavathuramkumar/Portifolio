import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";
import { skillCategories } from "../../data/skills";

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative bg-dark-800/50">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="My Skills" 
          subtitle="The technologies and tools I use to build scalable web applications."
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            
            return (
              <motion.div 
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.skills.map((skill, index) => (
                    <SkillCard 
                      key={index}
                      name={skill.name}
                      level={skill.level}
                      index={index}
                    />
                  ))}
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
