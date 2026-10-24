/**
 * InstaClone Backend API
 * 
 * Implements:
 * Task 1: Express setup and GET /profile endpoint with username, followers, and bio.
 * Task 2: POST /post endpoint accepting imageUrl & caption, assigning unique postId.
 * Task 3: GET /feed returning posts in reverse order (newest first).
 * Task 4: POST /like endpoint incrementing like count for a given postId.
 * Task 5: Seeded with 5 realistic user profiles and 10 posts.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON request bodies
app.use(express.json());

// ==========================================
// TASK 5: AI-GENERATED SEED DATA
// 5 User Profiles and 10 Sample Posts
// ==========================================

const profiles = [
  {
    username: "travel_with_alex",
    fullName: "Alex Rivera",
    followers: 15420,
    following: 420,
    bio: "Capturing moments around the globe ✈️ | Travel Photographer 📸 | Living out of a backpack",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    username: "foodie_maya",
    fullName: "Maya Lin",
    followers: 28900,
    following: 610,
    bio: "Exploring culinary wonders one bite at a time 🍜 | Street food addict & amateur baker 🧁",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    username: "tech_guru_raj",
    fullName: "Raj Patel",
    followers: 45210,
    following: 280,
    bio: "Building the future with JavaScript & AI 💻 🚀 | Open-source advocate | Tech Speaker",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  },
  {
    username: "fitness_sarah",
    fullName: "Sarah Jenkins",
    followers: 12350,
    following: 195,
    bio: "Daily workouts & mindful living 💪 Health is wealth | Certified personal trainer",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    username: "nature_vibes",
    fullName: "Liam Thorne",
    followers: 67400,
    following: 340,
    bio: "Celebrating wilderness, mountains, and flora 🌿 🏔️ | National Geographic Contributor",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

// In-memory array storing posts
let posts = [
  {
    postId: 1,
    username: "travel_with_alex",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Sunset over the Italian Dolomites. Never felt so peaceful! 🌅🏔️",
    likes: 1240,
    createdAt: "2026-10-18T10:15:00Z"
  },
  {
    username: "foodie_maya",
    postId: 2,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    caption: "Freshly baked Neapolitan pizza with buffalo mozzarella and fresh basil 🍕🤤",
    likes: 852,
    createdAt: "2026-10-18T14:30:00Z"
  },
  {
    postId: 3,
    username: "tech_guru_raj",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    caption: "Clean desk setup ready for another productive week of Node.js hacking! ⚡💻",
    likes: 2150,
    createdAt: "2026-10-19T08:00:00Z"
  },
  {
    postId: 4,
    username: "fitness_sarah",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    caption: "Morning leg day done! Consistency beats motivation every single time. 💪🔥",
    likes: 670,
    createdAt: "2026-10-19T09:45:00Z"
  },
  {
    postId: 5,
    username: "nature_vibes",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    caption: "Morning fog lifting across the Redwood forest. Magical moments in nature 🌲✨",
    likes: 3410,
    createdAt: "2026-10-19T13:20:00Z"
  },
  {
    postId: 6,
    username: "travel_with_alex",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    caption: "Crystal turquoise waters in the Maldives 🏝️ Where is your dream destination?",
    likes: 1980,
    createdAt: "2026-10-19T16:10:00Z"
  },
  {
    postId: 7,
    username: "foodie_maya",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    caption: "Glazed artisanal donuts: matcha, raspberry rose, and salted caramel 🍩😍",
    likes: 1120,
    createdAt: "2026-10-20T11:05:00Z"
  },
  {
    postId: 8,
    username: "tech_guru_raj",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    caption: "Deep dive into microservices architecture today. Code clean, stay humble! 🤖",
    likes: 1540,
    createdAt: "2026-10-20T15:40:00Z"
  },
  {
    postId: 9,
    username: "fitness_sarah",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    caption: "Post-workout smoothie bowl: acai, berries, hemp seeds & almond butter 🍓🥣",
    likes: 890,
    createdAt: "2026-10-20T18:25:00Z"
  },
  {
    postId: 10,
    username: "nature_vibes",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    caption: "Golden hour peaks touching the clouds. Nature is the ultimate artist 🏔️✨",
    likes: 4210,
    createdAt: "2026-10-21T07:15:00Z"
  }
];

// Helper to generate next unique postId
let nextPostId = 11;

// ==========================================
// ROUTES
// ==========================================

// Welcome / Index route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to InstaClone API",
    endpoints: {
      profile: "GET /profile (or GET /profile?username=travel_with_alex)",
      profiles: "GET /profiles",
      createPost: "POST /post",
      feed: "GET /feed",
      likePost: "POST /like"
    }
  });
});

/**
 * TASK 1 & TASK 5:
 * GET /profile endpoint
 * Returns a user profile with username, followers, and bio.
 * Optionally supports query param ?username=... or defaults to travel_with_alex
 */
app.get('/profile', (req, res) => {
  const targetUsername = req.query.username || "travel_with_alex";
  const userProfile = profiles.find(p => p.username.toLowerCase() === targetUsername.toLowerCase());

  if (!userProfile) {
    return res.status(404).json({
      error: "User profile not found",
      requestedUsername: targetUsername
    });
  }

  // Returns username, followers, bio (and full object)
  res.json({
    username: userProfile.username,
    followers: userProfile.followers,
    bio: userProfile.bio,
    fullName: userProfile.fullName,
    avatarUrl: userProfile.avatarUrl,
    following: userProfile.following
  });
});

// GET /profiles - returns all 5 seeded profiles
app.get('/profiles', (req, res) => {
  res.json(profiles);
});

/**
 * TASK 2:
 * POST /post endpoint
 * Accepts a JSON body with imageUrl and caption,
 * stores the post in an in-memory array,
 * and returns the new post with a unique postId.
 */
app.post('/post', (req, res) => {
  const { imageUrl, caption, username } = req.body;

  if (!imageUrl || !caption) {
    return res.status(400).json({
      error: "Both 'imageUrl' and 'caption' are required fields."
    });
  }

  const newPost = {
    postId: nextPostId++,
    username: username || "travel_with_alex",
    imageUrl: imageUrl.trim(),
    caption: caption.trim(),
    likes: 0,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post created successfully",
    post: newPost
  });
});

/**
 * TASK 3:
 * GET /feed endpoint
 * Returns all posts in reverse order (newest first),
 * including the username and caption for each post.
 * Uses array.reverse() as requested by the task hint.
 */
app.get('/feed', (req, res) => {
  // Use a shallow copy before reversing so we do not mutate original order unexpectedly
  const postsCopy = [...posts];
  const reversedFeed = postsCopy.reverse();

  res.json({
    count: reversedFeed.length,
    feed: reversedFeed
  });
});

/**
 * TASK 4:
 * POST /like endpoint
 * Takes a postId and increments the like count for that post.
 * Returns the updated like count in the response.
 */
app.post('/like', (req, res) => {
  const postId = req.body.postId || req.query.postId;

  if (!postId) {
    return res.status(400).json({
      error: "Please provide 'postId' in request body or query parameter."
    });
  }

  const numericId = parseInt(postId, 10);
  const targetPost = posts.find(p => p.postId === numericId);

  if (!targetPost) {
    return res.status(404).json({
      error: `Post with postId ${postId} not found.`
    });
  }

  targetPost.likes += 1;

  res.json({
    message: "Post liked successfully",
    postId: targetPost.postId,
    likes: targetPost.likes
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[insta-clone] Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
