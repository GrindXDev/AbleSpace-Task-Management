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
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span>⌕</span>
          <span>Search</span>
        </button>

        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span>☷</span>
          <span>Filter</span>
        </button>

        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span>⊞</span>
          <span>Fields</span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* View switcher */}
        <div className="flex rounded-lg border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              view === "list"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            List
          </button>

          <button
            type="button"
            onClick={() => onViewChange("board")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              view === "board"
                ? "bg-slate-100 text-slate-900"
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
          className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <span>+</span>
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}