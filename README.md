# 🛒 SwiftCart – Multi-Vendor E-Commerce Marketplace

**Year:** 2025  
**Status:** 🟢 Production Ready  

SwiftCart is a **full-stack, multi-vendor e-commerce platform** built for scalability, performance, and an engaging shopping experience.  
It enables **buyers, sellers, and admins** to interact seamlessly with **real-time messaging**, **secure Stripe payments**, and **event-based flash sales** — all within a modern and responsive UI.

---

## 🚀 About the Project

SwiftCart is designed to **empower vendors** and **simplify shopping** for customers.  
Built using the **MERN stack**, it supports:

- Secure **authentication & role-based access**  
- **Socket.io-powered** real-time chat  
- **Stripe-integrated** checkout and revenue handling  
- Advanced **product management**, **order tracking**, and **analytics dashboards**

Both buyers and sellers get optimized experiences — from smooth product browsing to detailed performance tracking.

---

## 🧩 Tech Stack

**Frontend:**
- React  
- Redux Toolkit  
- Tailwind CSS  
- ShadCN/UI  

**Backend:**
- Node.js  
- Express.js  
- MongoDB & Mongoose  

**Integrations & Tools:**
- Socket.io (real-time communication)  
- Stripe (secure payments)  
- Cloudinary (image management)  
- JWT & Bcrypt (authentication & security)  

---

## 🔑 Key Features

### 🔒 Secure Role-Based Access
Separate authentication flows and dashboards for **buyers**, **sellers**, and **admins** using **JWT-based authorization**.

### 🛍️ Seamless Shopping Experience
- Product filtering & pagination  
- Wishlist and cart functionality  
- Smooth checkout flow  
- Responsive and intuitive UI  

### 💬 Real-Time Messaging
Instant **buyer-seller communication** powered by Socket.io for faster query resolution.

### ⏰ Event-Based Flash Sales
Countdown timer system for **time-limited offers**, boosting engagement and conversions.

### 📦 Order & Inventory Management
Sellers can:
- Manage product stock  
- Process orders  
- Track revenue and performance  

### 📊 Analytics Dashboards
Rich, data-driven insights for **sellers** and **admins**, including:
- Revenue growth  
- Engagement metrics  
- Product performance  

---

## ⚙️ Challenges & Solutions

| Challenge | Solution |
|------------|-----------|
| Maintaining real-time interactions without performance loss | Integrated Socket.io with optimized event handling and optional Redis-backed message queue for horizontal scaling |
| Securely handling payments & vendor revenue splits | Implemented **Stripe Checkout** with webhook automation for dynamic vendor payout logic |
| Scaling for large catalogs and multiple vendors | Designed a **modular database schema** with indexing, pagination, and optimized query strategies |

---

## 👥 Roles in the System

| Role | Capabilities |
|------|---------------|
| **Buyer** | Browse, filter, add to cart, checkout, chat with sellers |
| **Seller** | Manage products, handle orders, track performance |
| **Admin** | Moderate vendors, manage catalog, view analytics |

---

## 👨‍💻 Author

**Ehtesham Zahid**  
📍 University of Lahore  
🌐 [Portfolio](https://ehteshamzahid.vercel.app/)  
💼 MERN Stack Developer  
