import React from "react";
import { Header } from "antd/es/layout/layout";
import { Input, Avatar, Popover, Button } from "antd";
import Logo from "../../assets/images/PolyBunny.png";
// import Logo2 from "../../assets/images/polynotes-logo.svg";
import "./LayoutHeader.css";
import { useNavigate } from "react-router";

interface IPropsLayoutHeader {
  user: any;
  logoutUser: () => void;
}

const LayoutHeader: React.FC<IPropsLayoutHeader> = ({ user, logoutUser }) => {
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const content = (
    <div>
      <p style={{ marginTop: 0 }}>{user.username}</p>
      <Button type={"default"} onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );

  return (
    <Header className="flex-between border-bottom">
      <img
        src={Logo}
        alt="PolyBunny"
        className="logo"
        onClick={() => navigate("/workspace")}
      />

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
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      </Popover>
    </Header>
  );
};

export default LayoutHeader;
