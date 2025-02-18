"use server";
import { searchManyCampaign } from "@/lib/repo/campaign";

export const searchCampaign = async (query) => {
  return await searchManyCampaign(query);
};
