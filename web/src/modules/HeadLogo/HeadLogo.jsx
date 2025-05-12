import { useNavigate } from "react-router-dom";
import styles from "./HeadLogo.module.scss";
import logo from "@assets/images/logo/logo.svg";

function HeadLogo() {
  const navigate = useNavigate();
  return (
    <div className={styles.HeadLogo} onClick={() => navigate("/")}>
      <img src={logo} alt="logo" />
    </div>
  );
}

export default HeadLogo;
