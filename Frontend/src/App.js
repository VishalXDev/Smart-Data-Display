import { useEffect, useState, useCallback } from "react";
import "./App.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/items?type=${category}`);
      const data = await res.json();
      setBooks(data.items || []);
      setTimeout(() => setAnimateCards(true), 100);
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setLoading(false);
  }, [category]);

  const refreshBooks = async () => {
    setRefreshing(true);
    setAnimateCards(false);
    try {
      await fetch(`${BASE_URL}/refresh?type=${category}`, { method: 'POST' });
      await fetchBooks();
    } catch (err) {
      console.error("Error refreshing data", err);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    setAnimateCards(false);
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShowFooter(isNearBottom);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.authors &&
        book.authors.join(" ").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const SkeletonCard = () => (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-xl h-80 skeleton-loading">
      <div className="h-40 bg-white/15"></div>
      <div className="p-4">
        <div className="h-6 bg-white/15 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
        <div className="h-3 bg-white/10 rounded mb-1 w-full"></div>
        <div className="h-3 bg-white/10 rounded mb-3 w-5/6"></div>
        <div className="flex justify-between mt-4">
          <div className="h-6 w-16 bg-white/10 rounded-full"></div>
          <div className="h-8 w-20 bg-white/15 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 bg-cyan-400/80 rounded-full blur-[1px]"></div>
        </div>
      </div>
    </div>
  );

  const CategoryIcon = ({ type }) => (
    <div className={`text-2xl mr-2 ${type === "books" ? "animate-wiggle" : "animate-pulse"}`}>
      {type === "books" ? "📗" : "🤖"}
    </div>
  );

  const ThumbnailPlaceholder = ({ title, type }) => (
    <div className="w-full h-40 bg-gradient-to-br from-violet-500/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm">
      <div className="text-center p-4">
        <div className="text-3xl mb-2">{type === "books" ? "📚" : "🤖"}</div>
        <div className="text-white/90 text-sm font-medium line-clamp-2 leading-tight">
          {title}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-500/30 to-violet-600/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl animate-pulse animation-delay-1500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-20">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 mb-4 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center">
              <CategoryIcon type={category} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {category === "books" ? "Trending Books" : "Top AI Tools"}
              </h1>
            </div>
            <button
              className={`group relative px-4 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-lg font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 ${refreshing ? "animate-pulse" : ""} enhanced-glow`}
              onClick={refreshBooks}
              disabled={refreshing}
            >
              <span className="flex items-center gap-2 text-sm">
                <span className={`transition-transform duration-500 ${refreshing ? "animate-spin" : "group-hover:rotate-180"}`}>
                  🔄
                </span>
                {refreshing ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          </div>
        </header>

        {/* Controls */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/20 rounded-xl p-4 mb-4 shadow-xl shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-white/90">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg backdrop-blur-sm text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                style={{ color: '#1f2937' }}
              >
                <option value="books" style={{ color: '#1f2937' }}>📚 Books</option>
                <option value="ai" style={{ color: '#1f2937' }}>🤖 AI Tools</option>
              </select>
            </div>

            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white/20 border border-white/30 rounded-lg backdrop-blur-sm text-white placeholder-white/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm">🔍</div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book, idx) => (
              <div
                key={idx}
                className={`group backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 rounded-xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-cyan-500/30 transform transition-all duration-300 hover:-translate-y-1.5 ${animateCards ? "animate-fade-in-up" : "opacity-0"} hover:z-10 relative enhanced-glow`}
                style={{ 
                  animationDelay: `${idx * 50}ms`, 
                  animationFillMode: "forwards",
                  backdropFilter: 'blur(16px)',
                  willChange: 'transform'
                }}
              >
                <div className="relative overflow-hidden cursor-pointer" onClick={() => window.open(book.link, '_blank', 'noreferrer')}>
                  {book.thumbnail && book.thumbnail !== "/default-thumbnail.png" ? (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : null}
                  <div 
                    className="w-full h-40 bg-gradient-to-br from-violet-500/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm"
                    style={{ display: book.thumbnail && book.thumbnail !== "/default-thumbnail.png" ? 'none' : 'flex' }}
                  >
                    <div className="text-center p-4">
                      <div className="text-3xl mb-2">{category === "books" ? "📚" : "🤖"}</div>
                      <div className="text-white/90 text-sm font-medium line-clamp-2 leading-tight">
                        {book.title}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 leading-tight line-clamp-2">
                    {book.title}
                  </h2>
                  {book.authors && (
                    <p className="text-xs text-white/80 mb-2 flex items-center gap-1">
                      <span className="text-cyan-400">✍️</span>
                      <span className="line-clamp-1">{book.authors.join(", ")}</span>
                    </p>
                  )}
                  <p className="text-xs text-white/70 mb-3 line-clamp-2 leading-relaxed">
                    {book.description || "No description available."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60 px-2 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                      {book.source}
                    </span>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white text-xs font-medium rounded-lg hover:from-cyan-400 hover:via-violet-400 hover:to-fuchsia-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                    >
                      View
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 text-center shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="text-4xl mb-3 animate-bounce">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">No Results Found</h3>
            <p className="text-white/70 text-sm">Try adjusting your search or refresh the data.</p>
          </div>
        )}
      </div>

      {/* Footer - Made thinner and more transparent */}
      <footer className={`fixed bottom-0 left-0 right-0 z-10 backdrop-blur-md bg-gradient-to-r from-white/5 via-white/8 to-white/5 border-t border-white/10 shadow-lg shadow-purple-500/10 transition-all duration-500 ${showFooter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} py-2`}>
        <div className="px-4 py-2 flex items-center justify-center">
          <div className="flex items-center gap-2 text-white/90">
            <div className="relative flex items-center gap-1 mr-2">
              <span className="text-lg animate-book-fly-1">📚</span>
              <span className="text-sm animate-book-fly-2">📖</span>
              <span className="text-xs animate-book-fly-3">📓</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/80">Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-white/80">by</span>
              <span className="font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-name-glow">
                Vishal Dwivedy
              </span>
            </div>
            <div className="ml-2 text-lg animate-reading">🧑‍💻</div>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default App;