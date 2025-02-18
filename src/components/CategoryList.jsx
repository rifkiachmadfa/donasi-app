"use client";
import React, { useState } from "react";
import FilterSelect from "./FilterSelect";
import ListCampaignHorizontal from "./listCampaignHorizontal";
const CategoryList = ({ category, data }) => {
  const [isCategory, setIsCategory] = useState();
  return (
    <div>
      <div className="">
        <div className="flex items-center gap-4 justify-between p-2">
          <span className="text-xs">Cari Berdasarkan Kategori</span>
          <FilterSelect category={category} setIsCategory={setIsCategory} />
        </div>
        <ListCampaignHorizontal data={data} />
      </div>
    </div>
  );
};

export default CategoryList;
