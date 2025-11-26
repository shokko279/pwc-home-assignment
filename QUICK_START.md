# Quick Start Guide for Candidates

## 🎯 Your Goal

Complete the **mandatory features** in ~1 hour. Bonus features are optional extra credit.

## ⭐ MANDATORY Checklist (~1 hour)

Work through these in order:

### Step 1: Backend JWT Login (20-25 min)

**File:** `backend/src/auth/auth.service.ts`

- [ ] Complete the `login()` method
- [ ] Validate credentials with bcrypt
- [ ] Generate JWT token
- [ ] Test with Postman

**File:** `backend/src/auth/auth.module.ts`
- [ ] Configure JWT module with secret

### Step 2: Frontend Auth (20-25 min)

**File:** `frontend/src/app/services/auth.service.ts`

- [ ] Implement `login()` - call API, store token
- [ ] Implement `logout()` - clear token
- [ ] Implement `getToken()` - retrieve from localStorage
- [ ] Implement `isAuthenticated()` - check token exists

**File:** `frontend/src/app/components/login/login.component.ts`
- [ ] Connect form to AuthService
- [ ] Redirect to /tasks on success
- [ ] Show error on failure

### Step 3: Task CRUD (15-20 min)

**Files:** `frontend/src/app/components/task-list/`

- [ ] Verify create task works
- [ ] Verify task list displays
- [ ] Verify delete works
- [ ] Add basic error messages

## ✅ You're Done! (with mandatory features)

At this point, you have:
- ✅ Working login with JWT
- ✅ Token storage and retrieval
- ✅ Basic task management
- ✅ Enough to pass the assignment

## 🎁 BONUS Features (Optional)

Only tackle these if you:
- ✅ Finished all mandatory features
- ✅ Have extra time
- ✅ Want to show advanced skills

### BONUS 1: Backend Guards & Authorization (~30 min)
- Create JWT Strategy
- Create Auth Guards
- Add authorization checks

### BONUS 2: Frontend Guards & Interceptor (~25 min)
- Create route guard
- Implement HTTP interceptor
- Configure in app.config

### BONUS 3: Task Edit Component (~25 min)
- Create task-detail component
- Add form validation
- Connect to routing

### BONUS 4: Enhanced Validation (~15 min)
- Add DTO decorators
- Enable validation pipe
- Improve error messages

## 📋 Testing Your Work

### Mandatory Features Test:
1. Register a new user
2. Login with those credentials
3. See token stored in localStorage (DevTools > Application)
4. Create a task
5. See task in list
6. Delete a task
7. Logout
8. Verify token is cleared

### If You Did Bonus:
- Try accessing /tasks without login (should redirect)
- Create tasks as User A, login as User B (shouldn't see A's tasks)
- Edit a task through detail view

## 💡 Tips

1. **Time Management:** Check the clock at 30 minutes and 1 hour
2. **Test Incrementally:** Don't wait until the end
3. **Use Postman:** Test backend before connecting frontend
4. **Keep It Simple:** Basic error handling is fine for mandatory
5. **Git Commits:** Commit after each major step
6. **Read TODOs:** Code comments guide you

## 🚀 Quick Commands

```bash
# Terminal 1: MongoDB
docker-compose up -d

# Terminal 2: Backend
cd backend
npm install
npm run start:dev

# Terminal 3: Frontend  
cd frontend
npm install
npm start
```

## ❓ Questions?

- **Setup issues?** Check SETUP.md
- **What to implement?** Check IMPLEMENTATION_STATUS.md
- **Full details?** Check README.md

## 🎯 Remember

**Mandatory features only = PASS**

Focus on quality over quantity. A clean, working implementation of mandatory features is better than rushed bonus features with bugs.

Good luck! 🚀

