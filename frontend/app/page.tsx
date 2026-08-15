"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/lib/api";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  const [creating, setCreating] = useState(false);

  // Edit state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

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

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
    setEditingTaskId(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      setError("");

      if (editingTaskId) {
        setUpdating(true);

        const updatedTask = await updateTask(editingTaskId, {
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          priority,
          dueDate: dueDate || undefined,
        });

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task._id === editingTaskId ? updatedTask : task,
          ),
        );

        resetForm();
      } else {
        setCreating(true);

        const newTask = await createTask({
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          priority,
          dueDate: dueDate || undefined,
        });

        setTasks((currentTasks) => [newTask, ...currentTasks]);

        resetForm();
      }
    } catch {
      setError(
        editingTaskId
          ? "Unable to update task."
          : "Unable to create task.",
      );
    } finally {
      setCreating(false);
      setUpdating(false);
    }
  }

  function handleEdit(task: Task) {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description ?? "");
    setStatus(task.status);
    setPriority(task.priority);

    if (task.dueDate) {
      setDueDate(task.dueDate.slice(0, 10));
    } else {
      setDueDate("");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );

      if (editingTaskId === id) {
        resetForm();
      }
    } catch {
      setError("Unable to delete task.");
    }
  }

  return (
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar />

    <main className="min-w-0 flex-1">
      <Header onRefresh={loadTasks} />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          {/* Task Form */}
          <TaskForm
            editingTaskId={editingTaskId}
            title={title}
            description={description}
            status={status}
            priority={priority}
            dueDate={dueDate}
            creating={creating}
            updating={updating}
            setTitle={setTitle}
            setDescription={setDescription}
            setStatus={setStatus}
            setPriority={setPriority}
            setDueDate={setDueDate}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />

          {/* Task List */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Tasks
                </h2>

                <p className="text-sm text-slate-500">
                  {tasks.length}{" "}
                  {tasks.length === 1 ? "task" : "tasks"}
                </p>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
            />
          </section>
        </div>
      </div>
    </main>
  </div>
  );
}