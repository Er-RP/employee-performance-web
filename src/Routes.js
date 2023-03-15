import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import AuthRoutes from "./components/private_routes/AuthRoutes";
import ProtectedRoutes from "./components/private_routes/ProtectedRoutes";
import ProjectsPage from "./pages/ProjectsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "",
            index: true,
            element: <div>hiii</div>,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoutes />,
    children: [
      {
        path: "",
        index: true,
        element: <SignIn />,
      },
      {
        path: "forgot_password",
        element: <ForgetPassword />,
      },
    ],
  },
]);

export default router;