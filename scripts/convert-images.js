import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imgDir = path.resolve('assets/img');

async function processNewAssets() {
  console.log('🖼️ Processing new images with sharp...');

  // 1. Process background.jpeg -> background.webp
  const bgInput = path.join(imgDir, 'backgroud.jpeg');
  if (fs.existsSync(bgInput)) {
    const bgOutput = path.join(imgDir, 'background.webp');
    await sharp(bgInput)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(bgOutput);
    const stats = fs.statSync(bgOutput);
    console.log(`✅ background.webp generated (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  // 2. Process favicon.jpeg -> favicon.png & favicon.webp & embedded SVG
  const favInput = path.join(imgDir, 'favicon.jpeg');
  if (fs.existsSync(favInput)) {
    const favPng = path.join(imgDir, 'favicon.png');
    const favWebp = path.join(imgDir, 'favicon.webp');
    
    await sharp(favInput)
      .resize(128, 128)
      .png({ quality: 90 })
      .toFile(favPng);
    
    await sharp(favInput)
      .resize(128, 128)
      .webp({ quality: 90 })
      .toFile(favWebp);

    const pngBase64 = fs.readFileSync(favPng).toString('base64');
    const favSvg = path.join(imgDir, 'favicon.svg');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <clipPath id="circleClip">
      <circle cx="64" cy="64" r="60"/>
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${pngBase64}" width="128" height="128" clip-path="url(#circleClip)"/>
</svg>`;
    fs.writeFileSync(favSvg, svgContent, 'utf-8');
    console.log(`✅ favicon.png, favicon.webp and favicon.svg generated!`);
  }

  // 3. Process profile-para-virar-svg.jpeg -> profile.webp & profile.svg
  const profileInput = path.join(imgDir, 'profile-para-virar-svg.jpeg');
  if (fs.existsSync(profileInput)) {
    const profileWebp = path.join(imgDir, 'profile.webp');
    const profilePng = path.join(imgDir, 'profile-avatar.png');

    await sharp(profileInput)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 90, effort: 6 })
      .toFile(profileWebp);

    await sharp(profileInput)
      .resize(400, 400, { fit: 'cover' })
      .png()
      .toFile(profilePng);

    const profilePngBase64 = fs.readFileSync(profilePng).toString('base64');
    const profileSvg = path.join(imgDir, 'profile.svg');
    const profileSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <clipPath id="avatarCircle">
      <circle cx="200" cy="200" r="190"/>
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${profilePngBase64}" width="400" height="400" clip-path="url(#avatarCircle)"/>
</svg>`;
    fs.writeFileSync(profileSvg, profileSvgContent, 'utf-8');
    console.log(`✅ profile.webp and profile.svg updated from profile-para-virar-svg.jpeg!`);
  }
}

processNewAssets().catch(err => {
  console.error('Error processing assets:', err);
  process.exit(1);
});
