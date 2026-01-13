// src/components/Checkout.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, User, CreditCard, Package } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function Checkout({
  cartItems,
  total,
  onBack,
  onCancel,
  onOrderSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    payment: "cash", // default
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Fake order placement
      setTimeout(() => {
        onOrderSuccess();
      }, 800);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto w-full max-w-md bg-white dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 z-10">
          <div className="flex items-center p-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold ml-3">Checkout</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {/* Customer Info */}
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              Customer Info
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                  placeholder="08012345678"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </Card>

          {/* Delivery */}
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Delivery Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                  placeholder="123 Lekki Phase 1, Lagos"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Delivery Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="e.g., Gate code, floor, landmark..."
                />
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center p-3 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === "cash"}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="flex-1">Cash on Delivery</span>
                <Package size={20} className="text-gray-500" />
              </label>

              <label className="flex items-center p-3 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 opacity-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.payment === "card"}
                  onChange={handleChange}
                  className="mr-3"
                  disabled
                />
                <span className="flex-1">Card / Bank Transfer (Coming Soon)</span>
              </label>
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package size={20} />
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₦{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t dark:border-gray-700 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-rose-600">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
            >
              Place Order
            </Button>
          </Card>
        </form>
      </div>
    </motion.div>
  );
}