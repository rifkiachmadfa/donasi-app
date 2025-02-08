import EditCampaign from "@/components/form/editPost";
import { getDetailCampaign } from "@/lib/repo/campaign";
import React from "react";

const edit = async ({ params }) => {
  const slug = (await params).slug;
  const campaign = await getDetailCampaign(slug);

  return (
    <div>
      <h1>edit campaign {campaign.title}</h1>
      <EditCampaign campaign={campaign} />
    </div>
  );
};

export default edit;
