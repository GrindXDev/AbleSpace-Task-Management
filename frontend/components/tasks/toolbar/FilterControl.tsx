"use client";

import { useEffect, useRef, useState } from "react";
import type { TaskPriority, TaskStatus } from "@/lib/api";

interface FilterControlProps {
  statusFilter: TaskStatus | "all";
  onStatusFilterChange: (
    status: TaskStatus | "all",
  ) => void;

  priorityFilter: TaskPriority | "all";
  onPriorityFilterChange: (
    priority: TaskPriority | "all",
  ) => void;
}

const statusOptions: {
  value: TaskStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const priorityOptions: {
  value: TaskPriority | "all";
  label: string;
}[] = [
  { value: "all", label: "All priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function FilterControl({
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: FilterControlProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const activeFilterCount =
    Number(statusFilter !== "all") +
    Number(priorityFilter !== "all");

  function clearFilters() {
    onStatusFilterChange("all");
    onPriorityFilterChange("all");
  }

  return (
    <div ref={filterMenuRef} className="relative">
      <button
        type="button"
        onClick={() => setFilterOpen((current) => !current)}
        aria-expanded={filterOpen}
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm transition-all active:scale-[0.98] ${
          filterOpen || activeFilterCount > 0
            ? "border-slate-300 bg-slate-100 text-slate-900"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <span className="text-base text-slate-400">☷</span>
        <span>Filter</span>

        {activeFilterCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      {filterOpen && (
        <div className="absolute left-0 top-11 z-50 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Filter tasks
            </p>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-red-500 hover:text-red-600"
              >
                Clear all
              </button>
            )}
          </div>

          
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>

            <div className="space-y-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    onStatusFilterChange(option.value)
                  }
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    statusFilter === option.value
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>

                  {statusFilter === option.value && (
                    <span>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="my-3 border-t border-slate-100" />

          
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Priority
            </p>

            <div className="space-y-1">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    onPriorityFilterChange(option.value)
                  }
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    priorityFilter === option.value
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>

                  {priorityFilter === option.value && (
                    <span>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}