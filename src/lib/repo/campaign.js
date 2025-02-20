import { db } from "../db";

export const getAllCampaign = async () => {
  const allCampaign = await db.campaign.findMany();
  return allCampaign;
};

export const getDetailCampaign = async (url) => {
  const detailCampaign = await db.campaign.findUnique({
    where: {
      url: url,
    },
    include: { categories: true },
  });
  return detailCampaign;
};

export const getCampaignByCategory = async (categoryProps) => {
  const spesificCampaign = await db.campaign.findUnique({
    where: {
      category: categoryProps,
    },
  });
  return spesificCampaign;
};

export const searchManyCampaign = async (titleProps) => {
  const searchCampaign = await db.campaign.findMany({
    where: {
      title: titleProps,
    },
  });
};

export const getCategory = async () => {
  const category = await db.category.findMany();
  return category;
};
