import { supabase } from '@/lib/supabase';
import type { CarComparison } from '@/data/comparisons';

// Transform database row to CarComparison format
function transformArticle(row: any): CarComparison {
  return {
    slug: row.slug,
    car1: {
      name: row.car1_name,
      image: row.car1_image,
      price: row.car1_price,
      specs: {
        motor: row.car1_motor,
        effekt: row.car1_effekt,
        acceleration: row.car1_acceleration,
        räckvidd: row.car1_rackvidd,
        bagageutrymme: row.car1_bagageutrymme,
      },
      pros: row.car1_pros,
      cons: row.car1_cons,
    },
    car2: {
      name: row.car2_name,
      image: row.car2_image,
      price: row.car2_price,
      specs: {
        motor: row.car2_motor,
        effekt: row.car2_effekt,
        acceleration: row.car2_acceleration,
        räckvidd: row.car2_rackvidd,
        bagageutrymme: row.car2_bagageutrymme,
      },
      pros: row.car2_pros,
      cons: row.car2_cons,
    },
    category: row.category,
    date: row.date,
    author: row.author,
    intro: row.intro,
    verdict: row.verdict,
    winner: row.winner as 1 | 2 | "draw",
  };
}

// Get all articles
export async function getAllArticles(): Promise<CarComparison[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data.map(transformArticle);
}

// Get single article by slug
export async function getArticleBySlug(slug: string): Promise<CarComparison | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return transformArticle(data);
}

// Get articles by category
export async function getArticlesByCategory(category: string): Promise<CarComparison[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data.map(transformArticle);
}
