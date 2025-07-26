import React from "react";
import { usePlayer } from "../context/PlayerContext";

const SongPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    progress,
    duration,
  } = usePlayer();

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    const audio = document.querySelector("audio");
    if (audio) {
      audio.currentTime = value;
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed-bottom bg-dark text-white px-3 py-2 border-top border-secondary">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
        {/* Song Info */}
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <img
            src={currentSong.thumbnail || "https://via.placeholder.com/50"}
            alt={currentSong.title}
            className="rounded shadow"
            style={{ width: "48px", height: "48px", objectFit: "cover" }}
          />
          <div className="text-truncate">
            <div className="fw-semibold text-truncate">{currentSong.title}</div>
            <div className="small text-muted text-truncate">{currentSong.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="d-flex justify-content-center align-items-center gap-2 my-2">
          <button onClick={togglePlayPause} className="btn btn-success btn-sm">
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ minWidth: "180px" }}>
          <span className="small">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="form-range"
            style={{ flex: 1 }}
          />
          <span className="small">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
