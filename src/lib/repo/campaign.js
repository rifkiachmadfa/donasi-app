import { db } from "../db";

export const getAllCampaign = async () => {
  const allCampaign = await db.post.findMany();
  return allCampaign;
};

export const getDetailCampaign = async (slug) => {
  const detailCampaign = await db.post.findUnique({
    where: {
      slug: slug,
    },
  });
  return detailCampaign;
};
