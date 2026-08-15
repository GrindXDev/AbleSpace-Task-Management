"use client";

interface HeaderProps {
  onRefresh: () => void;
}

export default function Header({ onRefresh }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          Tasks
        </h1>

        <p className="text-xs text-slate-500">
          Manage your tasks
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 transition hover:bg-slate-50"
        >
          <span>⌕</span>
          <span>Search</span>
        </button>

        {/* Filter */}
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span>☷</span>
          <span>Filter</span>
        </button>

        {/* Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span>↻</span>
          <span>Refresh</span>
        </button>

        {/* Add Task */}
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <span>+</span>
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}