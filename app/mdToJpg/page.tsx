'use client'

import React, { useState } from 'react';
import { marked } from 'marked';
import * as htmlToImage from 'html-to-image';
import { Button } from '@/components/ui/button';
import { IoIosLink } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';
import PDFViewer from '@/components/PDFViewer';
import { Loader2 } from 'lucide-react';


const Page = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState<any>('');
  const elementRef = React.useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convertToHtml = () => {
    if (!markdown) {
      console.error('Markdown content is empty.');
      return;
    }

    setLoading(true)

    const htmlContent = marked(markdown);
    setTimeout(() => {
      setHtml(htmlContent);
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    if (!file) {
      setError("Please select a file to upload.")
      return;
    }

    reader.onload = (e: any) => {
      setMarkdown(e.target?.result);
    };

    const fileAsBlob = file as Blob;
    if (!fileAsBlob || fileAsBlob.size === 0) {
      setError("Images are not allowed inside the markdown file.")
      return;
    }
    reader.readAsText(fileAsBlob);

    setError('');
  };

  const htmlToJpg = () => {
    htmlToImage.toJpeg(elementRef.current)
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
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-16'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl'>Convert Markdown to JPG</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input required type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => handleFileUpload(event)} accept=".md" />
        </label>
        {error && <p className='text-red-500'>{error}</p>}
      </div>

      <div className='flex gap-x-4 justify-center items-center'>
        <Button disabled={!markdown} className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={convertToHtml}>
        {loading ? <Loader2 className='h-8 w-auto animate-spin' /> :
            <>
              <IoIosLink /> <span>Convert to JPG</span>
            </>}
        </Button>
        {
          html && (
            <Button className="bg-slate-400 hover:bg-slate-500 text-white py-7 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center" onClick={htmlToJpg}><MdOutlineFileDownload className='h-8 w-auto' /></Button>
          )
        }
      </div>

      <div ref={elementRef}>
        <PDFViewer html={html} />
      </div>
    </div>
  );
};

export default Page;