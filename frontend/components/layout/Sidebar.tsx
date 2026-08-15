"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Tasks",
    href: "/",
    icon: "✓",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: "▣",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Workspace */}
      <div className="border-b border-slate-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              AbleSpace
            </p>

            <p className="truncate text-xs text-slate-500">
              Workspace
            </p>
          </div>

          <span className="text-xs text-slate-400">⌄</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-sm">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
            PM
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium text-slate-900">
              User
            </p>

            <p className="truncate text-xs text-slate-500">
              Profile
            </p>
          </div>

          <span className="text-slate-400">⋯</span>
        </button>
      </div>
    </aside>
  );
}