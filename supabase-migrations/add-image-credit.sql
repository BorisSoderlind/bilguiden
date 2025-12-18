-- Add image_credit column to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS image_credit TEXT;

COMMENT ON COLUMN articles.image_credit IS 'Attribution text for images from Unsplash (e.g., "Photo by Name on Unsplash")';
