import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Shield, TrendingUp } from "lucide-react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import CartDrawer from "./components/CartDrawer";
import Menu from "./components/Menu";
import ToastContainer, { toast } from "./components/ToastContainer";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("exotic_user");
    const savedCart = localStorage.getItem("exotic_cart");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartItems(cart);
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    }
  }, []);

  useEffect(() => {
    const savedOrders = localStorage.getItem("exotic_order_history");
    if (savedOrders) {
      setOrderHistory(JSON.parse(savedOrders));
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("exotic_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (dish) => {
    setCartCount((prev) => prev + 1);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === dish.name);
      if (existing) {
        return prev.map((item) =>
          item.name === dish.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...dish, qty: 1 }];
    });

    // Show success toast with improved messaging
    toast.success(`${dish.name} added to cart!`);
  };

  const handleUpdateCart = (updater) => {
    setCartItems((prev) => {
      const newCart = typeof updater === 'function' ? updater(prev) : updater;
      setCartCount(newCart.reduce((sum, item) => sum + item.qty, 0));
      return newCart;
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to proceed with checkout");
      setActiveTab("Profile");
      setIsCartOpen(false);
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleNavigate = (tab) => {
    if (tab === "Cart") {
      setIsCartOpen(true);
    } else {
      setActiveTab(tab);
      setShowCheckout(false);
    }
  };

  const handleOrderSuccess = () => {
    // Update customer stats
    const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const savedStats = localStorage.getItem("exotic_customer_stats");
    const stats = savedStats ? JSON.parse(savedStats) : { totalOrders: 0, totalSpent: 0 };
    
    stats.totalOrders += 1;
    stats.totalSpent += orderTotal;
    localStorage.setItem("exotic_customer_stats", JSON.stringify(stats));

    const newOrder = {
      id: Date.now(), 
      date: new Date().toLocaleString("en-NG", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    };

    setOrderHistory((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("exotic_order_history", JSON.stringify(updated));
      return updated;
    });

    // Clear cart
    setCartItems([]);
    setCartCount(0);
    setShowCheckout(false);
    setIsCartOpen(false);
    setActiveTab("Home");
    
    toast.success("Order placed successfully! 🎉 We'll deliver soon.");
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("exotic_user");
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab("Home");
    toast.info("Logged out successfully!");
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated successfully!");
  };

  const handleReorder = (order) => {
    // Add all items from the previous order to cart
    order.items.forEach((item) => {
      setCartItems((prev) => {
        const existing = prev.find((cartItem) => cartItem.name === item.name);
        if (existing) {
          return prev.map((cartItem) =>
            cartItem.name === item.name 
              ? { ...cartItem, qty: cartItem.qty + item.qty } 
              : cartItem
          );
        }
        return [...prev, { ...item }];
      });
    });

    // Update cart count
    const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);
    setCartCount((prev) => prev + totalItems);

    // Show success message and open cart
    toast.success(`${order.items.length} item(s) re-added to cart! 🛒`);
    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const featuredDishes = [
    {
      name: "Grilled Atlantic Salmon",
      desc: "Fresh salmon fillet with exotic herbs, garlic butter & citrus glaze",
      price: 12500,
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop",
    },
    {
      name: "Exotic Jollof Rice",
      desc: "Premium Nigerian jollof with grilled chicken, fried plantain & coleslaw",
      price: 5500,
      img: "https://images.unsplash.com/photo-1625944527473-1c1c3cbb2f55?w=800&h=600&fit=crop",
    },
    {
      name: "Suya Platter (Beef)",
      desc: "Premium beef skewers with yaji spice, onions, tomatoes & pepper sauce",
      price: 4500,
      img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop",
    },
  ];

  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      desc: "Premium ingredients prepared by certified culinary experts",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      desc: "Average delivery time of 30-45 minutes to your doorstep",
    },
    {
      icon: Shield,
      title: "Hygiene Certified",
      desc: "NAFDAC approved with strict quality control standards",
    },
    {
      icon: TrendingUp,
      title: "Loyalty Rewards",
      desc: "Earn points and unlock exclusive benefits with every order",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Toast Container - Add once at top level */}
      <ToastContainer />
      
      <div className="mx-auto w-full max-w-md min-h-screen bg-white dark:bg-gray-900 shadow-2xl relative">
        <Header />

        <motion.main
          className="px-4 sm:px-5 pt-2 pb-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="wait">
            {showCheckout ? (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Checkout
                  cartItems={cartItems}
                  total={cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
                  onBack={() => setShowCheckout(false)}
                  onOrderSuccess={handleOrderSuccess}
                />
              </motion.div>
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === "Home" && (
                  <>
                    {/* HERO SECTION */}
                    <motion.section variants={itemFadeUp} className="relative mb-8">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop"
                          alt="Exotic cuisine hero"
                          className="w-full h-[280px] sm:h-[320px] object-cover"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 pb-7">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                              Exotic Flavors
                            </h1>
                            <p className="text-white/95 text-base sm:text-lg font-light mb-1">
                              Authentic Nigerian Cuisine
                            </p>
                            <p className="text-white/80 text-sm">
                              ⭐ 4.9 Rating • 2,500+ Orders • Fast Delivery
                            </p>
                          </motion.div>

                          <motion.div 
                            className="mt-5 flex gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Button 
                              size="lg" 
                              className="flex-1 shadow-xl"
                              onClick={() => setActiveTab("Menu")}
                            >
                              Order Now
                            </Button>
                            <Button
                              variant="outline"
                              size="lg"
                              className="flex-1 bg-white/15 backdrop-blur-md border-white/30 text-white hover:bg-white/25"
                              onClick={() => setActiveTab("Menu")}
                            >
                              View Menu
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.section>

                    {/* FEATURED DISHES */}
                    <motion.section variants={itemFadeUp} className="mb-8">
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Featured Dishes
                        </h2>
                        <button
                          onClick={() => setActiveTab("Menu")}
                          className="text-sm text-rose-600 dark:text-rose-400 font-medium hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      <div className="space-y-4">
                        {featuredDishes.map((dish) => (
                          <motion.div key={dish.name} variants={itemFadeUp}>
                            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                              <div className="flex items-center p-4 gap-4">
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                                  <img
                                    src={dish.img}
                                    alt={dish.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop";
                                    }}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">
                                    {dish.name}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                                    {dish.desc}
                                  </p>

                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
                                      ₦{dish.price.toLocaleString()}
                                    </span>

                                    <Button
                                      size="sm"
                                      onClick={() => handleAddToCart(dish)}
                                      className="min-w-[90px] shadow-sm"
                                    >
                                      + Add
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* FEATURES GRID */}
                    <motion.section variants={itemFadeUp} className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                        Why Choose Us
                      </h2>

                      <div className="grid grid-cols-2 gap-4">
                        {features.map((feature, idx) => (
                          <motion.div
                            key={feature.title}
                            variants={itemFadeUp}
                            custom={idx}
                          >
                            <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
                              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center">
                                <feature.icon size={24} className="text-rose-600 dark:text-rose-400" />
                              </div>
                              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                {feature.title}
                              </h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.desc}
                              </p>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>

                    {/* CTA SECTION */}
                    <motion.section
                      variants={itemFadeUp}
                      className="bg-gradient-to-br from-rose-600 to-orange-600 rounded-3xl p-6 text-white shadow-xl"
                    >
                      <h2 className="text-2xl font-bold mb-2">
                        Ready to Order?
                      </h2>
                      <p className="text-white/90 mb-5">
                        Explore our full menu and get your favorite dishes delivered fresh to your doorstep
                      </p>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-white text-rose-600 hover:bg-gray-100 border-0"
                        onClick={() => setActiveTab("Menu")}
                      >
                        Browse Full Menu
                      </Button>
                    </motion.section>
                  </>
                )}

                {activeTab === "Menu" && <Menu onAddToCart={handleAddToCart} />}

                {activeTab === "Profile" && (
                  <>
                    {isAuthenticated ? (
                      <Profile
                        user={user}
                        onLogout={handleLogout}
                        onUpdateUser={handleUpdateUser}
                        orderHistory={orderHistory}
                        onReorder={handleReorder}
                      />
                    ) : (
                      <Login onLoginSuccess={handleLoginSuccess} />
                    )}
                  </>
                )}

                {activeTab === "Cart" && (
                  <div className="py-20 text-center text-gray-600 dark:text-gray-400">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Your Cart</h2>
                    <p className="mb-6">Use the cart icon to view your items</p>
                    <Button onClick={() => setIsCartOpen(true)}>
                      Open Cart ({cartCount})
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        <BottomNav
          cartCount={cartCount}
          active={activeTab}
          onNavigate={handleNavigate}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateCart={handleUpdateCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

export default App;