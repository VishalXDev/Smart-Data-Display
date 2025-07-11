# 🧩 Smart Data Display – Maketronics Tech Challenge

This is a full-stack web app that displays **real-time trending data** from the web for two categories:  
📚 **Trending Books** and 🤖 **Top AI Tools**.

Built as part of the Maketronics Tech Challenge to demonstrate data scraping, API design, and modern frontend UI with filtering and refreshing features.

---

## 🚀 Live Demo

> Coming soon — Will be deployed on Vercel + Render (or use `localhost`)

---

## 🗂️ Project Structure

smart-data-display/
├── backend/ # FastAPI backend with scraping logic & API
├── frontend/ # React frontend with Tailwind CSS UI
└── README.md # You're here

yaml
Copy
Edit

---

## 🎯 Features

- ✅ Scrapes 15–20+ items per category (books, AI tools)
- ✅ Returns structured JSON from API (`/items`)
- ✅ React frontend with Tailwind UI
- ✅ Live filtering by title/author/tool name
- ✅ Refresh button to fetch new data
- ✅ Responsive & mobile-friendly

---

## 🛠️ Tech Stack

| Layer     | Tools Used                             |
|-----------|----------------------------------------|
| Backend   | Python, FastAPI, BeautifulSoup, Uvicorn|
| Frontend  | React, Tailwind CSS, Axios             |
| Hosting   | Vercel (Frontend), Render (Backend) *(optional)* |
| Versioning | Git & GitHub                         |

---

## 📦 Setup Instructions

### 🧠 Prerequisite
- Python 3.9+
- Node.js 18+

---

### 🔧 Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
Runs at: http://localhost:8000

💻 Frontend (React + Tailwind)
bash
Copy
Edit
cd frontend
npm install
Create a .env file in frontend/:

ini
Copy
Edit
REACT_APP_API_BASE_URL=http://localhost:8000
Then:

bash
Copy
Edit
npm start
Runs at: http://localhost:3000

📸 Screenshots
📍 Add images after deployment or local screenshots

📚 Trending Books	🤖 Top AI Tools
	

✨ Bonus Features
✅ Search by title/author/tool

✅ Refresh button to scrape new data

🏗️ Ready for deployment

🌍 Uses environment variables for base URL

🙋 Assumptions
Data is fetched in real-time from open web sources (scraped).

AI Tools are extracted from curated tech sites.

Books are pulled from publicly available sources like Google Books or Goodreads.

📬 Submission
✅ Code pushed to GitHub

✅ Includes README and setup instructions

✅ Screenshots ready or coming after deployment

💡 Future Enhancements
Add pagination & sorting

Add price-based filters (for gadgets/tools)

Deploy backend on Render and frontend on Vercel

🧠 Author
Vishal — Software Developer
GitHub