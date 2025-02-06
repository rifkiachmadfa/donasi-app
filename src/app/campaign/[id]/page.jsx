import { db } from "@/lib/db";
import { renderContent } from "@/app/utils/renderContent";
const detailPage = async ({ params }) => {
  const id = (await params).id;
  const post = await db.post.findUnique({
    where: { id: Number(id) }, // Fetch post by ID
  });

  console.log("Post:", post);

  if (!post) {
    return <div>Post not found</div>; // Handle case when the post is not found
  }

  return (
    <>
      <div>
        <h2 className="text-2xl">{post.title}</h2>
        <div>{renderContent(post.content.content)}</div>
      </div>
    </>
  );
};

export default detailPage;
