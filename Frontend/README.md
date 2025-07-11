## 💻 `smart-data-frontend/README.md`

```md
# 🧠 Smart Data Display – Frontend (React + Tailwind)

This is the React-based frontend for Smart Data Display. It allows users to view and refresh data on books and AI tools.

## ✨ Features

- 📚 Trending Books & 🤖 AI Tools
- 🔍 Search bar and 🔄 refresh button
- 📱 Fully responsive with Tailwind CSS
- Switch category using dropdown
- Data served from FastAPI backend

## ⚙️ Tech Stack

- React
- Axios
- Tailwind CSS
- Create React App

## 📁 Folder Structure

smart-data-frontend/
├── src/
│ ├── App.js # Main UI logic
│ ├── index.js # Entry point
│ └── App.css # Tailwind + custom styles
├── public/
├── tailwind.config.js
└── package.json

markdown
Copy
Edit

## 🚀 Setup Instructions

1. **Navigate to frontend folder:**

```bash
cd smart-data-frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend app:

bash
Copy
Edit
npm start
It will open at: http://localhost:3000

⚠️ Make sure the backend is also running on http://localhost:8000

🖼 Sample Screenshot
Include a screenshot of the UI with dropdown, cards, and refresh button here in your final submission.

🛠 Customization
Modify categories in dropdown inside App.js

Add more backend routes if needed (e.g., smartphones, laptops)

📝 Assumptions
Book data is fetched from Google Books API

AI tools are static for now (can later scrape live sources)

No authentication required