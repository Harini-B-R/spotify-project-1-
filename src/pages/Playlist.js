import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SongCard from "../components/SongCard";
import { AuthContext } from "../context/AuthContext";

const Playlist = () => {
  const { id } = useParams(); // playlist ID from URL
  const [playlist, setPlaylist] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylist(res.data);
    } catch (err) {
      console.error("Error fetching playlist:", err);
    }
  };

  if (!playlist) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Loading playlist...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
        <p className="text-gray-400">
          {playlist.songs.length} song{playlist.songs.length !== 1 && "s"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {playlist.songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;