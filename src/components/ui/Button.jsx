import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "rounded-2xl font-semibold transition flex items-center justify-center";

  const variants = {
    primary: "bg-exotic-red text-exotic-white hover:bg-[#a50f1a]",
    secondary:
      "bg-exotic-white border border-exotic-red text-exotic-red hover:bg-exotic-lightRed",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
