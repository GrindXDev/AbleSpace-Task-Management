"use client";

import type { TaskPriority, TaskStatus } from "@/lib/api";
import type { VisibleTaskFields } from "@/lib/task-fields";

import SearchControl from "./toolbar/SearchControl";
import FilterControl from "./toolbar/FilterControl";
import FieldsControl from "./toolbar/FieldsControl";
import ViewSwitcher from "./toolbar/ViewSwitcher";

interface TaskToolbarProps {
  view: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
  onAddTask: () => void;

  searchQuery: string;
  onSearchChange: (value: string) => void;

  statusFilter: TaskStatus | "all";
  onStatusFilterChange: (
    status: TaskStatus | "all",
  ) => void;

  priorityFilter: TaskPriority | "all";
  onPriorityFilterChange: (
    priority: TaskPriority | "all",
  ) => void;

  visibleFields: VisibleTaskFields;
  onFieldToggle: (field: keyof VisibleTaskFields) => void;
}

export default function TaskToolbar({
  view,
  onViewChange,
  onAddTask,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  visibleFields,
  onFieldToggle,
}: TaskToolbarProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex flex-wrap items-center gap-2">
          <SearchControl
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />

          <FilterControl
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={
              onPriorityFilterChange
            }
          />

          <FieldsControl
            visibleFields={visibleFields}
            onFieldToggle={onFieldToggle}
          />
        </div>

        
        <div className="flex items-center gap-2">
          <ViewSwitcher
            view={view}
            onViewChange={onViewChange}
          />

          <button
            type="button"
            onClick={onAddTask}
            className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            <span className="text-base leading-none">+</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}