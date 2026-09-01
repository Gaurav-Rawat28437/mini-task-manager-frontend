# Mini Task Manager — Frontend

A responsive Mini Task Management Application built with React.js. The application allows authenticated users to create, view, update, delete, search, filter, sort, and paginate their tasks.

## Features

* User Registration
* User Login
* JWT-based authentication
* Protected task dashboard
* Create tasks
* Edit tasks
* Delete tasks
* Delete confirmation modal
* Search tasks by title
* Filter tasks by status
* Sort tasks
* Pagination
* Loading states
* Empty states
* Error handling
* Responsive design for desktop and mobile
* Toast notifications

## Tech Stack

* React.js
* Vite
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── CreateTaskModal.jsx
│   ├── DeleteConfirmModal.jsx
│   ├── TaskCard.jsx
│   ├── TaskFilters.jsx
│   ├── TaskEmptyState.jsx
│   └── TaskPagination.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Tasks.jsx
│
├── services/
│   ├── authService.js
│   └── taskService.js
│
├── utils/
│   ├── store.js
│   ├── authSlice.js
│   └── taskSlice.js
│
├── App.jsx
└── main.jsx
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Gaurav-Rawat28437/mini-task-manager-frontend.git
```

Go to the project directory:

```bash
cd mini-task-manager-frontend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, replace the URL with your deployed backend API URL.

## Run the Application

Start the development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

## Authentication Flow

1. User creates an account from the Register page.
2. User logs in using email and password.
3. Backend validates the credentials.
4. Backend returns a JWT.
5. The frontend stores the authentication information.
6. Protected task APIs are accessed using the JWT.
7. Users can only manage their own tasks.

## Task Management

Authenticated users can:

* Create a task
* View their tasks
* Edit a task
* Delete a task
* Change task status
* Set task priority
* Set an optional due date
* Search tasks
* Filter tasks by status
* Sort tasks
* Navigate between pages

## Task Status

Available statuses:

```text
Pending
In Progress
Completed
```

## Task Priority

Available priorities:

```text
Low
Medium
High
```

## Sorting

The application supports:

```text
Newest First
Oldest First
Priority: High → Low
Priority: Low → High
Due Date: Earliest
Due Date: Latest
```

## Component Design

The dashboard is divided into reusable components to keep the main `Tasks` component clean and maintainable.

```text
TaskCard
→ Displays individual task information

TaskFilters
→ Handles search, status filtering and sorting

TaskPagination
→ Handles previous and next page navigation

TaskEmptyState
→ Displays empty and no-result states

CreateTaskModal
→ Handles creating and editing tasks

DeleteConfirmModal
→ Confirms task deletion
```

## Error Handling

The frontend handles:

* Invalid login
* Registration errors
* API errors
* Failed task requests
* Empty task lists
* No matching search results
* Loading states
* Delete errors

Error messages are displayed using toast notifications where appropriate.

## Responsive Design

The UI is designed to work across:

* Desktop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used to adapt the layout to different screen sizes.

## Backend

Backend repository:

https://github.com/Gaurav-Rawat28437/mini-task-manager-backend

## Future Improvements

* Task details page
* Better advanced filtering
* Unit and integration tests
* Dark mode
* Drag-and-drop task management
* Deployment automation
