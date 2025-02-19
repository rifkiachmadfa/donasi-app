import EditCampaign from "@/components/form/editPost";
import { getDetailCampaign, getCategory } from "@/lib/repo/campaign";
import { notFound } from "next/navigation";
import React from "react";

const edit = async ({ params }) => {
  const slug = (await params).slug;
  const campaign = await getDetailCampaign(slug);
  const category = await getCategory();
  if (!campaign) {
    notFound();
  }
  return (
    <div>
      <h1>edit campaign {campaign.title}</h1>
      <EditCampaign campaign={campaign} category={category} />
    </div>
  );
};

export default edit;
