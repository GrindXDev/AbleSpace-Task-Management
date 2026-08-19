"use client";

import { useEffect, useRef, useState } from "react";

interface TaskToolbarProps {
  view: "list" | "board";
  onViewChange: (view: "list" | "board") => void;
  onAddTask: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function TaskToolbar({
  view,
  onViewChange,
  onAddTask,
  searchQuery,
  onSearchChange,
}: TaskToolbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function closeSearch() {
    onSearchChange("");
    setSearchOpen(false);
  }

  return (
    <div className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div className="flex flex-wrap items-center gap-2">
          
          {searchOpen ? (
            <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
              <span className="text-base text-slate-400">⌕</span>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
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
              <span className="text-base text-slate-400">⌕</span>
              <span>Search</span>
            </button>
          )}

          
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">☷</span>
            <span>Filter</span>
          </button>

          
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
          >
            <span className="text-base text-slate-400">⊞</span>
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