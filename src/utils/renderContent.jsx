export const renderContent = (content) => {
  if (!content || !Array.isArray(content.content)) {
    return null; // Pastikan `content.content` ada dan berbentuk array
  }

  // Helper function to render text with marks (bold, italic, strike)
  const renderText = (textContent, marks) => {
    let renderedText = textContent;

    if (marks) {
      marks.forEach((mark) => {
        if (mark.type === "bold") {
          renderedText = <b className="font-bold">{renderedText}</b>;
        } else if (mark.type === "italic") {
          renderedText = <i className="italic">{renderedText}</i>;
        } else if (mark.type === "strike") {
          renderedText = <del className="line-through">{renderedText}</del>;
        }
      });
    }

    return renderedText;
  };

  return content.content.map((node, index) => {
    switch (node.type) {
      case "paragraph":
        return (
          <p className="text-xs" key={index}>
            {node.content ? (
              node.content.map((text, idx) => (
                <span key={idx}>{renderText(text.text, text.marks)}</span>
              ))
            ) : (
              <br />
            )}
          </p>
        );

      case "heading":
        const level = node.attrs?.level || 1;
        const classMap = {
          1: "text-lg",
          2: "text-md",
          3: "text-sm",
        };
        const HeadingTag = `h${level}`;
        const headingClass = classMap[level] || "text-base";

        return (
          <HeadingTag key={index} className={headingClass}>
            {node.content
              ? node.content.map((text, idx) => (
                  <span key={idx}>{renderText(text.text, text.marks)}</span>
                ))
              : ""}
          </HeadingTag>
        );

      default:
        return null;
    }
  });
};
