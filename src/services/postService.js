import { generateSlug } from "@/lib/generateSlug";

export async function createPost(values, imageUrl) {
  const generate = generateSlug(values.title);

  const response = await fetch("/api/campaign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
      url: values.url,
      imageThumb: imageUrl,
      slug: generate,
    }),
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
