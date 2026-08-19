"use client";

interface ViewSwitcherProps {
  view: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
}

export default function ViewSwitcher({
  view,
  onViewChange,
}: ViewSwitcherProps) {
  return (
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
  );
}