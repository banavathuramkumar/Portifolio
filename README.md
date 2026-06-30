# MERN Stack Personal Portfolio with Independent Admin Panel

A modern, premium, dark-themed personal portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). This project features a 3-tier architecture:
1.  **Backend API (`/backend`)**: Express server connecting to MongoDB, providing REST APIs.
2.  **Frontend Client (`/frontend`)**: Responsive Vite + Tailwind CSS landing page displaying dynamic data.
3.  **Admin Panel (`/admin`)**: Independent Vite + Tailwind CSS dashboard to manage all content dynamically without login barriers.

---

## 🚀 Key Features

*   **Dynamic Landing Page**: Integrates Hero, About, Skills, Projects, Experience, Education, Certificates, Achievements, and Contact sections.
*   **100% Configurable Content**: Every title, subtitle, and body text on the landing page is editable directly from the Admin Panel.
*   **Independent Admin Panel**: Separate web application that directly performs CRUD operations on the portfolio data. No login authentication page needed.
*   **Fully Responsive**: The frontend landing page and admin dashboard are designed mobile-first and look stunning on all screen sizes.

---

## 💻 Local Setup & Development

### 1. Backend Server Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    npm install
    ```
2.  Create a `.env` file inside the `backend` folder:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
    ```
3.  **Seed the Database**:
    Seed default profile, experience, and skill configurations into MongoDB:
    ```bash
    npm run seed
    ```
4.  Start the backend development server:
    ```bash
    npm run dev
    ```
    The API runs at `http://localhost:5000`.

### 2. Frontend Client Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    npm install
    ```
2.  Create a `.env` file inside the `frontend` folder:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
3.  Start the client development server:
    ```bash
    npm run dev
    ```
    The landing page runs at `http://localhost:5173`.

### 3. Admin Panel Setup
1.  Navigate to the `admin` directory:
    ```bash
    cd admin
    npm install
    ```
2.  Create a `.env` file inside the `admin` folder:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
3.  Start the admin panel development server:
    ```bash
    npm run dev
    ```
    The dashboard runs at `http://localhost:5174`. Open it to customize your profile details and section headings.

---

## 🌐 Production Deployment (Render / Vercel)

To deploy the full-stack system, set up three independent web services on your hosting provider (such as Render):

### 1. Deploying the Backend API
*   **Service Type**: Web Service
*   **Root Directory**: `backend`
*   **Build Command**: `npm install`
*   **Start Command**: `npm start`
*   **Environment Variables**: `MONGO_URI` (pointing to your MongoDB Atlas database string)

### 2. Deploying the Frontend Client
*   **Service Type**: Static Site
*   **Root Directory**: `frontend`
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
*   **Environment Variables**: `VITE_API_URL` (URL of your deployed backend, e.g., `https://portfolio-api.onrender.com`)
*   **Redirects/Rewrites**: Redirect `/*` to `/index.html` (Rewrite)

### 3. Deploying the Admin Panel
*   **Service Type**: Static Site
*   **Root Directory**: `admin`
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
*   **Environment Variables**: `VITE_API_URL` (URL of your deployed backend, e.g., `https://portfolio-api.onrender.com`)
*   **Redirects/Rewrites**: Redirect `/*` to `/index.html` (Rewrite)
