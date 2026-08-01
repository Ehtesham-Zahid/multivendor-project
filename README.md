# 🛒 SwiftCart – Multi-Vendor E-Commerce Marketplace

> A scalable, production-grade multi-vendor e-commerce platform built with the MERN stack, featuring real-time buyer-seller messaging, 2-tier split order management, automated commission distribution, flash sales engine, and secure Stripe payment integration.

---

## 📌 Project Banner

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                              🛒 SWIFTCART MARKETPLACE                             |
|          Modern Multi-Vendor E-Commerce Platform for Buyers, Sellers & Admins     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 📖 Overview

**SwiftCart** is a feature-rich, full-stack multi-vendor marketplace designed to bridge the gap between independent sellers, online shoppers, and platform administrators. Built with modern web technologies, SwiftCart solves the core engineering complexities inherent to multi-tenant e-commerce ecosystems: multi-vendor order routing, dynamic price calculations, automated revenue splitting, live vendor-customer support, and scheduled maintenance.

### 🎯 The Problem It Solves
Traditional single-vendor e-commerce engines fail when scaling to multi-seller setups:
- Single carts containing items from multiple vendors require separate order tracking and delivery status management per shop.
- Manual revenue splitting creates overhead and introduces financial tracking errors.
- Buyers lack direct real-time communication channels with vendors for product inquiries and post-sale support.

### 💡 Why It Exists & Who It's Built For
SwiftCart was engineered to provide a seamless marketplace experience:
- **Customers (Buyers)**: Enjoy an intuitive shopping experience with persistent cart/wishlist state, guest or registered checkout, coupon discounts, order tracking, and live chat with vendors.
- **Vendors (Sellers)**: Gain access to a dedicated dashboard to manage digital storefronts, monitor account balances, manage inventory, launch promotional flash sale events, handle refunds, and request earnings withdrawals.
- **Platform Administrators**: Oversee overall marketplace health with catalog moderation, shop status management, coupon creation, payout approvals, and comprehensive revenue analytics (10% platform commission).

### 🏗️ High-Level Architecture
SwiftCart utilizes a decoupled client-server architecture:
- **Frontend**: Single Page Application (SPA) built with React 19, Vite, Redux Toolkit, React Router v7, and Tailwind CSS v4.
- **Backend**: RESTful API and WebSocket server built with Node.js, Express.js, Socket.IO, and Mongoose (MongoDB Atlas).
- **Storage & Media**: Cloudinary integration for multipart image hosting (product galleries, shop avatars, user profiles).

---

## ✨ Features

### 🔒 Authentication & Authorization
- **Role-Based Access Control (RBAC)**: Secure access tailored for `user`, `vendor`, and `admin` roles.
- **JWT Authentication**: Token-based security stored in HTTP-only cookies with Authorization header fallback.
- **Email Verification**: Account activation via Nodemailer email verification tokens.
- **Password Reset Flow**: Secure token-based forgot/reset password workflow.
- **Automated User Maintenance**: Cron job automatically purges unverified accounts older than 1 hour.

### 🛍️ Customer Features
- **Product Catalog & Search**: Browse items by categories, query via live search bar, or view best-selling showcases.
- **Promotional Events (Flash Sales)**: Special time-limited discount events with live product integration.
- **Product Reviews & Ratings**: Submit star ratings (1–5) and text reviews for purchased items.
- **Cart & Wishlist**: Client-side state persistence backed by Redux Toolkit and local storage.
- **Multi-Address Management**: Store and select primary delivery addresses or checkout as guest.
- **Order History & Refunds**: Track split shop order statuses (`pending`, `delivered`, `cancelled`) and request refunds.

### 🏪 Seller (Vendor) Features
- **Storefront Creation & Management**: Configure shop details, address, logo, and contact info.
- **Vendor Dashboard**: Real-time sales metrics, revenue totals, account balance, and total orders.
- **Product CRUD**: Add, edit, and soft-delete products with multi-image Cloudinary uploads, pricing, stock, and categories.
- **Flash Sale Event Manager**: Launch limited-time sales with custom start/end dates and event pricing.
- **Order Fulfillment**: Track vendor-specific order items and update shipping/delivery statuses.
- **Refund Management**: Review customer refund requests and approve or reject with status updates.
- **Earnings & Payouts**: Register bank account details and request withdrawals (min. $100) from accrued sales revenue.
- **Real-Time Customer Messaging**: Direct inbox interface to chat with buyers in real-time.

### 🛡️ Admin Features
- **Platform Analytics**: Comprehensive metrics on total users, total shops, total products, total revenue, and platform commissions.
- **User & Shop Moderation**: View all platform users and toggle vendor shop active/inactive status.
- **Product & Event Supervision**: Oversee all global products and vendor flash sale events.
- **Coupon Code Management**: Create platform-wide promo codes with percentage discounts, minimum cart requirements, usage caps, and expiration dates.
- **Withdrawal Approvals**: Review vendor withdrawal requests, authorize payouts, or reject requests (with automated balance rollback).

### 💬 Real-Time Features
- **Socket.IO Engine**: Instant WebSocket room-based buyer-seller messaging (`join-room`, `send-message`, `receive-message`).
- **Unread Counters**: Dynamic unread message badges tracking conversation state for both users and vendors.

### 💳 Payments & Order Splitting
- **Stripe Checkout**: Integrated credit/debit card processing and Cash on Delivery (COD) options.
- **Parent / Shop Order Split**: Automatically separates multi-vendor cart items into independent `ShopOrder` records grouped under a single `ParentOrder`.
- **Stripe Webhooks**: Signature-verified webhook handler for `checkout.session.completed` and failed payment intents.
- **Automated Revenue Split**: Automatically credits 10% commission to Admin and 90% subtotal to vendor account balance upon successful payment.
- **Abandoned Order Pruning**: Cron task automatically marks pending card orders older than 10 minutes as failed.

---

## 🛠️ Tech Stack

### Frontend
- **Core**: React 19, React DOM 19
- **Build Tool**: Vite 7
- **Routing**: React Router v7 (`react-router`)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Shadcn UI primitives (`@radix-ui`), `tw-animate-css`, `clsx`, `tailwind-merge`
- **UI Components & Utilities**: Lucide React icons, Swiper (carousels), Lottie React (animations), Lenis (smooth scrolling), Date-fns, Country-State-City
- **HTTP Client**: Axios
- **Real-Time Client**: Socket.IO Client (`socket.io-client`)

### Backend
- **Runtime**: Node.js (v24-alpine container compatible)
- **Framework**: Express.js 5 (`express`)
- **Database ORM**: Mongoose 8 (MongoDB)
- **Real-Time Engine**: Socket.IO Server (`socket.io`)
- **Task Scheduling**: Node-Cron (`node-cron`)
- **Authentication & Security**: JSONWebToken (`jsonwebtoken`), Bcrypt (`bcrypt`), Cookie Parser (`cookie-parser`), Cors
- **File Uploads & Media**: Multer (`multer`), Cloudinary SDK (`cloudinary`)
- **Email Service**: Nodemailer (`nodemailer`), Resend (`resend`)
- **Payment Gateway**: Stripe Node SDK (`stripe`)
- **Logging & Utilities**: Morgan (`morgan`), Express Async Handler (`express-async-handler`), Colors (`colors`), Dotenv (`dotenv`)

### Deployment & DevOps
- **Containerization**: Docker (`Dockerfile` Node.js 24 Alpine)
- **Cloud Deployment**: Vercel (`vercel.json` serverless configuration)

---

## 📐 Architecture & Engineering Design

```
                     +----------------------------------+
                     |         React 19 Frontend        |
                     |  (Vite + Redux Toolkit + Tailwind)|
                     +-----------------+----------------+
                                       |
                     +-----------------+----------------+
                     |          REST API / WebSockets   |
                     +--------+----------------+--------+
                              |                |
             +----------------+        +-------+----------------+
             | Express.js 5 Backend    | Socket.IO Chat Server  |
             +--------+----------------+-------+----------------+
                      |                        |
     +----------------+----+          +--------+-------+
     | MongoDB Atlas (Mongoose) |      | Cloudinary SDK |
     +---------------------+----+      +----------------+
                           |
              +------------+------------+
              | Stripe Payment Webhooks |
              +-------------------------+
```

### 1. State Management Pattern
The frontend utilizes a modularized Redux Toolkit store (`store.js`) split into 13 domain-specific slices:
- `auth`, `shop`, `product`, `event`, `wishlist`, `cart`, `address`, `coupon`, `order`, `review`, `chat`, `bankAccount`, `withdrawal`.

### 2. Order Splitting & Dynamic Pricing Precedence Engine
When a customer checks out a cart containing items from multiple vendors:
1. **Pricing Engine**: Evaluates item price according to priority:
   $$\text{Final Price} = \text{Event Price} \succ \text{Discount Price} \succ \text{Original Price}$$
   Coupon discounts are subsequently applied to the determined base price.
2. **Order Splitting**: Cart items are grouped by `shopId`. A single `ParentOrder` is saved, and individual `ShopOrder` documents are generated for each vendor.
3. **Inventory & Balance**: Stock quantities are decremented, and `sold` stats are incremented.

### 3. Financial Flow & Revenue Split
```
                    [ Customer Checkout Payment ]
                                 |
                     (Stripe Webhook Verified)
                                 |
         +-----------------------+-----------------------+
         |                                               |
  (10% Platform Fee)                            (90% Vendor Split)
         |                                               |
  [ Admin Account Balance ]                      [ Shop Account Balance ]
                                                         |
                                             (Vendor Requests Withdrawal)
                                                         |
                                             [ Admin Approves & Pays ]
```

### 4. Real-Time Polymorphic Messaging Architecture
To handle messaging between `User` entities and `Shop` business entities, the database schema uses dynamic Mongoose `refPath` references:
- **ChatConversation**: `participants.participantModel` (`User` | `Shop`)
- **ChatMessage**: `senderModel` (`User` | `Shop`) and `receiverModel` (`User` | `Shop`)

---

## 📂 Project Structure

```
multivendor-project/
├── backend/
│   ├── config/             # DB connection & Cloudinary setup
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/        # Request handlers (User, Shop, Product, Order, Payment, Chat, etc.)
│   │   ├── addressControllers.js
│   │   ├── bankAccountControllers.js
│   │   ├── categoryControllers.js
│   │   ├── conversationControllers.js
│   │   ├── couponControllers.js
│   │   ├── eventControllers.js
│   │   ├── messageControllers.js
│   │   ├── orderControllers.js
│   │   ├── parentOrderControllers.js
│   │   ├── paymentControllers.js
│   │   ├── productControllers.js
│   │   ├── reviewControllers.js
│   │   ├── shopControllers.js
│   │   ├── shopOrderControllers.js
│   │   ├── userControllers.js
│   │   └── withdrawalControllers.js
│   ├── middlewares/        # Authentication, file upload, error handling
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/             # Mongoose schemas (13 entities)
│   │   ├── addressModel.js
│   │   ├── bankAccountModel.js
│   │   ├── chatConversationModel.js
│   │   ├── chatMessageModel.js
│   │   ├── couponModel.js
│   │   ├── eventModel.js
│   │   ├── parentOrderModel.js
│   │   ├── productModel.js
│   │   ├── reviewModel.js
│   │   ├── shopModel.js
│   │   ├── shopOrderModel.js
│   │   ├── userModel.js
│   │   └── withdrawalModel.js
│   ├── public/             # Static public assets
│   ├── routes/             # Express API routes
│   ├── utils/              # Email transporter & Cloudinary helpers
│   ├── server.js           # Server initialization & Node-Cron schedulers
│   └── socket.js           # Socket.IO initialization module
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios instance configuration
│   │   ├── app/            # Redux store definition (`store.js`)
│   │   ├── components/     # UI components & section layouts
│   │   ├── features/       # Redux slices per domain feature
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application views (User, Vendor, Admin, Checkout)
│   │   ├── App.jsx         # Root Layout component
│   │   ├── main.jsx        # Router setup & entry point
│   │   └── socket.js       # Client Socket.IO instance
│   ├── package.json
│   └── vite.config.js
├── Dockerfile              # Containerization script
├── package.json            # Root scripts & dependencies
├── vercel.json             # Vercel deployment spec
└── README.md
```

---

## 🗄️ Database Design

The database contains 13 key Mongoose collections:

| Entity | Primary Attributes | Key Relationships |
| :--- | :--- | :--- |
| **User** | `fullname`, `email`, `password`, `role` (`user`\|`vendor`\|`admin`), `isVerified`, `accountBalance`, `totalRevenue` | References `Shop` (`shopId`) |
| **Shop** | `shopName`, `phoneNumber`, `address`, `zipCode`, `rating`, `accountBalance`, `totalRevenue`, `isActive` | Belongs to `User` (`ownerId`), owns `Product`s, `Event`s, `Review`s |
| **Product** | `name`, `description`, `price`, `discountPrice`, `stock`, `category`, `images`, `sold`, `isActive` | Belongs to `Shop` (`shopId`), optionally linked to `Event` (`eventId`) |
| **ParentOrder** | `totalAmount`, `paymentMethod` (`card`\|`cod`), `paymentStatus`, `deliveryStatus`, `paymentIntentId` | References `User`, `Address`, and array of `ShopOrder`s |
| **ShopOrder** | `subtotal`, `deliveryStatus`, `paymentStatus`, `refundStatus` (`none`\|`requested`\|`refunded`\|`rejected`) | References `User`, `ParentOrder`, `Shop`, and array of `Product` items |
| **Event** | `name`, `originalPrice`, `eventPrice`, `startDate`, `endDate`, `isActive` | References `Product` (`productId`) and `Shop` (`shopId`) |
| **Coupon** | `code`, `discountPercentage`, `minCartAmount`, `usageLimit`, `usedCount`, `startDate`, `endDate`, `isActive` | Standalone platform promotional code |
| **Review** | `rating` (1–5), `comment` | References `User`, `Product`, and `Shop` |
| **Address** | `fullName`, `phoneNumber`, `email`, `addressDetails`, `city`, `state`, `zipCode`, `country`, `isPrimary` | References `User` (or guest flag) |
| **BankAccount**| `accountHolderName`, `bankName`, `accountNumber`, `routingNumber`, `isDefault` | References `User` (`userId`) |
| **Withdrawal** | `amount`, `status` (`pending`\|`approved`\|`rejected`\|`paid`), `adminNote` | References `User`, `Shop`, and `BankAccount` |
| **ChatConversation** | `participants` (Polymorphic), `userUnreadCount`, `shopUnreadCount`, `lastMessageAt` | References `User` or `Shop` participants and `ChatMessage` |
| **ChatMessage** | `message`, `messageType` (`text`\|`image`\|`file`), `isRead`, `attachments` | References `ChatConversation` and dynamic `sender`/`receiver` |

---

## 📡 API Overview

### Authentication & User Routes (`/api/users`)
- `POST /api/users/register` - Register a new user account with image upload
- `POST /api/users/login` - Authenticate user & issue JWT cookie
- `GET /api/users/verify-token/:token` - Verify email token
- `GET /api/users/me` - Get current logged-in user profile
- `PATCH /api/users/update-me` - Update profile info & avatar
- `POST /api/users/forgot-password` - Request password reset link
- `PATCH /api/users/reset-password` - Reset password using token
- `GET /api/users/admin/admin-stats` - Get admin platform statistics *(Admin Only)*
- `GET /api/users/admin/all-users` - Retrieve all registered users *(Admin Only)*

### Shop Routes (`/api/shops`)
- `POST /api/shops/create-shop` - Create vendor shop
- `GET /api/shops/getCurrentUserShop` - Fetch current vendor's shop
- `GET /api/shops/getCurrentUserShopStats` - Fetch vendor analytics stats
- `PATCH /api/shops/updateCurrentUserShop` - Update shop profile & logo
- `GET /api/shops/:shopId` - Get public shop profile
- `GET /api/shops/admin/all-shops` - List all marketplace shops *(Admin Only)*

### Product Routes (`/api/products`)
- `POST /api/products` - Create product with image array *(Vendor Only)*
- `GET /api/products` - Get all active products
- `GET /api/products/:productId` - Get single product details
- `PATCH /api/products/:productId` - Update product details *(Vendor Only)*
- `DELETE /api/products/:productId` - Delete product *(Vendor Only)*
- `GET /api/products/category/:category` - Filter products by category

### Orders & Payments Routes
- `POST /api/parent-orders` - Create parent order and split shop orders
- `GET /api/parent-orders/getOrdersByUser` - Get buyer order history
- `GET /api/shop-orders/current-shop` - Get vendor shop orders *(Vendor Only)*
- `PATCH /api/shop-orders/update-delivery-status/:shopOrderId` - Update shipping state *(Vendor Only)*
- `POST /api/payments/create-checkout-session` - Initialize Stripe checkout session
- `POST /api/payments/webhook` - Stripe webhook listener for raw event validation

### Financial & Withdrawals Routes (`/api/withdrawals`)
- `POST /api/withdrawals` - Submit vendor withdrawal request *(Vendor Only)*
- `GET /api/withdrawals/getMyWithdrawals` - View vendor withdrawal history *(Vendor Only)*
- `GET /api/withdrawals/admin/all-withdrawals` - View all withdrawal requests *(Admin Only)*
- `PATCH /api/withdrawals/admin/update-status/:withdrawalId` - Approve/reject withdrawal *(Admin Only)*

---

## ⚡ Challenges & Engineering Decisions

### 1. Multi-Vendor Cart Checkout & Order Splitting
- **Problem**: When a customer purchases products from multiple shops in a single checkout, storing a single order document obscures vendor responsibility for fulfillment, shipping, and refunds.
- **Why It Matters**: Vendors need independent views of their sales, delivery progress, and customer communication.
- **Solution**: Designed a two-tier order model (`ParentOrder` and `ShopOrder`). The backend groups cart items by `shopId`, calculates vendor sub-totals, creates individual `ShopOrder` records, and links them under a single `ParentOrder`.

### 2. Reliable Financial Commission Distribution
- **Problem**: Ensuring accurate platform fee deduction and vendor revenue credit without race conditions or manual intervention.
- **Why It Matters**: Payment errors lead to lost platform revenue or unpaid vendor balances.
- **Solution**: Implemented an automated Stripe Webhook processor (`/api/payments/webhook`). Upon signature verification of `checkout.session.completed`, the system atomically calculates a 10% platform commission for Admin revenue and credits 90% of sub-totals directly to vendor `Shop` balances.

### 3. Real-Time Messaging Across Dynamic Entities
- **Problem**: Direct messaging requires support for both individual users and vendor shops.
- **Why It Matters**: Standard `User`-to-`User` models break when vendors reply as a shop identity.
- **Solution**: Used Mongoose polymorphic `refPath` schemas for `participants`, `sender`, and `receiver`. Combined with Socket.IO room namespaces (`join-room`), buyers and sellers experience real-time messaging with live unread indicators.

### 4. Background Data Integrity via Scheduled Maintenance
- **Problem**: Stale data (abandoned orders, expired coupons, unverified users, expired flash sales) degrades system health.
- **Why It Matters**: Expired sales could offer unauthorized discounts, unverified users clutter the database, and pending card orders lock inventory.
- **Solution**: Employed `node-cron` scheduled jobs to automatically clean up unverified users after 1 hour, unlink expired events, deactivate expired coupons, and set abandoned pending card orders to `failed` every 10 minutes.

---

## 🔐 Security Implementation

- **JWT Cookie & Header Auth**: Auth tokens are transferred via HTTP-only cookies to mitigate XSS attacks, with Bearer token header fallback for flexible API access.
- **Bcrypt Hashing**: User passwords are salted and hashed using `bcrypt` (10 rounds) before storage.
- **Role-Based Access Control**: Middleware handlers (`protect`, `isVendor`, `isAdmin`) enforce endpoint security based on authenticated user roles.
- **Stripe Webhook Signature Verification**: Webhook payload validation uses `stripe.webhooks.constructEvent` with raw JSON body parsing to prevent spoofed callbacks.
- **Input & Schema Sanitization**: Strong schema-level validation enforces data bounds (e.g., product prices $\ge 0$, ratings $1-5$, discount bounds $0-100\%$).

---

## 🎥 Demo

- **Live Demo**: [https://swiftcart.vercel.app](https://swift-cartt.vercel.app) 
- **Video Walkthrough**: [Watch Project Overview Video](https://youtu.be/aCY-DYvhoXk?si=ooKrbybUROhYGlFu)

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local instance or MongoDB Atlas connection string
- **Cloudinary Account**: For image management
- **Stripe Account**: API test keys for checkout processing

### 1. Clone the Repository
```bash
git clone https://github.com/Ehtesham-Zahid/multivendor-project.git
cd multivendor-project
```

### 2. Install Dependencies
Install dependencies for root, backend, and frontend:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure the environment variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT_SECRET=your_jwt_secret_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password

FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### 4. Run in Development Mode
Run both backend and frontend concurrently using the root npm script:
```bash
npm run dev
```
- **Backend running at**: `http://localhost:5000`
- **Frontend running at**: `http://localhost:5173`

### 5. Docker Deployment
You can also build and run the application using Docker:
```bash
# Build Docker image
docker build -t swiftcart-backend .

# Run Docker container
docker run -p 5000:5000 --env-file .env swiftcart-backend
```

---

## 🔑 Environment Variables Reference

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | Backend | Application execution environment (`development` \| `production`) |
| `PORT` | Backend | Server port (Default: `5000`) |
| `MONGO_URI` | Backend | MongoDB Atlas URI connection string |
| `JWT_SECRET` | Backend | Secret key used for signing JWT authentication tokens |
| `CLOUDINARY_CLOUD_NAME` | Backend | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Backend | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Backend | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Backend | Stripe secret key for server-side payment sessions |
| `STRIPE_WEBHOOK_SECRET` | Backend | Stripe webhook secret key for signature verification |
| `EMAIL_USER` | Backend | Email account address used for Nodemailer SMTP |
| `EMAIL_PASS` | Backend | Email account application password |
| `FRONTEND_URL` | Backend | Client web origin URL for CORS setup |
| `VITE_BACKEND_URL` | Frontend | Base URL of the backend Express server |
| `VITE_STRIPE_PUBLIC_KEY` | Frontend | Stripe publishable key for client-side Stripe checkout |

---

## 🔮 Future Improvements

- **Redis Caching & Adapter**: Integrate Redis for Socket.IO scaling across multi-node clusters and caching frequent database queries (catalog and categories).
- **Stripe Connect Integration**: Transition from manual vendor balance withdrawals to automated Stripe Connect custom account transfers.
- **Elasticsearch Integration**: Add full-text search capabilities for high-performance product catalog filtering and fuzzy search.
- **Web Push Notifications**: Send real-time browser push notifications for order updates, refund status changes, and chat alerts.

---

## 👨‍💻 Author

**Ehtesham Zahid**  
*Full Stack MERN Developer*  
- 🎓 **Education**: University of Lahore  
- 🌐 **Portfolio**: [ehteshamzahid.vercel.app](https://ehteshamzahid.vercel.app/)  
- 🐙 **GitHub**: [@Ehtesham-Zahid](https://github.com/Ehtesham-Zahid)  
- 💼 **Bug Reports & Inquiries**: [GitHub Issues](https://github.com/Ehtesham-Zahid/multivendor-project/issues)
