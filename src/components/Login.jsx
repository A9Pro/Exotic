import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        alert("Please fill in all fields");
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        alert("Please enter email and password");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      const userData = {
        name: formData.name || "Guest User",
        email: formData.email,
        phone: formData.phone || "0803 123 4567",
        whatsapp: formData.phone || "0803 123 4567",
      };

      localStorage.setItem("exotic_user", JSON.stringify(userData));
      
      setLoading(false);
      onLoginSuccess(userData);
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-200px)] flex items-center justify-center p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            {isSignUp ? (
              <UserPlus size={32} className="text-white" />
            ) : (
              <LogIn size={32} className="text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isSignUp
              ? "Sign up to start ordering delicious meals"
              : "Login to access your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={isSignUp}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required={isSignUp}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="0803 123 4567"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </Card>
    </motion.div>
  );
}