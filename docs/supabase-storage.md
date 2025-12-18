# Supabase Storage Setup

## 1. Skapa Storage Bucket i Supabase

1. Gå till din Supabase Dashboard: https://supabase.com/dashboard
2. Välj ditt projekt
3. Klicka på **Storage** i vänstermenyn
4. Klicka på **New bucket**
5. Namnge bucketen: `car-images`
6. Markera **Public bucket** (så bilderna är publikt tillgängliga)
7. Klicka **Create bucket**

## 2. Ladda upp bilder

### Manuellt via Dashboard:
1. Klicka på `car-images` bucketen
2. Klicka **Upload file**
3. Välj dina bildfiler

### Via Script (automatiskt):
1. Lägg dina bilder i `public/uploads/` mappen
2. Namnge dem enligt bilmodellen, t.ex.:
   - `bmw-ix.jpg`
   - `mercedes-eqs.jpg`
   - `volvo-xc90.jpg`
   - etc.
3. Kör: `npm run upload-images`

## 3. Bild-URL format

När bilder är uppladdade får de denna URL-struktur:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/car-images/[filename]
```

Exempel:
```
https://spsiophqqmyaevlkrnrt.supabase.co/storage/v1/object/public/car-images/bmw-ix.jpg
```

## 4. Uppdatera databasen

Efter att bilderna är uppladdade, kör:
```bash
npm run update-db-images
```

Detta kommer automatiskt uppdatera alla artiklar i databasen med de nya Supabase Storage URL:erna.
