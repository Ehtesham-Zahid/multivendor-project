import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { ToastContainer } from "react-toastify";
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
import ProfilePage from "./pages/ProfilePage.jsx";
// import DashboardPage from "./pages/DashboardLayout.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import DashboardOrdersPage from "./pages/DashboardOrdersPage.jsx";
import DashboardProductsPage from "./pages/DashboardProductsPage.jsx";
import DashboardEventsPage from "./pages/DashboardEventsPage.jsx";
import DashboardCouponCodesPage from "./pages/DashboardCouponCodesPage.jsx";
import DashboardRefundsPage from "./pages/DashboardRefundsPage.jsx";
import DashboardSettingsPage from "./pages/DashboardSettingsPage.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App, // This will act as a layout for its children
    children: [
      { index: true, Component: Home },
      { path: "best-selling", Component: BestSellingPage },
      { path: "all-products", Component: AllProductsPage },
      { path: "all-events", Component: AllEventsPage },
      { path: "profile", Component: ProfilePage },
      { path: "category/:cateogry", Component: CategoryPage },
      { path: "product/:productId", Component: SingleProductPage },
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
      { path: "coupon-codes", Component: DashboardCouponCodesPage },
      { path: "refunds", Component: DashboardRefundsPage },
      { path: "withdraw-money", Component: ProfilePage },
      { path: "settings", Component: DashboardSettingsPage },
      { path: "category/:cateogry", Component: CategoryPage },
      { path: "product/:productId", Component: SingleProductPage },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
  // </StrictMode>
);
