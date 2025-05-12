import { useSelector } from "react-redux";
import styles from "./HeadBlock.module.scss";
import lupa from "@assets/images/icons/lupa.svg";

function HeadBlock({ shearchParam, setShearchParam, setModalShow }) {
  const user = useSelector((state) => state.user.user.data);

  return (
    <div className={styles.HeadBlock}>
      <div className={styles.left_block}>
        <img src={lupa} alt="🔍" />
        <input
          value={shearchParam}
          onChange={(e) => setShearchParam(e.target.value)}
          type="text"
          placeholder="Поиск"
        />
      </div>
      {user?.roles?.[0]?.value === "ADMIN" && (
        <div className={styles.right_block}>
          <button className={styles.save} onClick={() => setModalShow(true)}>
            + Добавить сотрудника
          </button>
        </div>
      )}
    </div>
  );
}

export default HeadBlock;
