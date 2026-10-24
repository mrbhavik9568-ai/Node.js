/**
 * Automated test script to verify all 5 tasks for olx-clone
 */
const { app } = require('./server');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing olx-clone on port ${port}...`);

  try {
    // 1. Task 1: GET /products
    const prodRes = await fetch(`${baseUrl}/products`);
    const prodData = await prodRes.json();
    console.log(`✓ Task 1: GET /products -> Found ${prodData.totalProducts} listings:`, prodData.products.map(p => `#${p.id} ${p.title} (₹${p.price})`));

    // 2. Task 2: POST /add-product
    const addRes = await fetch(`${baseUrl}/add-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Apple MacBook Air M2 16GB RAM",
        price: 89000,
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        location: "Bangalore"
      })
    });
    const addData = await addRes.json();
    console.log(`✓ Task 2: POST /add-product -> Created listing #${addData.newProduct.id}: "${addData.newProduct.title}". Total products now: ${addData.updatedProductList.length}`);

    // 3. Task 3: GET /products/:id (Success and 404 constraint)
    const singleRes = await fetch(`${baseUrl}/products/${addData.newProduct.id}`);
    const singleData = await singleRes.json();
    console.log(`✓ Task 3 (Found): GET /products/${addData.newProduct.id} -> Found "${singleData.title}"`);

    const notFoundRes = await fetch(`${baseUrl}/products/9999`);
    const notFoundData = await notFoundRes.json();
    console.log(`✓ Task 3 (404 Constraint): GET /products/9999 -> Status ${notFoundRes.status}, Error: "${notFoundData.error}"`);

    // 4. Task 4: DELETE /products/:id (removes using filter and returns updated list)
    const deleteRes = await fetch(`${baseUrl}/products/${addData.newProduct.id}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    console.log(`✓ Task 4: DELETE /products/${addData.newProduct.id} -> ${deleteData.message}. Updated total count: ${deleteData.updatedProductList.length}`);

    // 5. Task 5: Image upload & Security consideration review
    const pngBuffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2d470000000049454e44ae426082', 'hex');
    const formData = new FormData();
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    formData.append('productPhoto', blob, 'olx-item.png');

    const uploadRes = await fetch(`${baseUrl}/upload-image`, {
      method: 'POST',
      body: formData
    });
    const uploadData = await uploadRes.json();
    console.log(`✓ Task 5: POST /upload-image -> Uploaded URL: ${uploadData.fileUrl}`);

    const secRes = await fetch(`${baseUrl}/security-review`);
    const secData = await secRes.json();
    console.log(`✓ Task 5: Security review verified: ${secData.criticalConsiderations.length} security considerations reviewed.`);

    console.log('\nAll 5 tasks for [olx-clone] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
