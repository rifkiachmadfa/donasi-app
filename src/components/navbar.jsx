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
    setArrow(path != "/");
  }, [path]);

  return (
    <div className="flex justify-center h-14 items-center shadow-lg rounded-md gap-4">
      <div className="w-16 flex justify-center items-center">
        {arrow ? (
          <ArrowLeft size="18" onClick={router.back} />
        ) : (
          <Image src="/sf-logo.png" height={100} width={100} alt="logo" />
        )}
      </div>
      <div className="w-[24rem]">
        <Link href="/search">
          <div className="absolute right-[500px] top-[18px] h-10">
            <Search size="18" />
          </div>
          <Input className="outline-none" placeholder="Cari Program" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
