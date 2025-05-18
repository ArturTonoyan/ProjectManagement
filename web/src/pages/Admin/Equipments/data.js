import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment"; // для "Задачи"
import GroupIcon from "@mui/icons-material/Group"; // для "Участники"

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
    name: "Трудозатраы",
    icon: <AssignmentIcon />,

    key: "laborCosts",
  },
];

export const addOfficeData = [
  {
    name: "Название",
    key: "name",
    type: "text",
  },
  {
    name: "Статус",
    key: "statuss",
    type: "text",
  },
  {
    name: "Проект",
    key: "projects",
    type: "text",
  },
  {
    name: "Назначена",
    key: "user",
    type: "text",
  },
  {
    name: "Оценка временных затрат",
    key: "maxTimeCost",
    type: "number",
  },
  {
    name: "Готовность",
    key: "state",
    type: "number",
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
    name: "Назначена",
    key: "user",
  },
  {
    name: "Статус",
    key: "status",
  },
  {
    name: "Проект",
    key: "project",
  },
  {
    name: "Автор",
    key: "author",
  },
  {
    name: "Описание",
    key: "description",
  },
  {
    name: "Оценка временных затрат",
    key: "maxTimeCost",
  },
  {
    name: "Текущие затраты",
    key: "currentTimeCost",
  },
  {
    name: "Готовность",
    key: "state",
  },
];
