'use client'

import React, { useState } from 'react';
import { marked } from 'marked';

const Page = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState<any>('');

  const convertToHtml = () => {
    if (!markdown) {
      console.error('Markdown content is empty.');
      return;
    }

    const htmlContent = marked(markdown);
    setHtml(htmlContent);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      setMarkdown(e.target?.result);
    };

    reader.readAsText(file as Blob);
  };

  return (
    <div>
      <input type="file" accept=".md" onChange={(event) => handleFileUpload(event)} />
      <button onClick={convertToHtml}>Convert to HTML</button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Page;