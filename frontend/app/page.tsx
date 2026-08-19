"use client";

import { FormEvent, useState } from "react";
import { Task, TaskPriority, TaskStatus } from "@/lib/api";

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

  const [view, setView] = useState<"list" | "board">("list");

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    TaskStatus | "all"
  >("all");

  const [priorityFilter, setPriorityFilter] = useState<
    TaskPriority | "all"
  >("all");


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] =
    useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  
  const [editingTaskId, setEditingTaskId] = useState<
    string | null
  >(null);

  
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
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

  // Apply search and filters together
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !normalizedSearch ||
      task.title.toLowerCase().includes(normalizedSearch) ||
      (task.description ?? "")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        
        <Header onRefresh={loadTasks} />

        <TaskToolbar
          view={view}
          onViewChange={setView}
          onAddTask={handleAddTask}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
        />

        <div className="mx-auto max-w-7xl px-6 py-6">
          
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            
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

          
            <section
              className={
                showTaskForm ? "" : "lg:col-span-2"
              }
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Tasks
                  </h2>

                  <p className="text-sm text-slate-500">
                    {filteredTasks.length}{" "}
                    {filteredTasks.length === 1
                      ? "task"
                      : "tasks"}

                    {(searchQuery.trim() ||
                      statusFilter !== "all" ||
                      priorityFilter !== "all") &&
                      ` found out of ${tasks.length}`}
                  </p>
                </div>
              </div>

              {view === "list" ? (
                <TaskList
                  tasks={filteredTasks}
                  loading={loading}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTask}
                />
              ) : (
                <TaskBoard
                  tasks={filteredTasks}
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