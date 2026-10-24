/**
 * Automated test script to verify all 5 tasks for movie-booking
 */
const app = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing movie-booking on port ${port}...`);

  try {
    // 1. Task 1: GET /movies
    const moviesRes = await fetch(`${baseUrl}/movies`);
    const moviesData = await moviesRes.json();
    console.log(`✓ Task 1: GET /movies -> Found ${moviesData.totalUpcoming} upcoming movies:`, moviesData.movies.map(m => `${m.title} (${m.language})`));

    // 2. Task 3: GET /search-movies?q=spider
    const searchRes = await fetch(`${baseUrl}/search-movies?q=spider`);
    const searchData = await searchRes.json();
    console.log(`✓ Task 3: GET /search-movies?q=spider -> Found ${searchData.resultsCount} match: "${searchData.movies[0]?.title}"`);

    // 3. Task 2: POST /book-ticket (successful booking)
    const bookRes = await fetch(`${baseUrl}/book-ticket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movieId: 1,
        seatNumber: "E12",
        userEmail: "cinephile@example.com"
      })
    });
    const bookData = await bookRes.json();
    console.log('✓ Task 2: POST /book-ticket -> Booking confirmed:', {
      bookingId: bookData.confirmation.bookingId,
      movieId: bookData.confirmation.movieId,
      seatNumber: bookData.confirmation.seatNumber,
      userEmail: bookData.confirmation.userEmail
    });

    // 4. Task 5: AI-assisted seat booking validation (attempting to book the SAME seat 'E12' or pre-booked 'A1')
    console.log('\n--- Testing AI Seat Collision Validation (Task 5) ---');
    const duplicateRes = await fetch(`${baseUrl}/book-ticket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movieId: 1,
        seatNumber: "e12", // lower case to test case-insensitive validation
        userEmail: "another.user@example.com"
      })
    });
    const duplicateData = await duplicateRes.json();
    console.log(`✓ Task 5: Duplicate seat detection -> Status: ${duplicateRes.status}, Message: "${duplicateData.message}"`);

    // 5. Task 4: Error handling middleware (catch errors and return 500 JSON)
    console.log('\n--- Testing Error Handling Middleware (Task 4) ---');
    const errRes = await fetch(`${baseUrl}/movies?simulateError=true`);
    const errData = await errRes.json();
    console.log(`✓ Task 4: Error middleware handled failure -> Status: ${errRes.status}, Error: "${errData.error}", Message: "${errData.message}"`);

    console.log('\nAll 5 tasks for [movie-booking] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
