"use client";

import { Task, TaskPriority, TaskStatus } from "@/lib/api";
import type { VisibleTaskFields } from "@/lib/task-fields";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  visibleFields: VisibleTaskFields;
}

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  visibleFields,
}: TaskCardProps) {
  const showBadgeSection =
    visibleFields.status ||
    visibleFields.priority ||
    (visibleFields.dueDate && Boolean(task.dueDate));

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {task.title}
          </h3>

          {visibleFields.description && task.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
              {task.description}
            </p>
          )}

          {showBadgeSection && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {visibleFields.status && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}
                >
                  {statusLabels[task.status]}
                </span>
              )}

              {visibleFields.priority && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
                >
                  {priorityLabels[task.priority]} priority
                </span>
              )}

              {visibleFields.dueDate && task.dueDate && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task._id)}
            className="rounded-lg border border-red-200 bg-white px-3.5 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 active:scale-[0.98]"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}