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

export const addFloorData = [
  {
    name: "Задача",
    key: "task",
    type: "text",
  },
  {
    name: "Комментарии",
    key: "comments",
    type: "text",
  },
  {
    name: "Затраты",
    key: "costs",
    type: "number",
  },
  {
    name: "Деятельность",
    key: "activity",
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
    name: "Пользователь",
    key: "user",
    type: "text",
  },
  {
    name: "Дата",
    key: "date",
    type: "text",
  },
  {
    name: "Проект",
    key: "project",
    type: "text",
  },
  {
    name: "Задача",
    key: "task",
    type: "text",
  },
  {
    name: "Комментарии",
    key: "comments",
    type: "text",
  },
  {
    name: "Затраты",
    key: "costs",
    type: "number",
  },
  {
    name: "Деятельность",
    key: "activity",
    type: "text",
  },
];
