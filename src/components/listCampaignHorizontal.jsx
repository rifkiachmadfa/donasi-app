import React from "react";
import CardCampaignHorizontal from "./cardCampaignHorizontal";
import { getAllCampaign } from "@/lib/repo/campaign";
import Link from "next/link";

const ListCampaignHorizontal = async () => {
  const data = await getAllCampaign();
  return (
    <>
      <div className="p-2 px-5  bg-white w-full h-full">
        <h1 className="text-sm text-gray-700">Rekomendasi Program Pilihan</h1>
      </div>
      <div className="flex flex-col gap-2 mx-2">
        {data.map((campaign) => (
          <CardCampaignHorizontal
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
      <div className="p-2 px-5  bg-white w-full h-full text-end">
        <Link href="/campaign">
          <h1 className="text-xs text-gray-700 hover:text-blue-500">
            Lihat Semua
          </h1>
        </Link>
      </div>
    </>
  );
};

export default ListCampaignHorizontal;
