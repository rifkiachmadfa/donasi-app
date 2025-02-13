import Thumbnail from "@/components/thumbnail";
import CategoryHome from "@/components/categoryHome";
import { getAllCampaign } from "@/lib/repo/campaign";
import CarouselUrgent from "@/components/carouselUrgent";
import ListCampaignHorizontal from "@/components/listCampaignHorizontal";
import SpecialCampaign from "@/components/specialCampaign";
import Link from "next/link";
export default async function Home() {
  const data = await getAllCampaign();
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
          <div className="p-2 px-5  bg-white w-full h-full">
            <h1 className="text-sm text-gray-700">
              Rekomendasi Program Pilihan
            </h1>
          </div>
          <ListCampaignHorizontal data={data} />
          <div className="p-2 px-5  bg-white w-full h-full text-end">
            <Link href="/campaign">
              <h1 className="text-xs text-gray-700 hover:text-blue-500">
                Lihat Semua
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
