import { motion } from "framer-motion";

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-dark-900 shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_-1px_rgba(34,211,238,0.6)] hover:bg-primary-hover",
    secondary: "bg-accent text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_-1px_rgba(139,92,246,0.6)] hover:bg-accent/90",
    glass: "glass text-white hover:bg-white/10 hover:border-white/20 border border-white/10",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
