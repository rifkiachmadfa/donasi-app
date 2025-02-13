import { notFound } from "next/navigation";

import { getAllCampaign } from "@/lib/repo/campaign";
import SpecialCampaign from "@/components/specialCampaign";

export default async function campaignPage() {
  const data = await getAllCampaign();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div>
        <h1>Campaign Page</h1>
        <SpecialCampaign
          link="/"
          image="https://media.licdn.com/dms/image/v2/C561BAQEJPaeWrnN6TQ/company-background_10000/company-background_10000/0/1628420762877/sinergifoundation_cover?e=2147483647&v=beta&t=Gnaq_PcuDsczCUi7rmiUwYtfOpbSyHsdWXp_eYWC_UI"
        />
      </div>
    </>
  );
}
