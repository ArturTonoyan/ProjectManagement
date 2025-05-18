import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
];

export const addOfficeData = [
  {
    name: "Имя",
    key: "name",
    type: "text",
  },
  {
    name: "Фамилия",
    key: "surname",
    type: "text",
  },
  {
    name: "Отчество",
    key: "patronymic",
    type: "text",
  },
  {
    name: "Должность",
    key: "position",
    type: "text",
  },
  {
    name: "Почта",
    key: "email",
    type: "email",
  },
  {
    name: "Роль",
    key: "role",
    type: "text",
  },
  {
    name: "Пароль",
    key: "password",
    type: "password",
  },
  {
    name: "Подтверждение пароля",
    key: "passwordConfirm",
    type: "password",
  },
];

export const editOfficeData = [
  {
    name: "Имя",
    key: "name",
    type: "text",
  },
  {
    name: "Фамилия",
    key: "surname",
    type: "text",
  },
  {
    name: "Отчество",
    key: "patronymic",
    type: "text",
  },
  {
    name: "Должность",
    key: "position",
    type: "text",
  },
  {
    name: "Почта",
    key: "email",
    type: "email",
  },
  {
    name: "Роль",
    key: "role",
    type: "text",
  },
];

export const tableHeader = [
  {
    name: "№",
    key: "number",
    width: 80,
  },
  {
    name: "ФИО",
    key: "fio",
  },
  {
    name: "Фото",
    key: "image",
  },
  {
    name: "Должность",
    key: "position",
  },
  {
    name: "Почта",
    key: "email",
  },
  {
    name: "Роль",
    key: "role",
  },
];
