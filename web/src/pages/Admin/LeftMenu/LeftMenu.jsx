import styles from "./LeftMenu.module.scss";
import logoIcon from "@assets/images/logo/logo.svg";
import officeIcon from "@assets/images/leftMenu/office.svg";
import deviceIcon from "@assets/images/leftMenu/device.svg";
import personsIcon from "@assets/images/leftMenu/persons.svg";
import errorsIcon from "@assets/images/leftMenu/errors.svg";
import constructorIcon from "@assets/images/leftMenu/constructor.svg";
import paramIcon from "@assets/images/leftMenu/param.svg";
import userIcon from "@assets/images/leftMenu/user.svg";
import { useNavigate } from "react-router-dom";
function LeftMenu() {
  const navigate = useNavigate();

  const listMenu = [
    {
      icon: officeIcon,
      title: "Проекты",
      navigate: "/",
    },
    {
      icon: deviceIcon,
      title: "Задачи",
      navigate: "/tasks",
    },
    {
      icon: errorsIcon,
      title: "Kanban доска",
      navigate: "/kanban",
    },
    {
      icon: officeIcon,
      title: "Трудозатраты",
      navigate: "/floors",
    },

    {
      icon: personsIcon,
      title: "Сотрудники",
      navigate: "/users",
    },
    {
      icon: paramIcon,
      title: "Аналитика",
      navigate: "/analitics",
    },
  ];

  return (
    <div className={styles.LeftMenu}>
      <div className={styles.logotype}>
        <img src={logoIcon} alt="Логотип" onClick={() => navigate("/")} />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.tables_box}>
            <ul className={styles.list_item}>
              {listMenu.map((item, index) => (
                <li key={index} onClick={() => navigate(item.navigate)}>
                  <img src={item.icon} alt="img" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.container_bottom}>
          <ul className={styles.list_item}>
            <li onClick={() => navigate("/profile")}>
              <img src={userIcon} alt="img" />
              <span>Профиль</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
