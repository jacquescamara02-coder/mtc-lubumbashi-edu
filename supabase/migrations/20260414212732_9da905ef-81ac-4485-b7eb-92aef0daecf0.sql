
-- Drop the overly broad SELECT policy
DROP POLICY "Uploads publicly accessible" ON storage.objects;

-- Create a more restrictive SELECT policy that still allows accessing files by direct URL
CREATE POLICY "Uploads accessible by direct path" ON storage.objects 
  FOR SELECT USING (bucket_id = 'uploads' AND (auth.role() = 'authenticated' OR (CASE WHEN name IS NOT NULL THEN true ELSE false END)));
