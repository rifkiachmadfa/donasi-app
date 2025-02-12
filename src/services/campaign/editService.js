import { db } from "@/lib/db";

export async function updateCampaign(urls, values, link) {
  try {
    if (!urls || !values || !values.title || !values.content) {
      throw new Error("Invalid data: Missing required fields");
    }

    const existingCampaign = await db.post.findUnique({
      where: {
        url: link,
      },
    });

    if (!existingCampaign) {
      return { success: false, message: "tidak ada campaign" };
    }

    const response = await db.post.update({
      where: {
        url: link,
      },
      data: {
        title: values.title,
        content: values.content,
        imageThumb: urls,
      },
    });
    if (!response) {
      throw new Error(`API Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
}
