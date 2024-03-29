import React from "react";
import { Header } from "antd/es/layout/layout";
import { Input, Avatar, Popover, Button } from "antd";
import Logo from "../../assets/images/PolyBunny.png";
import { useNavigate } from "react-router";
import "./LayoutHeader.css";

interface IPropsLayoutHeader {
  logoutUser: () => void;
}

const LayoutHeader: React.FC<IPropsLayoutHeader> = ({ logoutUser }) => {
  // Importing the Search component from the antd library and the useNavigate hook from react-router-dom
  const { Search } = Input;
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  // This function logs the search value to the console, but can be replaced with an actual search function
  const onSearch = (value: string) => console.log(value);

  // This is the content that displays when the user clicks on the user avatar, containing the user's name and a logout button
  const userMenuContent = (
    <div>
      <p style={{ marginTop: 0 }}>{username}</p>
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

      <Popover content={userMenuContent} trigger="click">
        <Avatar
          style={{
            backgroundColor: "#eb2f96",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
          size="large"
          alt="User"
        >
          {username![0].toUpperCase()}
        </Avatar>
      </Popover>
    </Header>
  );
};

export default LayoutHeader;
