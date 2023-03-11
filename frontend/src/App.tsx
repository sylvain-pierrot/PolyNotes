import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import router from "./routes/index";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index";

const App: React.FC = () => {
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
