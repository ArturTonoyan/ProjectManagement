import trashICon from "@assets/images/icons/trash.svg";
import editIcon from "@assets/images/icons/edit.svg";
import userIcon from "@assets/images/icons/user.svg";
import deviceIcon from "@assets/images/leftMenu/device.svg";

export const paramMenu = [
  {
    name: "Редактировать",
    icon: editIcon,
    key: "edit",
  },
  {
    name: "Удалить",
    icon: trashICon,
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
