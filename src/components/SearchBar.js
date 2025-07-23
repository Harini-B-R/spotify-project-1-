import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        // const res = await axios.get(`http://localhost:5000/api/songs/search?q=${query}`);
const res = await axios.get(`http://localhost:5000/api/songs/search?query=${encodeURIComponent(query)}`);

        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (song) => {
    navigate(`/player/${song._id}`, { state: { song } });
    setQuery("");
    setResults([]);
  };

  return (
    <div className="position-relative w-100 mx-auto" style={{ maxWidth: "500px" }}>
      <div className="input-group shadow rounded">
        <span className="input-group-text bg-dark border-secondary text-white">
          <FiSearch />
        </span>
        <input
          type="text"
          className="form-control bg-dark border-secondary text-white"
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {isFocused && results.length > 0 && (
        <ul className="list-group position-absolute w-100 mt-1 shadow bg-dark border border-secondary z-3" style={{ maxHeight: "240px", overflowY: "auto" }}>
          {results.map((song) => (
            <li
              key={song._id}
              className="list-group-item list-group-item-action bg-dark text-white border-secondary"
              onClick={() => handleSelect(song)}
              style={{ cursor: "pointer" }}
            >
              <div className="fw-semibold">{song.title}</div>
              <div className="text-secondary small">{song.artist}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
