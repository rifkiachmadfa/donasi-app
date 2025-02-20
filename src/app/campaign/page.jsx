import { notFound } from "next/navigation";
import {
  getAllCampaign,
  getCampaignByCategory,
  getCategory,
  getSpecificCampaign,
} from "@/lib/repo/campaign";

import CategoryList from "@/components/categoryList";
import { CategoryProvider } from "../context/categoryContext";
export default async function campaignPage() {
  const data = await getAllCampaign();
  const category = await getCategory();
  if (!data) {
    return notFound();
  }

  return (
    <>
      <CategoryProvider>
        <CategoryList category={category} data={data} />
      </CategoryProvider>
    </>
  );
}
