# Authentication System Setup Guide

This guide walks you through setting up the complete authentication system for Dream College Path, including Firebase Auth, Azure Table Storage, and the backend server.

## 🚀 Quick Start

1. **Install Dependencies** (already done)
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Start Development Servers**
   ```bash
   npm run dev:all
   ```

## 📋 Prerequisites

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Generate a service account key for admin operations
4. Get your Firebase web app configuration

### Azure Setup
1. Create an Azure Storage Account
2. Create a Table Storage service
3. Get your storage account name and access key

## 🔧 Environment Configuration

### Frontend Variables (`.env`)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend Variables (`.env`)
```env
# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Azure Storage
AZURE_STORAGE_ACCOUNT=your_storage_account
AZURE_STORAGE_KEY=your_storage_key
AZURE_TABLE_NAME=Users

# Server
SESSION_SECRET=generate_a_secure_32_char_string
NODE_ENV=development
PORT=8787
```

## 🏗️ Architecture Overview

### Frontend (React + Vite)
- **Login Page**: `/login` - Combined sign-in/sign-up with tabs
- **Reset Page**: `/reset` - Password reset flow
- **Protected Routes**: Routes requiring authentication (e.g., `/chat`)
- **Firebase Client SDK**: Handles authentication UI flows

### Backend (Express Server)
- **Port**: 8787 (proxied via Vite to `/api`)
- **Session Management**: HttpOnly cookies with Firebase session verification
- **User Storage**: Azure Table Storage for user profiles
- **Admin Logic**: Auto-promote `@dreamcollegepath.com` emails to admin role

### Database Schema (Azure Table Storage)
```
Table: Users
PartitionKey: "Users"
RowKey: Firebase UID
Fields:
  - email (string)
  - displayName (string)
  - provider ("password" | "google")
  - role ("admin" | "user")
  - createdAt (ISO string)
  - lastLoginAt (ISO string)
  - emailVerified (boolean)
  - photoURL (string | null)
```

## 🔐 Security Features

- **HttpOnly Cookies**: Session stored securely, not accessible via JavaScript
- **Rate Limiting**: 10 auth attempts/minute, 3 reset attempts/minute
- **CSRF Protection**: SameSite cookie settings
- **Email Verification**: Required for new accounts
- **Firebase Token Verification**: Server-side validation of all auth requests

## 📡 API Endpoints

### `POST /api/auth/upsert`
- **Input**: `{ idToken: string }`
- **Purpose**: Create/update user profile after Firebase authentication
- **Output**: `{ ok: true, user: UserProfile }`

### `GET /api/auth/me`
- **Purpose**: Get current authenticated user
- **Output**: `{ user: UserProfile | null }`

### `POST /api/auth/logout`
- **Purpose**: Clear session cookie
- **Output**: `{ ok: true }`

### `POST /api/auth/reset`
- **Input**: `{ email: string }`
- **Purpose**: Send password reset email
- **Output**: `{ ok: true, message: string }`

## 🎨 UI Features

- **Modern Design**: Matches site's gold/blue color palette
- **Mobile-First**: Responsive design with touch-friendly inputs
- **Accessibility**: WCAG-AA compliant with ARIA labels and focus management
- **Form Validation**: Real-time inline validation with clear error messages
- **Loading States**: Disabled buttons and loading indicators during requests
- **Success/Error Handling**: Toast notifications and status alerts

## 🧪 Testing the Flow

1. **Start servers**: `npm run dev:all`
2. **Visit**: `http://localhost:8084/login`
3. **Try sign-up**: Create account with email/password
4. **Check email**: Verify account via Firebase email
5. **Try Google**: Sign in with Google OAuth
6. **Test protection**: Visit `/chat` (should redirect to login if not authenticated)
7. **Test logout**: Use browser dev tools to clear cookies, verify redirect

## 🔍 Troubleshooting

### Firebase Errors
- **Invalid API Key**: Check `VITE_FIREBASE_API_KEY` in `.env`
- **Auth Domain**: Ensure `VITE_FIREBASE_AUTH_DOMAIN` matches your project
- **Service Account**: Verify `FIREBASE_PRIVATE_KEY` has proper line breaks (`\n`)

### Azure Errors
- **Connection Failed**: Verify `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_KEY`
- **Table Not Found**: Server creates table automatically, check logs for errors

### Server Errors
- **Port Conflicts**: Change `PORT` in `.env` if 8787 is occupied
- **CORS Issues**: Verify Vite proxy configuration matches server port

## 📚 Next Steps

1. **Email Templates**: Customize Firebase email templates for brand consistency
2. **Admin Dashboard**: Add admin-only routes and functionality
3. **User Profiles**: Extend user profile with additional fields
4. **Social Providers**: Add more OAuth providers (GitHub, Microsoft)
5. **2FA**: Implement two-factor authentication for enhanced security

## 🛠️ Development Commands

```bash
# Start both frontend and backend
npm run dev:all

# Start only frontend (port 8084)
npm run dev

# Start only backend (port 8787)
npm run dev:server

# Build for production
npm run build
```

## 📝 Admin Rules

Users with email addresses ending in `@dreamcollegepath.com` are automatically assigned the `admin` role upon registration or login.