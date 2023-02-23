import "./LoggedOutLayout.css";
import { Col, Row } from "antd";
import { Outlet } from "react-router";
import Logo from "../../assets/images/polynotes-logo.svg";

function LoggedOutLayout() {
  return (
    <>
      <header>
        <Row justify={"center"}>
          <img src={Logo} alt="polynotes-logo" />
        </Row>
      </header>

      <main>
        <Row justify={"center"}>
          <Col>
            <div className="card">
              <Outlet />
            </div>
          </Col>
        </Row>
      </main>

      <footer></footer>
    </>
  );
}

export default LoggedOutLayout;
