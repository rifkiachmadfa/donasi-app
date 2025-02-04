import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
function Thumbnail() {
  const src = [
    "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/07/27/IMG-20230727-WA0026-1355439506.jpg",
    "https://bogoronline.com/wp-content/uploads/2023/06/IMG_20230613_173018.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgm5nB3-V6AGBltaaVH2P_J4cwOtLVmbJ6-8RkhiX6_RlQmIxhdKL0zN_YRUAEIVHjd4&usqp=CAU",
  ];
  return (
    <div className="h-72">
      <Carousel className="h-72">
        <CarouselContent className="h-72">
          {src.map((src) => (
            <CarouselItem key={src}>
              <Image
                src={src}
                width={720}
                height={100}
                className="object-cover"
                alt="thumbnail alt"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Thumbnail;
