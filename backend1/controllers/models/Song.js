const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: { type: String },
  mood: { type: String },     // ✅ Add this
  actor: { type: String },    // ✅ And this
  duration: { type: Number },
  audioUrl: { type: String, required: true },
  lyrics: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
