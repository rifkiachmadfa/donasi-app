import { db } from "@/lib/db";
import { getDetailCampaign } from "@/lib/repo/campaign";
import { renderContent } from "@/utils/renderContent";
import Image from "next/image";
import { notFound } from "next/navigation";

const detailPage = async ({ params }) => {
  const slug = (await params).slug;
  const post = await getDetailCampaign(slug);
  if (!post) {
    notFound();
  }
  const content = post.content;
  console.log(post.content);
  return (
    <>
      <div>
        <div className="mb-4 h-[240px] w-full relative">
          <Image
            src={post.imageThumb}
            alt={post.title}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl">{post.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="whitespace-pre-line"
        />
      </div>
    </>
  );
};

export default detailPage;
