import CreateCampaign from "@/components/form/createPost";
import { getCategory } from "@/lib/repo/campaign";

export default async function dashbaordPage() {
  const category = await getCategory();
  return (
    <>
      <div>
        <h1>dashboard page</h1>
        <CreateCampaign category={category} />
      </div>
    </>
  );
}
