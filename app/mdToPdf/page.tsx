'use client'
import React, { useRef, useState } from 'react';
import { marked } from 'marked';
import PDFViewer from '@/components/PDFViewer';
import jsPDF from 'jspdf';

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
    <div>
      <input type="file" accept=".md" onChange={(event) => handleFileUpload(event)} />
      <button onClick={convertToHtml}>Convert to PDF</button>
      <div ref={reportTemplateRef}>
        <PDFViewer html={html} />
      </div>
      {pdfGenerated && (
        <div>
          <button onClick={handleGeneratePdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default Page;
