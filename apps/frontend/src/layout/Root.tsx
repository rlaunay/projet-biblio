import { Outlet } from "react-router-dom";
import { useUser } from "@/queries/auth/user";

export function Root() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <Outlet />;
}
