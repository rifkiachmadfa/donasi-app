import { notFound } from "next/navigation";
import { getAllCampaign, getSpecificCampaign } from "@/lib/repo/campaign";
import ListCampaignHorizontal from "@/components/listCampaignHorizontal";
import FilterSelect from "@/components/FilterSelect";
export default async function campaignPage() {
  const data = await getAllCampaign();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="">
        <div className="flex items-center gap-4 justify-between p-2">
          <span className="text-xs">Cari Berdasarkan Kategori</span>
          <FilterSelect />
        </div>
        <ListCampaignHorizontal data={data} />
      </div>
    </>
  );
}
