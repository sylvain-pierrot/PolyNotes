import "./assets/styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Workspace from "./pages/Workspace/Workspace";
import Page from "./pages/Page/Page";
import NotFound from "./pages/NotFound/NotFound";
import MailSend from "./pages/MailSend/MailSend";
import MainLayout from "./layouts/MainLayout/MainLayout";

const App: React.FC = () => {
  // Store
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "verifyEmail/:email",
          element: <MailSend />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "workspace",
          element: <Workspace />,
        },
        {
          path: "page/:id",
          element: <Page />,
        },
      ],
    },
  ]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#eb2f96" } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
export default App;
