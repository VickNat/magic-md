'use client'

import React, { useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import { IoIosLink } from 'react-icons/io';
import PDFViewer from '@/components/PDFViewer';
import { Loader2 } from 'lucide-react';
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [htmlGenerated, setHtmlGenerated] = useState(false);

  const convertToHtml = () => {
    if (!markdown) {
      console.error('Markdown content is empty.');
      return;
    }

    setLoading(true);

    const htmlContent = marked(markdown);
    setTimeout(() => {
      setHtml(htmlContent);
      setHtmlGenerated(true);
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      setMarkdown(e.target?.result);
    };

    reader.readAsText(file as Blob);
  };

  const handleGeneratedHtmlDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([html], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated-html.html';
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-12'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Convert Markdown To HTML</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input required type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => handleFileUpload(event)} accept=".md" />
        </label>
        <div className='flex gap-x-4 justify-center items-center'>
        <Button disabled={!markdown} className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={convertToHtml}>
          {loading ? <Loader2 className='w-6 h-6 animate-spin' /> :
            <>
              <IoIosLink /> <span>Convert To HTML</span></>
          }
        </Button>
        {htmlGenerated && (
          <div>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white py-3 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center"
            onClick={handleGeneratedHtmlDownload}
          > <MdOutlineFileDownload className='h-8 w-auto' /></button>
        </div>
        )}
        </div>
      </div>

      <PDFViewer html={html} />
    </div>
  );
};

export default Page;