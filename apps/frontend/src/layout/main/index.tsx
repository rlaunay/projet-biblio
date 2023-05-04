import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/queries/auth/user";
import http from "@/services/http";
import { useQueryClient } from "@tanstack/react-query";

export function MainLayout() {
  const { data } = useUser();
  const queryClient = useQueryClient();

  if (!data) {
    return <Navigate to="/auth/login" />;
  }

  function logout() {
    http.delete("/auth/logout").finally(() => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["user"], () => null);
    });
  }

  return (
    <main>
      <button onClick={logout}>Logout</button>
      <Outlet />
    </main>
  );
}
