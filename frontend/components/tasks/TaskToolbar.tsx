"use client";

import { useEffect, useRef, useState } from "react";
import type { TaskPriority, TaskStatus } from "@/lib/api";

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
}: TaskToolbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

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

  function closeSearch() {
    onSearchChange("");
    setSearchOpen(false);
  }

  function clearFilters() {
    onStatusFilterChange("all");
    onPriorityFilterChange("all");
  }

  return (
    <div className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
       
        <div className="flex flex-wrap items-center gap-2">
          
          {searchOpen ? (
            <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
              <span className="text-base text-slate-400">
                ⌕
              </span>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  onSearchChange(event.target.value)
                }
                placeholder="Search tasks..."
                className="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="text-lg text-slate-400 hover:text-slate-900"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
            >
              <span className="text-base text-slate-400">
                ⌕
              </span>

              <span>Search</span>
            </button>
          )}

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
              <span className="text-base text-slate-400">
                ☷
              </span>

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
                    {[
                      { value: "all", label: "All statuses" },
                      { value: "todo", label: "To Do" },
                      {
                        value: "in-progress",
                        label: "In Progress",
                      },
                      {
                        value: "completed",
                        label: "Completed",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          onStatusFilterChange(
                            option.value as
                              | TaskStatus
                              | "all",
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          statusFilter === option.value
                            ? "bg-slate-100 font-medium text-slate-900"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{option.label}</span>

                        {statusFilter === option.value && (
                          <span className="text-slate-900">
                            ✓
                          </span>
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
                    {[
                      { value: "all", label: "All priorities" },
                      { value: "high", label: "High" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          onPriorityFilterChange(
                            option.value as
                              | TaskPriority
                              | "all",
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          priorityFilter === option.value
                            ? "bg-slate-100 font-medium text-slate-900"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{option.label}</span>

                        {priorityFilter === option.value && (
                          <span className="text-slate-900">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">
              ⊞
            </span>

            <span>Fields</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          
          <div className="flex h-9 items-center rounded-lg border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-all ${
                view === "list"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              List
            </button>

            <button
              type="button"
              onClick={() => onViewChange("board")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-all ${
                view === "board"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Board
            </button>
          </div>

          
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