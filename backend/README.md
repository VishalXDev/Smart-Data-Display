# 📡 Smart Data Display – Backend (FastAPI)

This is the backend API for the Smart Data Display project. It gathers and serves data for categories like trending books and top AI tools.

## 🚀 Features

- FastAPI server with two main endpoints
- Data fetched from public APIs or static lists
- Caching for faster responses
- Refresh endpoint to update data
- CORS enabled for React frontend

## 🛠 Tech Stack

- Python 3.11
- FastAPI
- Uvicorn
- Requests

## 📁 Folder Structure

smart-data-backend/
├── app/
│ ├── main.py # FastAPI app
│ ├── scraper_books.py # Google Books API scraper
│ ├── scraper_ai.py # Static AI tools list
│ ├── models.py # (empty for now)
│ └── init.py
├── venv/ # Virtual environment
└── requirements.txt

markdown
Copy
Edit

## ⚙️ Setup Instructions

1. **Clone the repo and navigate to the backend folder:**

```bash
cd smart-data-backend
Create a virtual environment:

bash
Copy
Edit
python -m venv venv
venv\Scripts\activate  # On Windows
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the FastAPI server:

bash
Copy
Edit
uvicorn app.main:app --reload
Visit: http://localhost:8000/items

🔄 API Endpoints
Method	Route	Description
GET	/	Server status check
GET	/items	Fetch data by type (books or ai)
POST	/refresh	Refresh cached data

🔐 Notes
CORS enabled for frontend (http://localhost:3000)

Add more categories via scraper_*.py files

✅ Example Output
json
Copy
Edit
{
  "items": [
    {
      "title": "Clean Code",
      "authors": ["Robert C. Martin"],
      "description": "...",
      "source": "Pearson",
      "link": "https://...",
      "thumbnail": "https://..."
    }
  ]
}