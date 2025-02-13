import Thumbnail from "@/components/thumbnail";
import CategoryHome from "@/components/categoryHome";
import CardCampaign from "@/components/cardCampaign";
import CarouselUrgent from "@/components/carouselUrgent";

export default async function Home() {
  return (
    <>
      <div className="min-h-[100vh] bg-gray-200">
        <Thumbnail />
        <CategoryHome />
        <CarouselUrgent />
      </div>
    </>
  );
}
