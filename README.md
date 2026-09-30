# College Placement System — MVP

A placement management web application built on the MERN stack (MongoDB, Express, React, Node.js). It helps a college manage three things in one place:

1. **Internships**: internship details for FY, SY and TY students
2. **Placements**: placement records for TY students
3. **Openings**: job openings from companies visiting the college

## Features

- View company openings on the home page
- Navigate between Openings, Internships and Placements from the top navigation bar
- Add new entries through a form on each page
- Delete entries directly from the list view

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React                       |
| Backend  | Node.js, Express            |
| Database | MongoDB (local or Atlas)    |

## Prerequisites

Install the following before you begin (one-time setup):

1. **Node.js** (LTS version recommended): <https://nodejs.org>
2. **MongoDB**, using either of these options:
   - **MongoDB Community Server** (local installation, make sure it is running): <https://www.mongodb.com/try/download/community>
   - **MongoDB Atlas** (free cloud database): <https://www.mongodb.com/cloud/atlas>. Add the connection string it provides to your `.env` file.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aanchalrai044-blip/college-placement-system.git
cd college-placement-system
```

### 2. Set up and run the backend

```bash
cd backend
npm install
```

Create your environment file by renaming `.env.example` to `.env`, then verify the MongoDB URI. The default value works if you are using a local MongoDB instance.

Start the server:

```bash
npm start
```

You should see `MongoDB connected` and `Server running on port 5000` in the terminal.

### 3. Set up and run the frontend

Open a **new** terminal window (keep the backend running), then run:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000`) in your browser.

## Usage

- The **home page** lists the company openings.
- Use the top navigation to switch to the **Internships** and **Placements** pages.
- Each page has a form to add a new entry, and each list item has a delete button.

## Troubleshooting

| Problem | Likely cause and fix |
| ------- | -------------------- |
| `MongoDB connection error` | MongoDB is not running, or the URI in `.env` is incorrect. |
| No data appears in the frontend | Make sure the backend is running and listening on port `5000`. |
