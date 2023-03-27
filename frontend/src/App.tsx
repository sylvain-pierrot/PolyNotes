import "./assets/styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./App.css";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Workspace from "./pages/Workspace/Workspace";
import Page from "./pages/Page/Page";
import NotFound from "./pages/NotFound/NotFound";
import { getFileSystem } from "./boot/FileSystem";
import { updateFileSystem } from "./store/slices/fileSystemSlice";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      loader: () => {
        const user = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user="))
          ?.split("=")[1];
        return { user: user };
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
          path: "workspace",
          element: <Workspace />,
          loader: async () => {
            const tree = await getFileSystem();
            return tree;
          },
        },
        {
          path: "page/:id",
          element: <Page />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#eb2f96",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
