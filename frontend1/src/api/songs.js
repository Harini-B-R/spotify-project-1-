// import axios from "axios";

// const API = "http://localhost:5000/api/songs";

// export const getAllSongs = async () => {
//   const res = await axios.get(API);
//   return res.data;
// };
import axios from "axios";

// Base API URL
const API = "http://localhost:5000/api/songs";

// Fetch all songs
export const getAllSongs = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching songs:", error.message);
    throw error;
  }
};

// Get a single song by ID
export const getSongById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching song by ID:", error.message);
    throw error;
  }
};

// Get recommendations based on a song
export const getRecommendedSongs = async (id) => {
  try {
    const res = await axios.get(`${API}/recommend/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching recommended songs:", error.message);
    throw error;
  }
};
