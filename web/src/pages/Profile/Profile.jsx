import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiDeleteUser,
  apiUpdateUser,
  apiUpdateUserAvatar,
  server,
} from "../../api/apirequests";

function Profile({ funUpdUser }) {
  const user = useSelector((state) => state.user.user.data);
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    patronymic: user.patronymic,
    email: user.email,
    position: user.position,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.image ? `${server}/${user?.image}` : null
  );

  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    const fd = new FormData();
    fd.append("image", file);
    apiUpdateUserAvatar(user.id, fd).then((res) => {
      if (res.status === 201) {
        funUpdUser();
        document.getElementById("avatarInput").value = "";
        setSelectedFile(null);
        setPreviewUrl(`${server}/${res?.data?.image}`);
      }
    });
  };

  const handleUpdate = () => {
    apiUpdateUser(formData, user.id).then((res) => {
      if (res.status === 200) {
        alert("Профиль обновлён");
        funUpdUser();
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = () => {
    apiDeleteUser(user.id).then(handleLogout);
  };

  return (
    <>
      {/* === Боковое меню === */}
      <IconButton
        sx={{ position: "fixed", top: 16, left: 16 }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 240 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button onClick={() => navigate("/home")}>
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
            <ListItem button onClick={() => setConfirmOpen(true)}>
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Удалить аккаунт" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* === Диалог подтверждения удаления === */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Удаление аккаунта</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите безвозвратно удалить аккаунт?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Отмена</Button>
          <Button color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* === Контент страницы профиля === */}
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={previewUrl}
            alt="Фото профиля"
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Button component="label" variant="outlined">
            Загрузить фото
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>

        <Typography variant="h4" align="left" gutterBottom sx={{ mt: 4 }}>
          Профиль
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          {["name", "surname", "patronymic", "email", "position"].map(
            (field) => (
              <TextField
                key={field}
                label={
                  field === "position"
                    ? "Должность"
                    : {
                        name: "Имя",
                        surname: "Фамилия",
                        patronymic: "Отчество",
                        email: "Email",
                      }[field]
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                fullWidth
              />
            )
          )}
          <Button variant="contained" onClick={handleUpdate}>
            Сохранить изменения
          </Button>
        </Stack>

        {/* === Проекты === */}
        <Typography variant="h4" sx={{ mt: 6, mb: 4 }}>
          Проекты
        </Typography>
        <Grid container spacing={2}>
          {user.projects.map((p) => (
            <Grid item xs={12} sm={6} key={p.id}>
              <Card sx={{ height: "100%", width: "600px" }}>
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

        {/* === Задачи === */}
        <Typography variant="h4" sx={{ mt: 6, mb: 4 }}>
          Задачи
        </Typography>
        <Grid container spacing={2}>
          {user.tasks.map((t) => (
            <Grid item xs={12} sm={6} key={t.id}>
              <Card
                sx={{
                  height: 160,
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

        {/* === Трудозатраты === */}
        <Typography variant="h4" sx={{ mt: 6, mb: 4 }}>
          Трудозатраты
        </Typography>
        <Stack spacing={1} sx={{ mt: 1, mb: 6 }}>
          {user.laborcosts.map((l) => (
            <Box
              key={l.id}
              sx={{ p: 1.5, border: "1px solid #eee", borderRadius: 1 }}
            >
              <Typography variant="body1">{l.comments}</Typography>
              <Typography variant="body2">{l.activity}</Typography>
              <Typography variant="caption" color="text.secondary">
                {l.costs} ч • {new Date(l.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default Profile;
