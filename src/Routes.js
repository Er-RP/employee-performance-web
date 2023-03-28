import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import AuthRoutes from "./components/private_routes/AuthRoutes";
import ProtectedRoutes from "./components/private_routes/ProtectedRoutes";
import { get } from "./network/api";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";

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
            loader: async (props) => {
              return get("/project")
                .then((res) => res)
                .catch((err) => err);
            }
          
          },
          {
            path: "projects/:id",
            element: <ProjectDetailsPage/>,
          
          },
          {
            path: "tasks",
            element: <TasksPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
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
