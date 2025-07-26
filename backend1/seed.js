const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Song = require("./models/Song");

dotenv.config();

const songs = [
  {
    title: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    genre: "Pop",
    duration: 168, // in seconds
    lyrics: `This night is cold in the kingdom
I can feel you fade away
From the kitchen to the bathroom sink and
Your steps keep me awake`,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b2738f9f3a3c4b5e0f9058435f94",
  },
  {
    title: "Lose Yourself",
    artist: "Eminem",
    genre: "Rap",
    duration: 326,
    lyrics: `Look, if you had one shot, or one opportunity
To seize everything you ever wanted, in one moment
Would you capture it, or just let it slip?`,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b2730f89b1c91506f5e1f5c3d6f4",
  },
  {
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    genre: "Pop",
    duration: 182,
    lyrics: `I'm going under and this time I fear there's no one to save me
This all or nothing really got a way of driving me crazy`,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b27376d8f632bd8f0c60be9e6b3d",
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    await Song.deleteMany({});
    await Song.insertMany(songs);
    console.log("🎵 Songs seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  });
