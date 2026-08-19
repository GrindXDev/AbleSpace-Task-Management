"use client";

import { Task, TaskStatus } from "@/lib/api";
import type { VisibleTaskFields } from "@/lib/task-fields";
import TaskCard from "@/components/tasks/TaskCard";

interface TaskBoardProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  visibleFields: VisibleTaskFields;
}

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  {
    status: "todo",
    title: "To Do",
  },
  {
    status: "in-progress",
    title: "In Progress",
  },
  {
    status: "completed",
    title: "Completed",
  },
];

const columnStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-50 border-slate-200",
  "in-progress": "bg-blue-50/40 border-blue-100",
  completed: "bg-emerald-50/40 border-emerald-100",
};

const countStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-200 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function TaskBoard({
  tasks,
  loading,
  onEdit,
  onDelete,
  visibleFields,
}: TaskBoardProps) {
  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((column) => (
          <div
            key={column}
            className="min-h-[400px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="h-5 w-24 rounded bg-slate-200" />
              <div className="h-5 w-6 rounded-full bg-slate-200" />
            </div>

            <div className="space-y-3">
              {[1, 2].map((card) => (
                <div
                  key={card}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />

                  <div className="mt-4 flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-slate-100" />
                    <div className="h-6 w-20 rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <section
            key={column.status}
            className={`min-h-[400px] rounded-2xl border p-4 transition-colors ${columnStyles[column.status]}`}
          >
          
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm font-semibold text-slate-800">
                  {column.title}
                </h2>

                <span
                  className={`min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-semibold ${countStyles[column.status]}`}
                >
                  {columnTasks.length}
                </span>
              </div>
            </div>

            
            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 text-center">
                  <p className="text-xs font-medium text-slate-400">
                    No tasks
                  </p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    visibleFields={visibleFields}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}