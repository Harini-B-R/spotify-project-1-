import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const { user } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchLibraryData();
    }
  }, [user]);

  const fetchLibraryData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/users/${user._id}/library`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikedSongs(res.data.likedSongs || []);
      setPlaylists(res.data.playlists || []);
    } catch (err) {
      console.error("Error fetching library data", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>

      {/* Liked Songs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Liked Songs</h2>
        {likedSongs.length === 0 ? (
          <p className="text-gray-400">No liked songs yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {likedSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        )}
      </section>

      {/* Playlists */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Playlists</h2>
        {playlists.length === 0 ? (
          <p className="text-gray-400">No playlists created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {playlists.map((pl) => (
              <div
                key={pl._id}
                onClick={() => navigate(`/playlist/${pl._id}`)}
                className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-bold">{pl.name}</h3>
                <p className="text-sm text-gray-400">{pl.songs.length} songs</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Library;
