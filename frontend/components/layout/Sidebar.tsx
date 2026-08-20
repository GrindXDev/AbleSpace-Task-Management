"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGuestAuth } from "@/hooks/useGuestAuth";

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
  const { logout } = useGuestAuth();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  return (
    <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col self-start border-r border-slate-200 bg-white md:w-64">
      
      <div className="border-b border-slate-200 px-2 py-4 md:px-4">
        <button
          type="button"
          title="AbleSpace Workspace"
          className="flex w-full items-center justify-center gap-3 rounded-lg px-0 py-2 text-left transition hover:bg-slate-50 md:justify-start md:px-2"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden min-w-0 flex-1 md:block">
            <p className="truncate text-sm font-semibold text-slate-900">
              AbleSpace
            </p>

            <p className="truncate text-xs text-slate-500">
              Workspace
            </p>
          </div>

          <span className="hidden text-xs text-slate-400 md:inline">
            ⌄
          </span>
        </button>
      </div>

      
      <nav className="flex-1 px-2 py-4 md:px-3">
        <p className="mb-2 hidden px-2 text-xs font-medium uppercase tracking-wide text-slate-400 md:block">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`,
                  );

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                aria-label={item.name}
                aria-current={
                  isActive ? "page" : undefined
                }
                className={`flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition md:justify-start md:px-3 ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center text-sm">
                  {item.icon}
                </span>

                <span className="hidden md:inline">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      
      {showProfileMenu && (
        <div className="fixed bottom-20 left-20 z-30 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg md:absolute md:left-3 md:right-3 md:w-auto">
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="text-sm font-semibold text-slate-900">
              User
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              Manage your account
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/profile"
              onClick={() =>
                setShowProfileMenu(false)
              }
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                pathname === "/profile"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>♙</span>
              <span>Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() =>
                setShowProfileMenu(false)
              }
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                pathname === "/settings"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>⚙</span>
              <span>Settings</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(false);
                logout();
              }}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <span>↪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      
      <div className="border-t border-slate-200 p-2 md:p-3">
        <button
          type="button"
          title="User menu"
          aria-label="Open user menu"
          aria-expanded={showProfileMenu}
          onClick={() =>
            setShowProfileMenu(
              (currentValue) => !currentValue,
            )
          }
          className={`flex w-full items-center justify-center gap-3 rounded-lg px-2 py-2 transition md:justify-start ${
            showProfileMenu ||
            pathname === "/profile" ||
            pathname === "/settings"
              ? "bg-slate-100"
              : "hover:bg-slate-50"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            PM
          </div>

          <div className="hidden min-w-0 flex-1 text-left md:block">
            <p className="truncate text-sm font-medium text-slate-900">
              User
            </p>

            <p className="truncate text-xs text-slate-500">
              Profile
            </p>
          </div>

          <span className="hidden text-slate-400 md:inline">
            {showProfileMenu ? "⌃" : "⋯"}
          </span>
        </button>
      </div>
    </aside>
  );
}