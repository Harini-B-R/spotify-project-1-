import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom"; // ❗ remove BrowserRouter

import Navbar from "./components/Navbar";
import SongPlayer from "./components/SongPlayer";

import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Player from "./pages/Player";

import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <div className="min-vh-100 pb-5 bg-dark text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/player/:id" element={<Player />} />
          </Routes>
          <SongPlayer />
        </div>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
