'use client'

import React, { useState } from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import { IoIosLink } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [combinedMarkdown, setCombinedMarkdown] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);

  const handleFileUpload = async (event: any) => {
    if (!event.target.files) return;

    setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
  };

  const handleMergeFiles = async () => {
    let combinedContent = '';

    for (const file of files) {
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
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-16'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl'>Merge Markdown files</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".md" />
        </label>
        <div className='flex gap-x-4 justify-center items-center'>
          <Button disabled={files.length <= 1} className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={handleMergeFiles}><IoIosLink /> <span>Merge Files</span></Button>
          {
            combinedMarkdown && (
              <a href={`data:text/markdown;charset=utf-8,${encodeURIComponent(combinedMarkdown)}`}
                download="combined-markdown.md" className={`bg-slate-400 hover:bg-slate-500 text-white py-7 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center ${buttonVariants({ variant: "default" })}`} ><MdOutlineFileDownload className='h-8 w-auto' /></a>
            )
          }
        </div>
        {files.length >= 1 && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className='text-center font-bold text-2xl text-slate-500 mb-4'>Files to be merged:</h2>
              <div className='grid grid-cols-1 gap-4 min-w-72'>
                {files.map((file, index) => (
                  <div key={index} className='p-4 bg-indigo-50 rounded-lg flex justify-between'>
                    <span className='block text-indigo-700 font-bold'>{file.name}</span>
                    <span className='block text-indigo-700'>{(file.size / 1024).toFixed(2)} KB</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
