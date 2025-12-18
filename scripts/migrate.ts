import { supabase } from '../src/lib/supabase';
import { comparisons } from '../src/data/comparisons';

async function migrate() {
  console.log('Starting migration...');
  console.log(`Found ${comparisons.length} articles to migrate`);

  for (const comparison of comparisons) {
    console.log(`Migrating: ${comparison.car1.name} vs ${comparison.car2.name}`);

    const { error } = await supabase.from('articles').insert({
      slug: comparison.slug,
      category: comparison.category,
      date: comparison.date,
      author: comparison.author,
      intro: comparison.intro,
      verdict: comparison.verdict,
      winner: comparison.winner === 'draw' ? null : comparison.winner,
      
      car1_name: comparison.car1.name,
      car1_image: comparison.car1.image,
      car1_price: comparison.car1.price,
      car1_motor: comparison.car1.specs.motor,
      car1_effekt: comparison.car1.specs.effekt,
      car1_acceleration: comparison.car1.specs.acceleration,
      car1_rackvidd: comparison.car1.specs.räckvidd,
      car1_bagageutrymme: comparison.car1.specs.bagageutrymme,
      car1_pros: comparison.car1.pros,
      car1_cons: comparison.car1.cons,
      
      car2_name: comparison.car2.name,
      car2_image: comparison.car2.image,
      car2_price: comparison.car2.price,
      car2_motor: comparison.car2.specs.motor,
      car2_effekt: comparison.car2.specs.effekt,
      car2_acceleration: comparison.car2.specs.acceleration,
      car2_rackvidd: comparison.car2.specs.räckvidd,
      car2_bagageutrymme: comparison.car2.specs.bagageutrymme,
      car2_pros: comparison.car2.pros,
      car2_cons: comparison.car2.cons,
    });

    if (error) {
      console.error(`Error migrating ${comparison.slug}:`, error);
    } else {
      console.log(`✓ Migrated: ${comparison.slug}`);
    }
  }

  console.log('Migration complete!');
}

migrate();
