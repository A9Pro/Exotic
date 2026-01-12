// src/components/Menu.jsx
import { motion } from "framer-motion";
import Card from "./ui/Card";
import Button from "./ui/Button";

const menuCategories = [
  {
    title: "Rice Dishes",
    items: [
      {
        name: "Spicy Jollof Rice",
        desc: "Authentic Nigerian jollof with grilled chicken & plantain",
        price: 4500,
        img: "https://images.unsplash.com/photo-1625944527473-1c1c3cbb2f55?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Coconut Fried Rice",
        desc: "Aromatic coconut rice with mixed vegetables & shrimp",
        price: 5200,
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Soups & Swallows",
    items: [
      {
        name: "Egusi Soup + Pounded Yam",
        desc: "Rich melon seed soup with assorted meats & soft pounded yam",
        price: 6800,
        img: "https://images.unsplash.com/photo-1627308594171-19a11611f31c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Okra Soup + Eba",
        desc: "Fresh okra stew with goat meat & garri eba",
        price: 5500,
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Efo Riro (Vegetable Soup) + Amala",
        desc: "Yoruba-style spinach stew with beef & yam flour swallow",
        price: 6000,
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Grills & Street Favorites",
    items: [
      {
        name: "Suya Skewers (Beef)",
        desc: "Spicy peanut-crusted grilled beef with onions & tomatoes",
        price: 3500,
        img: "https://images.unsplash.com/photo-1598514983730-c6ab06ec6801?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Grilled Salmon (Exotic Fusion)",
        desc: "Fresh salmon with African herbs, spices & lemon glaze",
        price: 7200,
        img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Asun (Peppered Goat Meat)",
        desc: "Smoky spicy goat meat stir-fry – very hot!",
        price: 4800,
        img: "https://images.unsplash.com/photo-1544025162-d766942659cb?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Sides & Extras",
    items: [
      {
        name: "Fried Plantain (Dodo)",
        desc: "Sweet ripe plantains fried to golden perfection",
        price: 1500,
        img: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Moi Moi",
        desc: "Steamed bean pudding with egg & fish",
        price: 1800,
        img: "https://images.unsplash.com/photo-1626645738538-2f4e38d6d9f5?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

// Animation variants (unchanged)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const categoryVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Menu({ onAddToCart }) {
  return (
    <motion.div
      className="min-h-screen pb-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10"
          variants={categoryVariant}
        >
          Our Menu
        </motion.h1>

        {menuCategories.map((category) => (
          <motion.section
            key={category.title}
            variants={categoryVariant}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-400 mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
              {category.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {category.items.map((dish) => (
                <motion.div key={dish.name} variants={itemVariant}>
                  <Card
                    className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden">
                        <img
                          src={dish.img}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {dish.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
                          {dish.desc}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xl font-bold text-rose-600 dark:text-rose-500">
                            ₦{dish.price.toLocaleString()}
                          </span>

                          <Button
                            size="sm"
                            onClick={() => onAddToCart(dish)}
                            className="min-w-[100px]"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </motion.div>
  );
}