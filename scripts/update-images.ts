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

// Public image URLs
const imageUpdates: Record<string, { car1_image: string; car2_image: string }> = {
  'bmw-ix-vs-mercedes-eqs-suv': {
    car1_image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    car2_image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  },
  'volvo-xc90-vs-audi-q7': {
    car1_image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    car2_image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
  },
  'porsche-taycan-vs-tesla-model-s': {
    car1_image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f8207?w=800&q=80',
    car2_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
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
      })
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
