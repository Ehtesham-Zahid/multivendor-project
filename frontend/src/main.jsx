// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import Auth from "./pages/Auth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import CreateShop from "./pages/CreateShop.jsx";
import BestSellingPage from "./pages/BestSellingPage.jsx";
import AllProductsPage from "./pages/AllProductsPage.jsx";
import AllEventsPage from "./pages/AllEventsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import DashboardOrdersPage from "./pages/DashboardOrdersPage.jsx";
import DashboardProductsPage from "./pages/DashboardProductsPage.jsx";
import DashboardEventsPage from "./pages/DashboardEventsPage.jsx";
import DashboardRefundsPage from "./pages/DashboardRefundsPage.jsx";
import DashboardSettingsPage from "./pages/DashboardSettingsPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import SingleOrderPage from "./pages/SingleOrderPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ProfileLayout from "./pages/ProfileLayout.jsx";
import UserProfileSection from "./components/sections/UserProfileSection.jsx";
import UserOrdersSection from "./components/sections/UserOrdersSection.jsx";
import UserRefundsSection from "./components/sections/UserRefundsSection.jsx";
import UserChangePasswordSection from "./components/sections/UserChangePasswordSection.jsx";
import UserAddressesSection from "./components/sections/UserAddressesSection.jsx";
import CheckoutLayout from "./pages/CheckoutLayout.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";
import AdminProductsPage from "./pages/AdminProductsPage.jsx";
import AdminEventsPage from "./pages/AdminEventsPage.jsx";
import AdminCouponCodesPage from "./pages/AdminCouponCodesPage.jsx";
import AdminRefundsPage from "./pages/AdminRefundsPage.jsx";
import AdminShopsPage from "./pages/AdminShopsPage.jsx";
import FaqsPage from "./pages/FaqsPage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import SingleInboxPage from "./pages/SingleInboxPage.jsx";
import { UserConversationsSection } from "./components";
import DashboardConversationsPage from "./pages/DashboardConversationsPage.jsx";
import DashboardWithdrawalPage from "./pages/DashboardWithdrawalPage.jsx";
import AdminWithdrawalPage from "./pages/AdminWithdrawalPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: App, // This will act as a layout for its children
        children: [
          { index: true, Component: HomePage },
          { path: "best-selling", Component: BestSellingPage },
          { path: "all-products", Component: AllProductsPage },
          { path: "all-events", Component: AllEventsPage },
          { path: "faqs", Component: FaqsPage },
          { path: "search/:search", Component: SearchPage },
          { path: "category/:category", Component: CategoryPage },
          { path: "product/:productId", Component: SingleProductPage },
          { path: "shop/:shopId", Component: ShopPage },
          {
            path: "profile",
            Component: ProfileLayout,
            children: [
              { index: true, Component: UserProfileSection },
              { path: "orders", Component: UserOrdersSection },
              { path: "refunds", Component: UserRefundsSection },
              { path: "inbox", Component: UserConversationsSection },
              { path: "inbox/:conversationId", Component: SingleInboxPage },
              { path: "change-password", Component: UserChangePasswordSection },
              { path: "addresses", Component: UserAddressesSection },
              { path: "order/:orderId", Component: SingleOrderPage },
            ],
          },
        ],
      },
      {
        path: "auth",
        Component: Auth, // This will act as a layout for its children
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
          { path: "verify-email/:token", Component: VerifyEmail },
        ],
      },
      { path: "create-shop", Component: CreateShop },
      {
        path: "dashboard",
        Component: DashboardLayout, // This will act as a layout for its children
        children: [
          { index: true, Component: DashboardPage },
          { path: "orders", Component: DashboardOrdersPage },
          { path: "products", Component: DashboardProductsPage },
          { path: "events", Component: DashboardEventsPage },
          { path: "refunds", Component: DashboardRefundsPage },
          { path: "settings", Component: DashboardSettingsPage },
          { path: "inbox", Component: DashboardConversationsPage },
          { path: "inbox/:conversationId", Component: SingleInboxPage },
          { path: "order/:orderId", Component: SingleOrderPage },
          { path: "withdrawal", Component: DashboardWithdrawalPage },
        ],
      },
      {
        path: "checkout",
        Component: CheckoutLayout,
        children: [
          { index: true, Component: CheckoutPage },
          { path: "success", Component: SuccessPage },
          { path: "cancel", Component: CancelPage },
        ],
      },
      {
        path: "dashboard/shop/:shopId",
        Component: ShopPage,
      },
      {
        path: "admin",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboardPage },
          { path: "orders", Component: AdminOrdersPage },
          { path: "products", Component: AdminProductsPage },
          { path: "events", Component: AdminEventsPage },
          { path: "coupon-codes", Component: AdminCouponCodesPage },
          { path: "refunds", Component: AdminRefundsPage },
          { path: "shops", Component: AdminShopsPage },
          { path: "withdrawals", Component: AdminWithdrawalPage },
          { path: "users", Component: AdminUsersPage },
          { path: "order/:orderId", Component: SingleOrderPage },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <AppLayout />
    </RouterProvider>
  </Provider>
  // </StrictMode>
);
