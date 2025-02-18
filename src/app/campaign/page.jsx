import { notFound } from "next/navigation";
import {
  getAllCampaign,
  getCategory,
  getSpecificCampaign,
} from "@/lib/repo/campaign";

import CategoryList from "@/components/categoryList";
export default async function campaignPage() {
  const data = await getAllCampaign();
  const category = await getCategory();
  if (!data) {
    return notFound();
  }

  return (
    <>
      <CategoryList category={category} data={data} />
    </>
  );
}
