import requests

def get_data():
    url = "https://www.googleapis.com/books/v1/volumes?q=trending+books&maxResults=20"
    response = requests.get(url)

    books = []
    if response.status_code == 200:
        items = response.json().get("items", [])
        for item in items:
            volume = item.get("volumeInfo", {})
            book = {
                "title": volume.get("title"),
                "description": volume.get("description", "No description available."),
                "authors": volume.get("authors", []),
                "source": volume.get("publisher", "Unknown"),
                "link": volume.get("infoLink"),
                "thumbnail": volume.get("imageLinks", {}).get("thumbnail", "")
            }
            books.append(book)
    return books
