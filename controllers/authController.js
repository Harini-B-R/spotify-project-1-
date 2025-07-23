const User = require('../models/User');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, dob, favoriteArtists } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, dob, favoriteArtists });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ NEW: Fetch user's liked songs and playlists
const getUserLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('likedSongs');
    const playlists = await Playlist.find({ user: userId }).populate('songs');

    res.json({
      likedSongs: user?.likedSongs || [],
      playlists: playlists || [],
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load library', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserLibrary // ✅ Export new controller
};
