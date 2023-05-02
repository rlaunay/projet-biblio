import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ResetPassword } from "../pages/ResetPassword";
import { AuthLayout } from "../layout/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Outlet />,
        children: [{ index: true, element: "oui" }],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);
