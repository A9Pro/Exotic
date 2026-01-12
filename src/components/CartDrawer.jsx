import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

export default function CartDrawer({ isOpen, onClose, cartItems }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-5 max-w-md mx-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={onClose}
                className="text-gray-500 text-sm"
              >
                Close
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty 🛒
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          ₦{item.price.toLocaleString()} × {item.qty}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ₦{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-exotic-red">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <Button className="w-full">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
