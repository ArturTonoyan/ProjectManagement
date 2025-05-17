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
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiDeleteUser,
  apiGetTasks,
  apiUpdateUser,
  apiUpdateUserAvatar,
  server,
} from "../../api/apirequests";
import { setUserData } from "../../store/userSlice/user.Slice";
import { useQuery } from "@tanstack/react-query";

function Profile({ funUpdUser }) {
  const [tasksUser, setTasksUser] = useState([]);

  const {
    status,
    data: tasks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiGetTasks(),
    staleTime: Infinity, //! не обновлять
  });

  useEffect(() => {
    funUpdUser();
    refetch();
  }, []);

  useEffect(() => {
    setTasksUser(tasks?.data?.filter((task) => task?.userId === user?.id));
  }, [tasks]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data);
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

  const navigate = useNavigate();
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

  return (
    <Box sx={{ display: "flex" }}>
      {/* Левое меню */}
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

      {/* Контент */}
      <Container maxWidth="md" sx={{ ml: 30, margin: "0 auto", mt: 6, mb: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={previewUrl} sx={{ width: 120, height: 120, mb: 2 }} />
          <Button component="label" variant="outlined">
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
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
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
          {(showProjects ? user?.projects : user?.projects?.slice(0, 2))?.map(
            (p) => (
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
            )
          )}
        </Grid>
        {user?.projects.length > 2 && (
          <Button sx={{ mt: 2 }} onClick={() => setShowProjects(!showProjects)}>
            {showProjects ? "Скрыть" : "Показать ещё"}
          </Button>
        )}

        {/* === Задачи === */}
        <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
          Задачи
        </Typography>
        <Grid container spacing={2}>
          {(showTasks ? tasksUser : tasksUser?.slice(0, 2))?.map((t) => (
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
                    <Typography variant="subtitle1">{t.name}</Typography>
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
          ))}
        </Grid>
        {user?.tasks.length > 2 && (
          <Button sx={{ mt: 2 }} onClick={() => setShowTasks(!showTasks)}>
            {showTasks ? "Скрыть" : "Показать ещё"}
          </Button>
        )}

        {/* === Трудозатраты === */}
        <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
          Трудозатраты
        </Typography>
        <Stack spacing={1}>
          {(showLabor ? user?.laborcosts : user?.laborcosts?.slice(0, 2))?.map(
            (l) => (
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
                  {l.costs} ч • {new Date(l.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            )
          )}
        </Stack>
        {user?.laborcosts.length > 2 && (
          <Button sx={{ mt: 2 }} onClick={() => setShowLabor(!showLabor)}>
            {showLabor ? "Скрыть" : "Показать ещё"}
          </Button>
        )}
      </Container>
    </Box>
  );
}

export default Profile;
