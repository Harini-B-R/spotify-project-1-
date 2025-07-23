import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Playlist from "./pages/Playlist";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/search" element={<Search />} />
    <Route path="/library" element={<Library />} />
    <Route path="/playlist/:id" element={<Playlist />} />
    <Route path="/player/:id" element={<Player />} />
  </Routes>
);

export default AppRoutes;
