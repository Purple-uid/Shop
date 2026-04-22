import { Navigate } from "react-router-dom";
import { useAuth } from "../store/cartStore";

interface Props {
  children: JSX.Element;
}

function PrivateRoute({ children }: Props) {
  const auth = useAuth((state) => state.isAuth);

  if (!auth) return <Navigate to="/login" />;

  return children;
}

export default PrivateRoute;
