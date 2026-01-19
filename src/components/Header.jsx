import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Bell, X, Tag, Megaphone, AlertCircle, Package, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../context/NotificationContext";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const notificationRef = useRef(null);

  const {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "promo":
        return <Tag size={18} className="text-green-600 dark:text-green-400" />;
      case "order":
        return <Package size={18} className="text-blue-600 dark:text-blue-400" />;
      case "announcement":
        return <Megaphone size={18} className="text-purple-600 dark:text-purple-400" />;
      case "news":
        return <AlertCircle size={18} className="text-orange-600 dark:text-orange-400" />;
      case "system":
        return <Bell size={18} className="text-gray-600 dark:text-gray-400" />;
      default:
        return <Bell size={18} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "promo":
        return "bg-green-100 dark:bg-green-950/30";
      case "order":
        return "bg-blue-100 dark:bg-blue-950/30";
      case "announcement":
        return "bg-purple-100 dark:bg-purple-950/30";
      case "news":
        return "bg-orange-100 dark:bg-orange-950/30";
      case "system":
        return "bg-gray-100 dark:bg-gray-800";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.actionable) {
      console.log("Action:", notification.actionText, notification.actionData);
      
      if (notification.actionData?.orderNumber) {
      }
    }

    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg border-b border-gray-200/70 dark:border-neutral-800/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              EXOTIC
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`relative rounded-lg p-2 transition-colors ${
                  isOpen
                    ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800"
                }`}
                aria-label="Notifications"
              >
                <Bell size={20} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-950"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {unreadCount} unread
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                          <div className="mb-3 rounded-full bg-gray-100 dark:bg-neutral-800 p-4">
                            <Bell size={32} className="text-gray-400 dark:text-gray-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            No notifications
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            We'll notify you when something arrives
                          </p>
                        </div>
                      ) : (
                        <>
                          {notifications.map((notification) => (
                            <motion.button
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification)}
                              className={`w-full border-b border-gray-100 dark:border-neutral-800 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800/50 ${
                                !notification.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""
                              }`}
                              whileHover={{ x: 4 }}
                            >
                              <div className="flex gap-3">
                                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${getNotificationColor(notification.type)}`}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className={`text-sm font-semibold ${
                                      !notification.read
                                        ? "text-gray-900 dark:text-white"
                                        : "text-gray-700 dark:text-gray-300"
                                    }`}>
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                      {notification.time}
                                    </p>
                                    {notification.actionable && (
                                      <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                                        {notification.actionText}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1" />
                              </div>
                            </motion.button>
                          ))}
                        </>
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-neutral-800 px-4 py-2 flex gap-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                        <button
                          onClick={clearAll}
                          className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={20} strokeWidth={1.8} className="text-amber-400" />
              ) : (
                <Moon size={20} strokeWidth={1.8} className="text-slate-700" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}