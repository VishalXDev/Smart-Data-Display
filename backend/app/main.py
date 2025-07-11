from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from app.scraper_books import get_data as get_books
from app.scraper_ai import get_ai_tools

app = FastAPI()

# ✅ Enable CORS for local frontend (React on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Cached data loaded at server startup
cache = {
    "books": get_books(),
    "ai": get_ai_tools(),
}

@app.get("/")
def root():
    return {"message": "Server is running"}

@app.get("/items")
def get_items(type: str = Query("books", enum=["books", "ai"])):
    return {"items": cache.get(type, [])}

@app.post("/refresh")
def refresh_items(type: str = Query("books", enum=["books", "ai"])):
    if type == "books":
        cache["books"] = get_books()
    elif type == "ai":
        cache["ai"] = get_ai_tools()
    return {"message": f"{type.capitalize()} data refreshed", "count": len(cache[type])}
