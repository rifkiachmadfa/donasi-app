import React from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";
function ButtonDonasi() {
  return (
    <div className="fixed bottom-16 flex justify-center ">
      <div className="grid grid-cols-3 gap-1 backdrop-blur-md bg-white/30 p-4 rounded-lg w-[24rem]">
        <Button className="flex items-center justify-center space-x-1">
          <Share />
          <h1>bagikan</h1>
        </Button>
        <Button className="col-span-2 flex justify-center items-center">
          Donasi
        </Button>
      </div>
    </div>
  );
}

export default ButtonDonasi;
