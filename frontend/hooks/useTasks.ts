"use client";

import { useEffect, useState } from "react";
import {
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  getTasks,
  updateTask as apiUpdateTask,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/lib/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask(data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
  }) {
    try {
      setError("");

      const newTask = await apiCreateTask(data);

      setTasks((currentTasks) => [newTask, ...currentTasks]);

      return newTask;
    } catch {
      setError("Unable to create task.");
      throw new Error("Unable to create task.");
    }
  }

  async function updateTask(
    id: string,
    data: {
      title: string;
      description?: string;
      status: TaskStatus;
      priority: TaskPriority;
      dueDate?: string;
    },
  ) {
    try {
      setError("");

      const updatedTask = await apiUpdateTask(id, data);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id ? updatedTask : task,
        ),
      );

      return updatedTask;
    } catch {
      setError("Unable to update task.");
      throw new Error("Unable to update task.");
    }
  }

  async function deleteTask(id: string) {
    try {
      setError("");

      await apiDeleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );
    } catch {
      setError("Unable to delete task.");
      throw new Error("Unable to delete task.");
    }
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
