import axios from "axios";

const API = "http://localhost:5000/api/songs";

// Search songs based on query
export const searchSongs = async (query) => {
  const res = await axios.get(`${API}/search`, { params: { q: query } });
  return res.data;
};

// Get recommended songs based on a given song ID
export const getRecommendedSongs = async (songId) => {
  const res = await axios.get(`${API}/recommend/${songId}`);
  return res.data;
};
