import { notFound } from "next/navigation";
import { renderContent } from "@/utils/renderContent";
import { getAllCampaign } from "@/lib/repo/campaign";

export default async function campaignPage() {
  const data = await getAllCampaign();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div>
        <h1>Campaign Page</h1>
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <div>{renderContent(post.content.content)}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
