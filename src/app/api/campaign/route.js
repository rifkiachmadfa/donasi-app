import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    console.log("📩 Menerima request di /api/campaign");

    const res = await request.json();
    console.log("📜 Data request:", res);

    // Validasi input
    if (!res.title || !res.content || !res.imageThumb) {
      console.error("⚠️ Data tidak lengkap:", res);
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Pastikan imageThumb memiliki data.publicUrl (jika menggunakan penyimpanan cloud)
    if (typeof res.imageThumb !== "string") {
      console.error("❌ imageThumb tidak valid:", res.imageThumb);
      return new Response(
        JSON.stringify({ error: "Invalid imageThumb format" }),
        { status: 400 }
      );
    }

    // Simpan ke database dengan Prisma
    const newPost = await db.post.create({
      data: {
        title: res.title,
        content: JSON.stringify(res.content), // Pastikan content disimpan dalam format string JSON
        imageThumb: res.imageThumb, // Langsung gunakan tanpa `.data.publicUrl`
        slug: res.slug,
      },
    });

    console.log("✅ Campaign berhasil dibuat:", newPost);

    return new Response(JSON.stringify({ message: "Success", post: newPost }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ ERROR di /api/campaign:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    console.log("🚀 Data diterima di backend:", body);

    if (
      !body.id ||
      !body.content ||
      !body.imageThumb ||
      typeof body.content !== "string"
    ) {
      console.error("🚨 Invalid data received:", body);
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    console.log("🛠️ Data yang dikirim ke database:", {
      title: body.title,
      content: body.content,
      imageThumb: body.imageThumb,
    });

    console.log("🛠️ Final data untuk update ke database:", {
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        imageThumb: body.imageThumb,
      },
    });

    const updatedPost = await db.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        imageThumb: body.imageThumb,
      },
    });

    return NextResponse.json(
      { message: "Campaign updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in PATCH /api/campaign:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
