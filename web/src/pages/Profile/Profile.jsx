// Добавим новую вкладку "AI-чат" во вкладку профиля.
// Используем OpenRouter API с передачей данных о проектах, задачах и трудозатратах.

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiDeleteUser,
  apiGetTasks,
  apiUpdateUser,
  apiUpdateUserAvatar,
  apiCreateTask,
  apiCreateFloor,
  server,
} from "../../api/apirequests";
import { setUserData } from "../../store/userSlice/user.Slice";
import { useQuery } from "@tanstack/react-query";

function Profile({ funUpdUser }) {
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [tasksUser, setTasksUser] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiChat, setAiChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const user = useSelector((state) => state.user.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: tasks, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiGetTasks(),
    staleTime: Infinity,
  });

  useEffect(() => {
    funUpdUser();
    refetch();
  }, []);

  useEffect(() => {
    setTasksUser(tasks?.data?.filter((task) => task?.userId === user?.id));
  }, [tasks]);

  const [formData, setFormData] = useState({
    name: user?.name,
    surname: user?.surname,
    patronymic: user?.patronymic,
    email: user?.email,
    position: user?.position,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.image ? `${server}/${user?.image}` : null
  );

  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showLabor, setShowLabor] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    const fd = new FormData();
    fd.append("image", file);
    apiUpdateUserAvatar(user?.id, fd).then((res) => {
      if (res.status === 201) {
        funUpdUser();
        document.getElementById("avatarInput").value = "";
        setSelectedFile(null);
        setPreviewUrl(`${server}/${res?.data?.image}`);
      }
    });
  };

  const handleUpdate = () => {
    apiUpdateUser(formData, user?.id).then((res) => {
      if (res.status === 200) {
        alert("Профиль обновлён");
        funUpdUser();
        setIsEditing(false);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/authorization");
    dispatch(setUserData({ data: null }));
  };

  const handleDelete = () => {
    apiDeleteUser(user?.id).then(handleLogout);
  };

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;

    setAiLoading(true);
    const newMessages = [...aiChat, { role: "user", content: aiInput }];
    setAiChat(newMessages);
    setAiInput("");

    const context = `Ты — ассистент по управлению проектами. Вот полная информация о пользователе и его активности:

👤 Пользователь:
Имя: ${user?.surname} ${user?.name} ${user?.patronymic}
Email: ${user?.email}
Должность: ${user?.position}

📁 Проекты пользователя:
${
  tasksUser
    .map((task) => task?.project?.name)
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .map((name, i) => `${i + 1}. ${name}`)
    .join("\n") || "Нет проектов"
}

📋 Задачи пользователя:
${
  tasksUser
    .map(
      (task, i) => `${i + 1}. Название: ${task.title}
  Проект: ${task?.project?.name || "—"}
  Статус: ${task.status}
  Приоритет: ${task.priority || "—"}
  Дедлайн: ${task.deadline || "—"}
  Описание: ${task.description || "—"}`
    )
    .join("\n\n") || "Нет задач"
}

⏱️ Трудозатраты:
${
  tasksUser
    .flatMap((task) =>
      (task?.laborCosts || []).map(
        (labor) =>
          `- [${task.title}] ${labor.hours} ч. (${labor.description}) — ${labor.date}`
      )
    )
    .join("\n") || "Нет данных"
}
`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "system", content: context }, ...newMessages],
        }),
      });

      const data = await res.json();

      if (data?.choices?.[0]?.message) {
        const msg = data.choices[0].message;
        setAiChat((prev) => [...prev, msg]);

        // Проверим, нужно ли создать задачу или трудозатрату
        if (/создать задачу/i.test(aiInput)) {
          const titleMatch = aiInput.match(/названи[ея]:?\s*(.+?)(,|$)/i);
          const descMatch = aiInput.match(/описани[ея]:?\s*(.+?)(,|$)/i);

          apiCreateTask({
            name: titleMatch?.[1] || "Новая задача от AI",
            description: descMatch?.[1] || "",
            authorId: user.id,
            userId: user.id,
            projectId: user?.projects?.[0]?.id,
            status: "В работе",
          }).then((res) => {
            if (res.status === 201) refetch();
          });
        } else if (/создать трудозатрату/i.test(aiInput)) {
          const hoursMatch = aiInput.match(/часов:?\s*(.+?)(,|$)/i);
          const descMatch = aiInput.match(/описани[ея]:?\s*(.+?)(,|$)/i);

          apiCreateFloor({
            userId: user.id,
            costs: Number(hoursMatch?.[1]) || 1,
            comments: descMatch?.[1] || "AI трудозатрата",
            taskId: user?.tasks?.[0]?.id,
          }).then((res) => {
            if (res.status === 201) refetch();
          });
        }
      } else {
        setAiChat((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Произошла ошибка при получении ответа от AI.",
          },
        ]);
      }
    } catch (err) {
      setAiChat((prev) => [
        ...prev,
        { role: "assistant", content: "Сетевая ошибка. Попробуйте позже." },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Меню слева */}
      <Box
        sx={{
          width: 240,
          height: "100vh",
          position: "fixed",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="На главную" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItem>
          <ListItem button onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Удалить аккаунт" />
          </ListItem>
        </List>
      </Box>

      {/* Контент справа */}
      <Container maxWidth="md" sx={{ ml: 30, mt: 6, mb: 10 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#08a748", // цвет индикатора под активной вкладкой
            },
          }}
        >
          <Tab
            label="Профиль"
            sx={{
              color: "#08a748", // цвет текста неактивной вкладки
              "&.Mui-selected": {
                color: "#08a748", // цвет текста активной вкладки
              },
            }}
          />
          <Tab
            label="AI-чат"
            sx={{
              color: "#08a748", // цвет текста неактивной вкладки
              "&.Mui-selected": {
                color: "#08a748", // цвет текста активной вкладки
              },
            }}
            icon={<ChatIcon />}
            iconPosition="start"
          />
        </Tabs>

        {tabIndex === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "calc(100vw - 340px)",
            }}
          >
            <Typography variant="h4" sx={{ mt: 4 }}>
              Профиль пользователя
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: "0 auto",
                justifyContent: "center",
              }}
            >
              {/* Контент */}
              <Container
                maxWidth="md"
                sx={{ ml: 30, margin: "0 auto", mt: 6, mb: 10 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={previewUrl}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      color: "#08a748", // цвет текста неактивной вкладки
                      "&.Mui-selected": {
                        color: "#08a748", // цвет текста активной вкладки
                      },
                      borderColor: "#08a748",
                    }}
                  >
                    Загрузить фото
                    <input
                      hidden
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">Профиль</Typography>
                  {!isEditing && (
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                      sx={{
                        color: "#08a748", // цвет текста неактивной вкладки
                        "&.Mui-selected": {
                          color: "#08a748", // цвет текста активной вкладки
                        },
                        borderColor: "#08a748",
                      }}
                    >
                      Редактировать
                    </Button>
                  )}
                </Box>

                <Stack spacing={2} sx={{ mt: 2 }}>
                  {Object.entries(formData)?.map(([key, value]) =>
                    isEditing ? (
                      <TextField
                        key={key}
                        label={
                          {
                            name: "Имя",
                            surname: "Фамилия",
                            patronymic: "Отчество",
                            email: "Email",
                            position: "Должность",
                          }[key]
                        }
                        name={key}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        fullWidth
                      />
                    ) : (
                      <Typography key={key} variant="body1">
                        <strong>
                          {
                            {
                              name: "Имя",
                              surname: "Фамилия",
                              patronymic: "Отчество",
                              email: "Email",
                              position: "Должность",
                            }[key]
                          }
                          :
                        </strong>{" "}
                        {value}
                      </Typography>
                    )
                  )}

                  {isEditing && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button variant="contained" onClick={handleUpdate}>
                        Сохранить
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                      >
                        Отменить
                      </Button>
                    </Box>
                  )}
                </Stack>
                <Divider sx={{ my: 4 }} />

                {/* === Проекты === */}
                <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
                  Проекты
                </Typography>
                <Grid container spacing={2}>
                  {(showProjects
                    ? user?.projects
                    : user?.projects?.slice(0, 2)
                  )?.map((p) => (
                    <Grid item xs={12} sm={6} key={p.id}>
                      <Card
                        sx={{
                          borderRadius: "12px",
                          boxShadow: "none",
                          width: "600px",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6">{p.name}</Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {p.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {p.dateStart} – {p.dateEnd}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {user?.projects.length > 2 && (
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => setShowProjects(!showProjects)}
                  >
                    {showProjects ? "Скрыть" : "Показать ещё"}
                  </Button>
                )}

                {/* === Задачи === */}
                <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
                  Задачи
                </Typography>
                <Grid container spacing={2}>
                  {(showTasks ? tasksUser : tasksUser?.slice(0, 2))?.map(
                    (t) => (
                      <Grid item xs={12} sm={6} key={t.id}>
                        <Card
                          sx={{
                            height: 160,
                            width: "300px",
                            borderRadius: "12px",
                            boxShadow: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <CardContent>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography variant="subtitle1">
                                {t.name}
                              </Typography>
                              <Chip label={t.status} size="small" />
                            </Stack>
                            {t.description && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2 }}
                              >
                                {t.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
                {user?.tasks.length > 2 && (
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => setShowTasks(!showTasks)}
                  >
                    {showTasks ? "Скрыть" : "Показать ещё"}
                  </Button>
                )}

                {/* === Трудозатраты === */}
                <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
                  Трудозатраты
                </Typography>
                <Stack spacing={1}>
                  {(showLabor
                    ? user?.laborcosts
                    : user?.laborcosts?.slice(0, 2)
                  )?.map((l) => (
                    <Box
                      key={l.id}
                      sx={{
                        p: 1.5,
                        border: "1px solid #eee",
                        borderRadius: 1,
                        width: "600px",
                      }}
                    >
                      <Typography variant="body1">{l.comments}</Typography>
                      <Typography variant="body2">{l.activity}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {l.costs} ч •{" "}
                        {new Date(l.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                {user?.laborcosts.length > 2 && (
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => setShowLabor(!showLabor)}
                  >
                    {showLabor ? "Скрыть" : "Показать ещё"}
                  </Button>
                )}
              </Container>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              AI-чат
            </Typography>
            <Stack spacing={2}>
              {aiChat.map((m, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1,
                    background: m.role === "user" ? "#e0f7fa" : "#f1f8e9",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">
                    <strong>{m.role === "user" ? "Вы" : "AI"}:</strong>{" "}
                    {m.content}
                  </Typography>
                </Box>
              ))}
              <TextField
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                label="Ваш вопрос"
                multiline
                fullWidth
                sx={{
                  "& label": {
                    color: "#08a748", // цвет лейбла
                  },
                  "& label.Mui-focused": {
                    color: "#08a748", // цвет лейбла при фокусе
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#08a748", // обычная рамка
                    },
                    "&:hover fieldset": {
                      borderColor: "#08a748", // при наведении
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#08a748", // при фокусе
                    },
                  },
                  input: {
                    color: "#08a748", // цвет текста
                  },
                  textarea: {
                    color: "#08a748", // цвет текста в multiline
                  },
                }}
              />
              <Button
                onClick={handleAiSubmit}
                variant="contained"
                disabled={aiLoading}
                sx={{
                  background: "#08a748",
                  "&:hover": {
                    background: "#08a748",
                  },
                }}
              >
                {aiLoading ? "Отправка..." : "Отправить"}
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Profile;
