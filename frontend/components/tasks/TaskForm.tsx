"use client";

import { FormEvent } from "react";
import { TaskPriority, TaskStatus } from "@/lib/api";

interface TaskFormProps {
  editingTaskId: string | null;

  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;

  creating: boolean;
  updating: boolean;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setStatus: (value: TaskStatus) => void;
  setPriority: (value: TaskPriority) => void;
  setDueDate: (value: string) => void;

  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function TaskForm({
  editingTaskId,
  title,
  description,
  status,
  priority,
  dueDate,
  creating,
  updating,
  setTitle,
  setDescription,
  setStatus,
  setPriority,
  setDueDate,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const isSubmitting = creating || updating;

  return (
    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <span className="text-lg font-semibold">
              {editingTaskId ? "✎" : "+"}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {editingTaskId ? "Edit Task" : "Create Task"}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {editingTaskId
                ? "Update the details of your task."
                : "Add a new task to your list."}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title <span className="text-red-500">*</span>
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            maxLength={100}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a short description..."
            maxLength={500}
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />

          <div className="mt-1.5 flex justify-end">
            <span className="text-xs text-slate-400">
              {description.length}/500
            </span>
          </div>
        </div>

        {/* Status + Priority */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as TaskStatus)
              }
              className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition-all focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
              className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition-all focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Due Date
          </label>

          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition-all focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-1">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="h-11 w-full rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating
              ? "Creating..."
              : updating
                ? "Updating..."
                : editingTaskId
                  ? "Update Task"
                  : "Create Task"}
          </button>

          {editingTaskId && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}