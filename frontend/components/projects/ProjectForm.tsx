"use client";

import { FormEvent } from "react";
import type { ProjectPriority } from "@/lib/api";

interface ProjectFormProps {
  editingProjectId: string | null;
  name: string;
  priority: ProjectPriority;
  lead: string;
  dueDate: string;
  creating: boolean;
  updating: boolean;
  setName: (value: string) => void;
  setPriority: (value: ProjectPriority) => void;
  setLead: (value: string) => void;
  setDueDate: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  editingProjectId,
  name,
  priority,
  lead,
  dueDate,
  creating,
  updating,
  setName,
  setPriority,
  setLead,
  setDueDate,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const submitting = creating || updating;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {editingProjectId
              ? "Edit project"
              : "Add project"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {editingProjectId
              ? "Update the selected project."
              : "Create a new workspace project."}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close project form"
          className="text-xl text-slate-400 hover:text-slate-900"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="project-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Project name
          </label>

          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter project name"
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="project-priority"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Priority
          </label>

          <select
            id="project-priority"
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value as ProjectPriority,
              )
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="project-lead"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Lead
          </label>

          <input
            id="project-lead"
            type="text"
            value={lead}
            onChange={(event) => setLead(event.target.value)}
            placeholder="Enter project lead"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="project-due-date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Due date
          </label>

          <input
            id="project-due-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {editingProjectId
              ? updating
                ? "Updating..."
                : "Update project"
              : creating
                ? "Creating..."
                : "Create project"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}