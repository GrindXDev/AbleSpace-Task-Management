"use client";

import type {
  Project,
  ProjectPriority,
} from "@/lib/api";

export type ProjectField =
  | "priority"
  | "lead"
  | "dueDate"
  | "actions";

const defaultVisibleFields: Record<ProjectField, boolean> = {
  priority: true,
  lead: true,
  dueDate: true,
  actions: true,
};

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  visibleFields?: Record<ProjectField, boolean>;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const priorityLabels: Record<ProjectPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const priorityStyles: Record<ProjectPriority, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};

export default function ProjectList({
  projects,
  loading,
  visibleFields = defaultVisibleFields,
  onEdit,
  onDelete,
}: ProjectListProps) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="grid animate-pulse grid-cols-4 gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0"
          >
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-500">
          □
        </div>

        <h2 className="mt-4 text-base font-semibold text-slate-900">
          No projects found
        </h2>

        <p className="mt-1.5 text-sm text-slate-500">
          No projects match the selected filters.
        </p>
      </section>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Project
            </th>

            {visibleFields.priority && (
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>
            )}

            {visibleFields.lead && (
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lead
              </th>
            )}

            {visibleFields.dueDate && (
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due date
              </th>
            )}

            {visibleFields.actions && (
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project._id}
              className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/70"
            >
              <td className="px-5 py-4">
                <p className="font-medium text-slate-900">
                  {project.name}
                </p>
              </td>

              {visibleFields.priority && (
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      priorityStyles[project.priority]
                    }`}
                  >
                    {priorityLabels[project.priority]}
                  </span>
                </td>
              )}

              {visibleFields.lead && (
                <td className="px-5 py-4 text-sm text-slate-600">
                  {project.lead || "Unassigned"}
                </td>
              )}

              {visibleFields.dueDate && (
                <td className="px-5 py-4 text-sm text-slate-600">
                  {project.dueDate
                    ? new Date(project.dueDate).toLocaleDateString()
                    : "No due date"}
                </td>
              )}

              {visibleFields.actions && (
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(project)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(project._id)}
                      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}