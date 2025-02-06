import { db } from "@/lib/db";

export default async function campaignPage() {
  const data = await db.post.findUnique({
    where: {
      id: 7,
    },
  });
  console.log(data);

  // Helper function to render content based on type
  const renderContent = (content) => {
    return content.map((node, index) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p className="text-xs" key={index}>
              {node.content
                ? node.content.map((text, idx) => text.text).join("")
                : ""}
            </p>
          );
        case "heading":
          const HeadingTag = `h${node.attrs.level}`;

          return (
            <HeadingTag key={index}>
              {node.content
                ? node.content.map((text, idx) => text.text).join("")
                : ""}
            </HeadingTag>
          );
        default:
          return null;
      }
    });
  };

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
        <h2>Content Preview</h2>
      </div>
    </>
  );
}
