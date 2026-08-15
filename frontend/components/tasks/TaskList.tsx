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
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="font-medium text-slate-900">
          No tasks yet
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create your first task using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}