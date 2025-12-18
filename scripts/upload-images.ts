import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'car-images';
const UPLOAD_DIR = './public/uploads';

async function uploadImages() {
  console.log('Starting image upload to Supabase Storage...\n');

  try {
    // Try to upload directly (assume bucket exists)
    console.log(`Attempting to upload to bucket: ${BUCKET_NAME}\n`);

    // Read all files from upload directory
    const files = await readdir(UPLOAD_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    if (imageFiles.length === 0) {
      console.log(`No images found in ${UPLOAD_DIR}`);
      console.log('Please add image files to the uploads folder and try again.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to upload:\n`);

    for (const filename of imageFiles) {
      const filePath = join(UPLOAD_DIR, filename);
      const fileBuffer = await readFile(filePath);

      console.log(`Uploading: ${filename}`);

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, fileBuffer, {
          contentType: `image/${filename.split('.').pop()}`,
          upsert: true, // Overwrite if exists
        });

      if (error) {
        console.error(`  ✗ Error uploading ${filename}:`, error.message);
      } else {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filename}`;
        console.log(`  ✓ Uploaded: ${filename}`);
        console.log(`    URL: ${publicUrl}\n`);
      }
    }

    console.log('Upload complete!');
    console.log('\nNext steps:');
    console.log('1. Update your database with the new image URLs');
    console.log('2. Or use the URLs directly in your migration script');

  } catch (error) {
    console.error('Error:', error);
  }
}

uploadImages();
