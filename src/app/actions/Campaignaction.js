"use server";

import { deleteCampaign } from "@/services/campaign/deleteService";
import { revalidatePath } from "next/cache";
import { createCampaign } from "@/services/campaign/postService";
import { updateCampaign } from "@/services/campaign/editService";

export async function deleteCampaignAction(url) {
  try {
    await deleteCampaign(url);
    revalidatePath("/admin/campaign");
  } catch (error) {
    console.log("error di action " + error);
  }
}

export async function createCampaignAction(values, url) {
  try {
    const response = await createCampaign(values, url);
    return { success: true, data: response }; // Return hasil jika berhasil
  } catch (err) {
    console.error("error di action " + err.message);
    return { success: false, message: err.message };
  }
}

export async function editCampaignAction(url, values, link) {
  try {
    console.log("🚀 Data sebelum dikirim ke backend:", { url, values, link });

    const response = await updateCampaign(url, values, link);
    console.log("✅ Response dari backend:", response);
    return { success: true, data: response }; // Return hasil jika berhasil
  } catch (err) {
    console.error("error di action " + err.message);
    return { success: false, message: err.message };
  }
}
