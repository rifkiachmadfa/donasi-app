import { db } from "@/lib/db";

export async function createCampaign(values, imageUrl) {
  console.log("data di service", values, imageUrl);
  try {
    const existingCampaign = await db.campaign.findUnique({
      where: {
        url: values.url,
      },
    });

    if (existingCampaign) {
      throw new Error("url telah digunakan, tolong gunakan url lain");
    }

    const newCampaign = await db.campaign.create({
      data: {
        title: values.title,
        content: values.content,
        url: values.url,
        imageThumb: imageUrl,
        target: Number(values.target),
        durasi: Number(values.durasi),
        authorId: "cm7c7ku8s0000uhew0j4810so",
      },
    });
    console.log("newCampaign", newCampaign);
    if (!newCampaign) {
      throw new Error(`Gagal membuat campaign`);
    }
    const newCategoryRelation = await db.campaignCategory.createMany({
      data: values.category.map((categoryId) => ({
        campaignId: newCampaign.id,
        categoryId: categoryId, // Pastikan `categoryId` bertipe Int
      })),
    });

    if (!newCategoryRelation) {
      throw new Error(`Gagal membuat relasi kategori`);
    }

    return newCampaign;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
