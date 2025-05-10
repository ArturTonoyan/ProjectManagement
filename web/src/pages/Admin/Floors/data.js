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
  {
    name: "Сотрудники",
    icon: userIcon,
    key: "users",
  },
  {
    name: "Оборудование",
    icon: deviceIcon,
    key: "devices",
  },
];

export const addFloorData = [
  {
    name: "Проект",
    key: "office",
    type: "text",
  },
  {
    name: "Задача",
    key: "office",
    type: "text",
  },
  {
    name: "Комментарии",
    key: "office",
    type: "text",
  },
  {
    name: "Затраты",
    key: "office",
    type: "text",
  },
  {
    name: "Статус",
    key: "office",
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
    name: "Должность",
    key: "name",
    type: "text",
  },
  {
    name: "Дата",
    key: "date",
    type: "text",
  },
  {
    name: "Проект",
    key: "office",
    type: "text",
  },
  {
    name: "Задача",
    key: "equipment",
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
    type: "text",
  },
  {
    name: "Статус",
    key: "status",
    type: "text",
  },
];
