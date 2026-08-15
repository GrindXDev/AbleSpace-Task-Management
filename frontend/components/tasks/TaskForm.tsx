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
  return (
    <section className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {editingTaskId ? "Edit Task" : "Create Task"}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {editingTaskId
          ? "Update the selected task."
          : "Add a new task to your list."}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Title
          </label>

          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            maxLength={100}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional description"
            maxLength={500}
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Status + Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="status"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as TaskStatus)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
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
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Due Date
          </label>

          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={creating || updating || !title.trim()}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creating
            ? "Creating..."
            : updating
              ? "Updating..."
              : editingTaskId
                ? "Update Task"
                : "Create Task"}
        </button>

        {/* Cancel */}
        {editingTaskId && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </section>
  );
}
