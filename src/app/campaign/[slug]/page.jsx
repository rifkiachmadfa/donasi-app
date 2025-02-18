import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getDetailCampaign } from "@/lib/repo/campaign";
import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContentWithReadMore from "@/components/contentCard";

const detailPage = async ({ params }) => {
  const slug = (await params).slug;
  const post = await getDetailCampaign(slug);
  if (!post) {
    notFound();
  }
  const content = post.content;
  const donasiTerkumpul = 232032222;
  const targeDonasi = formatCurrency(post.target);
  const terkumpul = formatCurrency(donasiTerkumpul);
  const progress = (100 * donasiTerkumpul) / Number(post.target);

  return (
    <>
      <div className="relative">
        <div className="mb-4 h-[240px] w-full relative">
          <Image
            src={post.imageThumb}
            alt={post.title}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        </div>
        <Card className="w-full absolute top-48 h-28 rounded-t-3xl rounded-b-none">
          <CardContent className="m-2">
            <h2 className="text-lg mb-1">{post.title}</h2>
            <Progress value={progress} />
            <div className="text-[10px] flex justify-between mt-1">
              <h1>Terkumpul Rp {terkumpul}</h1>
              <h1>Target Rp {targeDonasi}</h1>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="m-2 mt-20">
        <ContentWithReadMore content={content} />
      </Card>
    </>
  );
};

export default detailPage;
