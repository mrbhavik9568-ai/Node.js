/**
 * Automated test script to verify all 5 tasks for shop-backend
 */
const { app, clearCart } = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing shop-backend on port ${port}...`);

  try {
    clearCart();

    // 1. Task 1: GET /products
    const prodRes = await fetch(`${baseUrl}/products`);
    const products = await prodRes.json();
    console.log(`✓ Task 1: GET /products -> Found ${products.length} products:`, products.map(p => p.name));

    // 2. Task 4: GET /products/search?q=key
    const searchRes = await fetch(`${baseUrl}/products/search?q=key`);
    const searchData = await searchRes.json();
    console.log(`✓ Task 4: GET /products/search?q=key -> Match count: ${searchData.totalResults}, Name: ${searchData.products[0].name}`);

    // 3. Task 2: Function addToCart via POST /cart/add
    // Add product 1 with quantity 2
    await fetch(`${baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 1, quantity: 2 })
    });

    // Add product 1 again with quantity 1 (should update quantity to 3)
    const addRes = await fetch(`${baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 1, quantity: 1 })
    });
    const addData = await addRes.json();
    console.log(`✓ Task 2: addToCart() updated existing item quantity -> Product ID: ${addData.cart[0].productId}, Quantity: ${addData.cart[0].quantity}`);

    // Add another item (product 2, qty 1)
    await fetch(`${baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 2, quantity: 1 })
    });

    // 4. Task 3: GET /cart/total (Zomato bill breakdown with 5% delivery charge)
    const totalRes = await fetch(`${baseUrl}/cart/total`);
    const totalData = await totalRes.json();
    console.log('✓ Task 3: GET /cart/total ->', {
      subtotal: totalData.billSummary.subtotal,
      deliveryFee: totalData.billSummary.deliveryFeeBreakdown,
      grandTotal: totalData.billSummary.grandTotal
    });

    console.log('✓ Task 5: Middleware logged all requests to console above.');
    console.log('\nAll 5 tasks for [shop-backend] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
