import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import {
  apiGetFloors,
  apiGetOffices,
  apiGetTasks,
  apiGetUsers,
} from "../../../api/apirequests";
import styles from "./Analitics.module.scss";

function Analitics() {
  const user = useSelector((state) => state.user.user.data);

  const { data: tasks = [], refetch: refetchTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiGetTasks(),
    staleTime: Infinity,
  });

  const { data: laborcosts = [], refetch: refetchFloors } = useQuery({
    queryKey: ["laborcosts"],
    queryFn: () => apiGetFloors(),
    staleTime: Infinity,
  });

  const { data: projects = [], refetch: refetchProjects } = useQuery({
    queryKey: ["projects/all"],
    queryFn: () => apiGetOffices(),
    staleTime: Infinity,
  });

  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["users/all", user?.companyId],
    queryFn: () => apiGetUsers(user?.companyId),
    staleTime: Infinity,
  });

  useEffect(() => {
    refetchUsers();
    refetchProjects();
    refetchFloors();
    refetchTasks();
  }, []);

  // --- Данные для диаграмм ---

  // 1) Воронка задач по статусам
  const funnelData = [
    {
      value: tasks?.data?.filter((t) => t.status === "В работе").length,
      name: "В работе",
    },
    {
      value: tasks?.data?.filter((t) => t.status === "Выполнено").length,
      name: "Выполнено",
    },
    {
      value: tasks?.data?.filter((t) => t.status === "Ожидание").length,
      name: "Ожидание",
    },
  ];

  // 2) Гистограмма по статусам задач (число задач по статусам)
  const taskStatuses = ["В работе", "Выполнено", "Ожидание"];
  const taskStatusCounts = taskStatuses.map(
    (status) => tasks?.data?.filter((t) => t.status === status).length
  );

  // 3) Круговая диаграмма — распределение проектов по количеству задач
  const projectsTaskCount = projects?.data
    ?.map((p) => ({
      name: p.name,
      value: tasks?.data?.filter((t) => t.projectId === p.id).length,
    }))
    .filter((p) => p.value > 0);

  // 4) Столбчатая диаграмма — трудозатраты по активностям (laborcosts)
  const laborcostsByActivity = {};
  laborcosts?.data?.forEach((lc) => {
    laborcostsByActivity[lc.activity] =
      (laborcostsByActivity[lc.activity] || 0) + lc.costs;
  });
  const laborcostActivities = Object.keys(laborcostsByActivity);
  const laborcostValues = Object.values(laborcostsByActivity);

  // --- Опции для графиков ---

  const funnelOption = {
    title: { text: "Воронка задач по статусам" },
    tooltip: { trigger: "item", formatter: "{b}: {c}" },
    toolbox: { feature: { saveAsImage: {} } },
    legend: { data: funnelData.map((i) => i.name) },
    series: [
      {
        name: "Задачи",
        type: "funnel",
        left: "10%",
        top: 60,
        bottom: 60,
        width: "80%",
        minSize: "0%",
        maxSize: "100%",
        sort: "descending",
        gap: 2,
        label: { show: true, position: "inside" },
        labelLine: { length: 10, lineStyle: { width: 1, type: "solid" } },
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
        emphasis: { label: { fontSize: 20 } },
        data: funnelData,
      },
    ],
  };

  const barOption = {
    title: { text: "Число задач по статусам" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: taskStatuses,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: taskStatusCounts,
        type: "bar",
        itemStyle: {
          color: "#5470C6",
        },
      },
    ],
  };

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Проекты",
        type: "pie",
        radius: "50%",
        data: projectsTaskCount,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const laborcostsOption = {
    title: { text: "Трудозатраты по активностям" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: laborcostActivities,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: laborcostValues,
        type: "bar",
        itemStyle: {
          color: "#91CC75",
        },
      },
    ],
  };

  // Новый график 1 — задачи на пользователя
  const tasksPerUser = users?.data
    ?.map((u) => ({
      name: u.name || `${u.surname} ${u.firstname}`,
      value: u?.tasks?.length,
    }))
    .filter((u) => u.value > 0);

  const tasksPerUserOption = {
    title: { text: "Количество задач на пользователя" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: tasksPerUser?.map((u) => u.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: tasksPerUser?.map((u) => u.value),
        type: "bar",
        itemStyle: { color: "#fac858" },
      },
    ],
  };

  // Новый график 2 — проекты на пользователя
  const projectsPerUser = users?.data
    ?.map((u) => ({
      name: u.name || `${u.surname} ${u.firstname}`,
      value: u?.projects?.length,
    }))
    .filter((u) => u.value > 0);

  const projectsPerUserOption = {
    title: { text: "Количество проектов на пользователя" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: projectsPerUser?.map((u) => u.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: projectsPerUser?.map((u) => u.value),
        type: "bar",
        itemStyle: { color: "#73c0de" },
      },
    ],
  };

  return (
    <div className={styles.Analitics}>
      <h2>Аналитика задач и проектов</h2>

      <div style={{ marginBottom: 140 }}>
        <ReactECharts option={funnelOption} style={{ height: 300 }} />
      </div>

      <div style={{ marginBottom: 140 }}>
        <ReactECharts option={barOption} style={{ height: 300 }} />
      </div>

      <div style={{ marginBottom: 140 }}>
        <h3>Распределение задач по проектам</h3>
        <ReactECharts option={pieOption} style={{ height: 300 }} />
      </div>

      <div style={{ marginBottom: 140 }}>
        <ReactECharts option={laborcostsOption} style={{ height: 300 }} />
      </div>
      <div style={{ marginBottom: 140 }}>
        <ReactECharts option={tasksPerUserOption} style={{ height: 300 }} />
      </div>

      <div style={{ marginBottom: 140 }}>
        <ReactECharts option={projectsPerUserOption} style={{ height: 300 }} />
      </div>
    </div>
  );
}

export default Analitics;
