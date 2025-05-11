import trashICon from "@assets/images/icons/trash.svg";
import editIcon from "@assets/images/icons/edit.svg";
import officeIcon from "@assets/images/leftMenu/office.svg";

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
    name: "Трудозатраы",
    icon: officeIcon,
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
    key: "status",
    type: "text",
  },
  {
    name: "Проект",
    key: "projects",
    type: "text",
  },
  {
    name: "Описание",
    key: "description",
    type: "text",
  },
  {
    name: "Оценка временных затрат",
    key: "maxTimeCost",
    type: "text",
  },
  {
    name: "Готовность",
    key: "state",
    type: "number",
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
