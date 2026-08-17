"use client";

import { FormEvent, useState } from "react";
import {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/lib/api";

import { useTasks } from "@/hooks/useTasks";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskToolbar from "@/components/tasks/TaskToolbar";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  // View state
  const [view, setView] = useState<"list" | "board">("list");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  // Form loading state
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Edit state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Form visibility
  const [showTaskForm, setShowTaskForm] = useState(false);

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
    setEditingTaskId(null);
  }

  function handleAddTask() {
    resetForm();
    setShowTaskForm(true);
  }

  function handleCancelForm() {
    resetForm();
    setShowTaskForm(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate || undefined,
    };

    try {
      if (editingTaskId) {
        setUpdating(true);

        await updateTask(editingTaskId, taskData);

        resetForm();
        setShowTaskForm(false);
      } else {
        setCreating(true);

        await createTask(taskData);

        resetForm();
        setShowTaskForm(false);
      }
    } catch {
      // Error is already handled inside useTasks
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

    setShowTaskForm(true);

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
      await deleteTask(id);

      if (editingTaskId === id) {
        handleCancelForm();
      }
    } catch {
      // Error is already handled inside useTasks
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <Header onRefresh={loadTasks} />

        {/* Toolbar */}
        <TaskToolbar
          view={view}
          onViewChange={setView}
          onAddTask={handleAddTask}
        />

        <div className="mx-auto max-w-7xl px-6 py-6">
          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            {/* Task Form */}
            {showTaskForm && (
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
                onCancel={handleCancelForm}
              />
            )}

            {/* Tasks */}
            <section className={showTaskForm ? "" : "lg:col-span-2"}>
              <div className="mb-5 flex items-center justify-between">
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

              {view === "list" ? (
                <TaskList
                  tasks={tasks}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTask}
                />
              ) : (
                <TaskBoard
                  tasks={tasks}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTask}
                />
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}