"use client";

interface TaskToolbarProps {
  view: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
  onAddTask: () => void;
}

export default function TaskToolbar({
  view,
  onViewChange,
  onAddTask,
}: TaskToolbarProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">⌕</span>
            <span>Search</span>
          </button>

          {/* Filter */}
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">☷</span>
            <span>Filter</span>
          </button>

          {/* Fields */}
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">⊞</span>
            <span>Fields</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* View Switcher */}
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

          {/* Add Task */}
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