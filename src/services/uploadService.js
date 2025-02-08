import { supabase } from "@/lib/supabase";

export async function uploadThumbnail(file) {
  if (!file) throw new Error("No file provided");

  const filePath = `Thumbnail/${file.name}`;

  const { data, error } = await supabase.storage
    .from("Thumbnail Campaign")
    .upload(filePath, file, {
      upsert: true,
    });
  console.log("upload berhasil gambar");
  if (error) throw new Error("Error uploading file: " + error.message);
  const path = supabase.storage
    .from("Thumbnail Campaign")
    .getPublicUrl(data.path);
  return path;
}

export async function updateThumbnail(file) {
  if (!file) {
    return null;
  }

  const filePath = `Thumbnail/${file.name}`;

  const { data, error } = await supabase.storage
    .from("Thumbnail Campaign")
    .upload(filePath, file, {
      upsert: true,
    });
  console.log("upload berhasil gambar");
  if (error) throw new Error("Error uploading file: " + error.message);
  let path = supabase.storage
    .from("Thumbnail Campaign")
    .getPublicUrl(data.path);
  return path;
}
