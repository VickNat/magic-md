'use client'
import React, { useRef, useState } from 'react';
import { marked } from 'marked';
import PDFViewer from '@/components/PDFViewer';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { IoIosLink } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

const Page = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState<any>('');
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const reportTemplateRef = useRef<any>(null);

  const convertToHtml = async () => {
    if (!markdown) {
      console.error('Markdown content is empty.');
      return;
    }

    const htmlContent = marked(markdown);
    setHtml(htmlContent);
    setPdfGenerated(true);
    // handleGeneratePdf();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      setMarkdown(e.target?.result);
    };

    reader.readAsText(file as Blob);
  };

  const handleGeneratePdf = async () => {

    // console.log("I was here")
    const input = reportTemplateRef.current;

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      pdf.setFont('Inter-Regular', 'normal');

      pdf.html(input, {
        callback: (pdf) => {
          pdf.save('markdown.pdf');
        },
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className='min-h-[650px] flex flex-col justify-start items-center gap-y-8 mb-16'>
      <div className='flex flex-col justify-center items-center gap-y-8'>
        <h1 className='text-center font-bold text-3xl md:text-4xl'>Convert to PDF</h1>
        <label htmlFor="fileInput" className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-12 py-6 font-medium text-white hover:bg-indigo-500 focus:outline-none">
          <span className='text-3xl'>Upload File</span>
          <input required type="file" id="fileInput" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => handleFileUpload(event)} accept=".md" />
        </label>
      </div>

      <div className='flex gap-x-4 justify-center items-center'>
        <Button className='bg-gray-400 hover:bg-gray-500 text-xl font-medium flex gap-x-1 justify-center items-center  py-7 px-6' onClick={convertToHtml}><IoIosLink /> <span>Convert To PDF</span></Button>
        {pdfGenerated && (
          <div>
            <button
              className="bg-slate-400 hover:bg-slate-500 text-white py-3 px-6 rounded-lg shadow-sm text-center font-bold flex gap-x-2 items-center justify-center"
              onClick={handleGeneratePdf}
            > <MdOutlineFileDownload className='h-8 w-auto' /></button>
          </div>
        )}
      </div>

      <div ref={reportTemplateRef}>
        <PDFViewer html={html} />
      </div>
    </div>
  );
};

export default Page;
