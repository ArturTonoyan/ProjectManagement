import trashICon from "@assets/images/icons/trash.svg";
import editIcon from "@assets/images/icons/edit.svg";

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
    name: "Объект",
    icon: editIcon,
    key: "object",
  },
  {
    name: "Неполадки",
    icon: editIcon,
    key: "problems",
  },
];

export const addOfficeData = [
  {
    name: "Название",
    key: "name",
    type: "text",
  },
  {
    name: "Индификатор",
    key: "inventoryNumber",
    type: "text",
  },
  {
    name: "Статус",
    key: "type",
    type: "text",
  },
  // {
  //   name: "Этаж",
  //   key: "floor",
  //   type: "text",
  // },
  {
    name: "Проект",
    key: "office",
    type: "text",
  },
  {
    name: "Автор",
    key: "user",
    type: "text",
  },
  {
    name: "Описание",
    key: "description",
    type: "text",
  },
  // {
  //   name: "Стоимость",
  //   key: "cost",
  //   type: "text",
  // },
  {
    name: "Максимальные затраты",
    key: "maxWarranty",
    type: "text",
  },
  {
    name: "Текущая затраты",
    key: "currentWarranty",
    type: "text",
  },
  {
    name: "Готовность",
    key: "state",
    type: "text",
  },
  {
    name: "Фото",
    key: "image",
    type: "text",
  },
];

export const tableHeader = [
  {
    name: "№",
    key: "number",
  },
  {
    name: "Название",
    key: "name",
  },
  {
    name: "Индификатор",
    key: "inventoryNumber",
  },
  {
    name: "Статус",
    key: "type",
  },
  {
    name: "Проект",
    key: "floor",
  },
  {
    name: "Автор",
    key: "user",
  },
  {
    name: "Описание",
    key: "description",
  },
  // {
  //   name: "Стоимость",
  //   key: "cost",
  // },
  {
    name: "Максимальные затраты",
    key: "maxWarranty",
  },
  {
    name: "Текущие затраты",
    key: "currentWarranty",
  },
  {
    name: "Готовность",
    key: "state",
  },
  {
    name: "Фото",
    key: "image",
  },
];

export const testData = [
  {
    number: "1",
    name: "Название",
    inventoryNumber: "Инвентарный номер",
    type: "Тип",
    floor: "Этаж",
    employee: "Сотрудник",
    description: "Описание",
    cost: "Стоимость",
    maxWarranty: "Максимальная наработка",
    currentWarranty: "Текущая наработка",
    state: "Состояние",
  },
  {
    number: "2",
    name: "Название",
    inventoryNumber: "Инвентарный номер",
    type: "Тип",
    floor: "Этаж",
    employee: "Сотрудник",
    description: "Описание",
    cost: "Стоимость",
    maxWarranty: "Максимальная наработка",
    currentWarranty: "Текущая наработка",
    state: "Состояние",
  },
  {
    number: "3",
    name: "Название",
    inventoryNumber: "Инвентарный номер",
    type: "Тип",
    floor: "Этаж",
    employee: "Сотрудник",
    description: "Описание",
    cost: "Стоимость",
    maxWarranty: "Максимальная наработка",
    currentWarranty: "Текущая наработка",
    state: "Состояние",
  },
];
