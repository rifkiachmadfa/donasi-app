import React from "react";
import { getDetailCampaign } from "@/lib/repo/campaign";
const page = async ({ params }) => {
  const slug = (await params).slug;
  const campaign = await getDetailCampaign(slug);
  console.log(campaign);
  return <div></div>;
};

export default page;
