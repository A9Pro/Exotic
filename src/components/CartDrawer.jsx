// src/components/CartDrawer.jsx
import { motion } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Button from "./ui/Button";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateCart }) {
  if (!isOpen) return null;

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
  };

  const handleRemoveItem = (itemName) => {
    onUpdateCart((prevItems) => prevItems.filter((item) => item.name !== itemName));
  };

  const handleClearCart = () => {
    onUpdateCart([]);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <ShoppingCart size={64} className="mb-4 opacity-40" />
                <p className="text-lg">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={onClose}
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ₦{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.name, -1)}
                        className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-8 text-center font-medium">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item.name, 1)}
                        className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-rose-600 dark:text-rose-500">
                      ₦{(item.price * item.qty).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.name)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="border-t dark:border-gray-700 p-5">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => alert("Proceeding to checkout... (to be implemented)")}
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
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}