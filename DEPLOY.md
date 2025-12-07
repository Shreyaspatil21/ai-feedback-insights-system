# Deployment Instructions

This project is designed to be deployed as two separate applications (User Dashboard and Admin Dashboard) using the same codebase.

## 1. Deploying the User Dashboard

1.  Create a new project in Vercel (or your hosting provider).
2.  Connect this repository.
3.  Set the following **Environment Variables**:
    *   `NEXT_PUBLIC_APP_MODE`: `user`
    *   `DATABASE_URL`: Your production database URL.
    *   `GEMINI_API_KEY`: Your Google Gemini API Key.
4.  Deploy.
5.  Access the site. It will only show the User Feedback form. Any attempt to access `/admin` will redirect to Home.

## 2. Deploying the Admin Dashboard

1.  Create *another* new project in Vercel.
2.  Connect the **same** repository.
3.  Set the following **Environment Variables**:
    *   `NEXT_PUBLIC_APP_MODE`: `admin`
    *   `ADMIN_PASSWORD`: Your secure admin password.
    *   `DATABASE_URL`: **Must be the SAME database URL as the User Dashboard.**
    *   `GEMINI_API_KEY`: Your Google Gemini API Key.
4.  Deploy.
5.  Access the site. The homepage `/` will automatically redirect to `/admin`.

## Important Note on Database
This project is currently configured to use **SQLite**.
*   **For Local Development**: It works perfectly with a local file.
*   **For Vercel**: SQLite files **will not persist** (data will be lost on restart). For production, you should switch to a persistend database provider (like Turso, Neon, or PlanetScale) and update the `getDB` function or use the Prisma client if configured.
