import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

export const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Auto-play new song
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked:", err);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Toggle play/pause error:", err);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        progress,
        duration,
        setCurrentSong,
        setProgress,
        audioRef,
      }}
    >
      {children}
      {currentSong && (
        <audio
          ref={audioRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={currentSong.audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </PlayerContext.Provider>
  );
};
