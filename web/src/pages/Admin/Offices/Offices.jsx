import { useEffect, useState } from "react";
import styles from "./Offices.module.scss";
import { addOfficeData, paramMenu, tableHeader, typeOwnerships } from "./data";
import HeadBlock from "./HeadBlock/HeadBlock";
import ModalAddOfice from "../../../modules/ModalAddOfice/ModalAddOfice";
import Table from "../../../modules/Table/Table";
import {
  apiCreateOffice,
  apiDeleteOffice,
  apiGetOffices,
  apiGetUsers,
  apiUpdateOffice,
} from "../../../api/apirequests";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Offices() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user.data);
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [shearchParam, setShearchParam] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalEditData, setModalEditData] = useState({});
  const [modalEditInputData, setModalEditInputData] = useState({});
  const [createOfficeData, setCreateOfficeData] = useState({});

  const {
    status,
    data: query,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects/all"],
    queryFn: () => apiGetOffices(),
    staleTime: Infinity, //! не обновлять
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiGetUsers(),
    staleTime: Infinity, //! не обновлять
  });

  const funGetUserFio = (user) => {
    let fio = `${user?.surname || ""} ${user?.name || ""} ${
      user?.patronymic || ""
    }`;
    if (fio.trim() === "") {
      fio = "";
    }
    return fio;
  };

  useEffect(() => {
    if (query?.data) {
      let tabDat = query?.data.map((el) => ({
        ...el,
        directorId: funGetUserFio(
          el?.users?.find((u) => u.id === el.directorId)
        ),
        renter: funGetUserFio(el?.users?.find((u) => u.id === el.renterId)),
        usersCount: el?.users?.length,
        floorsCount: el?.floors?.length,
        devices: el?.eqipments?.length,
      }));
      tabDat.map((el) => {
        Object.keys(el).forEach((key) => {
          if (
            el[key] === null ||
            el[key] === undefined ||
            !el[key] ||
            el[key] === "undefined" ||
            el[key] === "null" ||
            el[key] === ""
          ) {
            el[key] = "";
          }
        });
      });

      console.log("tabDat", tabDat);
      setTableData(tabDat);
      setOriginalData(tabDat);
    }
  }, [query?.data]);

  //! функция создания проекта
  const funCreateOffice = () => {
    const formData = new FormData();
    const fields = {
      ...createOfficeData,
      cost: Number(createOfficeData.cost || 0),
      area: Number(createOfficeData.area || 0),
    };
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    apiCreateOffice(formData).then((res) => {
      console.log("res", res);
      if (res.status === 201) {
        setModalShow(false);
        setCreateOfficeData({});
        refetch();
      }
    });
  };

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

  //! при клике в контекстном меню
  const funParamClick = (param) => {
    console.log("param", param);
    if (param.key === "edit") {
      setModalEditShow(true);
      setModalEditData(param.row);
    }
    if (param.key === "delete") {
      funDeleteOffice(param.row.id);
    }
    if (param.key === "tasks") {
      const filterObj = [{ key: "office", value: param.row.name }];
      const filterStr = encodeURIComponent(JSON.stringify(filterObj));
      navigate(`/admin/equipments?filter=${filterStr}`);
    }
  };

  //! обновление проекта
  const funUpdateOffice = () => {
    console.log("modalEditInputData", modalEditInputData);
    apiUpdateOffice(modalEditInputData, modalEditData.id).then((res) => {
      if (res.status === 200) {
        setModalEditShow(false);
        refetch();
      }
    });
  };

  //! удаление проекта
  const funDeleteOffice = (id) => {
    apiDeleteOffice(id).then((res) => {
      if (res.status === 200) {
        refetch();
      }
    });
  };

  return (
    <div className={styles.Offices}>
      <h1>Проекты</h1>
      <ModalAddOfice
        show={modalShow}
        setShow={setModalShow}
        title={"Добавить проект"}
        inputs={addOfficeData}
        data={createOfficeData}
        setData={setCreateOfficeData}
        funSave={funCreateOffice}
        lists={{
          director: {
            data: users?.data,
            key: "directorId",
            value: ["surname", "name", "patronymic", "email"],
          },
          renter: {
            data: users?.data,
            key: "renterId",
            value: ["surname", "name", "patronymic", "email"],
          },
          typeOwnership: {
            data: typeOwnerships,
            key: "typeOwnership",
            value: ["name"],
          },
        }}
      />
      <ModalAddOfice
        edit={modalEditInputData}
        setEdit={setModalEditInputData}
        show={modalEditShow}
        setShow={setModalEditShow}
        title={"Редактировать данные проекта"}
        inputs={addOfficeData}
        data={modalEditData}
        setData={setModalEditData}
        funSave={funUpdateOffice}
        lists={{
          director: {
            data: users?.data,
            key: "directorId",
            value: ["surname", "name", "patronymic", "email"],
          },
          renter: {
            data: users?.data,
            key: "renterId",
            value: ["surname", "name", "patronymic", "email"],
          },
          typeOwnership: {
            data: typeOwnerships,
            key: "typeOwnership",
            value: ["name"],
          },
        }}
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

export default Offices;
