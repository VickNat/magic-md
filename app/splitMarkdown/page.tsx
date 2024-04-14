'use client'

import React, { useState } from 'react'
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [sections, setSections] = useState<{ title: string, content: string }[]>([]);

  const handleFileUpload = async (event: any) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const content = await readFile(file);
    splitMarkdown(content);
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

  const splitMarkdown = (markdownContent: string) => {
    // Regular expression to match headings (e.g., # Heading 1)
    const headingRegex = /^(#{1,6})\s(.*)/gm;

    // Split the content into sections based on headings
    const sectionsArray: { title: string, content: string }[] = [];
    let match;
    let lastIndex = 0;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const headingLevel = match[1].length;
      const title = match[2];
      const content = markdownContent.substring(lastIndex, match.index);

      // Add content before next heading (or end of string)
      if (content.trim() !== '') {
        sectionsArray.push({ title: 'Content Before Heading', content });
      }

      lastIndex = match.index;
    }

    // Get the content after the last heading
    const contentAfterLastHeading = markdownContent.substring(lastIndex);
    sectionsArray.push({ title: 'Content After Last Heading', content: contentAfterLastHeading });

    setSections(sectionsArray);
  };


  return (
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-16'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Split Markdown files</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".md" />
        </label>
      </div>
      {
        sections.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className='text-center font-bold text-2xl text-slate-500 mb-4'>Split files</h2>
            <div className='grid grid-cols-1 gap-4 min-w-72'>
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`data:text/markdown;charset=utf-8,${encodeURIComponent(section.content)}`}
                  download={`${section.title.replace(/\s+/g, '_').toLowerCase()}.md`} className='hover:scale-105 transition duration-300 cursor-pointer p-4 bg-indigo-50 rounded-lg flex justify-between gap-x-4'>
                  <span className='block text-indigo-700 font-bold'>{section.title}</span>
                  <MdOutlineFileDownload className='h-6 w-auto text-indigo-700' />
                </a>
              ))}
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Page
