const express = require('express');
const {
  createPlaylist,
  getUserPlaylists,
  updatePlaylist
} = require('../controllers/playlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPlaylist);              // Create new playlist
router.get('/', protect, getUserPlaylists);             // Get all playlists by user
router.put('/:id', protect, updatePlaylist);            // Add/remove songs in playlist

module.exports = router;
