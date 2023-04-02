import { Button } from "antd";
import { useNavigate, useParams } from "react-router";
import MailSendImg from "../../assets/images/Mailbox-bro.svg";

const MailSend = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        width={500}
        src={MailSendImg}
        alt="broken-robot-cuate"
        style={{
          maxWidth: "80%",
        }}
      />
      <h1
        style={{
          fontSize: "2em",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Félicitations pour la création de votre compte !
      </h1>
      <p
        style={{
          fontSize: "1.2em",
          fontWeight: "500",
          textAlign: "center",
          maxWidth: "70%",
          margin: 0,
        }}
      >
        Nous avons envoyé un e-mail à l'adresse <strong>{params.email}</strong>.
        Veuillez vérifier votre boîte de réception et suivre les instructions
        pour activer votre compte.
      </p>
      <Button
        type={"primary"}
        style={{ marginTop: "3em" }}
        onClick={() => navigate("/login")}
      >
        Login here
      </Button>
    </div>
  );
};
export default MailSend;
