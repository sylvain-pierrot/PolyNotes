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
import { getFileSystem } from "./boot/FileSystem";
import UnloggedLayout from "./layouts/UnloggedLayout/UnloggedLayout";
import LoggedLayout from "./layouts/LoggedLayout/LoggedLayout";
import { useDispatch } from "react-redux";
import { updateFileSystem } from "./store/slices/fileSystemSlice";
import { getPageById } from "./boot/Pages";
import { updatePage } from "./store/slices/pageSlice";

const App: React.FC = () => {
  // Store
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UnloggedLayout />,
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
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <LoggedLayout />,
      loader: () => {
        const user = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user="))
          ?.split("=")[1];
        return { user: user };
      },
      children: [
        {
          path: "workspace",
          element: <Workspace />,
          loader: async () => {
            const tree = await getFileSystem();
            dispatch(updateFileSystem({ tree }));
            return null;
          },
        },
        {
          path: "page/:id",
          loader: async ({ params }) => {
            const pageBrut = await getPageById(params.id!);
            const currentPage = {
              title: pageBrut.title,
              blocks: pageBrut.blocks,
              author: pageBrut.author,
            };

            dispatch(updatePage({ page: currentPage }));
            return null;
          },
          element: <Page />,
        },
      ],
    },
  ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#eb2f96",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
export default App;
