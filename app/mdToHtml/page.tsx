'use client'

import React, { useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import { IoIosLink } from 'react-icons/io';
import PDFViewer from '@/components/PDFViewer';

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
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-12'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Convert Markdown To HTML</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input required type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => handleFileUpload(event)} accept=".md" />
        </label>
        <Button className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={convertToHtml}><IoIosLink /> <span>Convert To HTML</span></Button>
      </div>

      <PDFViewer html={html} />
    </div>
  );
};

export default Page;