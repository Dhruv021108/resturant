export const restaurant = {
  name: "Amazing Chinese Restaurant",
  hindiName: "अमेजिंग चाइनीस रेस्टोरेंट",
  category: "Chinese Restaurant",
  rating: "4.2 ⭐",
  reviewsCount: 40,
  priceRange: "Rs.1-200",
  phone: "077180 69555",
  address: "Ayregaon Selfie Point, Dombivli / Kopar East, Maharashtra 421201",
  mapCode: "635J+WF Dombivli, Kalyan, Maharashtra",
  status: "Open now",
  hours: "11:30 AM - 11:30 PM"
};

export const categories = [
  "Starters",
  "Noodles",
  "Fried Rice",
  "Manchurian",
  "Soups",
  "Momos",
  "Combos",
  "Drinks",
  "Desserts"
];

export const defaultMenuItems = [
  {
    id: "dish-1",
    name: "Dragon Veg Spring Rolls",
    description: "Crisp rolls packed with vegetables and smoky chilli garlic dip.",
    price: 129,
    type: "Veg",
    category: "Starters",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-2",
    name: "Chicken Lollipop",
    description: "Juicy spicy lollipops glazed with house schezwan sauce.",
    price: 189,
    type: "Non-Veg",
    category: "Starters",
    bestseller: true,
    recommended: false,
    available: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-3",
    name: "Hakka Noodles",
    description: "Classic wok-tossed noodles with crunchy vegetables and soy.",
    price: 149,
    type: "Veg",
    category: "Noodles",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-4",
    name: "Schezwan Chicken Noodles",
    description: "Fiery noodles with tender chicken and signature schezwan spice.",
    price: 189,
    type: "Non-Veg",
    category: "Noodles",
    bestseller: false,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-5",
    name: "Paneer Fried Rice",
    description: "Fragrant fried rice tossed with paneer cubes and spring onion.",
    price: 169,
    type: "Veg",
    category: "Fried Rice",
    bestseller: false,
    recommended: false,
    available: true,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-6",
    name: "Chicken Triple Rice",
    description: "Loaded rice, noodles, gravy, and chicken for a full meal.",
    price: 199,
    type: "Non-Veg",
    category: "Fried Rice",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-7",
    name: "Veg Manchurian",
    description: "Soft vegetable dumplings in a glossy ginger garlic gravy.",
    price: 159,
    type: "Veg",
    category: "Manchurian",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-8",
    name: "Hot and Sour Soup",
    description: "Peppery, tangy soup finished with herbs and wok aroma.",
    price: 99,
    type: "Veg",
    category: "Soups",
    bestseller: false,
    recommended: false,
    available: true,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-9",
    name: "Steamed Momos",
    description: "Soft dumplings with savory filling and spicy red chutney.",
    price: 119,
    type: "Veg",
    category: "Momos",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-10",
    name: "Family Feast Combo",
    description: "Starter, noodles, fried rice, manchurian, and drinks for four.",
    price: 499,
    type: "Non-Veg",
    category: "Combos",
    bestseller: true,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-11",
    name: "Lemon Ice Tea",
    description: "Refreshing house-made lemon tea served chilled.",
    price: 59,
    type: "Veg",
    category: "Drinks",
    bestseller: false,
    recommended: false,
    available: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dish-12",
    name: "Date Pancake Dessert",
    description: "Golden pancake with caramelized date filling and sesame crunch.",
    price: 109,
    type: "Veg",
    category: "Desserts",
    bestseller: false,
    recommended: true,
    available: true,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80"
  }
];

export const featuredDishes = defaultMenuItems.slice(0, 4);

export const testimonials = [
  { id: "rev-1", name: "Priya", rating: 5, comment: "Great noodles, fast delivery, and very good packaging." },
  { id: "rev-2", name: "Rahul", rating: 4, comment: "Loved the manchurian and family combo. Good value for money." },
  { id: "rev-3", name: "Neha", rating: 4, comment: "Booking was easy and the atmosphere felt family friendly." }
];

export const defaultOrders = [
  {
    id: "ORD-1001",
    customerName: "Aman Shah",
    customerId: "USR-customer",
    items: [defaultMenuItems[2], defaultMenuItems[6]],
    subtotal: 308,
    discount: 30,
    total: 278,
    status: "Preparing",
    paymentMethod: "UPI",
    address: "Kopar East, Dombivli",
    createdAt: "Today, 7:30 PM",
    couponCode: "WOK10",
    pointsEarned: 27
  }
];

export const initialBookings = [
  {
    id: "BK-1001",
    date: "2026-04-23",
    time: "20:00",
    guests: 4,
    name: "Ritika",
    phone: "9876543210",
    request: "Birthday setup",
    status: "Confirmed"
  }
];

export const initialAccounts = [
  {
    id: "USR-owner",
    name: "Restaurant Owner",
    phone: "07718069555",
    email: "owner@amazingchinese.in",
    password: "owner123",
    role: "owner",
    loyaltyPoints: 0
  },
  {
    id: "USR-manager",
    name: "Shift Manager",
    phone: "07718069556",
    email: "manager@amazingchinese.in",
    password: "manager123",
    role: "manager",
    loyaltyPoints: 0
  },
  {
    id: "USR-customer",
    name: "Regular Customer",
    phone: "07718069557",
    email: "customer@amazingchinese.in",
    password: "customer123",
    role: "customer",
    loyaltyPoints: 120
  }
];

export const defaultCoupons = [
  { id: "CP-1", code: "WOK10", discountPercent: 10, active: true },
  { id: "CP-2", code: "FAMILY20", discountPercent: 20, active: true }
];

export const initialNotifications = [
  { id: "N-1", message: "Weekend combo sale is live now.", time: "2 hours ago" },
  { id: "N-2", message: "Your loyalty points balance has been updated.", time: "Yesterday" }
];

export const loyaltyRules = {
  pointsPerRupee: 10
};

export const instagramShots = [
  {
    id: "ig-1",
    caption: "Signature wok toss",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "ig-2",
    caption: "Family dining moments",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "ig-3",
    caption: "Momos and dipping sauces",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=900&q=80"
  }
];

export const translations = {
  en: {
    tagline: "Best Chinese Food Near You",
    orderNow: "Order Now",
    bookTable: "Book Table",
    viewMenu: "View Menu"
  },
  hi: {
    tagline: "आपके पास सबसे अच्छा चाइनीज खाना",
    orderNow: "अभी ऑर्डर करें",
    bookTable: "टेबल बुक करें",
    viewMenu: "मेनू देखें"
  },
  mr: {
    tagline: "तुमच्या जवळचे सर्वोत्तम चायनीज फूड",
    orderNow: "ऑर्डर करा",
    bookTable: "टेबल बुक करा",
    viewMenu: "मेनू पाहा"
  }
};
