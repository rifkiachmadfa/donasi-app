import { db } from "../db";

export const getAllCampaign = async () => {
  const allCampaign = await db.post.findMany();
  return allCampaign;
};

export const getDetailCampaign = async (url) => {
  console.log(url);
  const detailCampaign = await db.post.findUnique({
    where: {
      url: url,
    },
  });
  return detailCampaign;
};
