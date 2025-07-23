import React, { useState } from "react";
import { searchSongs, getRecommendedSongs } from "../api/search";
import SongCard from "../components/SongCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const results = await searchSongs(query);
      setSearchResults(results);

      if (results.length > 0) {
        const recommended = await getRecommendedSongs(results[0]._id);
        setRecommendations(recommended);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Search Songs</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter song title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Results</h2>
        {searchResults.length === 0 ? (
          <p className="text-gray-400">No songs found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
