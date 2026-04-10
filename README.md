# Task Manager Pro

An elegant, full-stack task management web application built with modern technologies. Manage your tasks efficiently with a polished dashboard experience, real-time analytics, and intuitive task organization.

## 🎯 Features

- **User Authentication** — Secure Manus OAuth integration with protected routes and session management
- **Full Task CRUD Operations** — Create, read, update, and delete tasks with comprehensive field support
- **Task Fields** — Title, description, priority (Low/Medium/High), status (To Do/In Progress/Done), due date, and category (Work/Personal/Study/Other)
- **Dashboard Analytics** — Real-time stat cards showing total, completed, in-progress, and pending task counts
- **Visual Analytics** — Recharts bar chart (Tasks by Status) and pie chart (Task Distribution) for data visualization
- **Advanced Filtering** — Filter tasks by status, priority, and category with real-time results
- **Task Search** — Search tasks by title with instant results
- **Task Modal Form** — Intuitive form for creating and editing tasks with built-in validation
- **Responsive Design** — DashboardLayout with sidebar navigation for seamless multi-page experience
- **Overdue Task Highlighting** — Visual indicators for tasks past their due date
- **Formatted Due Dates** — Human-readable date formatting on task cards

## 🛠️ Tech Stack

### Frontend
- **React 19** — Modern UI library with hooks and concurrent features
- **Tailwind CSS 4** — Utility-first CSS framework for responsive design
- **shadcn/ui** — High-quality, accessible React components
- **Recharts** — Composable charting library for data visualization
- **React Hook Form** — Performant, flexible form validation
- **Zod** — TypeScript-first schema validation
- **Wouter** — Lightweight client-side router
- **Framer Motion** — Animation library for smooth interactions

### Backend
- **Express 4** — Minimal and flexible Node.js web framework
- **tRPC 11** — End-to-end type-safe APIs with automatic client code generation
- **Drizzle ORM** — Lightweight, type-safe SQL query builder
- **MySQL/TiDB** — Relational database for data persistence
- **Manus OAuth** — Secure authentication and user management

### Development
- **Vite 7** — Next-generation frontend build tool
- **TypeScript 5.9** — Strongly typed JavaScript for better development experience
- **Vitest** — Unit testing framework for tRPC procedures
- **Prettier** — Code formatter for consistent style
- **pnpm** — Fast, disk space-efficient package manager

## 📋 Project Structure

```
task-manager-prod/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx       # Dashboard with analytics
│   │   │   ├── Tasks.tsx           # Task list with filtering
│   │   │   ├── Home.tsx            # Landing page
│   │   │   └── NotFound.tsx        # 404 page
│   │   ├── components/
│   │   │   ├── DashboardLayout.tsx # Main layout with sidebar
│   │   │   ├── TaskModal.tsx       # Task creation/editing modal
│   │   │   ├── ErrorBoundary.tsx   # Error handling
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx    # Theme management
│   │   ├── hooks/
│   │   │   └── useAuth.tsx         # Authentication hook
│   │   ├── lib/
│   │   │   └── trpc.ts             # tRPC client configuration
│   │   ├── App.tsx                 # Main app component with routing
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   └── public/                      # Static assets
├── server/                          # Backend Express application
│   ├── db.ts                        # Database query helpers
│   ├── routers.ts                   # tRPC procedure definitions
│   ├── tasks.test.ts                # Unit tests for task procedures
│   ├── auth.logout.test.ts          # Authentication tests
│   ├── storage.ts                   # S3 file storage helpers
│   └── _core/                       # Framework core (OAuth, context, etc.)
├── drizzle/                         # Database schema and migrations
│   ├── schema.ts                    # Drizzle ORM table definitions
│   └── 0001_chubby_veda.sql        # Initial migration SQL
├── shared/                          # Shared constants and types
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** 10+
- **MySQL** or **TiDB** database instance
- **Manus OAuth** credentials (provided by Manus platform)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TilakRajendran/Task-manager-.git
   cd Task-manager-
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root with the following variables:
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-secret-key-here
   VITE_APP_ID=your-manus-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://portal.manus.im
   OWNER_OPEN_ID=your-owner-open-id
   OWNER_NAME=Your Name
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your-api-key
   VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   ```

4. **Apply database migrations**
   ```bash
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## 📖 Usage

### Dashboard

The Dashboard provides a comprehensive overview of your tasks:

- **Stat Cards** — Display total tasks, completed, in-progress, and pending counts
- **Tasks by Status Chart** — Bar chart showing task distribution across statuses
- **Task Distribution Chart** — Pie chart showing task breakdown by priority or category

### Task Management

1. **Create a Task**
   - Click "New Task" button
   - Fill in the task title (required)
   - Add description (optional)
   - Select priority level (Low/Medium/High)
   - Set status (To Do/In Progress/Done)
   - Choose due date (optional)
   - Select category (Work/Personal/Study/Other)
   - Click "Create Task"

2. **View Tasks**
   - Navigate to the Tasks page
   - All your tasks are displayed in a list format
   - Each task shows title, description, priority badge, category tag, and creation date

3. **Filter Tasks**
   - Use "All Statuses" dropdown to filter by status
   - Use "All Priorities" dropdown to filter by priority
   - Use "All Categories" dropdown to filter by category
   - Click "Clear Filters" to reset all filters

4. **Search Tasks**
   - Use the search box to find tasks by title
   - Search results update in real-time

5. **Edit a Task**
   - Click the edit icon on a task card
   - Modify any fields in the modal
   - Click "Update Task" to save changes

6. **Delete a Task**
   - Click the delete icon on a task card
   - Confirm deletion in the dialog

## 🧪 Testing

Run the test suite to verify all tRPC procedures work correctly:

```bash
pnpm test
```

Tests cover:
- Task CRUD operations (create, read, update, delete)
- Task filtering by status, priority, and category
- Task search functionality
- Task statistics calculation
- Authentication and logout

## 🏗️ Database Schema

### Users Table
```sql
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `openId` VARCHAR(64) UNIQUE NOT NULL,
  `name` TEXT,
  `email` VARCHAR(320),
  `loginMethod` VARCHAR(64),
  `role` ENUM('user', 'admin') DEFAULT 'user',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
  `status` ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
  `dueDate` DATETIME,
  `category` ENUM('Work', 'Personal', 'Study', 'Other') DEFAULT 'Other',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
  PRIMARY KEY (`id`)
);
```

## 🔐 Authentication

The application uses **Manus OAuth** for secure user authentication:

1. Users click the login button and are redirected to the Manus OAuth portal
2. After successful authentication, users are redirected back with a session cookie
3. The session cookie is used for all subsequent API requests
4. Protected routes ensure only authenticated users can access the dashboard and tasks
5. Users can logout, which clears the session cookie

## 🎨 Design & UI

The application features:

- **Elegant Typography** — Clean, readable fonts with proper hierarchy
- **Responsive Layout** — Works seamlessly on desktop, tablet, and mobile devices
- **Polished Components** — shadcn/ui components with consistent styling
- **Cohesive Color Scheme** — Light theme with carefully chosen accent colors
- **Smooth Interactions** — Framer Motion animations for natural transitions
- **Accessibility** — WCAG-compliant components with proper ARIA labels
- **Dark Mode Ready** — Theme context supports easy dark mode implementation

## 📦 Build & Deployment

### Build for Production

```bash
pnpm build
```

This creates:
- `dist/` — Optimized frontend bundle
- `dist/index.js` — Compiled backend server

### Start Production Server

```bash
pnpm start
```

The server will start on the port specified in your environment (default: 3000).

## 🔄 API Reference

All APIs are exposed through tRPC procedures under `/api/trpc`. Here are the main endpoints:

### Authentication
- `auth.me` — Get current authenticated user
- `auth.logout` — Logout current user

### Tasks
- `tasks.create` — Create a new task
- `tasks.list` — Get filtered list of tasks
- `tasks.get` — Get a specific task by ID
- `tasks.update` — Update an existing task
- `tasks.delete` — Delete a task
- `tasks.stats` — Get task statistics (total, completed, in-progress, pending)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Manus](https://manus.im) — AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)
- API framework by [tRPC](https://trpc.io/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** April 10, 2026

**Version:** 1.0.0

**Status:** Production Ready ✅
