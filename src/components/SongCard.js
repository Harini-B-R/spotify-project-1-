import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

const SongCard = ({ song }) => {
  const navigate = useNavigate();
  const { playSong } = usePlayer();

  const handlePlay = () => {
    playSong(song);
    navigate(`/player/${song._id}`, { state: { song } });
  };

  return (
    <div className="card bg-dark text-white h-100 shadow" style={{ cursor: "pointer" }} onClick={handlePlay}>
      <img
        src={song.thumbnail || "https://via.placeholder.com/150"}
        alt={song.title}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body p-2">
        <h6 className="card-title mb-1 text-truncate">{song.title}</h6>
        <p className="card-text mb-0 text-muted text-truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
