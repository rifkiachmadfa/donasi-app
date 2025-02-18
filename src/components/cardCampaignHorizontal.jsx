import React from "react";
import { CardContent, CardTitle, Card } from "./ui/card";
import Image from "next/image";
import { Progress } from "./ui/progress";
import { AspectRatio } from "./ui/aspect-ratio";
import { formatCurrency } from "@/lib/formatCurrency";
import Link from "next/link";
const CardCampaignHorizontal = ({
  title,
  progress,
  target,
  terkumpul,
  durasi,
  gambar,
  href,
}) => {
  const targeDonasi = formatCurrency(target);
  const danaTerkumpul = formatCurrency(terkumpul);

  return (
    <>
      <Link href={`/campaign/${href}`}>
        <Card className="h-full w-full">
          <div className="grid grid-cols-3 gap-1 mx-2 my-1 pt-2">
            <div className="relative w-full overflow-hidden">
              <AspectRatio ratio={16 / 9} className="rounded-lg">
                <Image
                  src={gambar}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                />
              </AspectRatio>
            </div>
            <div className="col-span-2">
              <CardContent>
                <CardTitle className="mb-2">{title}</CardTitle>
                <Progress value={progress} />
                <div className="flex justify-between">
                  <p className="text-[10px]">Rp {danaTerkumpul}</p>
                  <p className="text-[10px]">Rp {targeDonasi}</p>
                </div>
                <p className="text-[10px]">{durasi} hari lagi</p>
              </CardContent>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default CardCampaignHorizontal;
