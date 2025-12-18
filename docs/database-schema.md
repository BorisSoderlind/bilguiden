# Supabase Database Schema

## Setup Instructions

1. Gå till [supabase.com](https://supabase.com) och skapa ett gratis konto
2. Skapa ett nytt projekt
3. Kopiera Project URL och anon key från Project Settings > API
4. Skapa en `.env` fil i projektets rot:
   ```
   VITE_SUPABASE_URL=din_project_url
   VITE_SUPABASE_ANON_KEY=din_anon_key
   ```

## Database Table: articles

Kör följande SQL i Supabase SQL Editor för att skapa tabellen:

```sql
-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  intro TEXT NOT NULL,
  verdict TEXT NOT NULL,
  winner INTEGER CHECK (winner IN (1, 2)),
  
  -- Car 1 data
  car1_name TEXT NOT NULL,
  car1_image TEXT NOT NULL,
  car1_price TEXT NOT NULL,
  car1_motor TEXT NOT NULL,
  car1_effekt TEXT NOT NULL,
  car1_acceleration TEXT NOT NULL,
  car1_rackvidd TEXT NOT NULL,
  car1_bagageutrymme TEXT NOT NULL,
  car1_pros TEXT[] NOT NULL,
  car1_cons TEXT[] NOT NULL,
  
  -- Car 2 data
  car2_name TEXT NOT NULL,
  car2_image TEXT NOT NULL,
  car2_price TEXT NOT NULL,
  car2_motor TEXT NOT NULL,
  car2_effekt TEXT NOT NULL,
  car2_acceleration TEXT NOT NULL,
  car2_rackvidd TEXT NOT NULL,
  car2_bagageutrymme TEXT NOT NULL,
  car2_pros TEXT[] NOT NULL,
  car2_cons TEXT[] NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX idx_articles_slug ON articles(slug);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT
  USING (true);

-- Create policy for authenticated insert (för framtida admin-funktionalitet)
CREATE POLICY "Allow authenticated insert" ON articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated update
CREATE POLICY "Allow authenticated update" ON articles
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

## Migration Script

För att migrera befintlig data från `comparisons.ts` till Supabase:

1. Se till att du har skapat `.env` filen med dina Supabase-credentials
2. Kör migration-scriptet från projektets rot:

```bash
npm run migrate
```

Detta kommer att läsa data från `src/data/comparisons.ts` och lägga in den i Supabase-databasen.

**OBS:** Scriptet körs från projektets rotmapp där package.json finns.
