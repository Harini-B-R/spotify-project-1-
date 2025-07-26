// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

// const Player = () => {
//   const { id } = useParams();
//   const [song, setSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     fetchSong();
//   }, [id]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (audioRef.current && isPlaying) {
//         setProgress(audioRef.current.currentTime);
//       }
//     }, 500);
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const fetchSong = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/songs/${id}`);
//       setSong(res.data);
//     } catch (err) {
//       console.error("Failed to load song", err);
//     }
//   };

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const skip = (seconds) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime += seconds;
//     }
//   };

//   const handleProgressClick = (e) => {
//     const width = e.currentTarget.clientWidth;
//     const clickX = e.nativeEvent.offsetX;
//     const newTime = (clickX / width) * duration;
//     audioRef.current.currentTime = newTime;
//     setProgress(newTime);
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return "0:00";
//     const mins = Math.floor(time / 60);
//     const secs = Math.floor(time % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(audioRef.current.duration);
//   };

//   if (!song) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
//       <div className="max-w-2xl mx-auto text-center">
//         <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
//         <h2 className="text-lg text-gray-400 mb-4">{song.artist}</h2>

//         <audio
//           ref={audioRef}
//           src={song.audioUrl}
//           onLoadedMetadata={handleLoadedMetadata}
//           onEnded={() => setIsPlaying(false)}
//         />

//         {/* Playback Controls */}
//         <div className="flex justify-center items-center gap-6 my-4">
//           <button onClick={() => skip(-10)} className="hover:text-green-400 transition">
//             <FaBackward size={24} />
//           </button>
//           <button
//             onClick={togglePlay}
//             className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-full text-white text-xl transition shadow-md"
//           >
//             {isPlaying ? <FaPause /> : <FaPlay />}
//           </button>
//           <button onClick={() => skip(10)} className="hover:text-green-400 transition">
//             <FaForward size={24} />
//           </button>
//         </div>

//         {/* Progress Bar */}
//         <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
//           <span>{formatTime(progress)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//         <div
//           className="w-full bg-gray-800 h-2 rounded cursor-pointer mb-4"
//           onClick={handleProgressClick}
//         >
//           <div
//             className="bg-green-500 h-2 rounded"
//             style={{ width: `${(progress / duration) * 100}%` }}
//           ></div>
//         </div>

//         {/* Lyrics */}
//         <div className="mt-6 text-left bg-gray-900 p-4 rounded shadow-lg max-h-[300px] overflow-y-auto">
//           <h3 className="text-xl font-semibold mb-2">Lyrics</h3>
//           <pre className="whitespace-pre-wrap">
//             {song.lyrics || "No lyrics available."}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Player = () => {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch song by ID
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/songs/${id}`);
        setSong(res.data);
      } catch (err) {
        console.error("Failed to fetch song", err);
      }
    };
    fetchSong();
  }, [id]);

  // Update progress bar periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress(audioRef.current.currentTime);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      newTime = Math.max(0, Math.min(newTime, duration));
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleProgressClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!song) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="animate-spin h-10 w-10 border-t-4 border-green-400 border-solid rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
        <h2 className="text-md text-gray-400 mb-4">{song.artist}</h2>

        <audio
          ref={audioRef}
          src={song.audioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 my-4">
          <button onClick={() => skip(-10)} className="hover:text-green-400 transition">
            <FaBackward size={22} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-full transition shadow-md"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button onClick={() => skip(10)} className="hover:text-green-400 transition">
            <FaForward size={22} />
          </button>
        </div>

        {/* Time Labels and Progress Bar */}
        <div className="flex justify-between text-sm text-gray-400 mb-1 px-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          className="w-full h-2 bg-gray-800 rounded-full cursor-pointer mb-6"
          onClick={handleProgressClick}
        >
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${(progress / duration) * 100 || 0}%` }}
          ></div>
        </div>

        {/* Lyrics Section */}
        <div className="bg-gray-900 p-4 rounded shadow-md max-h-72 overflow-y-auto text-left">
          <h3 className="text-xl font-semibold mb-3">Lyrics</h3>
          <pre className="whitespace-pre-wrap leading-relaxed">
            {song.lyrics || "No lyrics available."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Player;
