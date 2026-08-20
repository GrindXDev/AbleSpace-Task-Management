"use client";

import type { ProjectPriority } from "@/lib/api";
import type { ProjectField } from "./ProjectList";

export type ProjectPriorityFilter =
  | "all"
  | ProjectPriority;

interface ProjectToolbarProps {
  searchQuery: string;
  priorityFilter: ProjectPriorityFilter;
  visibleFields: Record<ProjectField, boolean>;
  onSearchChange: (value: string) => void;
  onPriorityChange: (
    value: ProjectPriorityFilter,
  ) => void;
  onToggleField: (field: ProjectField) => void;
  onClearFilters: () => void;
  onAddProject: () => void;
}

const fields: {
  key: ProjectField;
  label: string;
}[] = [
  { key: "priority", label: "Priority" },
  { key: "lead", label: "Lead" },
  { key: "dueDate", label: "Due Date" },
  { key: "actions", label: "Actions" },
];

export default function ProjectToolbar({
  searchQuery,
  priorityFilter,
  visibleFields,
  onSearchChange,
  onPriorityChange,
  onToggleField,
  onClearFilters,
  onAddProject,
}: ProjectToolbarProps) {
  const filtersActive =
    searchQuery.trim() !== "" ||
    priorityFilter !== "all";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-slate-200 px-3">
        <span className="text-sm text-slate-400">
          ⌕
        </span>

        <input
          type="search"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search projects..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Fields menu */}
        <details className="relative">
          <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <span>▦</span>
            <span>Fields</span>
          </summary>

          <div className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Show fields
            </p>

            {fields.map((field) => (
              <label
                key={field.key}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={visibleFields[field.key]}
                  onChange={() =>
                    onToggleField(field.key)
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                />

                <span>{field.label}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Filter menu */}
        <details className="relative">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50">
            <span aria-label="Filter">▼</span>
          </summary>

          <div className="absolute right-0 z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Priority
            </p>

            {(
              [
                ["all", "All priorities"],
                ["high", "High"],
                ["medium", "Medium"],
                ["low", "Low"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onPriorityChange(value)
                }
                className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition ${
                  priorityFilter === value
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{label}</span>

                {priorityFilter === value && (
                  <span>✓</span>
                )}
              </button>
            ))}

            {filtersActive && (
              <button
                type="button"
                onClick={onClearFilters}
                className="mt-2 w-full border-t border-slate-100 px-2 pt-3 text-left text-sm font-medium text-red-600"
              >
                Clear filters
              </button>
            )}
          </div>
        </details>

        <button
          type="button"
          onClick={onAddProject}
          className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <span>+</span>
          <span>Add Project</span>
        </button>
      </div>
    </div>
  );
}