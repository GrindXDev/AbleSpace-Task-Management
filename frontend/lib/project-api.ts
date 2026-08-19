import { API_URL } from "./api-config";

export type ProjectPriority = "low" | "medium" | "high";

export interface Project {
  _id: string;
  name: string;
  priority: ProjectPriority;
  lead?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  priority?: ProjectPriority;
  lead?: string;
  dueDate?: string;
}

export interface UpdateProjectData {
  name?: string;
  priority?: ProjectPriority;
  lead?: string;
  dueDate?: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getProject(
  id: string,
): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
}

export async function createProject(
  data: CreateProjectData,
): Promise<Project> {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function updateProject(
  id: string,
  data: UpdateProjectData,
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
}

export async function deleteProject(
  id: string,
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}