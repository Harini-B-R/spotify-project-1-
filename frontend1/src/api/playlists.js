import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to each request (if user is logged in)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Create a new playlist
export const createPlaylist = async (name) => {
  const res = await API.post("/playlists", { name });
  return res.data;
};

// ✅ Get all playlists for the logged-in user
export const getUserPlaylists = async () => {
  const res = await API.get("/playlists");
  return res.data;
};

// ✅ Get a specific playlist by ID
export const getPlaylistById = async (playlistId) => {
  const res = await API.get(`/playlists/${playlistId}`);
  return res.data;
};

// ✅ Add a song to a playlist
export const addSongToPlaylist = async (playlistId, songId) => {
  const res = await API.post(`/playlists/${playlistId}/songs`, { songId });
  return res.data;
};

// ✅ Remove a song from a playlist
export const removeSongFromPlaylist = async (playlistId, songId) => {
  const res = await API.delete(`/playlists/${playlistId}/songs/${songId}`);
  return res.data;
};

// ✅ Delete a playlist
export const deletePlaylist = async (playlistId) => {
  const res = await API.delete(`/playlists/${playlistId}`);
  return res.data;
};
