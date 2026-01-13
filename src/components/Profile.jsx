// src/components/Profile.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Wallet, History, LogOut, Plus, Phone, Mail, Edit2, 
  Save, X, MapPin, Star, Award, TrendingUp, Package 
} from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function Profile({ user, onLogout, onUpdateUser }) {
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
    address: user.address || "",
    optionalAddress: user.optionalAddress || "",
  });

  // Customer stats (can be fetched from API in production)
  const [customerStats, setCustomerStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    rank: "Bronze",
    rankProgress: 0,
  });

  // Calculate customer rank based on total spent
  const calculateRank = (totalSpent) => {
    if (totalSpent >= 100000) return { rank: "Diamond", color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-950/30", progress: 100 };
    if (totalSpent >= 50000) return { rank: "Platinum", color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-950/30", progress: (totalSpent / 100000) * 100 };
    if (totalSpent >= 25000) return { rank: "Gold", color: "text-yellow-600", bgColor: "bg-yellow-100 dark:bg-yellow-950/30", progress: (totalSpent / 50000) * 100 };
    if (totalSpent >= 10000) return { rank: "Silver", color: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-700/30", progress: (totalSpent / 25000) * 100 };
    return { rank: "Bronze", color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-950/30", progress: (totalSpent / 10000) * 100 };
  };

  // Load customer stats from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("exotic_balance");
    const savedStats = localStorage.getItem("exotic_customer_stats");
    
    if (savedBalance) setBalance(parseInt(savedBalance, 10));
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      const rankInfo = calculateRank(stats.totalSpent);
      setCustomerStats({ ...stats, ...rankInfo });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exotic_balance", balance);
  }, [balance]);

  const handleAddFunds = (e) => {
    e.preventDefault();
    const amount = parseInt(addAmount, 10);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setBalance((prev) => prev + amount);
      setAddAmount("");
      setShowAddFunds(false);
      setLoading(false);
      alert(`₦${amount.toLocaleString()} added to your wallet!`);
    }, 1500);
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = () => {
    if (!editForm.name || !editForm.email || !editForm.phone || !editForm.address) {
      alert("Please fill in all required fields (name, email, phone, and address)");
      return;
    }

    const updatedUser = { ...user, ...editForm };
    localStorage.setItem("exotic_user", JSON.stringify(updatedUser));
    onUpdateUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      optionalAddress: user.optionalAddress || "",
    });
    setIsEditing(false);
  };

  const rankInfo = calculateRank(customerStats.totalSpent);
  const nextRankThreshold = customerStats.totalSpent < 10000 ? 10000 : 
                           customerStats.totalSpent < 25000 ? 25000 :
                           customerStats.totalSpent < 50000 ? 50000 : 100000;

  return (
    <motion.div
      className="pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-5">
        {/* Customer Rank Card */}
        <Card className={`p-6 shadow-sm border ${rankInfo.bgColor} border-transparent`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${rankInfo.bgColor} flex items-center justify-center`}>
                <Award size={24} className={rankInfo.color} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${rankInfo.color}`}>
                  {rankInfo.rank} Member
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {customerStats.totalOrders} orders • ₦{customerStats.totalSpent.toLocaleString()} spent
                </p>
              </div>
            </div>
            <Star size={28} className={rankInfo.color} fill="currentColor" />
          </div>

          {/* Progress to next rank */}
          {rankInfo.rank !== "Diamond" && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Progress to {rankInfo.rank === "Bronze" ? "Silver" : 
                              rankInfo.rank === "Silver" ? "Gold" :
                              rankInfo.rank === "Gold" ? "Platinum" : "Diamond"}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₦{(nextRankThreshold - customerStats.totalSpent).toLocaleString()} to go
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rankInfo.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${rankInfo.color.replace('text-', 'bg-')}`}
                />
              </div>
            </div>
          )}
        </Card>

        {/* User Info Card */}
        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {(isEditing ? editForm.name : user.name)?.charAt(0) || "?"}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="text-lg font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Your Name"
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Member since {user.joined || "January 2025"}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Edit Profile"
              >
                <Edit2 size={18} className="text-rose-600 dark:text-rose-400" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="p-2.5 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  title="Save Changes"
                >
                  <Save size={18} className="text-green-600 dark:text-green-400" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  title="Cancel"
                >
                  <X size={18} className="text-red-600 dark:text-red-400" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    className="w-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="0803 123 4567"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white">{user.phone || "Not set"}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="you@example.com"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white">{user.email || "Not set"}</p>
                )}
              </div>
            </div>

            {/* Primary Address */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Primary Address *
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    rows={2}
                    className="w-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                    placeholder="Enter your delivery address"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white">
                    {user.address || "Not set"}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Address */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Secondary Address (Optional)
                </label>
                {isEditing ? (
                  <textarea
                    name="optionalAddress"
                    value={editForm.optionalAddress}
                    onChange={handleEditChange}
                    rows={2}
                    className="w-full text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                    placeholder="Alternative delivery address (optional)"
                  />
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {user.optionalAddress || "Not set"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Wallet Card */}
        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-3 text-gray-900 dark:text-white">
              <Wallet size={20} className="text-rose-600" />
              Wallet Balance
            </h3>
            <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              ₦{balance.toLocaleString()}
            </span>
          </div>

          {!showAddFunds ? (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowAddFunds(true)}
            >
              <Plus size={18} /> Add Funds
            </Button>
          ) : (
            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="1000"
                  min="100"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800/40 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  type="button"
                  onClick={() => setShowAddFunds(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Add Funds"}
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Order Statistics */}
        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <TrendingUp size={20} className="text-rose-600" />
            Your Statistics
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Package size={24} className="mx-auto mb-2 text-rose-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customerStats.totalOrders}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Wallet size={24} className="mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₦{customerStats.totalSpent.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            </div>
          </div>
        </Card>

        {/* Order History */}
        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <History size={20} className="text-rose-600" />
            Order History
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            {customerStats.totalOrders === 0 
              ? "No orders yet. Start ordering delicious meals!" 
              : "Your order history will appear here"}
          </p>
          <Button variant="outline" className="w-full mt-4">
            View All Orders
          </Button>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={onLogout}
        >
          <LogOut size={18} /> Log Out
        </Button>
      </div>
    </motion.div>
  );
}