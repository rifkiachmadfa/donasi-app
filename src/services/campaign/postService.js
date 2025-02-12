import { generateSlug } from "@/lib/generateSlug";
import { db } from "@/lib/db";

export async function createCampaign(values, imageUrl) {
  try {
    const generate = generateSlug(values.title);

    const existingCampaign = await db.post.findUnique({
      where: {
        url: values.url,
      },
    });

    if (existingCampaign) {
      throw new Error("url telah digunakan, tolong gunakan url lain");
    }

    const newCampaign = await db.post.create({
      data: {
        title: values.title,
        content: values.content,
        url: values.url,
        imageThumb: imageUrl,
        slug: generate,
      },
    });
    if (!newCampaign) {
      throw new Error(`Gagal membuat campaign`);
    }

    return newCampaign;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
