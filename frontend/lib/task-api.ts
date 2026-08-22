import { API_URL } from "./api-config";

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  userId: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

function getUserQuery(userId: string): string {
  return new URLSearchParams({ userId }).toString();
}

export async function getTasks(
  userId: string,
): Promise<Task[]> {
  const query = getUserQuery(userId);

  const response = await fetch(`${API_URL}/tasks?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

export async function getTask(
  id: string,
  userId: string,
): Promise<Task> {
  const query = getUserQuery(userId);

  const response = await fetch(
    `${API_URL}/tasks/${id}?${query}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
}

export async function createTask(
  data: CreateTaskData,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

export async function updateTask(
  id: string,
  data: UpdateTaskData,
  userId: string,
): Promise<Task> {
  const query = getUserQuery(userId);

  const response = await fetch(
    `${API_URL}/tasks/${id}?${query}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}

export async function deleteTask(
  id: string,
  userId: string,
): Promise<Task> {
  const query = getUserQuery(userId);

  const response = await fetch(
    `${API_URL}/tasks/${id}?${query}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}