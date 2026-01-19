import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

const menuCategories = [
  {
    title: "Signature Rice Dishes",
    items: [
      {
        name: "Exotic Jollof Rice",
        desc: "Premium Nigerian jollof with grilled chicken, fried plantain & coleslaw",
        price: 5500,
        img: "https://images.unsplash.com/photo-1625944527473-1c1c3cbb2f55?w=800&h=600&fit=crop",
        popular: true,
      },
      {
        name: "Seafood Fried Rice",
        desc: "Aromatic coconut-infused fried rice with prawns, calamari & mixed vegetables",
        price: 6800,
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop",
      },
      {
        name: "Native Ofada Rice",
        desc: "Traditional unpolished rice with spicy ayamase sauce & assorted meats",
        price: 6200,
        img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=600&fit=crop",
        spicy: true,
      },
      {
        name: "Chinese Fried Rice Special",
        desc: "Wok-tossed jasmine rice with chicken, prawns, vegetables & soy glaze",
        price: 5800,
        img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    title: "Soups & Swallows",
    items: [
      {
        name: "Egusi Soup + Pounded Yam",
        desc: "Rich melon seed soup with assorted meats, stockfish & smooth pounded yam",
        price: 7500,
        img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop",
        popular: true,
      },
      {
        name: "Oha Soup + Semovita",
        desc: "Traditional bitter leaf soup with goat meat, dry fish & premium semolina",
        price: 7200,
        img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop",
      },
      {
        name: "Banga Soup + Starch",
        desc: "Delta-style palm nut soup with catfish & white starch swallow",
        price: 8000,
        img: "https://images.unsplash.com/photo-1585937421612-70a008356072?w=800&h=600&fit=crop",
      },
      {
        name: "Efo Riro + Amala",
        desc: "Yoruba vegetable soup with assorted meats & yam flour swallow",
        price: 6800,
        img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop",
      },
      {
        name: "Okra Soup + Eba",
        desc: "Fresh okra stew with goat meat, periwinkles & garri swallow",
        price: 6500,
        img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    title: "Premium Grills & Proteins",
    items: [
      {
        name: "Grilled Atlantic Salmon",
        desc: "Fresh salmon fillet with exotic herbs, garlic butter & citrus glaze",
        price: 12500,
        img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop",
        premium: true,
      },
      {
        name: "Suya Platter (Beef)",
        desc: "Premium beef skewers with yaji spice, onions, tomatoes & pepper sauce",
        price: 4500,
        img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop",
        popular: true,
        spicy: true,
      },
      {
        name: "Asun (Peppered Goat)",
        desc: "Smoky spicy goat meat stir-fry with bell peppers – extra hot!",
        price: 5800,
        img: "https://images.unsplash.com/photo-1544025162-d766942659cb?w=800&h=600&fit=crop",
        spicy: true,
      },
      {
        name: "Grilled Chicken (Full)",
        desc: "Whole grilled chicken marinated in African spices & herbs",
        price: 8500,
        img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop",
      },
      {
        name: "Peppered Turkey",
        desc: "Succulent turkey pieces in rich pepper sauce with vegetables",
        price: 6500,
        img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop",
      },
      {
        name: "Grilled Catfish",
        desc: "Fresh whole catfish grilled with spicy pepper marinade",
        price: 7200,
        img: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    title: "Pasta & Continental",
    items: [
      {
        name: "Chicken Alfredo Pasta",
        desc: "Creamy fettuccine with grilled chicken breast & parmesan",
        price: 5500,
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop",
      },
      {
        name: "Seafood Spaghetti",
        desc: "Spaghetti with prawns, calamari, mussels in tomato-herb sauce",
        price: 6800,
        img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&h=600&fit=crop",
      },
      {
        name: "Beef Steak & Chips",
        desc: "Tender ribeye steak with crispy fries, vegetables & pepper sauce",
        price: 9500,
        img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
        premium: true,
      },
    ],
  },
  {
    title: "Sides & Appetizers",
    items: [
      {
        name: "Fried Plantain (Dodo)",
        desc: "Sweet ripe plantains fried to golden perfection",
        price: 1500,
        img: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=800&h=600&fit=crop",
        popular: true,
      },
      {
        name: "Moi Moi",
        desc: "Steamed bean pudding with egg, fish & peppers",
        price: 2000,
        img: "https://images.unsplash.com/photo-1626645738538-2f4e38d6d9f5?w=800&h=600&fit=crop",
      },
      {
        name: "Chicken Wings (6pcs)",
        desc: "Crispy buffalo wings with honey mustard or BBQ sauce",
        price: 3500,
        img: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&h=600&fit=crop",
      },
      {
        name: "Spring Rolls (4pcs)",
        desc: "Crispy vegetable spring rolls with sweet chili dip",
        price: 2500,
        img: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&h=600&fit=crop",
      },
      {
        name: "Garden Salad",
        desc: "Fresh mixed greens, tomatoes, cucumber with vinaigrette",
        price: 2800,
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      },
      {
        name: "Chips/Fries",
        desc: "Crispy golden french fries with ketchup",
        price: 1800,
        img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    title: "Beverages",
    items: [
      {
        name: "Fresh Orange Juice",
        desc: "Freshly squeezed orange juice – no sugar added",
        price: 1500,
        img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop",
      },
      {
        name: "Chapman",
        desc: "Classic Nigerian cocktail with grenadine, bitters & citrus",
        price: 2000,
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop",
        popular: true,
      },
      {
        name: "Zobo Drink",
        desc: "Chilled hibiscus drink with ginger & pineapple",
        price: 1200,
        img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop",
      },
      {
        name: "Smoothie (Mixed Berry)",
        desc: "Blended strawberries, blueberries & banana with yogurt",
        price: 2500,
        img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&h=600&fit=crop",
      },
      {
        name: "Soft Drinks (Coke, Sprite, Fanta)",
        desc: "Chilled bottled soft drinks",
        price: 800,
        img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800&h=600&fit=crop",
      },
      {
        name: "Bottled Water",
        desc: "Premium bottled water 75cl",
        price: 500,
        img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Puff Puff (6pcs)",
        desc: "Traditional Nigerian doughnuts dusted with sugar",
        price: 1500,
        img: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?w=800&h=600&fit=crop",
        popular: true,
      },
      {
        name: "Chin Chin",
        desc: "Crunchy fried pastry bites – sweet & addictive",
        price: 1800,
        img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&h=600&fit=crop",
      },
      {
        name: "Chocolate Cake Slice",
        desc: "Rich chocolate layer cake with ganache frosting",
        price: 2500,
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
      },
      {
        name: "Ice Cream (3 Scoops)",
        desc: "Choice of vanilla, chocolate, or strawberry",
        price: 2000,
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
      },
    ],
  },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...menuCategories.map((cat) => cat.title)];

  const filteredCategories = menuCategories
    .filter((category) => {
      if (selectedCategory !== "All" && category.title !== selectedCategory) {
        return false;
      }

      if (searchQuery) {
        return category.items.some(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return true;
    })
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          !searchQuery ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));

  return (
    <motion.div
      className="pb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={categoryVariant} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Our Menu
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Authentic Nigerian cuisine crafted with premium ingredients
        </p>
      </motion.div>

      <motion.div variants={categoryVariant} className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for Jollof Rice, Suya, Chapman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </motion.button>
          )}
        </div>
      </motion.div>

      <motion.div variants={categoryVariant} className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-rose-600 text-white shadow-md scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-10">
        {filteredCategories.map((category) => (
          <motion.section key={category.title} variants={categoryVariant}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.title}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {category.items.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {category.items.map((dish) => (
                <motion.div key={dish.name} variants={itemVariant}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
                    <div className="flex flex-col h-full">
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-gray-800">
                        <img
                          src={dish.img}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop";
                          }}
                        />
                        
                        <div className="absolute top-2 left-2 flex gap-2">
                          {dish.popular && (
                            <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                          {dish.spicy && (
                            <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              🌶️ Spicy
                            </span>
                          )}
                          {dish.premium && (
                            <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              ⭐ Premium
                            </span>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                          {dish.name}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow mb-4">
                          {dish.desc}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                            ₦{dish.price.toLocaleString()}
                          </span>

                          <Button
                            size="sm"
                            onClick={() => onAddToCart(dish)}
                            className="min-w-[100px] shadow-sm hover:shadow-md"
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
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <motion.div variants={categoryVariant} className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search size={40} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No dishes found matching "{searchQuery}"
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Try searching for something else
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}