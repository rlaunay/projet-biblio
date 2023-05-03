import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/queries/auth/user";

export function MainLayout() {
  const { data } = useUser();

  if (!data) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
}
