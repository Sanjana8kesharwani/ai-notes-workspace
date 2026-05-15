# AI Notes Workspace 🚀

AI Notes Workspace is a modern full stack note-taking application that helps users create, manage, organize, and share notes efficiently with AI-powered features.

The platform includes authentication, note management, AI-generated summaries, tags & categories, search functionality, and public note sharing.

---

# Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes

---

## Notes Management

- Create Notes
- Edit Notes
- Delete Notes
- Search Notes
- Tags & Categories
- Responsive Dashboard

---

## AI Features

- AI Generated Summary
- Suggested Titles
- Action Items

---

## Public Sharing

- Share Notes Publicly
- Unique Share Links
- Access Shared Notes Without Login

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- BcryptJS

---

# Folder Structure

```bash
ai-notes-workspace/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---


# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/ai-notes-workspace.git
```

---

# Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/signup |
| POST | /api/auth/login |

---

## Notes

| Method | Endpoint |
|--------|----------|
| GET | /api/notes |
| POST | /api/notes |
| PUT | /api/notes/:id |
| DELETE | /api/notes/:id |

---

## AI Routes

| Method | Endpoint |
|--------|----------|
| POST | /api/ai/summary/:id |

---

## Share Routes

| Method | Endpoint |
|--------|----------|
| POST | /api/notes/:id/share |
| GET | /api/notes/shared/:shareId |

---

# Screenshots

Add your project screenshots here.

---

# Future Improvements

- Dark Mode
- AI Chat Assistant
- File Uploads
- Rich Text Editor
- Export Notes as PDF
- Team Collaboration

---

# Author

## Sanjana Kesharwani

Full Stack Developer