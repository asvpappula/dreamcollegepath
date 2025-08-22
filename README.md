# Welcome to your React Project

## Project info

This is a React application built with Vite, TypeScript, and shadcn-ui.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using various platforms like Vercel, Netlify, or any other hosting service that supports React applications.

## Can I connect a custom domain to my project?

Yes, you can! Most hosting platforms allow you to connect custom domains to your projects. Check your hosting provider's documentation for specific instructions on how to set up a custom domain.

## User Role Assignment

This application uses email domain-based role assignment:

- **Admin Role**: Users with email addresses ending in `@dreamcollegepath.com` are automatically assigned the "admin" role
- **Student Role**: All other users are assigned the "student" role

Role assignment happens automatically during the sign-in process (both email/password and Google sign-in). Admin users have access to the Admin Dashboard at `/admin`, while student users can only access their profile and other general features.
