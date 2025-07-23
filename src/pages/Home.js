import React, { useEffect, useState, useContext } from "react";
import { getAllSongs } from "../api/songs";
import SongCard from "../components/SongCard";
import { PlayerContext } from "../context/PlayerContext";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const { currentSong, playSong } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="container mt-5 text-white">
      <h1 className="mb-4">Recommended Songs</h1>

      {/* Current Playing Song Info */}
      {currentSong && (
        <div className="alert alert-info text-dark d-flex justify-content-between align-items-center">
          <div>
            <strong>Now Playing:</strong> {currentSong.title} by {currentSong.artist}
          </div>
          <audio controls autoPlay src={currentSong.url} />
        </div>
      )}

      <div className="row">
        {songs.map((song) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={song._id}>
            <SongCard song={song} onPlay={() => playSong(song)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
