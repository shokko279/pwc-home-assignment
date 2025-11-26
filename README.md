# Task Manager - Frontend Developer Take-Home Assignment

## Overview

Welcome to the Task Manager take-home assignment! This project is a partially implemented task management application designed to assess your skills in full-stack JavaScript development with a focus on frontend technologies.

**Estimated Time:** 1-2 hours (mandatory features) + bonus features (optional)

### 📌 Important Note

This assignment has **mandatory** and **bonus** features:
- **⭐ Mandatory (~1 hour):** Basic JWT login, frontend auth, and task CRUD - **required to pass**
- **🎁 Bonus (optional):** Guards, authorization, edit component, validation - **extra credit**

**You can pass by completing only the mandatory features!** See [QUICK_START.md](./QUICK_START.md) for a focused checklist.

**Tech Stack:**
- **Frontend:** Angular 21 (standalone components)
- **Backend:** NestJS 11
- **Database:** MongoDB 7.0
- **Authentication:** JWT (to be implemented)

## What You'll Find

This repository contains a working but **incomplete** application. The basic structure is in place, but several critical features are missing or not fully implemented. Your task is to complete these features following best practices.

### Currently Working
✅ User registration endpoint (backend)  
✅ Basic CRUD endpoints for tasks (backend, but **without authorization**)  
✅ MongoDB schemas for Users and Tasks  
✅ Basic Angular routing setup  
✅ Login and Register component UI  
✅ Task list component displaying tasks  
✅ Basic service structures  

### Intentionally Missing (Your Tasks)
❌ JWT authentication login endpoint  
❌ Auth guards on backend routes  
❌ Authorization checks (users can currently see all tasks!)  
❌ Frontend route guards  
❌ HTTP interceptor to attach JWT tokens  
❌ Complete AuthService implementation  
❌ Task detail/edit component  
❌ Basic input validation using DTOs  
❌ Basic error handling and user feedback  

## Getting Started

### Prerequisites
- Node.js (v18 or higher, v20+ recommended)
- npm (v9 or higher)
- Docker and Docker Compose (for MongoDB)

### Installation

1. **Clone the repository** (or extract the provided archive)

2. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env if needed (MongoDB URI is already configured for Docker)
   npm run start:dev
   ```
   Backend will run on `http://localhost:3000`

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:4200`

### Verify Setup
- MongoDB should be accessible at `mongodb://localhost:27017`
- Backend API at `http://localhost:3000`
- Frontend at `http://localhost:4200`
- Try registering a user via the UI or Postman

## Your Tasks

### ⭐ MANDATORY Features (~1 hour)

These are the core CRUD features you must implement to complete the assignment:

#### 1. Backend: Basic JWT Login (20-25 minutes)
**File:** `backend/src/auth/auth.service.ts`

- Complete the `login()` method
- Validate user credentials (email and password)
- Use bcrypt to compare passwords
- Generate and return a JWT token
- Handle errors appropriately

**File:** `backend/src/auth/auth.module.ts`
- Configure JWT module properly (use environment variables for secret)

#### 2. Frontend: Basic Authentication (20-25 minutes)
**File:** `frontend/src/app/services/auth.service.ts`

Implement the following methods:
- `login()` - Call backend API and store JWT token
- `logout()` - Clear stored token
- `getToken()` - Retrieve token from localStorage
- `isAuthenticated()` - Check if user has valid token

**File:** `frontend/src/app/components/login/login.component.ts`
- Connect the login form to AuthService
- Redirect to task list on success
- Show error messages on failure

#### 3. Task Management: Complete the CRUD Flow (15-20 minutes)
**Files:** `frontend/src/app/components/task-list/`

Make sure these work:
- Create new tasks
- View task list
- Delete tasks
- Basic error handling and user feedback

**Note:** The backend CRUD endpoints are already implemented. You just need to ensure they work properly from the frontend.

### 🎁 BONUS Features (Optional - for extra credit)

If you complete the mandatory features and have time, implement these advanced features:

#### BONUS 1: Backend Authentication Guards & Authorization (25-30 minutes)

**Create JWT Strategy and Guards:**
- JWT Strategy using `passport-jwt`
- Auth guard to protect routes
- Apply guards to all task endpoints in `backend/src/tasks/tasks.controller.ts`

**Add Authorization Checks:**
**File:** `backend/src/tasks/tasks.service.ts`
- Modify all methods to filter tasks by `userId`
- Ensure users can only access their own tasks
- Return appropriate errors when unauthorized

**Hints:**
- Extract userId from JWT token in controller
- Pass userId to service methods
- Use MongoDB queries to filter by userId

#### BONUS 2: Frontend Route Guards & HTTP Interceptor (20-25 minutes)

**Create Auth Guard:**
**File:** `frontend/src/app/guards/auth.guard.ts`
- Check if user is authenticated
- Redirect to login if not authenticated
- Apply to `/tasks` route in `app.routes.ts`

**Implement HTTP Interceptor:**
**File:** `frontend/src/app/interceptors/auth.interceptor.ts`
- Inject AuthService
- Attach JWT token to Authorization header for all requests
- Handle 401 errors (redirect to login)

**File:** `frontend/src/app/app.config.ts`
- Uncomment and configure the interceptor

#### BONUS 3: Task Detail/Edit Component (25-30 minutes)

**What to create:** `frontend/src/app/components/task-detail/task-detail.component.ts`

Create a component to:
- View individual task details
- Edit task (title, description, status)
- Use Template-driven or Reactive Forms with validation
- Navigate back to task list after save

**Requirements:**
- Title is required
- Use proper Angular form validation
- Handle errors from backend
- Update the route in `app.routes.ts`
- Make the "Edit" button in task-list work

#### BONUS 4: Validation & Enhanced Error Handling (10-15 minutes)

**Backend Validation:**
Add class-validator decorators to DTOs:
- `backend/src/auth/dto/register.dto.ts`
- `backend/src/auth/dto/login.dto.ts`
- `backend/src/tasks/dto/create-task.dto.ts`
- `backend/src/tasks/dto/update-task.dto.ts`

**Required decorators:**
```typescript
// Auth DTOs
@IsEmail()
@IsNotEmpty()
email: string;

@IsString()
@IsNotEmpty()
password: string;

// Task DTOs
@IsString()
@IsNotEmpty()
title: string;
```

Enable validation in `main.ts`:
```typescript
app.useGlobalPipes(new ValidationPipe());
```

**Frontend Validation:**
- Add HTML5 validation (required, email) to forms
- Display validation errors to users
- Enhanced error messages for API failures
- Better user feedback beyond simple alerts

## Architecture Decisions for You to Make

The following aspects are intentionally left open for you to decide:

1. **Token Storage:** localStorage vs sessionStorage vs cookies?
2. **State Management:** Services only, Signals, or NgRx?
3. **Form Handling:** Template-driven or Reactive forms?
4. **Error Notification:** Custom service, third-party library, or simple alerts?

**Document your decisions** in your final submission. We want to understand your reasoning.

## Evaluation Criteria

We will assess your submission based on:

### ⭐ Mandatory Features (60% - Required to Pass)

**Basic Authentication (25%)**
- ✅ JWT login endpoint working
- ✅ Frontend can login and store token
- ✅ Logout functionality works
- ✅ Basic error handling on login failures

**Task CRUD Operations (25%)**
- ✅ Can create tasks
- ✅ Can view task list
- ✅ Can delete tasks
- ✅ Basic user feedback on actions

**Code Quality (10%)**
- ✅ Clean, readable code
- ✅ Proper TypeScript usage
- ✅ No console errors or warnings
- ✅ Code follows Angular and NestJS conventions

### 🎁 Bonus Features (40% - Extra Credit)

**Advanced Authentication & Authorization (20%)**
- ✅ JWT Strategy and Guards properly implemented
- ✅ Authorization checks (users can't access others' tasks)
- ✅ Auth guards on both frontend and backend
- ✅ HTTP interceptor correctly configured

**Task Edit Functionality (10%)**
- ✅ Task detail/edit component working
- ✅ Form validation implemented
- ✅ Proper navigation flow

**Security & Validation (5%)**
- ✅ DTO validation with decorators
- ✅ Input validation on both frontend and backend
- ✅ Proper error responses

**Polish & UX (5%)**
- ✅ Enhanced error handling
- ✅ Better user feedback beyond alerts
- ✅ Loading states where appropriate

**Note:** You can get a passing grade by completing only the mandatory features. The bonus features demonstrate advanced skills and will significantly improve your score.

## Submission Guidelines

1. **Code:**
   - Ensure all features are implemented and working
   - Remove any console.log statements used for debugging
   - Make sure the app runs without errors

2. **Documentation:**
   - Create a `SOLUTION.md` file documenting:
     - Architecture decisions you made
     - Any challenges you faced
     - How to test the features you implemented
     - Assumptions you made
   - Update this README if you changed any setup steps

3. **Testing:**
   - Manually test all features before submission
   - Ensure the app works from a fresh install

4. **Deliverable:**
   - Push to a Git repository (GitHub, GitLab, etc.) OR
   - **Create a ZIP archive excluding `node_modules` and `.git`**

## Tips & Hints

- **Focus on mandatory features first** - Get basic auth and CRUD working (~1 hour)
- **Bonus features are optional** - Only tackle them if you finish mandatory features
- **Start with backend auth** - Easier to test with Postman
- **Use Postman** (collection provided) to test backend APIs
- **Read the TODO comments** in the code - They guide you
- **Keep it simple** - Basic error handling is sufficient for mandatory features
- **Test incrementally** - Don't wait until the end to test
- **Git commit often** - We want to see your development process
- **Time management** - Aim for ~1 hour on mandatory, then decide if you have time for bonus

## Resources

### Assignment Documentation
- [QUICK_START.md](./QUICK_START.md) - Focused checklist for mandatory features
- [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) - Detailed status of all features
- [SETUP.md](./SETUP.md) - Quick setup instructions
- [SOLUTION_TEMPLATE.md](./SOLUTION_TEMPLATE.md) - Template for documenting final solution

### External Resources
- [Angular 21 Documentation](https://angular.dev/)
- [NestJS 11 Documentation](https://docs.nestjs.com/)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Angular Guards](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)
- [Angular HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [JWT.io](https://jwt.io/) - Debug JWT tokens

## Questions?

If you have questions about requirements or encounter setup issues, please reach out. We're here to help!

Good luck! We're excited to see your solution. 🚀

