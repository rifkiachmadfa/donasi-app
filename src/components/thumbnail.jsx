"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";

function Thumbnail() {
  const src = [
    "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/07/27/IMG-20230727-WA0026-1355439506.jpg",
    "https://bogoronline.com/wp-content/uploads/2023/06/IMG_20230613_173018.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgm5nB3-V6AGBltaaVH2P_J4cwOtLVmbJ6-8RkhiX6_RlQmIxhdKL0zN_YRUAEIVHjd4&usqp=CAU",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = src.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  return (
    <Carousel className="">
      <CarouselContent
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {src.map((src) => (
          <CarouselItem key={src} className="overflow-hidden rounded-b-3xl">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={src}
                width={720}
                height={100}
                className="w-full h-full object-cover rounded-b-3xl"
                alt="thumbnail alt"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Thumbnail;
