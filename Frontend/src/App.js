import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/items?type=${category}`);
      setBooks(res.data.items || []);
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setLoading(false);
  }, [category]);

  const refreshBooks = async () => {
    try {
      await axios.post(`${BASE_URL}/refresh?type=${category}`);
      fetchBooks(); // can call safely since it's now stable
    } catch (err) {
      console.error("Error refreshing data", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.authors &&
        book.authors.join(" ").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-800">
          {category === "books" ? "📚 Trending Books" : "🤖 Top AI Tools"}
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={refreshBooks}
        >
          🔄 Refresh
        </button>
      </header>

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <label className="text-sm font-medium mr-2">Select Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="books">📚 Trending Books</option>
            <option value="ai">🤖 AI Tools</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by title or author"
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                {book.authors && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Author:</strong> {book.authors.join(", ")}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {book.description || "No description available."}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">{book.source}</span>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 text-sm font-medium"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
