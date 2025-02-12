import { db } from "@/lib/db";

export async function updatePost(url, values, imageUrl, link) {
  if (!url || !values || !values.title || !values.content) {
    console.error("❌ Data tidak valid untuk update:", {
      url,
      values,
      imageUrl,
    });
    throw new Error("Invalid data: Missing required fields");
  }
  console.log("values url:", link);

  const response = await fetch(`/api/campaign/${link}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
      imageThumb: imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
