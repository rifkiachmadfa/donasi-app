import { db } from "@/lib/db";

export async function updatePost(id, values, imageUrl) {
  if (!id || !values || !values.title || !values.content) {
    console.error("❌ Data tidak valid untuk update:", {
      id,
      values,
      imageUrl,
    });
    throw new Error("Invalid data: Missing required fields");
  }

  console.log("✅ Data dikirim ke service:", {
    id,
    title: values.title,
    content: values.content,
    imageThumb: imageUrl,
  });

  const response = await db.post.update({
    where: { id },
    data: {
      title: values.title,
      content: values.content,
      imageThumb: imageUrl,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
