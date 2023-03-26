import "./Signup.css";
import Title from "antd/es/typography/Title";
import FormSignup from "../../components/FormSignup/FormSignup";
import { notification, Row } from "antd";
import { IUser } from "../../boot/Auth";
import { NotificationPlacement } from "antd/es/notification/interface";
import { api } from "../../boot/axios";
import withAuth from "../../hocs/withAuth";

function Signup() {
  const placement: NotificationPlacement = "topRight";
  const [notify, contextHolder] = notification.useNotification();

  const signupUser = async (user: IUser) => {
    try {
      const response = await api.post("/api/users", user);
      notify.info({
        message: "Account created, check your mails",
        duration: 3,
        placement,
      });
      return response;
    } catch (error) {
      notify.info({
        message: "Account creation error",
        duration: 3,
        placement,
      });
      console.error(error);
    }
  };

  const handleSignup = (user: IUser) => {
    const response = signupUser(user);
    console.log(response);
  };

  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <div className="card">
          <Title>Create an Account</Title>
          <FormSignup signup={handleSignup} />
        </div>
      </Row>
    </>
  );
}

export default withAuth(Signup);
