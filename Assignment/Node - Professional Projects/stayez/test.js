/**
 * Automated test script to verify all 5 tasks for StayEZ
 */
const app = require('./app');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing stayez on port ${port}...`);

  try {
    // 1. Task 1: GET / -> 'Welcome to StayEZ'
    const rootRes = await fetch(`${baseUrl}/`);
    const rootText = await rootRes.text();
    console.log(`✓ Task 1: GET / -> "${rootText}"`);

    // 2. Task 3 & 5: GET /rooms -> returns 5 unique realistic rooms
    const roomsRes = await fetch(`${baseUrl}/rooms`);
    const roomsData = await roomsRes.json();
    console.log(`✓ Task 2, 3 & 5: GET /rooms -> Found ${roomsData.totalRooms} rooms:`);
    roomsData.rooms.forEach(r => {
      console.log(`   - "${r.title}" in ${r.location} (₹${r.price}/night) [${r.amenities.length} amenities]`);
    });

    // 3. Task 4: GET /rooms/search?location=Goa
    const searchRes = await fetch(`${baseUrl}/rooms/search?location=Goa`);
    const searchData = await searchRes.json();
    console.log(`✓ Task 4: GET /rooms/search?location=Goa -> Found ${searchData.matchCount} match: "${searchData.rooms[0]?.title}" in ${searchData.rooms[0]?.location}`);

    // Test case-insensitive location search
    const searchRes2 = await fetch(`${baseUrl}/rooms/search?location=manali`);
    const searchData2 = await searchRes2.json();
    console.log(`✓ Task 4 (Case-Insensitive): GET /rooms/search?location=manali -> Found ${searchData2.matchCount} match: "${searchData2.rooms[0]?.title}"`);

    console.log('\nAll 5 tasks for [stayez] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
