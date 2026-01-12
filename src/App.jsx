import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
  };

  // Animation variants (simplified & more elegant)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const dishes = [
    {
      name: "Grilled Salmon",
      desc: "Fresh salmon fillet with exotic herbs and citrus glaze",
      price: 7200,
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Spicy Jollof Rice",
      desc: "Classic Nigerian jollof with tender grilled chicken",
      price: 4500,
      img: "https://images.unsplash.com/photo-1625944527473-1c1c3cbb2f55?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Suya Skewers",
      desc: "Spicy grilled beef skewers with yaji spice blend",
      price: 3500,
      img: "https://images.unsplash.com/photo-1598514983730-c6ab06ec6801?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Fixed max-width container + safe area padding */}
      <div className="mx-auto w-full max-w-md min-h-screen bg-white dark:bg-gray-900 shadow-sm relative pb-24 sm:pb-28">
        <Header />

        <motion.main
          className="px-4 sm:px-5 pt-2 pb-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* HERO SECTION */}
          <motion.section variants={itemFadeUp} className="relative mb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
                alt="Exotic cuisine"
                className="w-full h-[260px] sm:h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                  Exotic Flavors
                </h1>
                <p className="text-white/90 mt-2 text-lg font-light">
                  Authentic taste • Fresh ingredients
                </p>

                <div className="mt-6 flex gap-4">
                  <Button size="lg" className="flex-1 shadow-lg">
                    Order Now
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                    View Menu
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FEATURED DISHES */}
          <motion.section variants={itemFadeUp} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 px-1">
              Featured Dishes
            </h2>

            <div className="space-y-4">
              {dishes.map((dish) => (
                <motion.div key={dish.name} variants={itemFadeUp}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center p-4">
                      <img
                        src={dish.img}
                        alt={dish.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 shadow-sm"
                      />

                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                          {dish.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                          {dish.desc}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xl font-bold text-rose-600 dark:text-rose-500">
                            ₦{dish.price.toLocaleString()}
                          </span>

                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(dish)}
                            className="min-w-[90px]"
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

          {/* WHY CHOOSE US */}
          <motion.section
            variants={itemFadeUp}
            className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-6 shadow-inner"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Why Exotic?
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-rose-600 dark:text-rose-400 mr-3 text-xl">✓</span>
                <span>Fresh, premium ingredients sourced daily</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-600 dark:text-rose-400 mr-3 text-xl">✓</span>
                <span>Hygienic preparation & safe packaging</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-600 dark:text-rose-400 mr-3 text-xl">✓</span>
                <span>Fast delivery & excellent customer service</span>
              </li>
            </ul>
          </motion.section>
        </motion.main>

        <BottomNav
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

export default App;