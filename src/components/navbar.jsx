"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";

function Navbar() {
  const [arrow, setArrow] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setArrow(path !== "/");
  }, [path]);

  return (
    <div className="flex justify-center h-14 items-center shadow-lg rounded-md gap-4 px-4">
      <div className="w-16 flex justify-center items-center">
        {arrow ? (
          <ArrowLeft
            size="18"
            onClick={router.back}
            className="cursor-pointer"
          />
        ) : (
          <Image src="/sf-logo.png" height={100} width={100} alt="logo" />
        )}
      </div>

      {/* Wrapper untuk Search Input */}
      <div className="relative flex items-center w-[24rem]">
        <Link href="/search" className="w-full">
          <Input
            className="pr-10 outline-none w-full"
            placeholder="Cari Program"
          />
          <Search
            size="18"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
