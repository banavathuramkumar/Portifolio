import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col overflow-x-hidden w-full"
    >
      <main className="flex-grow overflow-x-hidden w-full">
        {children}
      </main>
    </motion.div>
  );
};

export default PageWrapper;
