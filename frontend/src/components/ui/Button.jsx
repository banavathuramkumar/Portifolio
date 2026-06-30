import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-xl transition-all duration-300";
  
  const variants = {
    primary: "text-white bg-primary hover:bg-primary-hover shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]",
    outline: "text-primary border-2 border-primary hover:bg-primary/10",
    glass: "text-white glass glass-hover"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;
