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

let router = createBrowserRouter([
  {
    path: "/",
    Component: App, // This will act as a layout for its children
    children: [
      { index: true, Component: Home },
      { path: "best-selling", Component: BestSellingPage },
      { path: "all-products", Component: AllProductsPage },
      { path: "all-events", Component: AllEventsPage },
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
