import { db } from "@/lib/db";

export async function updateCampaign(urls, values, link) {
  console.log("📌 Received values:", values);
  console.log("📌 Received target type:", typeof values.target);
  console.log("📌 Received link:", link);
  console.log("📌 Received urls:", urls);
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
        target: values.target,
      },
    });
    if (!response) {
      throw new Error(`API Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
}
