'use client'

import React, { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [rstContent, setRstContent] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;    
    if (!files) return;

    const file = files[0];
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
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Convert your Markdown to RST</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".md" />
        </label>
      </div>
      {rstContent && (
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(rstContent)}`}
          download="converted-data.rst"
          className="mt-4 bg-slate-400 hover:bg-slate-500 text-white py-3 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center"
        >
        <span>Download RST</span> <MdOutlineFileDownload className='h-8 w-auto' />
        </a>
      )}
    </div>
  )
}

export default Page