import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Workspace from "../pages/Workspace/Workspace";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: teamLoader,
      },
      {
        path: "login",
        element: <Login />,
        // loader: teamLoader,
      },
      {
        path: "signup",
        element: <Signup />,
        // loader: teamLoader,
      },
      {
        path: "workspace",
        element: <Workspace />,
        // loader: teamLoader,
      },
    ],
  },
]);

export default router;
