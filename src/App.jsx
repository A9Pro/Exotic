import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import CartDrawer from "./components/CartDrawer";

function App() {
  // EXISTING STATE (kept)
  const [cartCount, setCartCount] = useState(0);

  // NEW STATE (kept)
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // UPDATED HANDLER (kept logic)
  const handleAddToCart = (dish) => {
    setCartCount((prev) => prev + 1);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === dish.name);

      if (existing) {
        return prev.map((item) =>
          item.name === dish.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...dish, qty: 1 }];
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const sectionItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const bounceButton = {
    whileHover: { scale: 1.05},
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 300, damping: 15 },
  };

  const dishes = [
    {
      name: "Grilled Salmon",
      desc: "Fresh salmon with exotic herbs and spices",
      price: 7200,
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Spicy Jollof Rice",
      desc: "Authentic Nigerian jollof with chicken",
      price: 4500,
      img: "https://images.unsplash.com/photo-1625944527473-1c1c3cbb2f55?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Suya Skewers",
      desc: "Tender beef suya with traditional spices",
      price: 3500,
      img: "https://images.unsplash.com/photo-1598514983730-c6ab06ec6801?auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-exotic-white relative pb-32">
      <Header />

      <motion.main
        className="p-4 space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* HERO */}
<motion.section className="relative" variants={sectionItem}>
  <img
    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
    alt="Exotic Food Hero"
    className="w-full h-56 rounded-2xl object-cover shadow-soft"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 rounded-2xl bg-black/40" />

  {/* CENTERED CONTENT */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 text-center">
    <h1 className="text-2xl font-bold text-white drop-shadow-lg">
      Experience Exotic Flavors
    </h1>

    <div className="mt-4 flex justify-center gap-4">
  <Button className="px-6">
    Order Now
  </Button>

  <Button variant="secondary" className="px-6">
    View Menu
  </Button>
  </div>
</div>
</motion.section>


        {/* FEATURED DISHES */}
        <motion.section variants={sectionItem}>
          <h2 className="text-lg font-semibold text-exotic-charcoal mb-4">
            Featured Dishes
          </h2>

          <motion.div
            className="space-y-4"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {dishes.map((dish, index) => (
              <motion.div key={index} variants={cardItem}>
                <Card>
                  <div className="flex items-center space-x-4">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-exotic-charcoal text-base">
                          {dish.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {dish.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <p className="text-exotic-red font-semibold text-sm">
                          ₦{dish.price.toLocaleString()}
                        </p>

                        <motion.div {...bounceButton}>
                          <Button
                            variant="primary"
                            className="w-24 h-9 text-sm font-semibold shadow-soft"
                            onClick={() => handleAddToCart(dish)}
                          >
                            + Add
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* WHY EXOTIC */}
        <motion.section variants={sectionItem}>
          <h2 className="text-lg font-semibold text-exotic-charcoal mb-2">
            Why Exotic?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Fresh, premium ingredients</li>
            <li>Hygienic and safe</li>
            <li>Fast and frictionless service</li>
          </ul>
        </motion.section>
      </motion.main>

      {/* BOTTOM NAV */}
      <BottomNav
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </div>
  );
}

export default App;
