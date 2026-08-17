"use client";

interface HeaderProps {
  onRefresh: () => void;
}

export default function Header({ onRefresh }: HeaderProps) {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Tasks
        </h1>

        <p className="mt-0.5 text-xs text-slate-500">
          Manage your tasks
        </p>
      </div>

      {/* Refresh */}
      <button
        type="button"
        onClick={onRefresh}
        className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
      >
        <span className="text-base">↻</span>
        <span>Refresh</span>
      </button>
    </header>
  );
}