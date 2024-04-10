'use client'

import React, { useState } from 'react'

const page = () => {
  const [combinedMarkdown, setCombinedMarkdown] = useState<string>('');

  const handleFileUpload = async (files: any) => {
    if (!files) return;

    let combinedContent = '';

    for (const file of Array.from(files)) {
      const content = await readFile(file);
      combinedContent += content + '\n---\n';
    }

    setCombinedMarkdown(combinedContent);
  };

  const readFile = async (file: any): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <div>
      <label htmlFor="fileInput">Upload Markdown files:</label>
      <input
        type="file"
        id="fileInput"
        name="files"
        multiple
        onChange={handleFileUpload}
      />
    </div>
      {combinedMarkdown && (
        <a
          href={`data:text/markdown;charset=utf-8,${encodeURIComponent(combinedMarkdown)}`}
          download="combined-markdown.md"
        >
          Download Combined Markdown
        </a>
      )}
    </div>
  )
}

export default page