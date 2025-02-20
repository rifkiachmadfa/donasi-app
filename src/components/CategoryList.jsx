"use client";
import React from "react";
import FilterSelect from "./FilterSelect";
import ListCampaignHorizontal from "./listCampaignHorizontal";
import { useCategory } from "@/context/CategoryContext";

const CategoryList = ({ category, data }) => {
  const { selectedCategory } = useCategory();

  return (
    <div>
      <div className="flex items-center gap-4 justify-between p-2">
        <span className="text-xs">Cari Berdasarkan Kategori</span>
        <FilterSelect category={category} />
      </div>
      <ListCampaignHorizontal data={data} selectedCategory={selectedCategory} />
    </div>
  );
};

export default CategoryList;
