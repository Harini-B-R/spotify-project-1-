const Playlist = require('../models/Playlist');

const createPlaylist = async (req, res) => {
  try {
    const { name, songs } = req.body;

    const playlist = new Playlist({
      name,
      userId: req.user._id,
      songs
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
};

const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user._id }).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlists', error: err.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { songs } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { songs },
      { new: true }
    ).populate('songs');

    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error updating playlist', error: err.message });
  }
};

module.exports = { createPlaylist, getUserPlaylists, updatePlaylist };
