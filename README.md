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
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── sidebar.tsx
│   │   ├── ui/
│   │   │   └── button.tsx
│   │   └── tasks/
│   │       ├── TaskBoard.tsx
│   │       ├── TaskCard.tsx
│   │       ├── TaskForm.tsx
│   │       ├── TaskList.tsx
│   │       └── TaskToolbar.tsx
│   ├── hooks/
│   │   └── useTasks.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── task/
│   │   │   ├── dto/
│   │   │   ├── schemas/
│   │   │   ├── task.controller.ts
│   │   │   ├── task.module.ts
│   │   │   └── task.service.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md