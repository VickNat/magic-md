'use client'

import React, { useState } from 'react';
import { marked } from 'marked';
import { toPng } from 'html-to-image';
import * as htmlToImage from 'html-to-image';


const Page = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState<any>('');
  const elementRef = React.useRef<any>(null);

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

  const htmlToJpg = () => {
    htmlToImage.toPng(elementRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'my-node.jpg';
        link.click();
      })
      .catch((error) => {
        console.error('Error converting HTML to jpg:', error);
      });
  }

  return (
    <div>
      <input type="file" accept=".md" onChange={(event) => handleFileUpload(event)} />
      <button onClick={convertToHtml}>Convert to JPG</button>
      {
        html && (
          <button onClick={htmlToJpg}>Download JPG</button>
        )
      }
      <div
        ref={elementRef}
        style={{ minHeight: "100vh", display: 'none' }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} style={{ backgroundColor: "white", minHeight: "100vh" }} />
      </div>
    </div>
  );
};

export default Page;