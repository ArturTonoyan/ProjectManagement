import trashICon from "@assets/images/icons/trash.svg";
import editIcon from "@assets/images/icons/edit.svg";
import userIcon from "@assets/images/icons/user.svg";
import officeIcon from "@assets/images/leftMenu/office.svg";
import deviceIcon from "@assets/images/leftMenu/device.svg";

export const typeOwnerships = [
  { name: "Арендованный", id: "1" },
  { name: "Собственный", id: "2" },
];

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
    name: "Задачи",
    icon: officeIcon,
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
