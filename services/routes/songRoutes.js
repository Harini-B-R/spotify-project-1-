// const express = require('express');
// const {
//   getAllSongs,
//   getSongById,
//   getRecommendedSongs
// } = require('../controllers/songController');

// const router = express.Router();

// router.get('/', getAllSongs);               // /api/songs
// router.get('/:id', getSongById);            // /api/songs/:id
// router.get('/recommend/:id', getRecommendedSongs); // /api/songs/recommend/:id

// module.exports = router;
const express = require('express');
const {
  getAllSongs,
  getSongById,
  getRecommendedSongs,
  searchSongs
} = require('../controllers/songController');

const router = express.Router();

// 🔥 Specific routes come first
router.get('/search', searchSongs);                  // /api/songs/search
router.get('/recommend/:id', getRecommendedSongs);   // /api/songs/recommend/:id
router.get('/:id', getSongById);                     // /api/songs/:id
router.get('/', getAllSongs);                        // /api/songs

module.exports = router;
