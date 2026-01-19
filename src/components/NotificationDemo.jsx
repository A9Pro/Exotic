import { motion } from "framer-motion";
import { Bell, Package, Tag, Megaphone, Newspaper, RefreshCw } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { useNotifications } from "../context/NotificationContext";
import {
  orderNotifications,
  promoNotifications,
  systemNotifications,
  newsNotifications,
  sendTestNotifications,
} from "../services/notificationService";

export default function NotificationDemo() {
  const { addNotification, notifications, clearAll } = useNotifications();

  const testCategories = [
    {
      title: "Order Notifications",
      icon: Package,
      color: "blue",
      tests: [
        {
          label: "Order Placed",
          action: () => addNotification(orderNotifications.orderPlaced(1234)),
        },
        {
          label: "Order Preparing",
          action: () => addNotification(orderNotifications.orderPreparing(1234)),
        },
        {
          label: "Out for Delivery",
          action: () => addNotification(orderNotifications.orderOutForDelivery(1234, 25)),
        },
        {
          label: "Delivered",
          action: () => addNotification(orderNotifications.orderDelivered(1234)),
        },
      ],
    },
    {
      title: "Promotional",
      icon: Tag,
      color: "green",
      tests: [
        {
          label: "Flash Sale",
          action: () => addNotification(promoNotifications.flashSale(50, "Jollof Rice")),
        },
        {
          label: "Loyalty Reward",
          action: () => addNotification(promoNotifications.loyaltyReward(100)),
        },
        {
          label: "First Order Discount",
          action: () => addNotification(promoNotifications.firstOrderDiscount()),
        },
        {
          label: "Free Delivery",
          action: () => addNotification(promoNotifications.freeDelivery()),
        },
      ],
    },
    {
      title: "System Announcements",
      icon: Megaphone,
      color: "purple",
      tests: [
        {
          label: "New Menu",
          action: () => addNotification(systemNotifications.newMenu("Seafood Selection")),
        },
        {
          label: "Holiday Hours",
          action: () => addNotification(systemNotifications.holidayHours("Dec 25", "10AM - 6PM")),
        },
        {
          label: "Account Verified",
          action: () => addNotification(systemNotifications.accountVerified()),
        },
      ],
    },
    {
      title: "News & Updates",
      icon: Newspaper,
      color: "orange",
      tests: [
        {
          label: "Social Media",
          action: () => addNotification(newsNotifications.socialMedia("Instagram")),
        },
        {
          label: "Blog Post",
          action: () => addNotification(newsNotifications.blog("10 Nigerian Dishes You Must Try")),
        },
      ],
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-950/30",
        text: "text-blue-600 dark:text-blue-400",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-950/30",
        text: "text-green-600 dark:text-green-400",
        button: "bg-green-600 hover:bg-green-700",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-950/30",
        text: "text-purple-600 dark:text-purple-400",
        button: "bg-purple-600 hover:bg-purple-700",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-950/30",
        text: "text-orange-600 dark:text-orange-400",
        button: "bg-orange-600 hover:bg-orange-700",
      },
    };
    return colors[color];
  };

  return (
    <motion.div
      className="pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Bell size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Notification Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test all notification types
          </p>
        </div>

        <Card className="p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Notifications
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {notifications.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => sendTestNotifications(addNotification)}
              >
                <RefreshCw size={16} className="mr-2" />
                Send Test Batch
              </Button>
              {notifications.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </Card>

        {testCategories.map((category) => {
          const colors = getColorClasses(category.color);
          return (
            <Card
              key={category.title}
              className="p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <category.icon size={24} className={colors.text} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.tests.map((test) => (
                  <button
                    key={test.label}
                    onClick={test.action}
                    className={`${colors.button} text-white px-4 py-3 rounded-lg font-medium hover:shadow-md transition-all active:scale-95`}
                  >
                    {test.label}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}

        <Card className="p-6 border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">
            How to Use
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400">1.</span>
              <span>Click any button above to trigger a notification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400">2.</span>
              <span>Check the bell icon in the header for unread count</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400">3.</span>
              <span>Click notifications to mark them as read</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400">4.</span>
              <span>Notifications persist in localStorage</span>
            </li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}