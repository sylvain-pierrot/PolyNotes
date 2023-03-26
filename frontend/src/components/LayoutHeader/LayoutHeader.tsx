import React from "react";
import { Header } from "antd/es/layout/layout";
import { Input, Avatar, Popover, Button } from "antd";
import Logo from "../../assets/images/PolyBunny.png";
import Logo2 from "../../assets/images/polynotes-logo.svg";
import "./LayoutHeader.css";
import { api } from "../../boot/axios";
import { useNavigate } from "react-router";

interface IPropsLayoutHeader {
  isAuthenticated: boolean;
  user: any;
}

const LayoutHeader: React.FC<IPropsLayoutHeader> = ({
  isAuthenticated,
  user,
}) => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      navigate("/");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const content = (
    <div>
      <Button type={"default"} onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );

  return (
    <Header
      className={isAuthenticated ? "flex-between border-bottom" : "flex-center"}
    >
      {isAuthenticated ? (
        <>
          <img src={Logo} alt="PolyBunny" className="logo" />

          <Search placeholder="Search" onSearch={onSearch} className="search" />

          <Popover content={content} trigger="click">
            <Avatar
              style={{
                backgroundColor: "#eb2f96",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size={"large"}
              alt={"User"}
            >
              {user}
            </Avatar>
          </Popover>
        </>
      ) : (
        <img
          src={Logo2}
          alt="polynotes-logo"
          style={{ width: "55%", maxWidth: "300px", margin: "2em 0" }}
        />
      )}
    </Header>
  );
};

export default LayoutHeader;
