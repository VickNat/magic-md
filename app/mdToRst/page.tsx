'use client'

import React, { useState } from 'react';
import { FileInput, Button } from '@mantine/core';

const page = () => {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [rstContent, setRstContent] = useState<string>('');

  const handleFileUpload = async (files: File | null) => {
    if (!files) return;

    const file = files;
    setMarkdownFile(file);

    // Read the content of the uploaded Markdown file
    const content = await readFile(file);
    const rst = convertToRst(content);
    setRstContent(rst);
  };

  const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error reading the file'));
      reader.readAsText(file);
    });
  };

  const convertToRst = (markdownContent: string): string => {
    // Replace Markdown headings with RST headings
    const convertedContent = markdownContent.replace(/^#+\s+(.*)$/gm, (match, heading) => {
      const headingLevel = match.indexOf('#');
      return `${'='.repeat(headingLevel + 1)} ${heading}\n`;
    });
  
    return convertedContent;
  };
  
  return (
    <div>
      <FileInput
        label="Upload Markdown file"
        accept=".md"
        onChange={(files) => handleFileUpload(files)}
      />
      {rstContent && (
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(rstContent)}`}
          download="converted-data.rst"
        >
          Download RST
        </a>
      )}
    </div>
  )
}

export default page