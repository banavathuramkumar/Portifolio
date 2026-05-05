import { motion } from "framer-motion";

const SkillCard = ({ name, level, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="glass p-4 rounded-xl flex flex-col gap-3 group border border-glass-border hover:border-primary/50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-slate-200 group-hover:text-primary transition-colors">{name}</span>
        <span className="text-xs text-slate-400">{level}%</span>
      </div>
      
      {/* Progress bar background */}
      <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
        {/* Animated progress bar fill */}
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
