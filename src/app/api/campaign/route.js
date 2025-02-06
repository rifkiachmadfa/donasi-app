import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const res = await request.json();

    if (!res.title || !res.content || !res.imageThumb) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const newPost = await db.post.create({
      data: {
        title: res.title,
        content: res.content,
        imageThumb: res.imageThumb.data.publicUrl,
      },
    });

    return new Response(JSON.stringify({ message: "Success", post: newPost }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
