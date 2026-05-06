# MERN Stack Personal Portfolio

A modern, premium, dark-themed personal portfolio built with the MERN stack (MongoDB, Express, React, Node.js). Features include a responsive design, glassmorphism UI, Framer Motion animations, and a fully functional backend API for managing projects and contact form messages.

## Features
- **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **UI/UX**: Premium dark theme, scroll animations, micro-interactions, responsive design
- **Content Management**: Easily editable data files for profile, skills, and experience

---

## Local Development Setup

### 1. Backend Setup
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
```
*(Make sure you have MongoDB running locally, or replace the URI with your MongoDB Atlas connection string).*

Seed the database with sample projects:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
The API will run on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## Deployment on Render

To deploy this application to Render, you will need to create two separate Web Services (one for the backend API and one for the frontend static site).

### Prerequisites
1. Push your code to a GitHub repository.
2. Set up a MongoDB Atlas cluster to get a cloud database connection URI.

### Deploying the Backend API
1. Log in to your [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `portfolio-api` (or similar)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables (under Advanced):
   - `MONGO_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
5. Click **Create Web Service**. Render will deploy your API and provide a URL (e.g., `https://portfolio-api.onrender.com`).

### Deploying the Frontend
1. Go back to the Render Dashboard and click **New > Static Site**.
2. Connect the same GitHub repository.
3. Configure the site:
   - **Name**: `portfolio-frontend` (or similar)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
4. Add Environment Variables (under Advanced):
   - `VITE_API_URL`: The URL of your deployed backend API (e.g., `https://portfolio-api.onrender.com`). Note: Do NOT include a trailing slash.
5. In the **Redirects/Rewrites** section (to support React Router), add a rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Create Static Site**. Render will build and deploy your React app.

Your full-stack MERN portfolio is now live!
