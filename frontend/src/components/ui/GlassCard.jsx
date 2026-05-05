import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", hover = true, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`glass ${hover ? 'glass-hover' : ''} rounded-2xl p-6 md:p-8 relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle top glare effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
