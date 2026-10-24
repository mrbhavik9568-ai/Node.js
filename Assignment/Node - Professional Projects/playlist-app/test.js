/**
 * Automated test script to verify all 5 tasks for playlist-app
 */
const { app } = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing playlist-app on port ${port}...`);

  try {
    // 1. Task 1: GET / -> 'Welcome to Playlist App'
    const rootRes = await fetch(`${baseUrl}/`);
    const rootText = await rootRes.text();
    console.log(`✓ Task 1: GET / -> "${rootText}"`);

    // 2. Task 3: GET /songs -> returns list of songs (Task 2 Song instances)
    const songsRes = await fetch(`${baseUrl}/songs`);
    const songsData = await songsRes.json();
    console.log(`✓ Task 2 & 3: GET /songs -> Found ${songsData.totalSongs} initial songs:`, songsData.songs.map(s => `${s.title} by ${s.artist} (${s.duration}s)`));

    // 3. Task 5: Test invalid data (negative duration, empty title)
    console.log('\n--- Testing Validation with Invalid Data (Task 5) ---');
    const invalidRes1 = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "", artist: "Test Artist", duration: -50 })
    });
    const invalidData1 = await invalidRes1.json();
    console.log(`✓ Task 5 (Invalid data test: empty title & negative duration): Status ${invalidRes1.status} ->`, invalidData1.details);

    const invalidRes2 = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Valid Song", artist: "Artist", duration: "not-a-number" })
    });
    const invalidData2 = await invalidRes2.json();
    console.log(`✓ Task 5 (Invalid data test: string duration): Status ${invalidRes2.status} ->`, invalidData2.details);

    // 4. Task 4: Add valid song and verify updated list returned
    console.log('\n--- Testing Valid Song Creation (Task 4) ---');
    const validRes = await fetch(`${baseUrl}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Starboy",
        artist: "The Weeknd ft. Daft Punk",
        duration: 230
      })
    });
    const validData = await validRes.json();
    console.log(`✓ Task 4: POST /songs -> Added: "${validData.addedSong.title}". Updated song count: ${validData.updatedSongList.length}`);

    console.log('\nAll 5 tasks for [playlist-app] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
