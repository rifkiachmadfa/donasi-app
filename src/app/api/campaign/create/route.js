import { createCampaign } from "@/services/campaign/postService";
import { uploadThumbnail } from "@/services/uploadService";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData(); // Ambil FormData dari request
    const fileImg = formData.get("file"); // Ambil file
    if (!fileImg) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const urlFile = await uploadThumbnail(fileImg);
    console.log("img url ", urlFile);

    const { ...data } = Object.fromEntries(formData.entries());

    if (data.category) {
      data.category = JSON.parse(data.category);
    }

    const newCampaign = await createCampaign(data, urlFile.data.publicUrl);

    return NextResponse.json({
      success: true,
      message: "Campaign berhasil dibuat",
      data: newCampaign,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
