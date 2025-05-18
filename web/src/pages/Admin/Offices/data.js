import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment"; // для "Задачи"
import GroupIcon from "@mui/icons-material/Group"; // для "Участники"

export const typeOwnerships = [
  { name: "Арендованный", id: "1" },
  { name: "Собственный", id: "2" },
];

export const paramMenu = [
  {
    name: "Редактировать",
    icon: <EditIcon />,
    key: "edit",
  },
  {
    name: "Удалить",
    icon: <DeleteIcon />,
    key: "delete",
  },
  {
    name: "Задачи",
    icon: <AssignmentIcon />,
    key: "tasks",
  },
  {
    name: "Участники",
    icon: <GroupIcon />,
    key: "users",
  },
];

export const paramMenuUser = [
  {
    name: "Задачи",
    icon: <AssignmentIcon />,
    key: "tasks",
  },
];

export const addOfficeData = [
  {
    name: "Название",
    key: "name",
    type: "text",
  },

  {
    name: "Руководитель",
    key: "director",
    type: "text",
  },

  {
    name: "Дата начала прректа",
    key: "dateStart",
    type: "date",
  },
  {
    name: "Дата окончания проекта",
    key: "dateEnd",
    type: "date",
  },
  {
    name: "Описание",
    key: "description",
    type: "descr",
  },
];

export const tableHeader = [
  {
    name: "№",
    key: "number",
    width: 80,
  },
  {
    name: "Название",
    key: "name",
  },
  {
    name: "Описание",
    key: "description",
  },
  // {
  //   name: "Телефон",
  //   key: "phone",
  // },
  // {
  //   name: "Почта",
  //   key: "email",
  // },
  {
    name: "Руководитель",
    key: "directorId",
  },
  // {
  //   name: "Тип собственности",
  //   key: "typeOwnership",
  //   type: "text",
  // },
  // {
  //   name: "Арендодатель",
  //   key: "renter",
  //   type: "text",
  // },
  // {
  //   name: "Договор",
  //   key: "contract",
  //   type: "file",
  //   accept: "application/pdf",
  // },
  {
    name: "Дата начала проекта",
    key: "dateStart",
    type: "date",
  },
  {
    name: "Дата окончания проекта",
    key: "dateEnd",
    type: "date",
  },
  // {
  //   name: "Стоимость аренды в месяц",
  //   key: "cost",
  //   type: "number",
  // },
  // {
  //   name: "Контакт арендодателя",
  //   key: "renterContact",
  //   type: "text",
  //   placeholder: "+7 (___) ___-__-__",
  // },
  // {
  //   name: "Площадь кв. м.",
  //   key: "area",
  //   type: "number",
  // },
  // {
  //   name: "Этажи",
  //   key: "floorsCount",
  // },
  {
    name: "Участники",
    key: "usersCount",
  },
  {
    name: "Задачи",
    key: "devices",
    type: "text",
  },
];
