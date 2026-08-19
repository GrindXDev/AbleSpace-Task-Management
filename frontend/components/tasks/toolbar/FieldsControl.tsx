"use client";

import { useEffect, useRef, useState } from "react";
import type { VisibleTaskFields } from "@/lib/task-fields";

interface FieldsControlProps {
  visibleFields: VisibleTaskFields;
  onFieldToggle: (field: keyof VisibleTaskFields) => void;
}

const fieldOptions: {
  key: keyof VisibleTaskFields;
  label: string;
}[] = [
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "dueDate", label: "Due date" },
];

export default function FieldsControl({
  visibleFields,
  onFieldToggle,
}: FieldsControlProps) {
  const [fieldsOpen, setFieldsOpen] = useState(false);
  const fieldsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        fieldsMenuRef.current &&
        !fieldsMenuRef.current.contains(event.target as Node)
      ) {
        setFieldsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const hiddenFieldCount = fieldOptions.filter(
    (field) => !visibleFields[field.key],
  ).length;

  function showAllFields() {
    fieldOptions.forEach((field) => {
      if (!visibleFields[field.key]) {
        onFieldToggle(field.key);
      }
    });
  }

  return (
    <div ref={fieldsMenuRef} className="relative">
      <button
        type="button"
        onClick={() => setFieldsOpen((current) => !current)}
        aria-expanded={fieldsOpen}
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm transition-all active:scale-[0.98] ${
          fieldsOpen || hiddenFieldCount > 0
            ? "border-slate-300 bg-slate-100 text-slate-900"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <span className="text-base text-slate-400">⊞</span>
        <span>Fields</span>

        {hiddenFieldCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs text-white">
            {hiddenFieldCount}
          </span>
        )}
      </button>

      {fieldsOpen && (
        <div className="absolute left-0 top-11 z-50 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Visible fields
            </p>

            {hiddenFieldCount > 0 && (
              <button
                type="button"
                onClick={showAllFields}
                className="text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                Show all
              </button>
            )}
          </div>

          <div className="space-y-1">
            {fieldOptions.map((field) => (
              <button
                key={field.key}
                type="button"
                onClick={() => onFieldToggle(field.key)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <span>{field.label}</span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                    visibleFields[field.key]
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-400">
            Task titles and actions always remain visible.
          </p>
        </div>
      )}
    </div>
  );
}