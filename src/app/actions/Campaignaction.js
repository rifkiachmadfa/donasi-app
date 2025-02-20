"use server";

import { deleteCampaign } from "@/services/campaign/deleteService";
import { revalidatePath } from "next/cache";
import { createCampaign } from "@/services/campaign/postService";
import { updateCampaign } from "@/services/campaign/editService";

export async function deleteCampaignAction(id) {
  if (!id || typeof id !== "string") {
    console.error("ID tidak valid atau undefined:", id);
    throw new Error("ID tidak valid.");
  }

  try {
    const response = await deleteCampaign(id);
    console.log(response.message);

    revalidatePath("/admin/campaign");

    return response;
  } catch (error) {
    console.error("Error di action:", error);
    return { success: false, message: error.message };
  }
}

// export async function createCampaignAction(values, url) {
//   try {
//     const response = await createCampaign(values, url);
//     return { success: true, data: response };
//   } catch (err) {
//     console.error(err.message);
//     return { success: false, message: err.message };
//   }
// }

export async function createCampaignAction(values, url) {
  response = await fetch("/api/campaign/create");
}

export async function editCampaignAction(url, values, link) {
  try {
    console.log("🚀 Data sebelum dikirim ke backend:", { url, values, link });

    const response = await updateCampaign(url, values, link);
    return { success: true, data: response };
  } catch (err) {
    console.error("error di action " + err.message);
    return { success: false, message: err.message };
  }
}
