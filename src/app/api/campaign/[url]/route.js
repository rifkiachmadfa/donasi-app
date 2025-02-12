import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const res = await request.json();
  console.log(params.url);
  const url = (await params).url;
  const campaign = await db.post.findUnique({
    where: {
      url: url,
    },
  });

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }
  console.log("request content", res.content);

  if (!res.title || !res.content || !res.imageThumb) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("gambar :", res.imageThumb);
  const updateCampaign = await db.post.update({
    where: {
      url: url,
    },
    data: {
      title: res.title,
      content: res.content,
      imageThumb: res.imageThumb.data.publicUrl,
    },
  });

  return NextResponse.json({ message: "Success", post: updateCampaign });
}
