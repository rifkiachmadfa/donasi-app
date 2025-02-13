import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
const CardCampaign = ({
  title,
  progress,
  terkumpul,
  target,
  durasi,
  thumbnail,
}) => {
  return (
    <Card className="h-60 w-60">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={thumbnail}
          alt={title}
          width={100}
          height={100}
          className="object-cover rounded-lg w-full h-full"
        />
      </AspectRatio>

      <CardContent className="pt-3">
        <CardTitle className="mb-4">{title}</CardTitle>
        <Progress value={progress} />
        <div className="flex justify-between">
          <p className="text-[10px]">Terkumpul Rp {terkumpul}</p>
          <p className="text-[10px]">Target Rp {target}</p>
        </div>
        <p className="text-[10px]">{durasi} hari lagi</p>
      </CardContent>
    </Card>
  );
};

export default CardCampaign;
