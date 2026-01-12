import { motion } from "framer-motion";
import { Home, Menu, ShoppingCart, User } from "lucide-react";

export default function BottomNav({ cartCount }) {
  const navItems = [
    { label: "Home", icon: <Home size={20} /> },
    { label: "Menu", icon: <Menu size={20} /> },
    {
      label: "Cart",
      icon: (
        <motion.div
          key={cartCount}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <ShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-exotic-red text-white text-[10px] font-semibold px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </motion.div>
      ),
    },
    { label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <motion.nav
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        bg-white/40 backdrop-blur-md
        rounded-2xl shadow-soft
        px-6 py-2
        flex justify-between
        w-[90%] max-w-md
      "
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      {navItems.map((item, index) => (
        <button
          key={index}
          className="flex flex-col items-center text-gray-600 hover:text-exotic-red"
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </motion.nav>
  );
}
