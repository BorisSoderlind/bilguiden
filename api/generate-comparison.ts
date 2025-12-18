import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface GenerateComparisonRequest {
  car1: string; // brand + model, e.g., "BMW iX"
  car2: string; // brand + model, e.g., "Mercedes EQS SUV"
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { car1, car2 } = req.body as GenerateComparisonRequest;

    if (!car1 || !car2) {
      return res.status(400).json({ error: 'Both car1 and car2 are required' });
    }

    // Generate slug
    const slug = `${car1.toLowerCase().replace(/\s+/g, '-')}-vs-${car2.toLowerCase().replace(/\s+/g, '-')}`;

    // Check if comparison already exists
    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existing) {
      return res.status(409).json({ 
        error: 'Jämförelsen finns redan',
        slug 
      });
    }

    // Create prompt for Gemini
    const prompt = `Du är en expert på bilrecensioner och ska skriva en detaljerad jämförelse mellan ${car1} och ${car2} för en svensk bilguide.

Skapa en komplett jämförelse med följande struktur i JSON-format:

{
  "car1": {
    "name": "${car1}",
    "price": "från X kr",
    "specs": {
      "motor": "typ av motor",
      "effekt": "X hk",
      "acceleration": "X sek (0-100)",
      "räckvidd": "X km",
      "bagageutrymme": "X liter"
    },
    "pros": ["fördel 1", "fördel 2", "fördel 3"],
    "cons": ["nackdel 1", "nackdel 2", "nackdel 3"]
  },
  "car2": {
    "name": "${car2}",
    "price": "från X kr",
    "specs": {
      "motor": "typ av motor",
      "effekt": "X hk",
      "acceleration": "X sek (0-100)",
      "räckvidd": "X km",
      "bagageutrymme": "X liter"
    },
    "pros": ["fördel 1", "fördel 2", "fördel 3"],
    "cons": ["nackdel 1", "nackdel 2", "nackdel 3"]
  },
  "category": "lämplig kategori",
  "author": "AI Bilguiden",
  "intro": "En engagerande intro på 2-3 meningar",
  "verdict": "En slutsats på 2-3 meningar som sammanfattar jämförelsen",
  "winner": 1 eller 2 eller "draw"
}

Viktigt:
- Använd verkliga, korrekta data för bilarna
- Skriv på svenska
- Var objektiv men engagerande
- Priser ska vara i svenska kronor
- Specificera tydligt vilken bil som vinner och varför (eller om det är oavgjort)`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from response (remove markdown code blocks if present)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from AI response');
    }
    
    const comparisonData = JSON.parse(jsonMatch[0]);

    // Get today's date in Swedish format
    const today = new Date();
    const dateStr = today.toLocaleDateString('sv-SE', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    // Placeholder image URL (can be replaced later)
    const placeholderImage = 'https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/placeholder.jpg';

    // Convert winner to proper format
    let winnerValue: number | null = null;
    if (comparisonData.winner === 1 || comparisonData.winner === 2) {
      winnerValue = comparisonData.winner;
    } else if (comparisonData.winner === 'draw') {
      winnerValue = null;
    }

    // Prepare data for Supabase
    const articleData = {
      slug,
      car1_name: comparisonData.car1.name,
      car1_image: placeholderImage,
      car1_price: comparisonData.car1.price,
      car1_motor: comparisonData.car1.specs.motor,
      car1_effekt: comparisonData.car1.specs.effekt,
      car1_acceleration: comparisonData.car1.specs.acceleration,
      car1_rackvidd: comparisonData.car1.specs.räckvidd,
      car1_bagageutrymme: comparisonData.car1.specs.bagageutrymme,
      car1_pros: comparisonData.car1.pros,
      car1_cons: comparisonData.car1.cons,
      car2_name: comparisonData.car2.name,
      car2_image: placeholderImage,
      car2_price: comparisonData.car2.price,
      car2_motor: comparisonData.car2.specs.motor,
      car2_effekt: comparisonData.car2.specs.effekt,
      car2_acceleration: comparisonData.car2.specs.acceleration,
      car2_rackvidd: comparisonData.car2.specs.räckvidd,
      car2_bagageutrymme: comparisonData.car2.specs.bagageutrymme,
      car2_pros: comparisonData.car2.pros,
      car2_cons: comparisonData.car2.cons,
      category: comparisonData.category,
      date: dateStr,
      author: comparisonData.author,
      intro: comparisonData.intro,
      verdict: comparisonData.verdict,
      winner: winnerValue,
    };

    // Insert into Supabase
    const { data: article, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return res.status(200).json({
      success: true,
      article,
      slug,
    });

  } catch (error) {
    console.error('Error generating comparison:', error);
    return res.status(500).json({ 
      error: 'Failed to generate comparison',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
