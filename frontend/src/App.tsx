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
import UnloggedLayout from "./layouts/UnloggedLayout/UnloggedLayout";
import LoggedLayout from "./layouts/LoggedLayout/LoggedLayout";
import { autoLoginUser } from "./boot/Auth";
import MailSend from "./pages/MailSend/MailSend";

const App: React.FC = () => {
  // Store
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UnloggedLayout />,
      loader: async () => {
        const autoLogin = await autoLoginUser();
        return { user: autoLogin.error === undefined ? autoLogin.user : null };
      },
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
      ],
    },
    {
      path: "/",
      element: <LoggedLayout />,
      loader: async () => {
        const autoLogin = await autoLoginUser();
        return { user: autoLogin.error === undefined ? autoLogin.user : null };
      },
      children: [
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
