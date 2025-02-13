import React from "react";
import { Card } from "./ui/card";
import { Gift, HandCoins, Dog, Landmark } from "lucide-react";

function CategoryHome() {
  const categories = [
    { icon: <Gift size={15} />, label: "Donasi" },
    { icon: <HandCoins size={15} />, label: "Zakat" },
    { icon: <Dog size={15} />, label: "Hewan" },
    { icon: <Landmark size={15} />, label: "Pembangunan" },
  ];

  return (
    <Card className="shadow-md border w-[320px] rounded-2xl h-[80px] flex flex-col justify-center bg-white">
      <h1 className="text-[12px] mt-1 text-gray-700 text-center mb-1">
        Kategori Program Unggulan
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-10 w-60 text-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg transition-all p-1"
            >
              <div className=" bg-gray-200 p-2 rounded-full">
                {category.icon}
              </div>
              <h1 className="text-[10px] font-medium text-gray-600">
                {category.label}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default CategoryHome;
