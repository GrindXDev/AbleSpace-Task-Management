"use client";

import { useEffect, useRef, useState } from "react";

interface SearchControlProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function SearchControl({
  searchQuery,
  onSearchChange,
}: SearchControlProps) {
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

  if (!searchOpen) {
    return (
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
      >
        <span className="text-base text-slate-400">⌕</span>
        <span>Search</span>
      </button>
    );
  }

  return (
    <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
      <span className="text-base text-slate-400">⌕</span>

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
  );
}