import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const res = await request.json();
    console.log(res);

    const newPost = await db.post.create({
      data: {
        title: res.title,
        content: res.content,
      },
    });
    return Response.json({ message: "created", post: newPost });
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 500,
    });
  }
}
