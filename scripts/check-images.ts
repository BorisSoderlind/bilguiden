import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkImages() {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, car1_image, car2_image');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Current image URLs in database:\n');
  data?.forEach(article => {
    console.log(`Slug: ${article.slug}`);
    console.log(`  Car 1: ${article.car1_image}`);
    console.log(`  Car 2: ${article.car2_image}\n`);
  });
}

checkImages();
