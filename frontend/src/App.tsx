import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import router from "./routes/index";

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#eb2f96",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};

export default App;
