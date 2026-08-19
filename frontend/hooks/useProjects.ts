"use client";

import { useEffect, useState } from "react";
import {
  createProject as apiCreateProject,
  deleteProject as apiDeleteProject,
  getProjects,
  Project,
  ProjectPriority,
  updateProject as apiUpdateProject,
} from "@/lib/api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(data);
    } catch {
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createProject(data: {
    name: string;
    priority: ProjectPriority;
    lead?: string;
    dueDate?: string;
  }) {
    try {
      setError("");

      const newProject = await apiCreateProject(data);

      setProjects((currentProjects) => [
        newProject,
        ...currentProjects,
      ]);

      return newProject;
    } catch {
      setError("Unable to create project.");
      throw new Error("Unable to create project.");
    }
  }

  async function updateProject(
    id: string,
    data: {
      name: string;
      priority: ProjectPriority;
      lead?: string;
      dueDate?: string;
    },
  ) {
    try {
      setError("");

      const updatedProject = await apiUpdateProject(id, data);

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project._id === id ? updatedProject : project,
        ),
      );

      return updatedProject;
    } catch {
      setError("Unable to update project.");
      throw new Error("Unable to update project.");
    }
  }

  async function deleteProject(id: string) {
    try {
      setError("");

      await apiDeleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project._id !== id,
        ),
      );
    } catch {
      setError("Unable to delete project.");
      throw new Error("Unable to delete project.");
    }
  }

  return {
    projects,
    loading,
    error,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}