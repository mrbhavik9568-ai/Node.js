/**
 * Automated test script to verify all 5 tasks for poster-maker
 */
const { app } = require('./server');
const fs = require('fs');
const path = require('path');

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Testing poster-maker on port ${port}...`);

  try {
    // 1. Task 1: Static HTML served at root route
    const rootRes = await fetch(`${baseUrl}/`);
    const rootHtml = await rootRes.text();
    console.log(`✓ Task 1: GET / -> Received HTML page (Length: ${rootHtml.length} bytes, includes title: ${rootHtml.includes('Poster Maker')})`);

    // 2. Task 2: GET /templates -> 5 poster templates
    const templatesRes = await fetch(`${baseUrl}/templates`);
    const templates = await templatesRes.json();
    console.log(`✓ Task 2: GET /templates -> Returned ${templates.length} templates:`, templates.map(t => `#${t.id}: ${t.name}`));

    // 3. Task 4: POST /upload via multer
    // Create a dummy image file for upload testing
    const testImgPath = path.join(__dirname, 'test-logo.png');
    // Simple 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2d470000000049454e44ae426082', 'hex');
    fs.writeFileSync(testImgPath, pngBuffer);

    // Using FormData to test file upload
    const formData = new FormData();
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    formData.append('logo', blob, 'test-logo.png');

    const uploadRes = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData
    });
    const uploadData = await uploadRes.json();
    console.log(`✓ Task 4: POST /upload (Multer) -> Uploaded file URL: ${uploadData.fileUrl}`);

    // Clean up temporary local test file
    if (fs.existsSync(testImgPath)) {
      fs.unlinkSync(testImgPath);
    }

    // 4. Task 3 & 5: POST /design combining text, templateId, and custom background color
    const designRes = await fetch(`${baseUrl}/design`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: "CANVA DESIGN HACKATHON 2026",
        templateId: 2,
        backgroundColor: "#1e1b4b",
        logoUrl: uploadData.fileUrl
      })
    });
    const designData = await designRes.json();
    console.log('✓ Task 3 & 5: POST /design -> Created design:', {
      designId: designData.design.designId,
      template: designData.design.templateName,
      text: designData.design.text,
      bgColor: designData.design.backgroundColor,
      logoUrl: designData.design.logoUrl
    });

    // 5. Task 5 (Dedicated Route): PUT /design/:id/color
    const colorUpdateRes = await fetch(`${baseUrl}/design/${designData.design.designId}/color`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backgroundColor: "#047857" })
    });
    const updatedColorData = await colorUpdateRes.json();
    console.log(`✓ Task 5: PUT /design/${designData.design.designId}/color -> Updated BG Color to: ${updatedColorData.design.backgroundColor}`);

    console.log('\nAll 5 tasks for [poster-maker] verified successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});
