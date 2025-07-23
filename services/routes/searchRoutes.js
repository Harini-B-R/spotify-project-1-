const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { query, artist, actor, mood } = req.query;
    const filter = {};

    if (typeof query === 'string' && query.trim() !== '') {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
        { lyrics: { $regex: query, $options: 'i' } }
      ];
    }

    if (typeof artist === 'string' && artist.trim() !== '') {
      filter.artist = { $regex: artist, $options: 'i' };
    }

    if (typeof actor === 'string' && actor.trim() !== '') {
      filter.actor = { $regex: actor, $options: 'i' };
    }

    if (typeof mood === 'string' && mood.trim() !== '') {
      filter.mood = { $regex: mood, $options: 'i' };
    }

    const results = await Song.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

module.exports = router;
