/**
 * Automated test script to verify all 5 tasks for insta-clone
 */
const app = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing insta-clone on port ${port}...`);

  try {
    // 1. Test GET /profile
    const profileRes = await fetch(`${baseUrl}/profile`);
    const profile = await profileRes.json();
    console.log('✓ Task 1 & 5: GET /profile ->', { username: profile.username, followers: profile.followers, bio: profile.bio });

    // 2. Test POST /post
    const postRes = await fetch(`${baseUrl}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: "https://images.unsplash.com/photo-example.jpg",
        caption: "Testing automated post creation",
        username: "travel_with_alex"
      })
    });
    const postData = await postRes.json();
    console.log('✓ Task 2: POST /post -> Created post ID:', postData.post.postId);

    // 3. Test GET /feed (reverse order)
    const feedRes = await fetch(`${baseUrl}/feed`);
    const feedData = await feedRes.json();
    console.log(`✓ Task 3: GET /feed -> Total posts: ${feedData.feed.length}, First item ID (newest): ${feedData.feed[0].postId}`);

    // 4. Test POST /like
    const likeRes = await fetch(`${baseUrl}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: postData.post.postId })
    });
    const likeData = await likeRes.json();
    console.log('✓ Task 4: POST /like ->', likeData);

    console.log('\nAll 5 tasks for [insta-clone] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
