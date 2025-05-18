import styles from "./LeftMenu.module.scss";
import { useNavigate } from "react-router-dom";

import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoDevIcon from "@assets/images/logo/logo.svg"; // Временная иконка вместо логотипа

function LeftMenu() {
  const navigate = useNavigate();

  const listMenu = [
    {
      icon: <BusinessIcon sx={{ color: "#08a748" }} />,
      title: "Проекты",
      navigate: "/",
    },
    {
      icon: <AssignmentIcon sx={{ color: "#08a748" }} />,
      title: "Задачи",
      navigate: "/tasks",
    },
    {
      icon: <DashboardIcon sx={{ color: "#08a748" }} />,
      title: "Kanban доска",
      navigate: "/kanban",
    },
    {
      icon: <AccessTimeIcon sx={{ color: "#08a748" }} />,
      title: "Трудозатраты",
      navigate: "/floors",
    },
    {
      icon: <GroupIcon sx={{ color: "#08a748" }} />,
      title: "Сотрудники",
      navigate: "/users",
    },
    {
      icon: <BarChartIcon sx={{ color: "#08a748" }} />,
      title: "Аналитика",
      navigate: "/analitics",
    },
  ];

  return (
    <div className={styles.LeftMenu}>
      <div className={styles.logotype} onClick={() => navigate("/")}>
        <img src={LogoDevIcon} alt="logo" />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.tables_box}>
            <ul className={styles.list_item}>
              {listMenu.map((item, index) => (
                <li key={index} onClick={() => navigate(item.navigate)}>
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              ))}
              <li onClick={() => navigate("/profile")}>
                <AccountCircleIcon sx={{ color: "#08a748" }} />
                <span>Профиль</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.container_bottom}>
          <ul className={styles.list_item}></ul>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
