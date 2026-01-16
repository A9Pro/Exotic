// src/services/notificationService.js

/**
 * Centralized notification service
 * Use this to trigger notifications from anywhere in your app
 */

export const NotificationTypes = {
  ORDER: 'order',
  PROMO: 'promo',
  ANNOUNCEMENT: 'announcement',
  NEWS: 'news',
  SYSTEM: 'system',
};

/**
 * Order Status Notifications
 */
export const orderNotifications = {
  orderPlaced: (orderNumber) => ({
    type: NotificationTypes.ORDER,
    title: `Order #${orderNumber} Confirmed`,
    message: 'Your order has been confirmed and is being prepared',
    showToast: true,
    actionable: true,
    actionText: 'Track Order',
    actionData: { orderNumber },
  }),

  orderPreparing: (orderNumber) => ({
    type: NotificationTypes.ORDER,
    title: `Order #${orderNumber} is Being Prepared`,
    message: 'Our chefs are preparing your delicious meal',
    showToast: true,
  }),

  orderOutForDelivery: (orderNumber, eta) => ({
    type: NotificationTypes.ORDER,
    title: `Order #${orderNumber} is On the Way`,
    message: `Your order will arrive in ${eta} minutes`,
    showToast: true,
    actionable: true,
    actionText: 'Track Delivery',
    actionData: { orderNumber },
  }),

  orderDelivered: (orderNumber) => ({
    type: NotificationTypes.ORDER,
    title: `Order #${orderNumber} Delivered`,
    message: 'Enjoy your meal! 🎉',
    showToast: true,
    actionable: true,
    actionText: 'Rate Order',
    actionData: { orderNumber },
  }),

  orderCancelled: (orderNumber) => ({
    type: NotificationTypes.SYSTEM,
    title: `Order #${orderNumber} Cancelled`,
    message: 'Your order has been cancelled. Refund will be processed within 24 hours',
    showToast: true,
  }),
};

/**
 * Promotional Notifications
 */
export const promoNotifications = {
  flashSale: (discount, items) => ({
    type: NotificationTypes.PROMO,
    title: `Flash Sale! ${discount}% Off`,
    message: `Get ${discount}% off on ${items}. Limited time only!`,
    showToast: false, // Don't show toast for promos
    actionable: true,
    actionText: 'Shop Now',
    actionData: { promo: true },
  }),

  loyaltyReward: (points) => ({
    type: NotificationTypes.PROMO,
    title: 'Loyalty Rewards Earned!',
    message: `You've earned ${points} points! Redeem them on your next order`,
    showToast: true,
  }),

  firstOrderDiscount: () => ({
    type: NotificationTypes.PROMO,
    title: 'Welcome! 20% Off Your First Order',
    message: 'Use code FIRST20 at checkout',
    showToast: true,
    actionable: true,
    actionText: 'Order Now',
  }),

  freeDelivery: () => ({
    type: NotificationTypes.PROMO,
    title: 'Free Delivery Today!',
    message: 'No minimum order required. Valid for 24 hours',
    showToast: false,
  }),
};

/**
 * System Announcements
 */
export const systemNotifications = {
  newMenu: (items) => ({
    type: NotificationTypes.ANNOUNCEMENT,
    title: 'New Menu Items Available',
    message: `Check out our new ${items} on the menu`,
    showToast: false,
    actionable: true,
    actionText: 'View Menu',
  }),

  maintenanceMode: (startTime, duration) => ({
    type: NotificationTypes.SYSTEM,
    title: 'Scheduled Maintenance',
    message: `We'll be down for ${duration} starting ${startTime}. Sorry for any inconvenience!`,
    showToast: true,
  }),

  holidayHours: (date, hours) => ({
    type: NotificationTypes.ANNOUNCEMENT,
    title: `Special Hours on ${date}`,
    message: `We'll be open ${hours} on ${date}`,
    showToast: false,
  }),

  accountVerified: () => ({
    type: NotificationTypes.SYSTEM,
    title: 'Account Verified',
    message: 'Your account has been successfully verified',
    showToast: true,
  }),
};

/**
 * News & Updates
 */
export const newsNotifications = {
  socialMedia: (platform) => ({
    type: NotificationTypes.NEWS,
    title: `We're Now on ${platform}!`,
    message: `Follow us @exoticflavors for exclusive deals and updates`,
    showToast: false,
    actionable: true,
    actionText: 'Follow Us',
  }),

  blog: (title) => ({
    type: NotificationTypes.NEWS,
    title: 'New Blog Post',
    message: title,
    showToast: false,
    actionable: true,
    actionText: 'Read More',
  }),
};

/**
 * Simulated real-time events
 * In production, these would come from your backend via WebSocket/SSE/Polling
 */
export const simulateRealTimeEvents = (addNotification) => {
  // Simulate order updates
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  
  // Order placed (immediate)
  addNotification(orderNotifications.orderPlaced(orderNumber));

  // Order preparing (after 2 minutes)
  setTimeout(() => {
    addNotification(orderNotifications.orderPreparing(orderNumber));
  }, 2 * 60 * 1000);

  // Out for delivery (after 15 minutes)
  setTimeout(() => {
    addNotification(orderNotifications.orderOutForDelivery(orderNumber, 25));
  }, 15 * 60 * 1000);

  // Delivered (after 40 minutes)
  setTimeout(() => {
    addNotification(orderNotifications.orderDelivered(orderNumber));
  }, 40 * 60 * 1000);
};

/**
 * Demo function to test notifications
 */
export const sendTestNotifications = (addNotification) => {
  const notifications = [
    orderNotifications.orderPlaced(1234),
    promoNotifications.flashSale(50, 'Jollof Rice'),
    systemNotifications.newMenu('Seafood Selection'),
    newsNotifications.socialMedia('Instagram'),
  ];

  notifications.forEach((notif, index) => {
    setTimeout(() => {
      addNotification(notif);
    }, index * 500);
  });
};