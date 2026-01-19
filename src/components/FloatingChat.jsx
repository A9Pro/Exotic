import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  Shield,
  Package,
  CreditCard,
  Clock,
  MapPin,
} from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { toast } from "./ToastContainer";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("main");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const quickActions = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      desc: "Instant response",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-950/30",
      action: () => {
        window.open("https://wa.me/2348132791933", "_blank");
        toast.success("Opening WhatsApp...");
      },
    },
    {
      id: "phone",
      icon: Phone,
      title: "Call Us",
      desc: "+234 803 123 4567",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950/30",
      action: () => {
        window.location.href = "tel:+2348031234567";
      },
    },
    {
      id: "email",
      icon: Mail,
      title: "Email Support",
      desc: "We reply in 24hrs",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-950/30",
      action: () => setActiveView("form"),
    },
    {
      id: "faq",
      icon: HelpCircle,
      title: "FAQs",
      desc: "Quick answers",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-950/30",
      action: () => setActiveView("faq"),
    },
  ];

  const faqs = [
    {
      icon: Package,
      question: "Delivery time?",
      answer: "30-45 minutes on average within Lagos",
    },
    {
      icon: CreditCard,
      question: "Payment methods?",
      answer: "Cash, cards, bank transfer, wallets",
    },
    {
      icon: Shield,
      question: "Is food safe?",
      answer: "Yes! NAFDAC certified with strict hygiene",
    },
    {
      icon: Clock,
      question: "Business hours?",
      answer: "Mon-Sun: 8:00 AM - 12:00 AM",
    },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll reply within 24hrs");
      setFormData({ name: "", email: "", message: "" });
      setActiveView("main");
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-gradient-to-br from-rose-600 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-rose-500/50 transition-shadow group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={24} />
      
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              1
            </span>

            <span className="absolute inset-0 rounded-full bg-rose-600 animate-ping opacity-75" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] md:w-96 max-h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Exotic Support
                    </h3>
                    <p className="text-white/90 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Online now
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setActiveView("main");
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950">
                <AnimatePresence mode="wait">
                  {activeView === "main" && (
                    <motion.div
                      key="main"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          👋 Hi there! How can we help you today?
                        </p>
                      </div>

                      <div className="space-y-2">
                        {quickActions.map((action) => (
                          <motion.button
                            key={action.id}
                            onClick={action.action}
                            className="w-full bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-all text-left"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <action.icon size={20} className={action.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                {action.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {action.desc}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 rounded-xl p-4 space-y-2 border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-rose-600 dark:text-rose-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Mon-Sun: 8AM - 12AM
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-rose-600 dark:text-rose-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Surulere, Lagos
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeView === "faq" && (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => setActiveView("main")}
                        className="text-sm text-rose-600 dark:text-rose-400 hover:underline mb-2"
                      >
                        ← Back
                      </button>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        Frequently Asked Questions
                      </h3>

                      <div className="space-y-3">
                        {faqs.map((faq, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4"
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center flex-shrink-0">
                                <faq.icon size={16} className="text-rose-600 dark:text-rose-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                  {faq.question}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeView === "form" && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => setActiveView("main")}
                        className="text-sm text-rose-600 dark:text-rose-400 hover:underline mb-2"
                      >
                        ← Back
                      </button>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        Send us a message
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                            placeholder="How can we help?"
                          />
                        </div>

                        <Button
                          className="w-full"
                          onClick={handleSubmit}
                          loading={loading}
                        >
                          <Send size={16} className="mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  We typically reply within 30 minutes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}