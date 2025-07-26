const Song = require('../models/Song');

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching songs', error: err.message });
  }


};
const searchSongs = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: "Query must be a non-empty string" });
    }

    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
        { album: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { mood: { $regex: query, $options: "i" } },
        { actor: { $regex: query, $options: "i" } }
      ]
    });

    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching song', error: err.message });
  }
};

// Simple recommendation logic (same genre or artist)
const getRecommendedSongs = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    const recommendations = await Song.find({
      _id: { $ne: song._id },
      $or: [{ genre: song.genre }, { artist: song.artist }]
    }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Error generating recommendations', error: err.message });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  getRecommendedSongs,
  searchSongs // ✅ Add this
};
