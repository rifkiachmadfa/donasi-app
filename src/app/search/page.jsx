"use client";

import React from "react";
import useSearchStore from "@/lib/store";
import CardCampaignHorizontal from "@/components/cardCampaignHorizontal";

function SearchPage() {
  const { results } = useSearchStore();

  return (
    <div className="min-h-screen p-4">
      {/* Menampilkan hasil pencarian */}
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="grid grid-cols-1 gap-2">
            {results.map((item) => (
              <li key={item.id}>
                <CardCampaignHorizontal
                  href={item.url}
                  title={item.title}
                  progress={item.progress}
                  target={Number(item.target)}
                  terkumpul={100000}
                  durasi={item.durasi}
                  gambar={item.imageThumb}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
