# AI Development Rules - Regalos Dorados

This document outlines the technical standards and architectural decisions for the Regalos Dorados project.

## Tech Stack

- **Framework**: React 18 with Vite for fast development and optimized builds.
- **Language**: TypeScript for type safety and better developer experience.
- **Styling**: Tailwind CSS for utility-first styling and responsive design.
- **UI Components**: shadcn/ui (built on Radix UI) for accessible, high-quality components.
- **Icons**: Lucide React for a consistent and lightweight icon set.
- **Routing**: React Router (using `HashRouter`) for client-side navigation.
- **Backend & Auth**: Supabase for database management, authentication, and storage.
- **Data Fetching**: TanStack Query (React Query) for efficient server state management.
- **Forms**: React Hook Form combined with Zod for schema-based validation.

## Library Usage Rules

### 1. UI & Styling
- **shadcn/ui**: Always check if a component exists in `src/components/ui/` before building a custom one.
- **Tailwind CSS**: Use utility classes for all layout, spacing, and custom styling. Avoid writing raw CSS unless absolutely necessary.
- **Responsive Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to ensure the app works on all devices.

### 2. Icons
- **Lucide React**: Use Lucide for all interface icons. Keep icon sizes consistent (usually `size={20}` or `size={24}`).

### 3. State Management
- **Server State**: Use TanStack Query for all API calls and data synchronization with Supabase.
- **Local State**: Use React's `useState` and `useMemo` for component-level state.

### 4. Backend (Supabase)
- **Client**: Use the singleton client from `src/lib/supabaseClient.ts`.
- **Storage**: Use the `product-images` bucket for all product-related media.
- **Auth**: Use Supabase Auth for admin access.

### 5. Components & Pages
- **Atomic Design**: Keep components small and focused. Create new files in `src/components/` for reusable logic.
- **Pages**: Place top-level route components in `src/pages/`.
- **Naming**: Use PascalCase for components and files (e.g., `ProductCard.tsx`).

### 6. Forms & Validation
- **Validation**: Use Zod schemas to define form data structures and validation rules.
- **Implementation**: Use React Hook Form for managing form state and submission.

## Design Principles
- **Premium Aesthetic**: Maintain the "Golden" (Dorados) theme using slate, amber, and white color palettes.
- **Typography**: Use `Playfair Display` for headings and `Montserrat` for body text as defined in `tailwind.config.ts`.