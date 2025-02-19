import { db } from "@/lib/db";

export async function updateCampaign(urls, values, link) {
  if (!urls || !values || !values.title || !values.content) {
    throw new Error("Invalid data: Missing required fields");
  }

  const existingCampaign = await db.campaign.findUnique({
    where: {
      url: link,
    },
  });

  if (!existingCampaign) {
    return { success: false, message: "tidak ada campaign" };
  }

  console.log("existingCampaign :", existingCampaign);

  // Hitung sisa waktu campaign (hari)
  const createdAt = new Date(existingCampaign.createdAt);
  const campaignEndDate = new Date(createdAt);
  campaignEndDate.setDate(campaignEndDate.getDate() + existingCampaign.durasi); // Tanggal berakhir saat ini

  const today = new Date();
  const remainingDays = Math.max(
    0,
    Math.ceil((campaignEndDate - today) / (1000 * 60 * 60 * 24))
  ); // Sisa hari

  // Tambahkan `values.durasi` ke sisa hari
  const newDuration = remainingDays + values.durasi;

  try {
    const response = await db.campaign.update({
      where: {
        url: link,
      },
      data: {
        title: values.title,
        content: values.content,
        imageThumb: urls,
        target: values.target,
        durasi: newDuration,
      },
    });
    if (!response) {
      throw new Error(`Internal Server Error`);
    }
  } catch (error) {
    console.log(error);
  }
}
