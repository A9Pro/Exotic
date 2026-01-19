// src/components/BottomNav.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Home, UtensilsCrossed, ShoppingCart, User } from "lucide-react";

export default function BottomNav({ cartCount = 0, active = "Home", onNavigate }) {
  const navItems = [
    { id: "Home", label: "Home", icon: Home },
    { id: "Menu", label: "Menu", icon: UtensilsCrossed },
    { id: "Cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
    { id: "Profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center min-w-[60px] py-1"
                whileTap={{ scale: 0.9 }}
                animate={isActive ? { y: -2 } : { y: 0 }}
              >
                {/* Icon Container */}
                <div className="relative">
                  <motion.div
                    className={`p-2 rounded-xl transition-colors ${
                      isActive
                        ? "bg-exotic-lightRed"
                        : "bg-transparent"
                    }`}
                    animate={isActive ? { scale: 1 } : { scale: 1 }}
                  >
                    <Icon
                      size={22}
                      className={`transition-colors ${
                        isActive
                          ? "text-exotic-red"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>

                  {/* Badge (for Cart) */}
                  <AnimatePresence>
                    {item.badge > 0 && (
                      <motion.div
                        key="badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                        className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-exotic-red text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900"
                      >
                        <motion.span
                          key={item.badge} // Re-animate when count changes
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.badge > 99 ? "99+" : item.badge}
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Label */}
                <motion.span
                  className={`text-xs mt-1 font-medium transition-colors ${
                    isActive
                      ? "text-exotic-red"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                >
                  {item.label}
                </motion.span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-exotic-red rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}