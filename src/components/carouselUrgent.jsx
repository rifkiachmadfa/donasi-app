import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CardCampaign from "./cardCampaign";
import { getAllCampaign } from "@/lib/repo/campaign";

async function CarouselUrgent() {
  const campaigns = await getAllCampaign();
  return (
    <>
      <div className="p-2 px-5">
        <h1 className="text-sm">Butuh Pendanaan Cepat</h1>
      </div>

      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-5xl"
      >
        <CarouselContent className="gap-12">
          {campaigns.map((campaign) => (
            <CarouselItem key={campaign.id} className="basis-1/2">
              <CardCampaign
                title={campaign.title}
                progress={20}
                target={campaign.target}
                terkumpul={100000}
                durasi={campaign.durasi}
                thumbnail={campaign.imageThumb}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default CarouselUrgent;
