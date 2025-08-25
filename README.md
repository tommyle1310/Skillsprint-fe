# SkillSprint - E-Learning Platform

A modern e-learning platform built with Next.js, featuring sequential learning, interactive courses, and an admin dashboard.

## Features

- **Authentication System**: User registration, login, and role-based access control
- **Course Management**: CRUD operations for courses and lessons (admin only)
- **Sequential Learning**: Lessons are unlocked progressively as users complete previous ones
- **Admin Dashboard**: Analytics, user management, and course administration
- **Responsive Design**: Modern UI with beautiful animations and mobile-first approach
- **Backend Integration**: GraphQL API with NestJS backend

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management with persistence
- **Apollo Client** - GraphQL client
- **Lucide React** - Icon library
- **Magic UI** - Custom animated components

### Backend
- **NestJS** - Node.js framework
- **GraphQL** - API query language
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Backend server running (see backend README)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   API_URL=http://localhost:4000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start backend server**
   ```bash
   npm run start:dev
   ```

5. **GraphQL Playground**
   Open [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Project Structure

```
skillsprint/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── courses/           # Course pages
│   └── contact/           # Contact page
├── components/             # Reusable components
│   ├── magicui/           # Custom animated components
│   ├── ui/                # Base UI components
│   └── Navigation.tsx     # Main navigation
├── lib/                    # Utilities and configurations
│   ├── authStore.ts       # Zustand auth store
│   └── graphqlClient.ts   # Apollo GraphQL client
└── providers/              # Context providers
    ├── ApolloProvider.tsx  # GraphQL provider
    └── AuthProvider.tsx    # Authentication provider
```

## Authentication

The platform uses JWT-based authentication with Zustand for state management:

- **Public Routes**: Home, Courses, About, Contact
- **Protected Routes**: Admin dashboard (admin only)
- **User Roles**: Regular users and admin users

### Admin Access
To access admin features, create a user with email `admin@skillsprint.com` or modify the admin check logic in `lib/authStore.ts`.

## API Integration

The frontend communicates with the backend through:

1. **GraphQL API** - For course data, user management
2. **REST API Routes** - For authentication, contact forms
3. **Apollo Client** - GraphQL client with authentication headers

## Course Management

### Admin Features
- Create new courses
- Edit existing courses
- Manage lessons within courses
- View analytics and user progress

### Course Structure
- **Course**: Title, description, price, lessons
- **Lesson**: Title, order, video content, quizzes
- **Sequential Access**: Lessons unlock progressively

## Development

### Adding New Features
1. Create API routes in `app/api/`
2. Add GraphQL queries/mutations
3. Update frontend components
4. Test with both user and admin roles

### Styling
- Use Tailwind CSS classes
- Leverage existing Magic UI components
- Maintain consistent design system

### State Management
- Use Zustand for global state
- Keep component state local when possible
- Persist authentication state

## Deployment

### Frontend
- Build: `npm run build`
- Start: `npm start`
- Deploy to Vercel, Netlify, or any Node.js hosting

### Backend
- Build: `npm run build`
- Start: `npm run start:prod`
- Deploy to Railway, Heroku, or any Node.js hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository or contact the development team.
