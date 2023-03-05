import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../providers/userProvider";

const AuthRoutes = ({ children }) => {
  const { loading, user } = useUser();
  if (loading) {
    return <div className="p-20">LOADING</div>;
  }
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoutes;
