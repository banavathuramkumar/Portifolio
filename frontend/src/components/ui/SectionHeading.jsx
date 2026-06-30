import { motion } from "framer-motion";

const SectionHeading = ({ title, subtitle, align = "left" }) => {
  return (
    <div className={`mb-8 md:mb-16 ${align === "center" ? "text-center flex flex-col items-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: align === "center" ? 0 : -30, y: align === "center" ? 30 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="inline-block"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-white">{title.split(" ")[0]}</span>{" "}
          <span className="text-gradient">{title.split(" ").slice(1).join(" ")}</span>
        </h2>
        
        {/* Animated underline */}
        <motion.div 
          className={`h-1 bg-gradient-to-r from-primary to-accent rounded-full ${align === "center" ? "mx-auto" : ""}`}
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 mt-6 max-w-2xl text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
