'use client'

import { useState } from 'react';
import { FileInput, Button } from '@mantine/core';

const page = () => {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [csvContent, setCsvContent] = useState<string>('');

  const handleFileUpload = async (files: File | null) => {
    if (!files) return;
  
    const file = files;
    setMarkdownFile(file);
  
    // Read the content of the uploaded Markdown file
    const content = await readFile(file);
    const csv = convertToCsv(content);
    setCsvContent(csv);
  };  

  const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error reading the file'));
      reader.readAsText(file);
    });
  };

  const convertToCsv = (markdownContent: string): string => {
    const lines = markdownContent.split('\n');
  
    const csvRows: string[] = [];
  
    let currentRow = '';
    for (const line of lines) {
      if (line.startsWith('#')) {
        const headingText = line.replace(/^#+\s/, '');
  
        currentRow += headingText + ',';
      } else if (line.trim() !== '') {
        currentRow += line.trim() + ',';
      } else {
        csvRows.push(currentRow);
        currentRow = '';
      }
    }
  
    if (currentRow !== '') {
      csvRows.push(currentRow);
    }
  
    const csvContent = csvRows.join('\n');
    return csvContent;
  };
  

  return (
    <div>
      <FileInput
        label="Upload Markdown file"
        accept=".md"
        onChange={(files) => handleFileUpload(files)}
      />
      {csvContent && (
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
          download="converted-data.csv"
        >
          Download CSV
        </a>
      )}
    </div>
  )
}

export default page