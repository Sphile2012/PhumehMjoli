# Phume - Instagram Clone

Instagram clone built by Phumeh using modern web technologies.

## Tech Stack

This project uses the following technologies:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database)

## Features

- User authentication
- Photo/video sharing
- Stories
- Real-time messaging
- Explore feed
- Reels
- User profiles
- Follow/unfollow system

## Backend & Database

This project uses Supabase for:
- User authentication
- PostgreSQL database
- Real-time subscriptions
- File storage
- Edge functions

## Development Workflow

1. Adjust theme styles in src/index.css and tailwind.config.ts based on requirements
2. Plan and create required pages based on user needs
3. Organize page functionality and create corresponding folders under pages with Index.tsx entry files
4. Configure routes in App.tsx, importing the Index.tsx entry files
5. For simple requirements, implement directly in Index.tsx
6. For complex requirements, split pages into components with this structure:
    - Index.tsx (entry point)
    - /components/ (components)
    - /hooks/ (custom hooks)
    - /stores/ (zustand stores for complex state management)
7. After completing requirements, run pnpm i to install dependencies and use npm run lint & npx tsc --noEmit -p tsconfig.app.json --strict to check and fix issues

## Backend API Integration
- When adding new APIs or Supabase operations, create corresponding API files in src/api and export data types (reference src/demo.ts)
- For Supabase implementations, ensure proper type safety
- Frontend and Supabase implementations must strictly follow defined data types to avoid modifications
- If type changes are needed, check all files referencing those types

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase project and configure environment variables
4. Run development server: `npm run dev`

---
*Cloned by Phumeh*
