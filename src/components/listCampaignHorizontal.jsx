import React from "react";
import CardCampaignHorizontal from "./cardCampaignHorizontal";

const ListCampaignHorizontal = async ({ data }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mx-2">
        {data.map((campaign) => (
          <CardCampaignHorizontal
            href={`/campaign`}
            key={campaign.id}
            title={campaign.title}
            progress={10}
            target={campaign.target}
            durasi={campaign.durasi}
            gambar={campaign.imageThumb}
            terkumpul={10000}
          />
        ))}
      </div>
    </>
  );
};

export default ListCampaignHorizontal;
