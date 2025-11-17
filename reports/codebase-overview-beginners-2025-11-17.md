# Codebase Overview: React Starter Kit (Beginner's Guide)

## Quick Start
**What this project does**: A full-stack web application starter template with user authentication, built using Rails backend and React frontend
**Tech stack**: Ruby on Rails 8, React 19, Inertia.js, PostgreSQL, TypeScript, Tailwind CSS
**Architecture style**: Modern monolith (single codebase with server and client code)

---

## What is This Project?

This is a **starter template** for building modern web applications. Think of it as a fully-furnished house instead of building from scratch - it already has:
- User registration and login
- A dashboard interface
- Beautiful, responsive UI components
- Database setup
- All the plumbing to connect frontend and backend

### The Technology Stack (In Plain English)

**Backend (the "server" - what runs on your computer/cloud)**
- **Ruby on Rails 8**: A popular web framework that handles databases, routing, and server logic
- **PostgreSQL**: A robust database that stores your user data, like emails and passwords

**Frontend (the "client" - what users see in their browser)**
- **React 19**: A JavaScript library for building interactive user interfaces
- **TypeScript**: JavaScript with type checking (helps catch bugs before they happen)
- **Tailwind CSS**: A utility-first CSS framework for styling
- **shadcn/ui**: Pre-built, beautiful UI components (buttons, cards, dialogs, etc.)

**The Magic Bridge**
- **Inertia.js**: Connects Rails and React seamlessly, so they work together like one app
  - Rails sends data to React pages
  - React pages can call Rails backend without complex APIs
  - You get the best of both worlds!

---

## Project Structure

Here's what all those folders mean:

```
react-start-kit-postgres-base/
│
├── app/                          # Main application code
│   ├── controllers/              # Rails: Handles incoming requests
│   ├── models/                   # Rails: Database models (User, Session)
│   ├── mailers/                  # Rails: Sends emails
│   └── frontend/                 # React: Everything users see
│       ├── components/           # Reusable UI pieces
│       ├── pages/                # Full page views
│       ├── layouts/              # Page templates
│       └── entrypoints/          # JavaScript entry points
│
├── config/                       # Configuration files
│   ├── routes.rb                 # URL routing
│   ├── database.yml              # Database settings
│   └── vite.json                 # Frontend build settings
│
├── db/                           # Database files
│   ├── migrate/                  # Database change history
│   └── schema.rb                 # Current database structure
│
├── public/                       # Static files (images, fonts)
├── bin/                          # Executable scripts
├── spec/                         # Tests (RSpec)
│
├── Gemfile                       # Ruby dependencies
├── package.json                  # JavaScript dependencies
└── vite.config.ts                # Frontend build configuration
```

---

## Key Directories Explained

### `/app/controllers` - The Request Handlers

**Purpose**: When someone visits a page or submits a form, controllers decide what to do
**Start here if**: You're adding new pages or features

**Important files**:
- `application_controller.rb` - Base controller, handles authentication for all pages
- `sessions_controller.rb` - Login/logout functionality
- `users_controller.rb` - User registration
- `dashboard_controller.rb` - The main dashboard page

**How it works**: Controllers receive requests, fetch data from models, and send it to React pages via Inertia.

Example from `dashboard_controller.rb`:
```ruby
class DashboardController < ApplicationController
  def index
    # This renders the React page at app/frontend/pages/dashboard/index.tsx
  end
end
```

---

### `/app/models` - Your Data

**Purpose**: Represents your database tables as Ruby objects
**Start here if**: You're working with data storage

**Key files**:
- `user.rb` - User accounts (handles passwords, email validation)
- `session.rb` - User login sessions
- `current.rb` - Tracks the currently logged-in user

**Important concepts**:
- **Validations**: Ensures data is correct before saving (e.g., email format)
- **Associations**: How models relate to each other (e.g., a User has many Sessions)
- **Callbacks**: Automatic actions (e.g., send email when user signs up)

---

### `/app/frontend` - The React Application

This is where all the user interface code lives.

#### `/app/frontend/components`
**Purpose**: Reusable UI building blocks
**Start here if**: You're creating or modifying UI elements

**Structure**:
- `ui/` - Basic components from shadcn/ui (buttons, inputs, cards)
- Root components - App-specific pieces (sidebar, header, nav)

**Example components**:
- `app-sidebar.tsx` - The navigation sidebar
- `app-header.tsx` - Top navigation bar
- `ui/button.tsx` - Styled button component

#### `/app/frontend/pages`
**Purpose**: Full page views that map to URLs
**Start here if**: You're building new pages

**How it works**: Each `.tsx` file is a page that Inertia renders when you visit a route.

**Important pages**:
- `home/index.tsx` - Landing page (path: `/`)
- `dashboard/index.tsx` - Dashboard (path: `/dashboard`)
- `sessions/new.tsx` - Login page (path: `/sign_in`)
- `users/new.tsx` - Registration page (path: `/sign_up`)
- `settings/` - User settings pages

#### `/app/frontend/layouts`
**Purpose**: Templates that wrap around pages
**Start here if**: You're changing the overall page structure

**Key layouts**:
- `persistent-layout.tsx` - Wraps ALL pages (adds flash messages/toasts)
- `app-layout.tsx` - Logged-in user pages (with sidebar)
- `auth-layout.tsx` - Login/signup pages (simpler design)

#### `/app/frontend/hooks`
**Purpose**: Reusable React logic

**Available hooks**:
- `use-appearance.tsx` - Dark/light mode switching
- `use-flash.tsx` - Shows toast notifications
- `use-mobile.ts` - Detects mobile devices

---

### `/config/routes.rb` - The URL Map

**Purpose**: Connects URLs to controller actions
**Start here if**: You're adding new pages or endpoints

**Example**:
```ruby
get  "sign_in", to: "sessions#new"      # GET /sign_in → SessionsController#new
post "sign_in", to: "sessions#create"   # POST /sign_in → SessionsController#create
```

---

### `/db` - Database Files

**Purpose**: Database structure and change history

**Key files**:
- `schema.rb` - Current database structure (auto-generated, don't edit!)
- `migrate/` - Migration files that modify the database

**Migrations**:
- `20250211160810_create_users.rb` - Creates users table
- `20250211160811_create_sessions.rb` - Creates sessions table

---

## Architecture Overview

### How Everything Connects

```
┌─────────────┐
│   Browser   │  User visits http://localhost:3000/dashboard
└──────┬──────┘
       ↓
┌──────────────────────────────────────────┐
│  Rails Server (Port 3000)                │
│  ┌────────────────────────────────────┐  │
│  │ Routes (config/routes.rb)          │  │ Matches URL to controller
│  └───────────┬────────────────────────┘  │
│              ↓                            │
│  ┌────────────────────────────────────┐  │
│  │ DashboardController#index          │  │ Fetches any needed data
│  └───────────┬────────────────────────┘  │
│              ↓                            │
│  ┌────────────────────────────────────┐  │
│  │ Inertia.js                         │  │ Sends data to React
│  └───────────┬────────────────────────┘  │
└──────────────┼──────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  React App (via Vite)                    │
│  ┌────────────────────────────────────┐  │
│  │ pages/dashboard/index.tsx          │  │ Renders the page
│  │ ┌──────────────────────────────┐   │  │
│  │ │ Uses components:             │   │  │
│  │ │ - AppLayout                  │   │  │
│  │ │ - AppSidebar                 │   │  │
│  │ │ - UI components              │   │  │
│  │ └──────────────────────────────┘   │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
               ↓
        User sees beautiful
        dashboard page!
```

### Request Flow: User Login Example

Let's trace what happens when someone logs in:

1. **User submits login form** (`pages/sessions/new.tsx`)
   - Email: user@example.com
   - Password: secretpassword

2. **Form posts to** `/sign_in` (POST request)

3. **Routes** match to `SessionsController#create` (`controllers/sessions_controller.rb`)

4. **Controller**:
   - Finds user by email
   - Verifies password using `User` model
   - Creates a new `Session` record
   - Sets a secure cookie

5. **Redirects to** `/dashboard`

6. **Dashboard page loads**:
   - Routes match to `DashboardController#index`
   - Inertia renders `pages/dashboard/index.tsx`
   - React displays the dashboard with sidebar

---

## Authentication System

### How Login Works

**Session-based authentication** (not JWT):
- When you log in, Rails creates a `Session` record in the database
- A secure cookie is sent to your browser with the session ID
- Every request includes this cookie
- Rails looks up the session to identify you

**Key files**:
- `app/models/user.rb` - User model with `has_secure_password` (encrypts passwords)
- `app/models/session.rb` - Stores active login sessions
- `app/controllers/sessions_controller.rb` - Login/logout logic
- `app/controllers/application_controller.rb:12` - `authenticate` method (checks if logged in)

**Protected pages**:
Most pages require login via `before_action :authenticate` in ApplicationController.

**Public pages** (skip authentication):
- Home page (`/`)
- Login page (`/sign_in`)
- Registration page (`/sign_up`)
- Password reset pages

---

## Core Components

### User Interface Components

This starter kit uses **shadcn/ui**, a collection of copy-paste components.

**Location**: `app/frontend/components/ui/`

**Commonly used components**:
- `Button` - Clickable buttons with variants (default, destructive, outline, ghost)
- `Input` - Form text inputs
- `Card` - Container for content
- `Dialog` - Modal popups
- `DropdownMenu` - Dropdown menus
- `Sidebar` - Collapsible navigation sidebar
- `Avatar` - User profile pictures/initials
- `Badge` - Small labels or tags

**How to use them**:
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
```

### Custom App Components

**Location**: `app/frontend/components/`

- `app-sidebar.tsx` - Main navigation sidebar
- `app-header.tsx` - Top header bar
- `nav-user.tsx` - User menu with profile/settings/logout
- `breadcrumbs.tsx` - Navigation breadcrumbs
- `appearance-dropdown.tsx` - Theme switcher (light/dark/system)

---

## Database Layer

### Current Tables

**Users table** (`app/models/user.rb`):
- `name` - User's full name
- `email` - Email address (unique, required)
- `password_digest` - Encrypted password
- `verified` - Email verification status

**Sessions table** (`app/models/session.rb`):
- `user_id` - References users table
- `user_agent` - Browser/device info
- `ip_address` - IP address of login

**Relationships**:
```ruby
User has_many :sessions
Session belongs_to :user
```

---

## Development Workflow

### Getting Started (First Time Setup)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-start-kit-postgres-base
   ```

2. **Run setup script** (does everything automatically!)
   ```bash
   bin/setup
   ```

   This will:
   - Install Ruby dependencies (gems)
   - Install JavaScript dependencies (npm packages)
   - Create the database
   - Run migrations
   - Start the development server

3. **Open browser**
   - Navigate to `http://localhost:3000`
   - You should see the welcome page!

### Daily Development

**Start the server**:
```bash
bin/dev
```

This starts TWO processes (via Procfile.dev):
1. **Rails server** (port 3000) - Backend
2. **Vite dev server** - Frontend with hot-reload

**Stop the server**: Press `Ctrl+C`

---

## Making Changes

### Adding a New Page

Let's add a "About" page as an example:

**Step 1: Create a controller**
```bash
bin/rails generate controller About index
```

**Step 2: Create the React page**
Create `app/frontend/pages/about/index.tsx`:
```tsx
import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"

export default function About() {
  return (
    <AppLayout>
      <Head title="About" />
      <div className="p-8">
        <h1 className="text-2xl font-bold">About Us</h1>
        <p>This is the about page!</p>
      </div>
    </AppLayout>
  )
}
```

**Step 3: Add a route**
Edit `config/routes.rb`:
```ruby
get :about, to: "about#index"
```

**Step 4: Update the controller**
Edit `app/controllers/about_controller.rb`:
```ruby
class AboutController < ApplicationController
  def index
    # Inertia automatically renders pages/about/index.tsx
  end
```

**Step 5: Add to navigation**
Edit `app/frontend/components/app-sidebar.tsx`:
```tsx
import { aboutPath } from "@/routes"

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: dashboardPath(), icon: LayoutGrid },
  { title: "About", href: aboutPath(), icon: BookOpen }, // Add this
]
```

**Done!** Visit `http://localhost:3000/about`

---

### Adding a UI Component

**Example: Add a custom card component**

Create `app/frontend/components/feature-card.tsx`:
```tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
```

**Use it in a page**:
```tsx
import { FeatureCard } from "@/components/feature-card"

<FeatureCard
  title="Fast"
  description="Lightning quick performance"
/>
```

---

### Working with the Database

**Create a new model**:
```bash
bin/rails generate model Post title:string content:text user:references
```

This creates:
- `app/models/post.rb` - The model
- `db/migrate/xxx_create_posts.rb` - Migration file

**Run the migration**:
```bash
bin/rails db:migrate
```

**Add associations**:
Edit `app/models/user.rb`:
```ruby
has_many :posts, dependent: :destroy
```

Edit `app/models/post.rb`:
```ruby
belongs_to :user
validates :title, presence: true
```

---

## Important Files to Know

### Configuration Files

**Backend**:
- `Gemfile` - Ruby gem dependencies (like package.json for Ruby)
- `config/database.yml` - PostgreSQL connection settings
- `config/routes.rb` - URL to controller mapping
- `config/application.rb` - Rails app configuration

**Frontend**:
- `package.json` - JavaScript dependencies and scripts
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript compiler settings
- `tailwind.config.js` - Tailwind CSS customization

### Entry Points

**Backend**: `config.ru` → `config/application.rb` → Rails boots

**Frontend**: `app/frontend/entrypoints/inertia.ts`
- Sets up Inertia.js
- Configures page loading
- Initializes theme (dark/light mode)
- Sets app title format

### Key Utilities

**Frontend**:
- `app/frontend/lib/utils.ts` - `cn()` function for merging CSS classes
- `app/frontend/routes/index.d.ts` - TypeScript route helpers (auto-generated)
- `app/frontend/types/index.ts` - TypeScript type definitions

---

## Common Tasks

### Running Tests

**Backend tests** (RSpec):
```bash
bin/rails spec
```

**Run specific test**:
```bash
bin/rails spec spec/models/user_spec.rb
```

### Linting & Formatting

**TypeScript/React linting**:
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

**Code formatting** (Prettier):
```bash
npm run format      # Check formatting
npm run format:fix  # Auto-format files
```

**Ruby linting** (RuboCop):
```bash
bundle exec rubocop
bundle exec rubocop -a  # Auto-fix
```

### Database Tasks

**Reset database** (careful! deletes all data):
```bash
bin/rails db:reset
```

**Rollback last migration**:
```bash
bin/rails db:rollback
```

**Check migration status**:
```bash
bin/rails db:migrate:status
```

---

## Understanding Inertia.js

### What Problem Does It Solve?

Traditional approaches:
1. **Server-rendered**: Rails renders HTML (slow, not interactive)
2. **SPA + API**: Separate React app + JSON API (complex, duplicate code)

**Inertia.js**: Best of both worlds!
- Routes and controllers in Rails (familiar!)
- Pages in React (interactive!)
- No API needed (Inertia handles data transfer)

### How It Works

**Rails controller**:
```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
    # Inertia automatically passes @post to React
  end
end
```

**React page** receives data as props:
```tsx
interface Props {
  post: {
    id: number
    title: string
    content: string
  }
}

export default function ShowPost({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

**Form submission** (back to Rails):
```tsx
import { useForm } from "@inertiajs/react"

const { data, setData, post } = useForm({
  title: '',
  content: ''
})

const handleSubmit = (e) => {
  e.preventDefault()
  post('/posts')  // Posts to Rails controller
}
```

---

## Styling with Tailwind CSS

### Utility-First CSS

Instead of writing custom CSS, you apply utility classes:

```tsx
// Traditional CSS
<div className="card">...</div>

// Tailwind CSS
<div className="rounded-lg border bg-white p-6 shadow-sm">
  ...
</div>
```

**Common utilities**:
- Layout: `flex`, `grid`, `block`, `hidden`
- Spacing: `p-4` (padding), `m-2` (margin), `gap-4` (gap)
- Sizing: `w-full` (width 100%), `h-screen` (height 100vh)
- Colors: `bg-white`, `text-gray-900`, `border-gray-200`
- Typography: `text-lg`, `font-bold`, `leading-tight`
- Responsive: `md:flex` (flex on medium screens+)
- Dark mode: `dark:bg-gray-900` (in dark mode)

### The `cn()` Helper

Located in `app/frontend/lib/utils.ts`:

```tsx
import { cn } from "@/lib/utils"

// Merge classes, handle conditionals
<Button className={cn(
  "base-styles",
  isActive && "active-styles",
  className  // Allow overrides
)} />
```

---

## Common Patterns & Conventions

### File Naming

**Rails (Ruby)**:
- Files: `snake_case.rb`
- Classes: `PascalCase`
- Methods: `snake_case`

**React (TypeScript)**:
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Variables: `camelCase`

### Import Paths

Use `@/` alias for cleaner imports:

```tsx
// ✅ Good
import { Button } from "@/components/ui/button"
import type { User } from "@/types"

// ❌ Avoid
import { Button } from "../../../components/ui/button"
```

### Component Patterns

**Functional components with TypeScript**:
```tsx
interface MyComponentProps {
  title: string
  count?: number  // Optional prop
}

export default function MyComponent({ title, count = 0 }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
    </div>
  )
}
```

---

## Deployment

This starter kit includes **Kamal** for easy deployment.

**Configuration**: `config/deploy.yml`

**Deploy to production**:
```bash
kamal setup    # First time setup
kamal deploy   # Deploy updates
```

Kamal packages your app as a Docker container and deploys it to your server.

---

## Troubleshooting

### Common Issues

**Port 3000 already in use**:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

**Database connection error**:
```bash
# Ensure PostgreSQL is running
brew services start postgresql  # macOS
sudo service postgresql start   # Linux
```

**Node modules issues**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Gem issues**:
```bash
bundle install
```

**Inertia page not found**:
- Check the file exists at `app/frontend/pages/{name}.tsx`
- Restart the dev server (`bin/dev`)

---

## Next Steps

### To Learn More

**Official Documentation**:
- [Inertia Rails Docs](https://inertia-rails.dev) - How Rails & React connect
- [Rails Guides](https://guides.rubyonrails.org) - Learn Rails
- [React Docs](https://react.dev) - Learn React
- [shadcn/ui](https://ui.shadcn.com) - Browse UI components
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling utilities

### Suggested Learning Path

**Week 1: Explore**
1. Run `bin/setup` and explore the app
2. Sign up, log in, visit settings pages
3. Read the code for pages you visited
4. Trace a request from route → controller → page

**Week 2: Modify**
1. Add a new page (like the About page example)
2. Customize the theme colors (Tailwind config)
3. Add a field to the User model
4. Create a custom component

**Week 3: Build**
1. Add a new feature (e.g., posts, comments, todos)
2. Write tests for your feature
3. Deploy to a staging server

---

## Getting Help

### Quick Questions
- Check the official docs linked above
- Search GitHub issues: [inertia-rails/react-starter-kit](https://github.com/inertia-rails/react-starter-kit)

### Debugging
- Use `console.log()` in React components
- Use `binding.break` in Rails controllers/models (opens debugger)
- Check Rails logs: `tail -f log/development.log`
- Check browser console for JavaScript errors

### Code Understanding
- Read existing code to understand patterns
- Look at similar features (e.g., to add posts, study how sessions work)
- Use the directory structure diagram in this doc

---

## Glossary

**Common Terms in This Codebase**:

- **Inertia**: The bridge between Rails and React, handles data transfer
- **Controller**: Rails class that handles HTTP requests
- **Model**: Rails class representing database tables
- **Migration**: File that modifies database structure
- **Component**: Reusable React UI element
- **Page**: Full-page React view (one per route)
- **Layout**: Template that wraps pages
- **Hook**: Reusable React logic (useState, useEffect, custom hooks)
- **Props**: Data passed to React components
- **Route**: URL pattern mapped to a controller action
- **Session**: User's logged-in state
- **Vite**: Fast build tool for JavaScript/TypeScript
- **shadcn/ui**: Component library used for UI
- **Tailwind**: Utility-first CSS framework
- **TypeScript**: JavaScript with type checking
- **SSR**: Server-Side Rendering (optional in this kit)

---

## Project Philosophy

This starter kit follows these principles:

1. **Convention over Configuration**: Follows Rails and React best practices
2. **Monolith Architecture**: Single codebase is simpler than microservices
3. **Modern Stack**: Uses latest stable versions
4. **Developer Experience**: Fast builds, hot reload, good error messages
5. **Production Ready**: Authentication, deployment, testing all included

---

## Summary

You now have a comprehensive map of the codebase! Remember:

- **Backend** = Rails (controllers, models, database)
- **Frontend** = React (components, pages, layouts)
- **Bridge** = Inertia.js (connects them seamlessly)
- **Styling** = Tailwind CSS (utility classes)
- **UI** = shadcn/ui components

**Start small**: Modify existing pages, add simple features, and gradually build confidence. The code is well-organized and follows consistent patterns - once you understand one controller/page/component, you'll understand them all!

Happy coding! 🚀
