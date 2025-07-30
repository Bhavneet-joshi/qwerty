# Contract Management System

## Overview

This is a full-stack contract management system built with React, Express.js, and PostgreSQL. The application provides role-based access control with three user types (admin, employee, client) and comprehensive contract lifecycle management including document viewing, commenting, and collaboration features.

## User Preferences

Preferred communication style: Simple, everyday language.
Code modification preference: Comment out code instead of deleting when making changes.

## Recent Changes (January 30, 2025)

✓ Fixed Home Page according to July 20th email feedback (January 30, 2025):
  - Removed "The Numbers" section from About HLSG Industries as requested
  - Consolidated two separate buttons into single "Learn More About Us" button
  - Added Image Carousel with 3 professional business images and navigation controls
  - Updated "Ready to Build Your Future" section to reflect HLSG as a new company
  - Fixed footer mobile sizing - reduced padding and improved responsive grid layout
  - Standardized button colors throughout app - consistent navyblue/goldenrod1 palette
  - Fixed dark mode button inconsistencies - removed blue/yellow/white/black variations
  - All visual elements now use approved color palette per SOW UI requirements

## Previous Changes (January 27, 2025)

✓ Successfully migrated project from Replit Agent to standard Replit environment
✓ Created PostgreSQL database and pushed schema with all required tables
✓ Fixed session configuration with fallback secret for development
✓ Resolved authentication setup and middleware configuration
✓ Application now running successfully on port 5000 without errors
✓ Rebuilt registration flow to match SOW Backend requirements with 5 steps:
  - Step 1: Mobile Number, Email, and CAPTCHA (removed name fields as required)
  - Step 2: OTP verification (added missing OTP functionality)
  - Step 3: Personal details with prefilled contact info (removed PAN/Aadhaar)
  - Step 4: Password creation with strength validation
  - Step 5: Review confirmation (removed PAN, added Address display)
✓ Updated Contact Us page with interactive map section as requested
✓ Implemented golden/goldenrod color palette throughout design
✓ Enhanced form validation and error handling for better UX
✓ Added comprehensive dark mode support with proper golden accent colors
✓ Added company map view in footer with interactive location display
✓ Fixed nested anchor tag warnings in footer navigation
✓ Added footer to all pages including authenticated user dashboard pages
✓ Changed navigation from left sidebar to top navbar for authenticated users
✓ Redesigned login page to match registration style with 2-step process
✓ Added OTP verification as second step in login flow
✓ Implemented golden color palette and progress indicators for login
✓ Enhanced dark/light mode toggle with smooth transitions and animations
✓ Added theme transition effects with cubic-bezier easing and gradient overlays
✓ Implemented animated theme toggle button with rotating sun/moon icons
✓ Added golden glow effects and particle animations during theme changes
✓ Enhanced UI components with theme-aware transitions throughout the app
✓ Fixed error styling to only show red borders on input fields instead of entire components
✓ Updated footer layout to match provided design with map on left side
✓ Redesigned footer with three-column layout: Our Office, Say Hello, Subscribe Us
✓ Added responsive footer design with proper company contact information
✓ Successfully migrated from Replit Agent to standard Replit environment (January 27, 2025)
✓ Updated footer design to match Potencia Academy branding with navy blue background
✓ Implemented four-column layout: Company info, Quick Links, Contact, Location on Map
✓ Added interactive map interface with Google Maps-style controls
✓ Updated social media integration with proper SVG icons
✓ Added orange accent colors for hover effects to match design requirements
✓ Created demo accounts for all user roles (client, employee, admin) with password "demo123"
✓ Populated database with test users for role-based access testing
✓ Created comprehensive forgot password page with dual verification methods (email/mobile)
✓ Added professional OTP input boxes with 6-digit verification system
✓ Implemented three-step process: contact selection, OTP verification, success confirmation
✓ Added smart features: countdown timer, resend functionality, method switching
✓ Integrated forgot password link in login page with proper routing
✓ Successfully completed migration from Replit Agent to standard Replit environment (January 27, 2025)
✓ Fixed Home Page according to July 20th email specifications (January 28, 2025):
  - Removed individual service cards per email feedback - "Our Services" section now redirects to services page
  - Implemented comprehensive dark mode support for Home Page as requested
  - Removed all gradient colors throughout application per SOW UI Clause 6.2 color palette requirements
  - Replaced gradients with solid colors using approved navyblue, goldenrod1, darkblue palette
  - Updated Services page with proper dark mode support and removed gradient usage
  - All components now comply with SOW UI color specifications
✓ Fixed Contact Us Page design issues (January 28, 2025):
  - Resized "Send Us a Message" section appropriately - changed from 2/3 width to 1/2 width for better proportions
  - Replaced map preview card with actual interactive Google Maps embed for Sector 62, Noida location
  - Added company information overlay on map with proper styling and dark mode support
  - Enhanced map controls with functional links to satellite view, street view, and directions
  - Maintained consistent dark mode theming throughout the contact page
✓ Fixed role-based routing issues - admin and employee routes now properly wrapped with ProtectedLayout
✓ Fixed authentication system - modified isAuthenticated middleware to handle both mock and real authentication
✓ Verified all user roles (admin, employee, client) can login and access their respective dashboards
✓ Role-based routing now working correctly - admin sees AdminDashboard, employee sees EmployeeDashboard
✓ Updated OTP layout in registration page to display vertically instead of side by side
✓ Fixed admin login routing issue - admin users now see AdminDashboard instead of ClientDashboard
✓ Corrected role-based routing for all user types (client, employee, admin) to show proper components
✓ Admin users now have access to dedicated admin features: user management, all contracts, admin profile
✓ Added demo account buttons to login page for quick access to client, employee, and admin accounts
✓ Users can now quickly pre-fill login credentials by clicking Client, Employee, or Admin demo buttons
✓ Enhanced admin dashboard with contract statistics categorized by client, employee, and status
✓ Added three contract lists sorted by date, value, and duration as required
✓ Implemented comprehensive admin profile page with PAN, Aadhaar, contact info, and password change
✓ Added tabbed interface for personal info, documents, security, and system settings
✓ Created complete User Management page with role-based filtering and permissions control
✓ Added employee access permission management with preparers, reviewers, and CRUD controls
✓ All admin pages now match specification requirements with proper filtering and actions
✓ Rebuilt employee dashboard with assignment counter and five most recent agreements in chronological order
✓ Added "List of Contracts Page" link as required with proper employee navigation
✓ Created comprehensive employee profile page with PAN, Aadhaar, employee ID, and password change request
✓ Implemented tabbed interface for personal info, documents, security, and settings
✓ Built complete employee contracts page with filtering by client name, date range, and period
✓ Added sortable table with contract name, description, date, period, and "View Contract Page" links
✓ All employee pages now fully match your specifications with proper role-based access control
✓ Fixed Registration Flow according to SOW Backend requirements (January 28, 2025):
  - Added step names to the top stepper/flow chart - now displays full step titles alongside icons
  - Implemented comprehensive OTP verification in Step 2 with both mobile and email OTP inputs
  - Added dual OTP input fields with proper validation and verification buttons
  - Password is properly hidden in Step 5 preview (displays as ••••••••) for security
  - Added comprehensive error states for all five steps with field-specific validation
  - Enhanced validation messages and error handling throughout the registration flow
  - All input fields now show red borders when validation fails
  - Updated progress bar design to horizontal layout with step titles for consistency
✓ Rebuilt Forgot Password page to comply with SOW Backend requirements (January 28, 2025):
  - Implemented proper 3-step process: login ID → dual OTP verification → new password
  - Added comprehensive dual OTP verification for both mobile and email (removed choice option)
  - Removed all gradient usage per SOW UI Clause 6.2 - replaced with solid colors
  - Added PublicLayout with navbar and footer components as required
  - Fixed error styling to only affect input boxes (red borders) instead of entire components
  - Updated progress bar to match new horizontal design with step titles
✓ Enhanced Login Flow for SOW Backend compliance (January 28, 2025):
  - Verified dual OTP verification for both mobile and email as per Clause 3.3
  - Updated progress bar design to horizontal layout with step titles
  - Removed gradient usage from progress indicators
  - Enhanced error states with proper field-level validation styling
✓ Fixed role-based routing issues - admin and employee routes now properly wrapped with ProtectedLayout
✓ Fixed authentication system - modified isAuthenticated middleware to handle both mock and real authentication
✓ Verified all user roles (admin, employee, client) can login and access their respective dashboards
✓ Role-based routing now working correctly - admin sees AdminDashboard, employee sees EmployeeDashboard
✓ Updated OTP layout in registration page to display vertically instead of side by side
✓ Fixed admin login routing issue - admin users now see AdminDashboard instead of ClientDashboard
✓ Corrected role-based routing for all user types (client, employee, admin) to show proper components
✓ Admin users now have access to dedicated admin features: user management, all contracts, admin profile
✓ Added demo account buttons to login page for quick access to client, employee, and admin accounts
✓ Users can now quickly pre-fill login credentials by clicking Client, Employee, or Admin demo buttons
✓ Enhanced admin dashboard with contract statistics categorized by client, employee, and status
✓ Added three contract lists sorted by date, value, and duration as required
✓ Implemented comprehensive admin profile page with PAN, Aadhaar, contact info, and password change
✓ Added tabbed interface for personal info, documents, security, and system settings
✓ Created complete User Management page with role-based filtering and permissions control
✓ Added employee access permission management with preparers, reviewers, and CRUD controls
✓ All admin pages now match specification requirements with proper filtering and actions
✓ Rebuilt employee dashboard with assignment counter and five most recent agreements in chronological order
✓ Added "List of Contracts Page" link as required with proper employee navigation
✓ Created comprehensive employee profile page with PAN, Aadhaar, employee ID, and password change request
✓ Implemented tabbed interface for personal info, documents, security, and settings
✓ Built complete employee contracts page with filtering by client name, date range, and period
✓ Added sortable table with contract name, description, date, period, and "View Contract Page" links
✓ All employee pages now fully match your specifications with proper role-based access control
✓ Fixed missing Settings icon import in AdminDashboard component
✓ Removed "Home" button from navigation bar for admin and employee users per user request
✓ Added footer to all pages including admin, employee, and client dashboards
✓ Footer includes company info, social media links, contact details, and interactive map view
✓ Enhanced login page with dual OTP verification for both mobile and email
✓ Added separate OTP input components matching registration page design
✓ Implemented two-factor authentication flow with countdown timer and resend functionality
✓ Updated login validation to require both mobile and email OTP verification
✓ Fixed duplicate footer issue - moved all authenticated users to ProtectedLayout
✓ Removed footer from Layout component to eliminate duplication
✓ All user roles (admin, employee, client) now use consistent ProtectedLayout with single footer
✓ Updated OTP layout in registration page to display vertically instead of side by side
✓ Fixed admin login routing issue - admin users now see AdminDashboard instead of ClientDashboard
✓ Corrected role-based routing for all user types (client, employee, admin) to show proper components
✓ Admin users now have access to dedicated admin features: user management, all contracts, admin profile
✓ Added demo account buttons to login page for quick access to client, employee, and admin accounts
✓ Users can now quickly pre-fill login credentials by clicking Client, Employee, or Admin demo buttons
✓ Enhanced admin dashboard with contract statistics categorized by client, employee, and status
✓ Added three contract lists sorted by date, value, and duration as required
✓ Implemented comprehensive admin profile page with PAN, Aadhaar, contact info, and password change
✓ Added tabbed interface for personal info, documents, security, and system settings
✓ Created complete User Management page with role-based filtering and permissions control
✓ Added employee access permission management with preparers, reviewers, and CRUD controls
✓ All admin pages now match specification requirements with proper filtering and actions
✓ Rebuilt employee dashboard with assignment counter and five most recent agreements in chronological order
✓ Added "List of Contracts Page" link as required with proper employee navigation
✓ Created comprehensive employee profile page with PAN, Aadhaar, employee ID, and password change request
✓ Implemented tabbed interface for personal info, documents, security, and settings
✓ Built complete employee contracts page with filtering by client name, date range, and period
✓ Added sortable table with contract name, description, date, period, and "View Contract Page" links
✓ All employee pages now fully match your specifications with proper role-based access control
✓ Successfully completed migration from Replit Agent to standard Replit environment (January 28, 2025)
✓ Enhanced mobile and tablet responsiveness across all website pages
✓ Improved Service page font visibility in dark mode with proper golden text colors
✓ Added dark theme toggle button to mobile navigation menu
✓ Fixed font colors throughout Services page for better dark mode visibility
✓ Updated responsive grid layouts for mobile, tablet, and desktop views
✓ Enhanced button sizing and text scaling for different screen sizes
✓ Improved Landing page mobile responsiveness with better typography scaling
✓ Removed all gradient backgrounds from buttons and icons throughout the website (January 28, 2025)
✓ Replaced gradient styles with solid colors using approved color palette (navyblue, golden, goldenrod1)
✓ Updated all components including Services, About, Landing, ThemeToggle, and Layout components
✓ Maintained dark mode compatibility with proper golden accent colors
✓ All visual elements now use solid colors per user request
✓ Fixed mobile responsiveness of OTP verification buttons in registration page (January 28, 2025)
✓ Enhanced verify button styling with proper sizing and padding for mobile devices
✓ Improved OTP input box spacing and sizing for better mobile usability
✓ Added responsive design to ensure all verification elements are properly visible on mobile
✓ Fixed mobile responsiveness of OTP verification buttons in login page (January 28, 2025)
✓ Added individual "Verify Mobile OTP" and "Verify Email OTP" buttons to login page
✓ Enhanced mobile UX with proper button sizing and responsive OTP input boxes
✓ Updated login validation logic to require both OTP verifications before proceeding
✓ Improved login page OTP flow to match registration page functionality
✓ Fixed form error styling to only show red borders on input fields (January 28, 2025)
✓ Removed red text color from form labels when validation errors occur
✓ Updated FormLabel component to maintain normal colors regardless of error state
✓ Only input borders and error messages now turn red on validation errors
✓ Enhanced user experience by preventing confusing red label text
✓ Fixed ForgotPassword page form labels to match login/register page colors (January 28, 2025)
✓ Updated form labels to use navy blue in light mode (text-navyblue) for consistency
✓ All form pages now use consistent color scheme: navy blue labels in light mode, golden in dark mode

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom color variables for brand consistency
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Replit Authentication with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Key Design Decisions
- **Monorepo Structure**: Client, server, and shared code in a single repository
- **Type Safety**: Full TypeScript coverage with shared schema definitions
- **Role-Based Access**: Three-tier permission system (admin, employee, client)
- **Real-time Collaboration**: Comment system with line-specific annotations
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL with automatic cleanup
- **Authorization**: Role-based middleware with route protection
- **User Management**: Profile creation, role assignment, and permission control

### Database Schema
- **Users**: Profile information, roles, and authentication data
- **Contracts**: Document metadata, status tracking, and relationships
- **Comments**: Threaded commenting system with line-specific annotations
- **Permissions**: Employee-specific contract access controls
- **Sessions**: Secure session storage for authentication

### Contract Management
- **Document Viewing**: PDF viewer with zoom, rotation, and annotation capabilities
- **Status Tracking**: Workflow states (draft, review, approved, signed, completed)
- **Collaboration**: Real-time commenting with conflict resolution
- **Access Control**: Role-based permissions with granular contract access

### UI Components
- **Design System**: Consistent component library with shadcn/ui
- **Responsive Layout**: Adaptive navigation and content areas
- **Form Handling**: Validated forms with error handling
- **Loading States**: Skeleton loaders and progress indicators

## Data Flow

### Authentication Flow
1. User accesses protected route
2. Middleware checks session validity
3. If unauthenticated, redirects to Replit Auth
4. Upon successful auth, user profile is created/updated
5. Session is stored in PostgreSQL with TTL

### Contract Management Flow
1. Admin creates contract with client assignment
2. Employee permissions are set for contract access
3. Stakeholders can view, comment, and collaborate
4. Status updates trigger notifications
5. Final approval completes the contract lifecycle

### Comment System Flow
1. User selects line in PDF viewer
2. Comment is created with line number reference
3. Real-time updates notify other users
4. Comments can be resolved or escalated
5. Thread-based discussions maintain context

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Build Tools**: Vite, esbuild, TypeScript
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **State Management**: TanStack Query, Zod validation

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database client
- **Authentication**: Passport.js, OpenID Connect client
- **Session Management**: Express session, connect-pg-simple
- **Utilities**: Memoizee for caching, date-fns for date handling

### Development Dependencies
- **Replit Integration**: Runtime error overlay, cartographer plugin
- **Code Quality**: ESLint, Prettier (implied)
- **Type Safety**: TypeScript, Zod schema validation

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite dev server with HMR
- **Database**: Neon Database with connection pooling
- **Authentication**: Replit Auth with development callbacks
- **Asset Serving**: Vite middleware for static assets

### Production Build
- **Frontend**: Vite build with code splitting and optimization
- **Backend**: esbuild bundling with external dependencies
- **Database**: PostgreSQL with migration system
- **Static Assets**: Served from dist/public directory

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Secret**: Secure session encryption key
- **Replit Integration**: REPL_ID and domain configuration
- **OIDC Configuration**: Issuer URL and client credentials

### Scalability Considerations
- **Database**: Connection pooling with Neon serverless
- **Sessions**: PostgreSQL storage with automatic cleanup
- **Caching**: Memoized API responses and computed values
- **Bundle Size**: Code splitting and lazy loading for optimal performance