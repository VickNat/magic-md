'use client'

import { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [csvContent, setCsvContent] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
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
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl' >Convert your Markdown to CSV</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".md" />
        </label>
      </div>
      {csvContent && (
        <a
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
        download="converted-data.csv"
        className="mt-4 bg-slate-400 hover:bg-slate-500 text-white py-3 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center"
      >
        <span>Download CSV</span> <MdOutlineFileDownload className='h-8 w-auto' />
      </a>
      )}
    </div>
  )
}

export default Page
