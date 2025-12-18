# Bilguiden

En modern webbapplikation för att jämföra och hitta rätt bil med Supabase-integration och AI-genererade jämförelser.

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (Database + Storage)
- Google Gemini AI
- Vercel (Hosting + Serverless Functions)

## Setup

### 1. Installera dependencies

```bash
npm install
```

### 2. Konfigurera Supabase

1. Skapa ett gratis konto på [supabase.com](https://supabase.com)
2. Skapa ett nytt projekt
3. Kopiera `.env.example` till `.env` och lägg till dina Supabase-credentials:

```bash
cp .env.example .env
```

4. Uppdatera `.env` med dina nycklar:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

**Viktigt för Vercel:**
- `VITE_*` variabler behövs både lokalt och i Vercel
- `SUPABASE_SERVICE_ROLE_KEY` och `GEMINI_API_KEY` läggs ENDAST till i Vercel Environment Variables (inte i lokal `.env`)

### 3. Skapa Gemini API-nyckel

1. Gå till [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Skapa en ny API-nyckel
3. Lägg till `GEMINI_API_KEY` i Vercel Environment Variables

### 4. Konfigurera Supabase Storage

1. Gå till Storage i Supabase Dashboard
2. Skapa en bucket som heter `car-images`
3. Sätt bucketen till public
4. Skapa följande Row Level Security policy för public uploads:
```sql
CREATE POLICY "Allow public uploads to car-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'car-images');
```

5. Kör SQL-scriptet i `docs/database-schema.md` i Supabase SQL Editor för att skapa tabellen

### 5. Starta utvecklingsserver

```bash
npm run dev
```

Servern körs på `http://localhost:8080/`

## AI-genererade jämförelser

Sajten har nu stöd för att generera jämförelser med Google Gemini AI:

1. Klicka på "Skapa jämförelse" i menyn
2. Välj två bilmodeller från listorna
3. Klicka "Generera jämförelse"
4. AI:n skapar en komplett jämförelse som sparas i Supabase
5. Du redirectas till den nya artikeln

**OBS:** Detta fungerar endast på Vercel (eller lokal Vercel dev server) eftersom det använder Vercel Serverless Functions.

## Bygga för produktion

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Databasstruktur

Se [docs/database-schema.md](docs/database-schema.md) för fullständig dokumentation av databasstrukturen.
