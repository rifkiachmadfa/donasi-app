import React from "react";
import { Card } from "./ui/card";
import { Gift, HandCoins, Dog, Landmark } from "lucide-react";
function CategoryHome() {
  return (
    <>
      <Card className="h-[120px] mt-2">
        <div className="mb-3 mt-2 mx-5">
          <h1 className="text-sm">Pilih Program Sesuai Passionmu</h1>
        </div>
        <div className="flex justify-center">
          <div className=" flex justify-center grid-cols-4 gap-16 items-center">
            <div className="flex flex-col items-center ">
              <Gift size={30} />
              <h1 className="text-xs text-center">kategori 1</h1>
            </div>
            <div className="flex flex-col items-center ">
              <HandCoins size={30} />
              <h1 className="text-xs">kategori 2</h1>
            </div>
            <div className="flex flex-col items-center ">
              <Dog size={30} />
              <h1 className="text-xs">kategori 3</h1>
            </div>
            <div className="flex flex-col items-center ">
              <Landmark size={30} />
              <h1 className="text-xs">kategori 4</h1>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CategoryHome;
