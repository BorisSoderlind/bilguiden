import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables in .env file');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Supabase Storage public URLs
const imageUpdates: Record<string, { car1_image: string; car2_image: string }> = {
  'bmw-ix-vs-mercedes-eqs-suv': {
    car1_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/bmw-ix.jpg',
    car2_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/mercedes-eqs.jpg',
  },
  'volvo-xc90-vs-audi-q7': {
    car1_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/volvo-xc90.jpg',
    car2_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/audi-q7.jpg',
  },
  'porsche-taycan-vs-tesla-model-s': {
    car1_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/porsche-taycan.jpg',
    car2_image: 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/tesla-model-s.jpg',
  },
};

async function updateImages() {
  console.log('Starting image URL updates...');

  for (const [slug, images] of Object.entries(imageUpdates)) {
    console.log(`Updating images for: ${slug}`);

    const { error } = await supabase
      .from('articles')
      .update({
        car1_image: images.car1_image,
        car2_image: images.car2_image,
      } as any)
      .eq('slug', slug);

    if (error) {
      console.error(`Error updating ${slug}:`, error);
    } else {
      console.log(`✓ Updated: ${slug}`);
    }
  }

  console.log('Image updates complete!');
}

updateImages();
