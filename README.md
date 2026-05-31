# Ganesh Bobbala - Personal Profile Website

A modern, clean, and professional personal profile website designed for **Ganesh Bobbala**, an aspiring Software Developer and Full Stack Developer.

This repository features a clean separation of concerns, split into a **Frontend** client folder and a **Backend** server folder.

---

## Project Structure

```text
/personal profile website
  ├── /frontend
  │     ├── index.html       # Single Page Application HTML structure (HTML5)
  │     ├── style.css        # Custom CSS styles (CSS Variables, Flexbox, Grid, Animations)
  │     ├── script.js        # Scroll Spy, mobile nav, and dynamic form fetch API
  │     └── /assets          # Developer SVG illustrations
  │
  ├── /backend
  │     ├── server.js        # Node.js + Express API server
  │     ├── package.json     # Backend server configurations
  │     ├── .env             # Environment file (defines server Port)
  │     └── /data
  │           └── contacts.json # JSON database storing form contact submissions
  │
  └── README.md              # Instructions for running the project
```

---

## Technologies Used

### Frontend
- **HTML5**: Semantic tags, accessibility (ARIA attributes), SEO metadata.
- **CSS3 (Vanilla CSS)**: Responsive layout using CSS Grid & Flexbox, smooth transitions, card translate hover effects, glassmorphic header, and keyframe animations.
- **JavaScript (ES6)**: 
  - Intersection Observer API for scroll animations (fade-in-up).
  - Scroll Spy to dynamically highlight the active navigation section.
  - Fetch API to handle asynchronous contact form submissions to the backend.

### Backend
- **Node.js**: Server runtime.
- **Express.js**: REST API setup.
- **CORS**: Enabled cross-origin resource sharing to support calls from frontend origins.
- **FS (File System)**: Lightweight, file-based JSON database storage (`data/contacts.json`).

---

## How to Run the Project

### 1. Run the Backend Server
1. Navigate to the `backend` directory in your terminal:
   ```bash
   cd backend
   ```
2. Install the Node.js packages:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend server will run on **`http://localhost:5000`**. You should see the message:
   `Backend server is running on http://localhost:5000`

### 2. Open the Frontend Client
- Because the frontend is built using standard static files (HTML, CSS, JS), you can open it directly:
  1. Open the `/frontend` directory.
  2. Double-click **`index.html`** to open it in your web browser.
  - *Optionally*, you can serve the `/frontend` folder using any static server tool (such as VS Code's **Live Server** extension, or `npx serve`, or python's `http.server`).

---

## API Endpoints

### 1. Health Status
- **Method**: `GET`
- **Path**: `/api/health`
- **Response**: `{ "status": "ok", "timestamp": "..." }`

### 2. Contact Message Submission
- **Method**: `POST`
- **Path**: `/api/contact`
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Your Name",
    "email": "yourname@example.com",
    "subject": "Inquiry Subject",
    "message": "Detailed message text"
  }
  ```
- **Response**: `201 Created` on successful validation and local persistence.
- **Response Body**:
  ```json
  {
    "message": "Thank you! Your message has been received successfully.",
    "contact": { "id": "...", "name": "..." }
  }
  ```

### 3. List Submissions
- **Method**: `GET`
- **Path**: `/api/contact`
- **Response**: List of saved messages in JSON array format.
