import { generateSlug } from "@/lib/generateSlug";
import { db } from "@/lib/db";

export async function createCampaign(values, imageUrl) {
  try {
    console.log("DB instance: ", db);
    const generate = generateSlug(values.title);
    console.log(values);
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
        slug: generate,
        target: values.target,
        durasi: values.durasi,
      },
    });
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
