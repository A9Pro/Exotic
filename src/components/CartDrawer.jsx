// src/components/CartDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import Button from "./ui/Button";
import { toast } from "./ToastContainer";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateCart,
  onCheckout,
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleQuantityChange = (itemName, delta) => {
    onUpdateCart((prevItems) =>
      prevItems
        .map((item) =>
          item.name === itemName
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );

    if (delta > 0) {
      toast.info("Quantity updated");
    }
  };

  const handleRemoveItem = (itemName) => {
    onUpdateCart((prevItems) => prevItems.filter((item) => item.name !== itemName));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      onUpdateCart(() => []);
      toast.info("Cart cleared");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Cart ({cartItems.length})
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-5 bg-gray-50 dark:bg-gray-950">
                {cartItems.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ShoppingCart size={64} className="mb-4 opacity-40" />
                    <p className="text-lg font-medium mb-2">Your cart is empty</p>
                    <p className="text-sm mb-6">Add some delicious items to get started</p>
                    <Button variant="outline" onClick={onClose}>
                      Browse Menu
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                  >
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl transition-all duration-200 hover:shadow-md border border-gray-100 dark:border-gray-700"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ₦{item.price.toLocaleString()}
                          </p>

                          <div className="flex items-center gap-3 mt-2">
                            <motion.button
                              onClick={() => handleQuantityChange(item.name, -1)}
                              className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus size={16} />
                            </motion.button>

                            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                              {item.qty}
                            </span>

                            <motion.button
                              onClick={() => handleQuantityChange(item.name, 1)}
                              className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="font-bold text-rose-600 dark:text-rose-400">
                            ₦{(item.price * item.qty).toLocaleString()}
                          </p>
                          <motion.button
                            onClick={() => handleRemoveItem(item.name)}
                            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm flex items-center gap-1 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 size={14} /> Remove
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer / Summary */}
              {cartItems.length > 0 && (
                <motion.div
                  className="border-t border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Price Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Delivery</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-rose-600 dark:text-rose-400">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full shadow-lg"
                      onClick={onCheckout}
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}