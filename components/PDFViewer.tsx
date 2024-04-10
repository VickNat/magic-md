import React from 'react'

interface PDFViewerProps {
  html: any
}

const PDFViewer = ({ html }: PDFViewerProps) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default PDFViewer