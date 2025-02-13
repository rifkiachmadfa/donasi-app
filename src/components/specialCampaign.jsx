import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
const SpecialCampaign = ({ link, image }) => {
  return (
    <>
      <Link href={link}>
        <div className="p-2 px-5  bg-white w-full h-full">
          <h1 className="text-sm text-gray-700">Campaign Spesial Bulan ini</h1>
        </div>
        <AspectRatio ratio={16 / 9}>
          <Image src={image} height={500} width={500} alt="special" />
        </AspectRatio>
      </Link>
    </>
  );
};

export default SpecialCampaign;
