import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../providers/userProvider";
const ProtectedRoutes = (children) => {
  const { currentUser } = useUser();
  const { loading, user } = currentUser;
  if (loading) {
    return <div className="p-20">LOADING</div>;
  }
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
