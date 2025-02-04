export async function CreatePost(values) {
  const response = await fetch("/api/campaign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: values.title,
      content: values.content,
    }),
  });
}
