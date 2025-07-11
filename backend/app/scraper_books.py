import requests

def get_data():
    curated_books = [
        {
            "title": "Atomic Habits",
            "description": "An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.",
            "authors": ["James Clear"],
            "source": "Penguin",
            "link": "https://www.amazon.in/dp/1847941834",
            "thumbnail": "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
        },
        {
            "title": "The Psychology of Money",
            "description": "Timeless lessons on wealth, greed, and happiness.",
            "authors": ["Morgan Housel"],
            "source": "Harper Business",
            "link": "https://www.amazon.in/dp/9390166268",
            "thumbnail": "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg"
        },
        {
            "title": "Rich Dad Poor Dad",
            "description": "What the Rich Teach Their Kids About Money - That the Poor and Middle Class Do Not!",
            "authors": ["Robert T. Kiyosaki"],
            "source": "Plata Publishing",
            "link": "https://www.amazon.in/dp/1612681131",
            "thumbnail": "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
        },
        {
            "title": "Ikigai",
            "description": "The Japanese secret to a long and happy life.",
            "authors": ["Héctor García", "Francesc Miralles"],
            "source": "Penguin",
            "link": "https://www.amazon.in/dp/0143442295",
            "thumbnail": "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg"
        },
        {
            "title": "Deep Work",
            "description": "Rules for Focused Success in a Distracted World.",
            "authors": ["Cal Newport"],
            "source": "Grand Central Publishing",
            "link": "https://www.amazon.in/dp/0349413681",
            "thumbnail": "https://m.media-amazon.com/images/I/81pviJua7PL.jpg"
        },
        {
            "title": "Can't Hurt Me",
            "description": "Master Your Mind and Defy the Odds.",
            "authors": ["David Goggins"],
            "source": "Lioncrest Publishing",
            "link": "https://www.amazon.in/dp/1544512287",
            "thumbnail": "https://m.media-amazon.com/images/I/81oI9UuDoFL.jpg"
        }
    ]

    try:
        url = "https://www.googleapis.com/books/v1/volumes?q=trending+books&maxResults=10"
        response = requests.get(url)
        if response.status_code == 200:
            items = response.json().get("items", [])
            for item in items:
                volume = item.get("volumeInfo", {})
                image_links = volume.get("imageLinks", {})
                book = {
                    "title": volume.get("title"),
                    "description": volume.get("description", "No description available."),
                    "authors": volume.get("authors", []),
                    "source": volume.get("publisher", "Unknown"),
                    "link": volume.get("infoLink"),
                    "thumbnail": image_links.get("thumbnail") or image_links.get("smallThumbnail", "")
                }
                curated_books.append(book)
    except Exception as e:
        print("Error fetching from Google Books API:", e)

    return curated_books
