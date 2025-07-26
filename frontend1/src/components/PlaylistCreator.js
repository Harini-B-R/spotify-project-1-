// Bootstrap version of PlaylistCreator.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PlaylistCreator = () => {
  const { user } = useContext(AuthContext);
  const [playlistName, setPlaylistName] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSongs();
  }, []);

  const fetchAllSongs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/songs");
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching songs", err);
    }
  };

  const toggleSong = (songId) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playlistName || selectedSongs.length === 0) {
      alert("Please enter a name and select at least one song.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/playlists",
        {
          name: playlistName,
          songs: selectedSongs,
          createdBy: user._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Playlist created successfully!");
      navigate(`/playlist/${res.data._id}`);
    } catch (err) {
      console.error("Error creating playlist", err);
    }
  };

  return (
    <div className="container py-5 text-white">
      <h1 className="mb-4">Create New Playlist</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="form-control bg-dark text-white border-secondary"
          />
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {songs.map((song) => (
            <div
              key={song._id}
              className={`col card text-white ${
                selectedSongs.includes(song._id)
                  ? 'bg-success border-success'
                  : 'bg-dark border-secondary'
              }`}
              onClick={() => toggleSong(song._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>
                <p className="card-text text-muted">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success">
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default PlaylistCreator;
