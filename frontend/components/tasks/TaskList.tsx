"use client";

import { Task } from "@/lib/api";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
}: TaskListProps) {
  // Loading state
  if (loading) {
    return (
      <section className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-2/3 rounded bg-slate-200" />

            <div className="mt-3 h-3 w-full rounded bg-slate-100" />

            <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />

            <div className="mt-5 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-100" />
              <div className="h-6 w-24 rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <span className="text-xl text-slate-500">✓</span>
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">
          No tasks yet
        </h3>

        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
          You don't have any tasks yet. Create your first task using the form
          to get started.
        </p>
      </section>
    );
  }

  // Task list
  return (
    <section className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}