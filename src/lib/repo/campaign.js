import { db } from "../db";

export const getAllCampaign = async () => {
  const allCampaign = await db.campaign.findMany();
  return allCampaign;
};

export const getDetailCampaign = async (url) => {
  console.log(url);
  const detailCampaign = await db.campaign.findUnique({
    where: {
      url: url,
    },
  });
  return detailCampaign;
};

export const getSpecificCampaign = async (categoryProps) => {
  const spesificCampaign = await db.findUnique({
    where: {
      category: categoryProps,
    },
  });
  return spesificCampaign;
};

export const getCategory = async () => {
  const category = await db.category.findMany();
  return category;
};
