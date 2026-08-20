# Task Management System

A full-stack task management application built as part of the AbleSpace Full Stack Developer technical assessment.

The application allows users to create, update, delete, and organize tasks using both List and Board views.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- TypeScript
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- VS Code

## Features

- Create tasks
- Edit tasks
- Delete tasks
- View tasks in List view
- View tasks in Board view
- Task status management
  - To Do
  - In Progress
  - Completed
- Task priority management
  - Low
  - Medium
  - High
- Due dates
- Task descriptions
- Task count
- Refresh tasks from the backend
- Loading states
- Empty states
- Form validation
- Responsive UI

## Project Structure

AbleSpace-Task-Management/
├── frontend/
│   ├── app/
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── profile/
│   │   │   ├── ProfileActions.tsx
│   │   │   ├── ProfileFields.tsx
│   │   │   ├── ProfilePicture.tsx
│   │   │   └── WorkspaceAccess.tsx
│   │   ├── projects/
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   └── ProjectToolbar.tsx
│   │   ├── settings/
│   │   │   ├── AppearanceSettings.tsx
│   │   │   └── ThemeInitializer.tsx
│   │   ├── tasks/
│   │   │   ├── TaskBoard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskToolbar.tsx
│   │   └── ui/
│   │       └── button.tsx
│   │
│   ├── hooks/
│   │   ├── useProfile.ts
│   │   ├── useProjects.ts
│   │   ├── useSettings.ts
│   │   └── useTasks.ts
│   │
│   ├── lib/
│   │   ├── api-config.ts
│   │   ├── api.ts
│   │   ├── profile.ts
│   │   ├── project-api.ts
│   │   ├── settings.ts
│   │   ├── task-api.ts
│   │   ├── task-fields.ts
│   │   └── utils.ts
│   │
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── project/
│   │   │   ├── dto/
│   │   │   │   ├── create-project.dto.ts
│   │   │   │   └── update-project.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── project.schema.ts
│   │   │   ├── project.controller.ts
│   │   │   ├── project.module.ts
│   │   │   └── project.service.ts
│   │   │
│   │   ├── task/
│   │   │   ├── dto/
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── task.schema.ts
│   │   │   ├── task.controller.ts
│   │   │   ├── task.module.ts
│   │   │   └── task.service.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md