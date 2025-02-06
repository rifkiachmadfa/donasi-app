import { supabase } from "@/lib/supabase";

export async function uploadThumbnail(file) {
  if (!file) throw new Error("No file provided");

  const filePath = `Thumbnail/${file.name}`;

  const { data, error } = await supabase.storage
    .from("Thumbnail Campaign")
    .upload(filePath, file);

  if (error) throw new Error("Error uploading file: " + error.message);

  return supabase.storage.from("Thumbnail Campaign").getPublicUrl(data.path);
}
