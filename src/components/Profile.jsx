import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Wallet, History, LogOut, Plus, Phone, Mail, Edit2, 
  Save, X, MapPin, Star, Award, TrendingUp, Package, 
  ChevronDown, ChevronUp, ShoppingCart, RefreshCw
} from "lucide-react";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "px-4 py-2.5 rounded-xl font-medium transition-all duration-200";
  const variants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700 active:scale-95",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  );
};

export default function Profile({ user, onLogout, onUpdateUser, orderHistory = [], onReorder }) {
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    optionalAddress: user?.optionalAddress || "",
  });

  const [customerStats, setCustomerStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    rank: "Bronze",
    rankProgress: 0,
  });

  const calculateRank = (totalSpent) => {
    if (totalSpent >= 100000) return { rank: "Diamond", color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-950/30", progress: 100 };
    if (totalSpent >= 50000) return { rank: "Platinum", color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-950/30", progress: (totalSpent / 100000) * 100 };
    if (totalSpent >= 25000) return { rank: "Gold", color: "text-yellow-600", bgColor: "bg-yellow-100 dark:bg-yellow-950/30", progress: (totalSpent / 50000) * 100 };
    if (totalSpent >= 10000) return { rank: "Silver", color: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-700/30", progress: (totalSpent / 25000) * 100 };
    return { rank: "Bronze", color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-950/30", progress: (totalSpent / 10000) * 100 };
  };

  useEffect(() => {
    const savedBalance = localStorage.getItem("exotic_balance");
    const savedStats = localStorage.getItem("exotic_customer_stats");
    
    if (savedBalance) setBalance(parseInt(savedBalance, 10));
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      const rankInfo = calculateRank(stats.totalSpent);
      setCustomerStats({ ...stats, ...rankInfo });
    }
  }, [orderHistory]);

  useEffect(() => {
    localStorage.setItem("exotic_balance", balance);
  }, [balance]);

  const handleAddFunds = () => {
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
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || "",
      optionalAddress: user?.optionalAddress || "",
    });
    setIsEditing(false);
  };

  const handleReorder = (order) => {
    if (onReorder) {
      onReorder(order);
      alert("Items added to cart!");
    } else {
      alert("Re-order functionality not available");
    }
  };

  const rankInfo = calculateRank(customerStats.totalSpent);
  const nextRankThreshold = customerStats.totalSpent < 10000 ? 10000 : 
                           customerStats.totalSpent < 25000 ? 25000 :
                           customerStats.totalSpent < 50000 ? 50000 : 100000;

  const displayedOrders = showAllOrders ? orderHistory : orderHistory.slice(0, 3);

  return (
    <motion.div
      className="pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-5">
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

        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {(isEditing ? editForm.name : user?.name)?.charAt(0) || "?"}
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
                    {user?.name || "Guest"}
                  </h2>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Member since {user?.joined || "January 2025"}
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
                  <p className="text-sm text-gray-900 dark:text-white">{user?.phone || "Not set"}</p>
                )}
              </div>
            </div>

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
                  <p className="text-sm text-gray-900 dark:text-white">{user?.email || "Not set"}</p>
                )}
              </div>
            </div>

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
                    {user?.address || "Not set"}
                  </p>
                )}
              </div>
            </div>

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
                    {user?.optionalAddress || "Not set"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

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
            <div className="space-y-4">
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
                  type="button"
                  disabled={loading}
                  onClick={handleAddFunds}
                >
                  {loading ? "Processing..." : "Add Funds"}
                </Button>
              </div>
            </div>
          )}
        </Card>

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

        <Card className="p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-5 flex items-center gap-3 text-gray-900 dark:text-white">
            <History size={20} className="text-rose-600" />
            Order History
          </h3>

          {!orderHistory || orderHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-600 dark:text-gray-400">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <History size={28} className="text-gray-400" />
              </div>
              <p className="font-medium mb-1">No orders yet</p>
              <p className="text-sm">Start exploring the menu!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <AnimatePresence>
                  {displayedOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Order #{order.id.toString().slice(-6)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                        </div>
                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                          ₦{order.total.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5 mb-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{item.name} × {item.qty}</span>
                            <span>₦{(item.price * item.qty).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleReorder(order)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors font-medium text-sm"
                      >
                        <RefreshCw size={16} />
                        Re-order
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {orderHistory.length > 3 && (
                <button
                  onClick={() => setShowAllOrders(!showAllOrders)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  {showAllOrders ? (
                    <>
                      <ChevronUp size={18} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} />
                      View All Orders ({orderHistory.length})
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </Card>

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