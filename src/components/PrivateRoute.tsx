import { Navigate } from "react-router-dom";
import { useAuth } from "../store/cartStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const auth = useAuth((state) => state.isAuth);

  if (!auth) return <Navigate to="/login" />;

  return children;
}
