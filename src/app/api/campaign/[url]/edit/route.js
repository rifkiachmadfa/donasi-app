import { updateCampaign } from "@/services/campaign/editService";

import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const formData = await request.formData(); // Ambil FormData dari request

    const { ...data } = Object.fromEntries(formData.entries());

    if (data.category) {
      data.category = JSON.parse(data.category);
    }

    console.log(data);

    // const newCampaign = await updateCampaign(data);

    return NextResponse.json({
      success: true,
      message: "Campaign berhasil dibuat",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
