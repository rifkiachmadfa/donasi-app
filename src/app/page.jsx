import Thumbnail from "@/components/thumbnail";
import CategoryHome from "@/components/categoryHome";

import CarouselUrgent from "@/components/carouselUrgent";
import ListCampaignHorizontal from "@/components/listCampaignHorizontal";
import SpecialCampaign from "@/components/specialCampaign";

export default async function Home() {
  return (
    <>
      <div className="min-h-[100vh] bg-gray-200 relative flex flex-col items-center">
        <div className="relative w-full">
          <div className="mb-2">
            <Thumbnail />
          </div>
          <div className="flex justify-center">
            <div className="absolute top-[190px]">
              <CategoryHome />
            </div>
          </div>
        </div>

        <CarouselUrgent />
        <div className="pt-2 bg-white w-full">
          <SpecialCampaign
            link="/"
            image="https://media.licdn.com/dms/image/v2/C561BAQEJPaeWrnN6TQ/company-background_10000/company-background_10000/0/1628420762877/sinergifoundation_cover?e=2147483647&v=beta&t=Gnaq_PcuDsczCUi7rmiUwYtfOpbSyHsdWXp_eYWC_UI"
          />
        </div>
        <div className="pt-5 bg-white w-full">
          <ListCampaignHorizontal />
        </div>
      </div>
    </>
  );
}
