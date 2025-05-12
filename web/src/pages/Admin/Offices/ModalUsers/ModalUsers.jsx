import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { apiAddUsers, apiGetUsers } from "../../../../api/apirequests";
import { server } from "../../../../api/apirequests";
import { use, useEffect, useState } from "react";

function ModalUsers({ modalUsersData, setModalUsersData, refetch, query }) {
  const [showAllUsers, setShowAllUsers] = useState(false);

  const { data: usersAll } = useQuery({
    queryKey: ["users"],
    queryFn: apiGetUsers,
    staleTime: Infinity,
  });
  console.log("modalUsersData", modalUsersData);
  console.log("query", query);

  const handleAddUser = (userId) => {
    apiAddUsers(modalUsersData.id, {
      users: [{ id: userId, role: "Участник" }],
    }).then((res) => {
      if (res?.status === 201) {
        refetch();
      }
    });
  };

  useEffect(() => {
    if (query?.data?.length > 0) {
      setModalUsersData(
        query?.data?.find((el) => el?.id === modalUsersData?.id)
      );
    }
  }, [query]);

  return (
    <Dialog
      open={!!modalUsersData}
      onClose={() => setModalUsersData(null)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Участники проекта
        <Tooltip title="Добавить участника">
          <IconButton
            color="primary"
            sx={{ float: "right" }}
            onClick={() => setShowAllUsers((prev) => !prev)}
          >
            <AddCircle />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogContent dividers>
        <List>
          {modalUsersData?.users?.map((user) => (
            <ListItem key={user.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={`${server}/${user?.image}`} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.surname} ${user.name} ${user.patronymic}`}
                secondary={
                  <>
                    <Typography variant="body2">{user.email}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.position}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        <Collapse in={showAllUsers}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Все пользователи
          </Typography>
          <List>
            {usersAll?.data?.map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => handleAddUser(user.id)}
              >
                <ListItemAvatar>
                  <Avatar src={`${server}/${user?.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.surname} ${user.name} ${user.patronymic}`}
                  secondary={`${user.email} — ${user.position}`}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </DialogContent>
    </Dialog>
  );
}

export default ModalUsers;
