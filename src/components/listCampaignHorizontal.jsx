"use client";
import React, { useEffect } from "react";
import CardCampaignHorizontal from "./cardCampaignHorizontal";
import { useCategory } from "../app/context/categoryContext";
import { getCampaignByCategory } from "@/lib/repo/campaign";

const ListCampaignHorizontal = ({ data }) => {
  const { selectedCategory } = useCategory();

  // Filter campaign berdasarkan kategori yang dipilih
  const filteredCampaigns = selectedCategory
    ? data.filter((campaign) => campaign.category === selectedCategory)
    : data;

  useEffect(() => {
    async function fetchData() {
      res = await getCampaignByCategory(filteredCampaigns);
    }
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-2 mx-2">
      {filteredCampaigns.length === 0 && <p>Tidak ada campaign ditemukan.</p>}

      {filteredCampaigns.map((campaign) => (
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
  );
};

export default ListCampaignHorizontal;
