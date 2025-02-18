import React from "react";
import CardCampaignHorizontal from "./cardCampaignHorizontal";

const ListCampaignHorizontal = ({ data, isCategory }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mx-2">
        {data.map((campaign) => (
          <CardCampaignHorizontal
            href={campaign.url}
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
