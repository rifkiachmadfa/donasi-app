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
    <div className="flex justify-center h-14 items-center shadow-lg rounded-md gap-4 px-4 bg-transparent">
      <div className="w-full flex ">
        {arrow ? (
          <>
            <div className="flex gap-2">
              <Link href="/">
                <Image src="/sf-logo.png" height={50} width={50} alt="logo" />
              </Link>
              <ArrowLeft
                size="20"
                onClick={router.back}
                className="cursor-pointer content-end"
              />
            </div>
          </>
        ) : (
          <Link href="/">
            <Image src="/sf-logo.png" height={80} width={80} alt="logo" />
          </Link>
        )}
      </div>

      {/* Wrapper untuk Search Input */}
      <div className="relative flex items-center w-[70rem]">
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
