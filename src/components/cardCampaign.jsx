import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { formatCurrency } from "@/lib/formatCurrency";
import Link from "next/link";
const CardCampaign = ({
  title,
  progress,
  terkumpul,
  target,
  durasi,
  thumbnail,
  href,
}) => {
  const targeDonasi = formatCurrency(target);
  const danaTerkumpul = formatCurrency(terkumpul);

  return (
    <Link href={`/campaign/${href}`}>
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
            <p className="text-[10px]">Terkumpul Rp {danaTerkumpul}</p>
            <p className="text-[10px]">Target Rp {targeDonasi}</p>
          </div>
          <p className="text-[10px]">{durasi} hari lagi</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardCampaign;
