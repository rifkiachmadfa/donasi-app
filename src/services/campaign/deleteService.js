import { db } from "@/lib/db";
export const deleteCampaign = async (url) => {
  const urlCampaign = url;
  console.log("url di service :" + urlCampaign);
  try {
    const deleteCampaign = await db.post.delete({
      where: {
        url: urlCampaign,
      },
    });

    if (!deleteCampaign.ok) {
      throw new Error("failed to delete campaign");
    }
  } catch (error) {
    console.error("error deleting in service", error);
  }
};
