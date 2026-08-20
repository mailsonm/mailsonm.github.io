import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imgDir = path.resolve('assets/img');

async function convertAll() {
  const files = fs.readdirSync(imgDir);
  const jpegFiles = files.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));

  console.log(`Found ${jpegFiles.length} JPEG files to convert:`, jpegFiles);

  const nameMapping = {
    'profile.jpeg': 'profile-1.webp',
    'profile (2).jpeg': 'profile-2.webp',
    'profile (3).jpeg': 'profile-3.webp',
    'profile (4).jpeg': 'profile-4.webp',
    'profile (5).jpeg': 'profile-5.webp',
    'profile (6).jpeg': 'profile-6.webp',
  };

  for (const file of jpegFiles) {
    const inputPath = path.join(imgDir, file);
    const targetName = nameMapping[file] || file.replace(/\.(jpeg|jpg)$/i, '.webp');
    const outputPath = path.join(imgDir, targetName);

    console.log(`Converting ${file} -> ${targetName}...`);

    await sharp(inputPath)
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✅ Saved ${targetName} (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  // Also create the default profile.webp from the first option if not exists or override with profile-1
  const defaultProfile = path.join(imgDir, 'profile.webp');
  await sharp(path.join(imgDir, 'profile.jpeg'))
    .webp({ quality: 90, effort: 6 })
    .toFile(defaultProfile);
  console.log(`🌟 Default active profile.webp created!`);
}

convertAll().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
