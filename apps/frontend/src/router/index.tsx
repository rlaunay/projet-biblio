import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { AuthLayout } from "@/layout/auth";
import { MainLayout } from "@/layout/main";
import { Root } from "../layout/Root";
import { ResetPassword } from "@/pages/auth/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [{ index: true, element: "oui" }],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset/password/:encryptEmail", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);
