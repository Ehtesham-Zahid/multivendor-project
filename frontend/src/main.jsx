import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App, // This will act as a layout for its children
    children: [{ index: true, Component: Home }],
  },
  {
    path: "auth",
    Component: Auth, // This will act as a layout for its children
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
