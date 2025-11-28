# Solution Documentation

**Candidate Name:** [Bc. Alexander Hulla]  
**Date:** 28.11.2025  
**Estimated Time Spent:** [2 hours (mandatory features)] (Target: 1-2 hours for mandatory + optional bonus time)

**Tech Stack Used:**

- Frontend: Angular 21.0.0
- Backend: NestJS 11.1.9
- Database: MongoDB 7.0
- TypeScript: 5.9+ (frontend), 5.7+ (backend)

## Architecture Decisions

### 1. Token Storage

**Decision:** localStorage

**Reasoning:**
Simple persistent storage for JWT token that survives page reloads. Suitable for this project where we are not handling highly sensitive production-level security.

### 2. State Management

**Decision:** Services only

**Reasoning:**
The app is small, so a global state management library like NgRx is overkill. Services with observables and injected dependencies are sufficient.

### 3. Form Handling

**Decision:** Reactive forms

**Reasoning:**
Provides strong type-safety, easy validation, and the ability to patch values for the task edit component.

### 4. Error Notification Strategy

**Approach:** Simple alerts

**Reasoning:**
Lightweight approach that allows immediate feedback. For production, a dedicated notification service would be preferable.

### 6. Other Architectural Decisions

Backend uses NestJS guards for JWT authentication and per-user authorization on tasks.
Frontend uses route guards and HTTP interceptor to enforce authentication.

## Implementation Details

### Backend Changes

#### Authentication

Files: auth.module.ts, auth.service.ts, jwt.strategy.ts, jwt-auth.guard.ts

Details:

JWT login implemented.
Tokens returned on login and validated with JwtStrategy.
Users must be authenticated to access protected endpoints.

#### Authorization

Files: tasks.service.ts, tasks.controller.ts

Details:

Only the owner of a task can view, edit, or delete it.
Checks task.userId === req.user.userId in the controller/service.
Returns 404 Not Found if task does not belong to the current user.

#### Validation

Files: create-task.dto.ts, update-task.dto.ts

Details:

Used class-validator decorators to enforce required fields (title) and optional fields (description).

### Frontend Changes

#### Authentication Flow

Users register and log in via dedicated forms. On successful login, the backend returns a JWT token.
The token is stored securely in localStorage using the AuthService. All subsequent requests attach this token in the Authorization header.
Logging out removes the token from localStorage and redirects the user to the login page.

#### Guards

Angular route guards (authGuard) are used to protect sensitive routes like /tasks and /tasks/:id.
The guard checks if a valid JWT exists using AuthService.isAuthenticated().
If the user is not authenticated, they are redirected to /login.

#### HTTP Interceptor

An HTTP interceptor automatically appends the JWT token to all outgoing HTTP requests.
It also listens for 401 Unauthorized responses. If a 401 is received, the user is automatically logged out and redirected to /login.
This ensures secure communication without manually adding the token to every request.

#### Task Detail Component

TaskDetailComponent is built with Reactive Forms. It loads task details from the backend and pre-fills the form.
The form has validation rules, e.g., title is required.
Ownership of the task is verified against the logged-in user’s ID; users cannot access or edit tasks that do not belong to them.
On save, only valid form submissions are sent to the backend. Successful updates redirect back to the task list.

## Challenges Faced

### Challenge 1: [JWT userId mismatch]

**Problem:**
Initially using user.id from JWT payload instead of _id caused authorization failures.

**Solution:**
Updated JWT payload to return user._id and fixed backend/frontend checks accordingly.

### Challenge 2: [Frontend task access control]

**Problem:**
Users could access other users’ tasks in the UI if they manually typed the URL.

**Solution:**
Added task ownership check in TaskDetailComponent and in the backend service/controller.

## Testing Instructions

### Manual Testing Steps

1. **Registration & Login:**

   ```
   - Go to http://localhost:4200/register
   - Register a new user
   - Login with the credentials
   - Verify token is stored and user is redirected
   ```

2. **Task CRUD Operations:**

   ```
   - Create a new task
   - Edit the task
   - Delete the task
   - Verify only your tasks are visible
   ```

3. **Authorization:**

   ```
   - Login as User A, create tasks
   - Logout, register and login as User B
   - Verify User B cannot see User A's tasks
   ```

4. **Error Handling:**
   ```
   - Try to login with wrong credentials
   - Try to access /tasks without logging in
   - Test form validation errors
   ```

### API Testing with Postman

[Provide specific steps to test with the Postman collection]

## Assumptions Made

1. [List any assumptions you made about requirements]
2. [Any features you interpreted differently]
3. [Any edge cases you decided to handle in a specific way]

## Known Issues / Future Improvements

### Known Issues

- Frontend alert messages are basic

### Future Improvements

Implement nicer error notifications

## Time Breakdown

| Task                           | Type         | Estimated Time | Actual Time   |
| ------------------------------ | ------------ | -------------- | ------------- |
| Backend JWT Login              | ⭐ Mandatory | 20-25 min      | [30 min]       |
| Frontend Auth Service          | ⭐ Mandatory | 20-25 min      | [25 min]       |
| Task CRUD Flow                 | ⭐ Mandatory | 15-20 min      | [25 min]       |
| **Mandatory Subtotal**         |              | **~1 hour**    | **2 hours**   |
| Backend Guards & Authorization | 🎁 Bonus     | 30-35 min      | [25 min]       |
| Frontend Guards & Interceptor  | 🎁 Bonus     | 25-30 min      | [25 min]       |
| Task Edit Component            | 🎁 Bonus     | 25-30 min      | [30 min]       |
| Validation & Polish            | 🎁 Bonus     | 15-20 min      | [18 min]       |
| **Bonus Subtotal**             |              | **optional**   | **2,3 hours**   |
| Testing & Debugging            |              | -              | [30 min]       |
| Documentation                  |              | -              | [20 min]       |
| **Total**                      |              | **1-2+ hours** | **[4 hours]** |

## Additional Notes

[Any other information you'd like to share about your implementation]
