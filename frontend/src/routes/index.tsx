import { createBrowserRouter } from "react-router-dom";
import LoggedOutLayout from "../layouts/LoggedOutLayout/LoggedOutLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoggedOutLayout />,
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
    ],
  },
]);

export default router;
