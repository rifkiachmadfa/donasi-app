"use client";
import React, { useState, useEffect } from "react";

const ContentWithReadMore = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Menandakan bahwa ini adalah render klien
    setIsClient(true);
  }, []);

  const truncatedContent =
    content.length > 100 ? content.substring(0, 500) + "..." : content;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isClient) {
    // Pada SSR, hanya render placeholder atau konten sementara
    return <div className="m-4">{truncatedContent}</div>;
  }

  return (
    <div className="m-4">
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded ? content : truncatedContent,
        }}
      />
      {content.length > 100 && (
        <button onClick={handleToggle} className="text-blue-500 text-xs mt-2">
          {isExpanded ? "Peringkas" : "Baca Selengkapnya"}
        </button>
      )}
    </div>
  );
};

export default ContentWithReadMore;
