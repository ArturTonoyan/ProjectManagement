import { useEffect, useState } from "react";
import styles from "./Equipments.module.scss";
import { addOfficeData, paramMenu, tableHeader } from "./data";
import HeadBlock from "./HeadBlock/HeadBlock";
import ModalAddOfice from "../../../modules/ModalAddOfice/ModalAddOfice";
import Table from "../../../modules/Table/Table";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  apiCreateEquipment,
  apiDeleteEquipment,
  apiGetEquipments,
  apiGetFloors,
  apiGetOffices,
  apiGetUsers,
  apiUpdateEquipment,
} from "../../../api/apirequests";
import { useNavigate } from "react-router-dom";

function Equipments() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user.data);
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shearchParam, setShearchParam] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalEditData, setModalEditData] = useState({});
  const [createData, setCreateData] = useState({});

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

  const { data: equipments, refetch: refetchEquipments } = useQuery({
    queryKey: ["equipments/all"],
    queryFn: () => apiGetEquipments(),
    staleTime: Infinity, //! не обновлять
  });

  const { data: projects, refetch: refetchprojects } = useQuery({
    queryKey: ["projects/all"],
    queryFn: () => apiGetOffices(),
    staleTime: Infinity, //! не обновлять
  });

  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ["users/all", user?.companyId],
    queryFn: () => apiGetUsers(user?.companyId),
    staleTime: Infinity, //! не обновлять
  });

  useEffect(() => {
    if (equipments?.data) {
      const qdat = equipments?.data.map((item) => ({
        ...item,
        project: item?.project?.name,
        author:
          item?.author?.name +
          " " +
          item?.author?.surname +
          " " +
          item?.author?.patronymic,
      }));
      setTableData(qdat);
      setOriginalData(qdat);
    }
  }, [equipments?.data]);

  //! функция создания
  const funCreate = () => {
    apiCreateEquipment({ ...createData, authorId: user.id }).then((res) => {
      console.log("res", res);
      if (res.status === 201) {
        setModalShow(false);
        setCreateData({});
        refetchEquipments();
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
      funDelete(param.row.id);
    }
    if (param.key === "laborCosts") {
      const filterObj = [{ key: "equipment", value: param.row.name }];
      const filterStr = encodeURIComponent(JSON.stringify(filterObj));
      navigate(`/admin/floors?filter=${filterStr}`);
    }
  };

  //! обновление задачи
  const funUpdate = () => {
    apiUpdateEquipment(modalEditData, modalEditData.id).then((res) => {
      if (res.status === 200) {
        setModalEditShow(false);
        refetchEquipments();
      }
    });
  };

  //! удаление задачи
  const funDelete = (id) => {
    apiDeleteEquipment(id).then((res) => {
      if (res.status === 200) {
        refetchEquipments();
      }
    });
  };

  return (
    <div className={styles.Equipments}>
      <h1>Задачи</h1>
      <ModalAddOfice
        show={modalShow}
        setShow={setModalShow}
        title={"Добавить задачу"}
        inputs={addOfficeData}
        data={createData}
        setData={setCreateData}
        funSave={funCreate}
        lists={{
          projects: {
            data: projects?.data,
            key: "projectId",
            value: ["name"],
          },
        }}
      />
      <ModalAddOfice
        show={modalEditShow}
        setShow={setModalEditShow}
        title={"Редактировать задачу"}
        inputs={addOfficeData}
        data={modalEditData}
        setData={setModalEditData}
        funSave={funUpdate}
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

export default Equipments;
