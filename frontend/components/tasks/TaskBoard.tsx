"use client";

import { Task, TaskStatus } from "@/lib/api";
import TaskCard from "@/components/tasks/TaskCard";

interface TaskBoardProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
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

export default function TaskBoard({
  tasks,
  loading,
  onEdit,
  onDelete,
}: TaskBoardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading tasks...
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
            className="min-h-[400px] rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900">
                  {column.title}
                </h2>

                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-400">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
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