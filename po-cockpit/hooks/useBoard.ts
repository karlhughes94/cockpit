// PO Cockpit - Main state management hook
// This manages the entire board state including:
// - lanes (domains like TM, ETL, OTHER)
// - columns (Upcoming, Inflight, Landed)
// - tasks and their movement between lanes/columns
// - today tasks selection
// - focus mode (show only inflight work)
// - final approach checklist logic
//
// This is the central source of truth for the app.
// // State management hook
"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultColumns, defaultLanes, defaultTasks } from "@/lib/data";
import { generateId } from "@/lib/utils";
import { ChecklistItem, Column, Lane, NewTaskInput, Task } from "@/types";

const STORAGE_KEY = "po-cockpit-board";

type StoredBoard = {
  lanes: Lane[];
  columns: Column[];
  tasks: Task[];
  todayTaskIds: string[];
};

export function useBoard() {
  const [lanes, setLanes] = useState<Lane[]>(defaultLanes);
  const [columns] = useState<Column[]>(defaultColumns);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [todayTaskIds, setTodayTaskIds] = useState<string[]>([]);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed: StoredBoard = JSON.parse(raw);
      setLanes(parsed.lanes ?? defaultLanes);
      setTasks(parsed.tasks ?? defaultTasks);
      setTodayTaskIds(parsed.todayTaskIds ?? []);
    } catch {
      console.error("Failed to load board from localStorage");
    }
  }, []);

  useEffect(() => {
    const payload: StoredBoard = {
      lanes,
      columns,
      tasks,
      todayTaskIds,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [lanes, columns, tasks, todayTaskIds]);

  const visibleColumns = useMemo(() => {
    if (!focusMode) return columns;
    return columns.filter((column) => column.id === "inflight");
  }, [columns, focusMode]);

  function addTask(input: NewTaskInput) {
    const newTask: Task = {
      id: generateId("task"),
      title: input.title,
      laneId: input.laneId,
      columnId: input.columnId,
      link: input.link || "",
      notes: input.notes || "",
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function updateTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setTodayTaskIds((prev) => prev.filter((id) => id !== taskId));
  }

  function moveTask(taskId: string, laneId: string, columnId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, laneId, columnId } : task
      )
    );
  }

  function moveTaskLeft(task: Task) {
    const columnIndex = columns.findIndex((c) => c.id === task.columnId);
    if (columnIndex <= 0) return;

    const targetColumn = columns[columnIndex - 1];
    moveTask(task.id, task.laneId, targetColumn.id);
  }

  function moveTaskRight(task: Task) {
    const columnIndex = columns.findIndex((c) => c.id === task.columnId);
    if (columnIndex === -1 || columnIndex >= columns.length - 1) return;

    const targetColumn = columns[columnIndex + 1];
    moveTask(task.id, task.laneId, targetColumn.id);
  }

  function toggleToday(taskId: string) {
    setTodayTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  }

  function addLane(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newLane: Lane = {
      id: generateId("lane"),
      name: trimmed,
    };

    setLanes((prev) => [...prev, newLane]);
  }

  function addChecklistItem(taskId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newItem: ChecklistItem = {
      id: generateId("check"),
      text: trimmed,
      done: false,
    };

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const existingChecklist = task.finalApproach?.checklist ?? [];

        return {
          ...task,
          finalApproach: {
            checklist: [...existingChecklist, newItem],
          },
        };
      })
    );
  }

  function toggleChecklistItem(taskId: string, itemId: string) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId || !task.finalApproach) return task;

        return {
          ...task,
          finalApproach: {
            checklist: task.finalApproach.checklist.map((item) =>
              item.id === itemId ? { ...item, done: !item.done } : item
            ),
          },
        };
      })
    );
  }

  function markTaskLanded(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, columnId: "landed" } : task
      )
    );
  }

  const todayTasks = tasks.filter((task) => todayTaskIds.includes(task.id));

  return {
    lanes,
    columns,
    visibleColumns,
    tasks,
    todayTaskIds,
    todayTasks,
    focusMode,
    setFocusMode,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    moveTaskLeft,
    moveTaskRight,
    toggleToday,
    addLane,
    addChecklistItem,
    toggleChecklistItem,
    markTaskLanded,
  };
}