import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./KanbanBoard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { apiGetTasks, apiUpdateTask } from "../../api/apirequests";

const status = [
  { name: "Выполнено", id: "Выполнено", color: "success.main" },
  { name: "В работе", id: "В работе", color: "info.main" },
  { name: "На проверке", id: "На проверке", color: "warning.main" },
  { name: "Отменен", id: "Отменен", color: "error.main" },
  { name: "Архив", id: "Архив", color: "grey.500" },
  { name: "Отложен", id: "Отложен", color: "text.disabled" },
];

function KanbanBoard() {
  const { data: tasksFromApi = [] } = useQuery({
    queryKey: ["tasks/all"],
    queryFn: () => apiGetTasks(),
    staleTime: Infinity,
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(tasksFromApi?.data || []);
  }, [tasksFromApi]);

  const columns = status.reduce((acc, stat) => {
    acc[stat.id] = {
      id: stat.id,
      title: stat.name,
      color: stat.color,
      tasks: tasks.filter((task) => task.status === stat.id),
    };
    return acc;
  }, {});

  const columnOrder = status.map((s) => s.id);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // Перемещение внутри той же колонки — меняем только порядок в локальном состоянии
      const newTaskIds = Array.from(startColumn.tasks);
      const [movedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTask);

      setTasks((prev) => {
        const otherTasks = prev.filter((t) => t.status !== startColumn.id);
        return [...otherTasks, ...newTaskIds];
      });
    } else {
      // Перемещение в другую колонку — меняем статус задачи локально и на сервере
      setTasks((prev) => {
        return prev.map((task) => {
          if (task.id === draggableId) {
            // Отправляем обновление на сервер
            const updatedTask = { ...task, status: finishColumn.id };
            apiUpdateTask(updatedTask, updatedTask.id)
              .then((res) => {
                if (res.status === 200) {
                  // Можно добавить уведомление или обновить кеш (refetch) — если надо
                  console.log("Статус задачи обновлен на сервере");
                }
              })
              .catch((err) => {
                console.error("Ошибка обновления задачи", err);
              });

            return updatedTask;
          }
          return task;
        });
      });
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        className={styles.KanbanBoard}
        sx={{
          display: "flex",
          gap: 3,
          p: 3,
          backgroundColor: "#f0f2f5",
          minHeight: "80vh",
        }}
      >
        {columnOrder.map((columnId) => {
          const column = columns[columnId];

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    bgcolor: snapshot.isDraggingOver
                      ? "primary.light"
                      : "white",
                    borderRadius: 2,
                    width: 300,
                    minHeight: 600,
                    boxShadow: snapshot.isDraggingOver
                      ? "0 0 12px rgba(25,118,210,0.6)"
                      : "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    border: `3px solid ${column.color}`,
                    transition: "background-color 0.3s ease",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: column.color,
                      borderBottom: `2px solid ${column.color}`,
                      py: 1,
                      userSelect: "none",
                    }}
                  >
                    {column.title}
                  </Typography>

                  {column.tasks.length === 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        mt: 1,
                      }}
                    >
                      Нет задач
                    </Typography>
                  )}

                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            mb: 2,
                            bgcolor: snapshot.isDragging
                              ? "primary.light"
                              : "background.paper",
                            userSelect: "none",
                            cursor: "grab",
                            boxShadow: snapshot.isDragging
                              ? "0 4px 20px rgba(25,118,210,0.4)"
                              : "0 1px 6px rgba(0,0,0,0.1)",
                            transition: "box-shadow 0.2s ease",
                            "&:hover": {
                              boxShadow: "0 6px 20px rgba(25,118,210,0.3)",
                            },
                            borderLeft: `5px solid ${column.color}`,
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                              noWrap
                              title={
                                task.name || task.content || "Без названия"
                              }
                            >
                              {task.name || task.content || "Без названия"}
                            </Typography>

                            {task.description && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  maxHeight: 60,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={task.description}
                              >
                                {task.description}
                              </Typography>
                            )}

                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{ mb: 1 }}
                            >
                              {task.assignee && (
                                <Tooltip
                                  title={task.assignee.name || "Исполнитель"}
                                >
                                  <Avatar
                                    alt={task.assignee.name}
                                    src={task.assignee.avatar}
                                    sx={{ width: 24, height: 24 }}
                                  >
                                    <PersonIcon fontSize="small" />
                                  </Avatar>
                                </Tooltip>
                              )}

                              {task.dueDate && (
                                <Chip
                                  icon={<AccessTimeIcon />}
                                  label={new Date(
                                    task.dueDate
                                  ).toLocaleDateString()}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              )}

                              {task.priority && (
                                <Chip
                                  label={`Приоритет: ${task.priority}`}
                                  size="small"
                                  color={
                                    task.priority === "Высокий"
                                      ? "error"
                                      : task.priority === "Средний"
                                      ? "warning"
                                      : "default"
                                  }
                                  variant="filled"
                                />
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
}

export default KanbanBoard;
