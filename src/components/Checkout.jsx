// src/components/Checkout.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, User, CreditCard, Package, CheckCircle2, Copy } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function Checkout({
  cartItems,
  total,
  onBack,
  onOrderSuccess,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    street: "",
    area: "",
    landmark: "",
    city: "Lagos",
    deliveryInstructions: "",
    deliveryMethod: "dispatch",
    paymentMethod: "bank_transfer",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Delivery fee based on area
  const getDeliveryFee = (area) => {
    if (!area) return 2000;
    const lower = area.toLowerCase().trim();
    const feeMap = {
      "lekki phase 1": 2500,
      "lekki": 2500,
      "ikoyi": 2200,
      "victoria island": 2200,
      "yaba": 1500,
      "surulere": 1800,
      "ikeja": 1800,
      "festac": 2000,
      "ajah": 3000,
      "badore": 3500,
      "abuja": 4000,
      "port harcourt": 3500,
    };
    return feeMap[lower] || 2000;
  };

  const deliveryFee = formData.deliveryMethod === "pickup" ? 0 : getDeliveryFee(formData.area);
  const grandTotal = total + deliveryFee;

  // Phone formatting (080x xxx xxxx)
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0,4)} ${digits.slice(4)}`;
    return `${digits.slice(0,4)} ${digits.slice(4,7)} ${digits.slice(7)}`;
  };

  const handlePhoneChange = (e, field) => {
    const raw = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [field]: raw }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required";
    }

    if (step === 2) {
      if (!formData.street.trim()) newErrors.street = "Street / House number is required";
      if (!formData.area.trim()) newErrors.area = "Area is required";
      if (!formData.landmark.trim()) newErrors.landmark = "Nearest landmark is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const copyBankDetails = () => {
    const text = `Account Name: Exotic Foods\nAccount Number: 1234567890\nBank: Opay / Moniepoint / GTBank`;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const handlePlaceOrder = () => {
    setTimeout(() => {
      setOrderPlaced(true);
      setTimeout(() => {
        const message = encodeURIComponent(
          `🎉 New Order from Exotic Foods!\n\n` +
          `Customer: ${formData.fullName}\n` +
          `Phone: ${formData.phone}\n` +
          `WhatsApp: ${formData.whatsapp}\n` +
          `Address: ${formData.street}, ${formData.area}, ${formData.landmark}, ${formData.city}\n` +
          `Delivery: ${formData.deliveryMethod === "dispatch" ? "Dispatch Rider" : "Pickup"}\n` +
          `Payment: ${formData.paymentMethod === "bank_transfer" ? "Bank Transfer" : formData.paymentMethod}\n` +
          `Total: ₦${grandTotal.toLocaleString()}\n\n` +
          `Items:\n${cartItems.map(i => `• ${i.name} × ${i.qty}`).join("\n")}`
        );
        window.open(`https://wa.me/234XXXXXXXXXX?text=${message}`, "_blank");
        onOrderSuccess();
      }, 4000);
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center px-6 py-12 max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-lg">
            <CheckCircle2 size={64} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Thank you! Your order has been received.</p>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-10">
            Confirmation and rider updates will be sent via WhatsApp.
          </p>
          <div className="text-sm font-medium text-rose-600 dark:text-rose-400 animate-pulse">
            Redirecting to menu...
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mx-auto max-w-md bg-white dark:bg-gray-900 min-h-screen shadow-sm">
        {/* Header + Stepper */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
          <div className="flex items-center px-5 py-4">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">Checkout</h1>
          </div>

          <div className="px-6 pb-5">
            <div className="flex justify-between relative">
              {["Customer", "Address", "Delivery", "Review"].map((label, idx) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shadow-sm transition-all duration-300 ${
                      step > idx + 1
                        ? "bg-green-500 text-white"
                        : step === idx + 1
                        ? "bg-rose-600 text-white ring-2 ring-rose-300 dark:ring-rose-800/60"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step > idx + 1 ? "✓" : idx + 1}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-rose-600"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="p-5 space-y-6 pb-40">
          {/* Step 1: Customer */}
          {step === 1 && (
            <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <User size={22} className="text-rose-600" /> Customer Information
              </h2>
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.fullName ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formatPhone(formData.phone)}
                    onChange={(e) => handlePhoneChange(e, "phone")}
                    placeholder="0801 234 5678"
                    maxLength={14}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.phone ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formatPhone(formData.whatsapp)}
                    onChange={(e) => handlePhoneChange(e, "whatsapp")}
                    placeholder="0801 234 5678"
                    maxLength={14}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.whatsapp ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Used for order confirmation and rider communication
                  </p>
                  {errors.whatsapp && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.whatsapp}</p>}
                </div>
              </div>

              <div className="mt-10">
                <Button size="lg" className="w-full" onClick={nextStep}>
                  Continue to Delivery
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <MapPin size={22} className="text-rose-600" /> Delivery Location
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Street / House Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.street ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                    placeholder="12 Adeola Odeku"
                  />
                  {errors.street && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.street}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Area / Estate <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.area ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                    placeholder="Lekki Phase 1, Yaba, Surulere..."
                  />
                  {errors.area && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.area}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Nearest Landmark <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all ${
                      errors.landmark ? "border-red-500 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40`}
                    placeholder="Opposite GTBank, near Chicken Republic"
                  />
                  {errors.landmark && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.landmark}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Abeokuta">Abeokuta</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Delivery Instructions (optional)
                  </label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40"
                    placeholder="Gate code, call before arrival, leave at security, etc."
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <Button variant="outline" className="flex-1" onClick={prevStep}>
                  Back
                </Button>
                <Button size="lg" className="flex-1" onClick={nextStep}>
                  Continue to Payment
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Delivery & Payment & Summary */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Delivery Method */}
              <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-3 text-gray-900 dark:text-white">
                  <Package size={22} className="text-rose-600" /> Delivery Option
                </h2>

                <div className="space-y-4">
                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.deliveryMethod === "dispatch"
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="dispatch"
                        checked={formData.deliveryMethod === "dispatch"}
                        onChange={handleChange}
                        className="mr-3 accent-rose-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Dispatch Rider (30–60 mins)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Delivery fee: ₦{deliveryFee.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.deliveryMethod === "pickup"
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === "pickup"}
                        onChange={handleChange}
                        className="mr-3 accent-rose-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Pickup (No delivery fee)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Collect from our location
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-3 text-gray-900 dark:text-white">
                  <CreditCard size={22} className="text-rose-600" /> Payment Method
                </h2>

                <div className="space-y-4">
                  {["bank_transfer", "card", "cod"].map((method) => (
                    <label
                      key={method}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === method
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                          className="mr-3 accent-rose-600"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {method === "bank_transfer" ? "Bank Transfer" :
                             method === "card" ? "Card / USSD (Paystack)" :
                             "Pay on Delivery"}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {method === "bank_transfer" ? "Most popular • Fast confirmation" :
                             method === "card" ? "Pay online now" :
                             "Cash/Card to rider"}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === "bank_transfer" && (
                  <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <p><strong>Bank:</strong> Opay / Moniepoint / GTBank</p>
                      <p><strong>Account Name:</strong> Exotic Foods</p>
                      <p><strong>Account Number:</strong> 123 456 7890</p>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={copyBankDetails}
                      >
                        <Copy size={16} />
                        Copy Details
                      </Button>
                      {copySuccess && (
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-600 dark:text-green-400 font-medium"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>
                  </div>
                )}
              </Card>

              {/* Order Summary */}
              <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-3 text-gray-900 dark:text-white">
                  <Package size={22} className="text-rose-600" /> Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">{item.name} × {item.qty}</span>
                      <span className="text-gray-700 dark:text-gray-300">₦{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm pt-3 border-t dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600 dark:text-green-400" : "text-rose-600"}>
                      {deliveryFee === 0 ? "Free" : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-4 border-t dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total Payable</span>
                    <span className="text-rose-600 dark:text-rose-400">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    Back
                  </Button>
                  <Button size="lg" className="flex-1 shadow-md" onClick={handlePlaceOrder}>
                    {formData.paymentMethod === "bank_transfer" ? "I've Made Payment" : "Confirm Order"}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}