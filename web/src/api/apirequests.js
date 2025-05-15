import api from "./axios";
export const server = process.env.REACT_APP_API_URL || "http://localhost:3004";

// Универсальная функция для выполнения запросов
export const apiRequest = async (
  method,
  endpoint,
  data = null,
  headers = {}
) => {
  try {
    const config = {
      method,
      url: `${server}${endpoint}`,
      headers,
      data,
    };

    const response = await api(config);
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return error;
  }
};

//! Запрос на регистрацию
export const apiRegister = async (data) => {
  const response = await apiRequest("post", "/auth/register", data);
  if (response?.status === 201) {
    const { token } = response?.data;
    localStorage.setItem("accessToken", token);
  }

  return response;
};

//! Запрос на авторизацию
export const apiLogin = async (data) => {
  const response = await apiRequest("post", "/auth/login", data);
  if (response?.status === 201) {
    const { token } = response?.data;
    localStorage.setItem("accessToken", token);
  }

  return response;
};

//! Запрос получение данных user
export const apiGetUser = async () => {
  return await apiRequest("get", "/users/me");
};

//! добавление пользователя
export const apiCreateUser = async (data) => {
  return await apiRequest("post", "/users/create", data);
};

//! удаление пользователя
export const apiDeleteUser = async (id) => {
  return await apiRequest("delete", `/users/${id}`);
};

//! обновление данных сотрудника
export const apiUpdateUser = async (data, id) => {
  return await apiRequest("put", `/users/${id}`, data);
};

export const apiUpdateUserAvatar = async (id, data) => {
  return await apiRequest("post", `/users/${id}/avatar`, data, {
    "Content-Type": "multipart/form-data",
  });
};

//! получение всех ролей
export const apiGetRoles = async () => {
  return await apiRequest("get", "/roles");
};

//! создание компании
export const apiCreateCompany = async (data) => {
  return await apiRequest("post", "/companies", data, {
    "Content-Type": "multipart/form-data",
  });
};

//! получение своей компании
export const apiGetCompany = async (id) => {
  const response = await apiRequest("get", `/companies/${id}`);
  console.log("response", response);
  return response;
};

//! обновление данных компании
export const apiUpdateCompany = async (data, companyId) => {
  return await apiRequest("put", `/companies/${companyId}`, data, {
    "Content-Type": "multipart/form-data",
  });
};

//! создание офиса
export const apiCreateOffice = async (data) => {
  return await apiRequest("post", `/projects/create`, data, {
    "Content-Type": "multipart/form-data",
  });
};

//! получение всех офисов
export const apiGetOffices = async () => {
  return await apiRequest("get", `/projects/all`, {
    "Content-Type": "multipart/form-data",
  });
};

//! обновление данных офиса
export const apiUpdateOffice = async (data, officeId) => {
  return await apiRequest("put", `/projects/${officeId}`, data);
};

//! удаление офиса
export const apiDeleteOffice = async (officeId) => {
  return await apiRequest("delete", `/projects/${officeId}`);
};

//! создание этажа
export const apiCreateFloor = async (data) => {
  return await apiRequest("post", `/laborcosts`, data);
};

//! получение всех этажей
export const apiGetFloors = async () => {
  return await apiRequest("get", `/laborcosts`);
};
//! обновление данных этажа
export const apiUpdateFloor = async (data, id) => {
  return await apiRequest("put", `/laborcosts/${id}`, data);
};

//! удаление этажа
export const apiDeleteFloor = async (id) => {
  return await apiRequest("delete", `/laborcosts/${id}`);
};

//! получение всех пользователей
export const apiGetUsers = async () => {
  return await apiRequest("get", `/users`);
};

//! добавление пользователей в проект
export const apiAddUsers = async (id, data) => {
  return await apiRequest("post", `/projects/users/add/${id}`, data);
};

//! удаление пользователя из проекта
export const apiRemoveUser = async (id, data) => {
  return await apiRequest("post", `/projects/users/delete/${id}`, data);
};

//! получение всех задач
export const apiGetTasks = async () => {
  return await apiRequest("get", `/tasks`);
};

//! создание оборудования
export const apiCreateTask = async (data) => {
  return await apiRequest("post", `/tasks`, data);
};

//! обновление данных оборудования
export const apiUpdateTask = async (data, id) => {
  return await apiRequest("put", `/tasks/${id}`, data);
};

//! удаление оборудования
export const apiDeleteTask = async (id) => {
  return await apiRequest("delete", `/tasks/${id}`);
};

//! добавить обьект карты
export const apiEddElement = async (data) => {
  return await apiRequest("post", `/elements`, data, {
    "Content-Type": "multipart/form-data",
  });
};

//! сохранить все обьекты карты
export const apiEddElements = async (data) => {
  return await apiRequest("post", `/elements/bulk`, data);
};

//! получение всех обьектов карты
export const apiGetElements = async (laborcostId) => {
  return await apiRequest("get", `/elements/all/${laborcostId}`);
};

//! удаление объкта
export const apiDeleteElement = async (id) => {
  return await apiRequest("delete", `/elements/${id}`);
};
