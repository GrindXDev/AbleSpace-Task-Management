"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import type {
  Project,
  ProjectPriority,
} from "@/lib/api";

import { useProjects } from "@/hooks/useProjects";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ProjectForm from "@/components/projects/ProjectForm";

import ProjectList, {
  type ProjectField,
} from "@/components/projects/ProjectList";

import ProjectToolbar, {
  type ProjectPriorityFilter,
} from "@/components/projects/ProjectToolbar";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();

  const [searchQuery, setSearchQuery] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState<ProjectPriorityFilter>("all");

  const [visibleFields, setVisibleFields] = useState<
    Record<ProjectField, boolean>
  >({
    priority: true,
    lead: true,
    dueDate: true,
    actions: true,
  });

  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [editingProjectId, setEditingProjectId] = useState<
    string | null
  >(null);

  const [name, setName] = useState("");

  const [priority, setPriority] =
    useState<ProjectPriority>("medium");

  const [lead, setLead] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  function resetForm() {
    setName("");
    setPriority("medium");
    setLead("");
    setDueDate("");
    setEditingProjectId(null);
  }

  function handleAddProject() {
    resetForm();
    setShowProjectForm(true);
  }

  function handleCancelForm() {
    resetForm();
    setShowProjectForm(false);
  }

  function handleEdit(project: Project) {
    setEditingProjectId(project._id);
    setName(project.name);
    setPriority(project.priority);
    setLead(project.lead ?? "");

    if (project.dueDate) {
      setDueDate(project.dueDate.slice(0, 10));
    } else {
      setDueDate("");
    }

    setShowProjectForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const projectData = {
      name: name.trim(),
      priority,
      lead: lead.trim() || undefined,
      dueDate: dueDate || undefined,
    };

    try {
      if (editingProjectId) {
        setUpdating(true);

        await updateProject(
          editingProjectId,
          projectData,
        );
      } else {
        setCreating(true);

        await createProject(projectData);
      }

      resetForm();
      setShowProjectForm(false);
    } catch {
      return;
    } finally {
      setCreating(false);
      setUpdating(false);
    }
  }

  async function handleDeleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(id);

      if (editingProjectId === id) {
        handleCancelForm();
      }
    } catch {
      return;
    }
  }

  function handleToggleField(field: ProjectField) {
    setVisibleFields((currentFields) => ({
      ...currentFields,
      [field]: !currentFields[field],
    }));
  }

  function handleClearFilters() {
    setSearchQuery("");
    setPriorityFilter("all");
  }

  const normalizedSearch = searchQuery
    .trim()
    .toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !normalizedSearch ||
      project.name
        .toLowerCase()
        .includes(normalizedSearch) ||
      (project.lead ?? "")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesPriority =
      priorityFilter === "all" ||
      project.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header
          title="Projects"
          subtitle="Manage your projects"
          onRefresh={loadProjects}
        />

        <ProjectToolbar
          searchQuery={searchQuery}
          priorityFilter={priorityFilter}
          visibleFields={visibleFields}
          onSearchChange={setSearchQuery}
          onPriorityChange={setPriorityFilter}
          onToggleField={handleToggleField}
          onClearFilters={handleClearFilters}
          onAddProject={handleAddProject}
        />

        <div className="mx-auto max-w-7xl px-6 py-6">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Projects
            </h2>

            <p className="text-sm text-slate-500">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}

              {(searchQuery.trim() ||
                priorityFilter !== "all") &&
                ` found out of ${projects.length}`}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
            {showProjectForm && (
              <ProjectForm
                editingProjectId={editingProjectId}
                name={name}
                priority={priority}
                lead={lead}
                dueDate={dueDate}
                creating={creating}
                updating={updating}
                setName={setName}
                setPriority={setPriority}
                setLead={setLead}
                setDueDate={setDueDate}
                onSubmit={handleSubmit}
                onCancel={handleCancelForm}
              />
            )}

            <section
              className={
                showProjectForm
                  ? ""
                  : "lg:col-span-2"
              }
            >
              <ProjectList
                projects={filteredProjects}
                loading={loading}
                visibleFields={visibleFields}
                onEdit={handleEdit}
                onDelete={handleDeleteProject}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}