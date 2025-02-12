"use client";
import React, { useState } from "react";
import { House, HeartHandshake, Send, User } from "lucide-react";
import { Menubar, MenubarTrigger, MenubarMenu } from "@/components/ui/menubar";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavMenu() {
  const pathname = usePathname();

  const menuItems = [
    { id: "beranda", label: "Beranda", icon: <House size={24} />, link: "/" },
    {
      id: "donasi",
      label: "Donasi",
      icon: <HeartHandshake size={24} />,
      link: "/donor/donasi-saya",
    },
    {
      id: "pesan",
      label: "Pesan",
      icon: <Send size={24} />,
      link: "/donor/pesan",
    },
    {
      id: "profil",
      label: "Profil",
      icon: <User size={24} />,
      link: "/donor/profile",
    },
  ];

  return (
    <div className="fixed h-16 w-full max-w-sm bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg bg-white bg-opacity-80 backdrop-blur-lg   flex items-center justify-around">
      <Menubar className="w-full h-full flex justify-center">
        {menuItems.map((item) => (
          <MenubarMenu key={item.id}>
            <Link href={item.link} className="w-full flex justify-center">
              <MenubarTrigger
                className={`flex flex-col items-center h-full text-black  transition-all   hover:bg-gray-100 ${
                  pathname === item.link ? "text-blue-500  font-semibold" : ""
                }`}
              >
                {item.icon}
                <h1 className="text-xs mt-1">{item.label}</h1>
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
}

export default NavMenu;
