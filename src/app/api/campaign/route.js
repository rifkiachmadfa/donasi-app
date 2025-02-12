import { db } from "@/lib/db";
import { generateSlug } from "@/lib/generateSlug";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const res = await request.json();

    if (!res.title || !res.content || !res.imageThumb) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updateCampaign = await db.post.create({
      data: {
        title: res.title,
        content: res.content,
        url: res.url,
        slug: res.slug,
        imageThumb: res.imageThumb,
      },
    });

    return NextResponse.json({ message: "Success", post: updateCampaign });
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      Error: "internal server error",
    });
  }
}
