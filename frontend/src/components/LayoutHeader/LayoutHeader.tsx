import React from "react";
import { Header } from "antd/es/layout/layout";
import { Input, Avatar } from "antd";
import Logo from "../../assets/images/PolyBunny.png";
import Logo2 from "../../assets/images/polynotes-logo.svg";
import "./LayoutHeader.css";

const LayoutHeader: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);

  return (
    <Header
      className={isAuthenticated ? "flex-between border-bottom" : "flex-center"}
    >
      {isAuthenticated ? (
        <>
          <img src={Logo} alt="PolyBunny" className="logo" />

          <Search placeholder="Search" onSearch={onSearch} className="search" />

          <Avatar
            style={{ backgroundColor: "#eb2f96", verticalAlign: "middle" }}
            size="large"
            alt={"User"}
          >
            AC
          </Avatar>
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
