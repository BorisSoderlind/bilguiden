# Bilguiden

En modern webbapplikation för att jämföra och hitta rätt bil.

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (Database)

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
```

5. Kör SQL-scriptet i `docs/database-schema.md` i Supabase SQL Editor för att skapa tabellen

### 3. Starta utvecklingsserver

```bash
npm run dev
```

Servern körs på `http://localhost:8080/`

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
