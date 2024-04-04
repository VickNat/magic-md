'use client'

import React, { useState } from 'react'
import { Textarea, Button } from '@mantine/core';

const Page = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [sections, setSections] = useState<{ title: string, content: string }[]>([]);

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const splitMarkdown = () => {
    // Regular expression to match headings (e.g., # Heading 1)
    const headingRegex = /^(#{1,6})\s(.*)/gm;

    // Split the content into sections based on headings
    const sectionsArray: { title: string, content: string }[] = [];
    let match;
    let lastIndex = 0;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const headingLevel = match[1].length;
      const title = match[2];
      const content = markdownContent.substring(lastIndex, match.index);

      // Add content before next heading (or end of string)
      sectionsArray.push({ title, content });

      lastIndex = match.index + match[0].length;
    }

    // Get the content after the last heading
    const contentAfterLastHeading = markdownContent.substring(lastIndex);
    sectionsArray.push({ title: 'Content After Last Heading', content: contentAfterLastHeading });

    setSections(sectionsArray);
  };

  return (
    <div>
      <Textarea
        placeholder="Enter your Markdown content here..."
        value={markdownContent}
        onChange={handleMarkdownChange}
        style={{ minHeight: '200px' }}
      />
      <Button onClick={splitMarkdown}>Split Markdown</Button>

      {sections.slice(0, -1).map((section, index) => (
        <a
          key={index}
          href={`data:text/markdown;charset=utf-8,${encodeURIComponent(`#${section.title}\n\n${sections[index + 1].content}`)}`}
          download={`section-${index + 1}.md`}
        >
          Download Section {index + 1}
        </a>
      ))}


    </div>
  );
}

export default Page;
