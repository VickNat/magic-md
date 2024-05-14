'use client'

import React from 'react'
import { Button } from './ui/button'
import { MdContentCopy } from 'react-icons/md'
import  styles from './PDFViewer.module.css';

interface PDFViewerProps {
  html: any;
}

const PDFViewer = ({ html }: PDFViewerProps) => {
  return (
    <div className="html-container bg-white rounded-lg shadow-md p-6 relative min-h-96 w-[450px] max-w-screen-md">
      <Button variant={'ghost'} className="absolute top-0 right-0" onClick={() => navigator.clipboard.writeText(html)}><MdContentCopy className='h-6 w-auto text-indigo-600' /></Button>
      <div >
        <div className={styles.htmlContainer} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export default PDFViewer