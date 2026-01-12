import { motion } from "framer-motion";
import { Home, Menu, ShoppingCart, User } from "lucide-react";

export default function BottomNav({
  cartCount = 0,
  active = "Home",
  onNavigate,
}) {
  const navItems = [
    { label: "Home", icon: Home, value: "Home" },
    { label: "Menu", icon: Menu, value: "Menu" },
    { label: "Cart", icon: ShoppingCart, value: "Cart" },
    { label: "Profile", icon: User, value: "Profile" },
  ];

  return (
    <motion.nav
      className={`
        fixed bottom-4 sm:bottom-6
        left-0 right-0 mx-auto
        z-50
        bg-white/70 dark:bg-black/70
        backdrop-blur-lg
        border border-white/20 dark:border-white/10
        shadow-xl shadow-black/10 dark:shadow-black/40
        rounded-2xl
        px-5 sm:px-8 py-3
        flex items-center justify-around
        w-[92%] max-w-[380px]
        touch-manipulation
      `}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.value;

        return (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            onClick={() => onNavigate(item.value)}
            className={`
              group relative flex flex-col items-center justify-center
              min-w-[52px] px-2 py-1
              transition-all duration-200
              ${isActive
                ? "text-exotic-red"
                : "text-gray-600 hover:text-exotic-red dark:text-gray-300 dark:hover:text-exotic-red"}
            `}
          >
            <div className="relative">
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 2}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              {item.value === "Cart" && cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="
                    absolute -top-2 -right-2
                    bg-exotic-red text-white
                    text-[10px] font-bold
                    min-w-[16px] h-4
                    flex items-center justify-center
                    px-1 rounded-full
                    border-2 border-white dark:border-gray-900
                    shadow-sm
                  "
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </div>

            <span
              className={`
                text-[10px] sm:text-xs mt-1 font-medium
                transition-colors duration-200
                ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
              `}
            >
              {item.label}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="
                  absolute -bottom-1.5
                  w-5 h-1 rounded-full
                  bg-exotic-red
                "
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.nav>
  );
}