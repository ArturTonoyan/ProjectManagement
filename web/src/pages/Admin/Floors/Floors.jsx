import { useEffect, useState } from "react";
import styles from "./Floors.module.scss";
import { addFloorData, paramMenu, tableHeader } from "./data";
import HeadBlock from "./HeadBlock/HeadBlock";
import ModalAddOfice from "../../../modules/ModalAddOfice/ModalAddOfice";
import Table from "../../../modules/Table/Table";
import {
  apiCreateFloor,
  apiDeleteFloor,
  apiGetFloors,
  apiGetOffices,
  apiGetTasks,
  apiUpdateFloor,
} from "../../../api/apirequests";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

function Floors() {
  const user = useSelector((state) => state.user.user.data);
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shearchParam, setShearchParam] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalEditData, setModalEditData] = useState({});
  const [createFloorData, setCreateFloorData] = useState({});

  const {
    status,
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiGetTasks(),
    staleTime: Infinity, //! не обновлять
  });

  const { data: laborcosts, refetch: refetchFloors } = useQuery({
    queryKey: ["laborcosts"],
    queryFn: () => apiGetFloors(),
    staleTime: Infinity, //! не обновлять
  });

  const { data: projects, refetch: refetchprojects } = useQuery({
    queryKey: ["projects/all"],
    queryFn: () => apiGetOffices(),
    staleTime: Infinity, //! не обновлять
  });

  useEffect(() => {
    if (laborcosts?.data) {
      const qdat = laborcosts?.data.map((item) => ({
        ...item,
        tasks: tasks?.data?.find((el) => el.id === item.officeId)?.name,
        user:
          item.user?.name +
          " " +
          item.user?.surname +
          " " +
          item.user?.patronymic,
        date: item?.createdAt.split("T")[0],
        task: item?.task?.name,
        project: projects?.data?.find((el) => el.id === item?.task?.projectId)
          ?.name,
      }));
      setTableData(qdat);
      setOriginalData(qdat);
    }
  }, [laborcosts?.data]);

  //! поиск по всем полям
  useEffect(() => {
    if (shearchParam.trim() !== "") {
      const filteredData = originalData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(shearchParam.toLowerCase())
        )
      );
      setTableData(filteredData);
    } else {
      setTableData([...originalData]); // Сбрасываем фильтр
    }
  }, [shearchParam, originalData]);

  //! функция создания трутозатраты
  const funCreateFloor = () => {
    const data = {
      ...createFloorData,
      userId: user.id,
    };
    apiCreateFloor(data).then((res) => {
      console.log("res", res);
      if (res.status === 201) {
        setModalShow(false);
        setCreateFloorData({});
        refetchFloors();
      }
    });
  };

  //! при клике в контекстном меню
  const funParamClick = (param) => {
    console.log("param", param);
    if (param.key === "edit") {
      setModalEditShow(true);
      setModalEditData(param.row);
    }
    if (param.key === "delete") {
      funDeleteFloor(param.row.id);
    }
  };

  //! обновление этажа
  const funUpdateFloor = () => {
    apiUpdateFloor(modalEditData, modalEditData.id).then((res) => {
      if (res.status === 200) {
        setModalEditShow(false);
        refetchFloors();
      }
    });
  };

  //! удаление этажа
  const funDeleteFloor = (id) => {
    apiDeleteFloor(id).then((res) => {
      if (res.status === 200) {
        refetchFloors();
      }
    });
  };

  return (
    <div className={styles.Floors}>
      <h1>Трудозатраты</h1>
      <ModalAddOfice
        show={modalShow}
        setShow={setModalShow}
        title={"Добавить трудозатраты"}
        inputs={addFloorData}
        lists={{
          task: {
            data: tasks?.data,
            key: "taskId",
            value: ["name", "address"],
          },
        }}
        data={createFloorData}
        setData={setCreateFloorData}
        funSave={funCreateFloor}
      />
      <ModalAddOfice
        show={modalEditShow}
        setShow={setModalEditShow}
        title={"Редактировать данные трудозатраты"}
        inputs={addFloorData}
        lists={{
          task: {
            data: tasks?.data,
            key: "taskId",
            value: ["name", "address"],
          },
        }}
        data={modalEditData}
        setData={setModalEditData}
        funSave={funUpdateFloor}
      />
      <HeadBlock
        setModalShow={setModalShow}
        shearchParam={shearchParam}
        setShearchParam={setShearchParam}
      />
      <div className={styles.content}>
        <Table
          prewData={[]}
          tableData={tableData}
          setTableData={setTableData}
          direction={[]}
          setModalShow={setModalShow}
          paramMenu={paramMenu}
          tableHeader={tableHeader}
          funClick={funParamClick}
        />
      </div>
    </div>
  );
}

export default Floors;
