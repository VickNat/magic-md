import React from 'react'
import FeatureCard from './FeatureCard'
import folderIcon from '@/public/folder-icon.png'

const LandingPage = () => {

  const features = [
    {
      title: "Combine Markdown",
      description: "Combine multiple markdown files. As many as you need!",
      icon: folderIcon,
      link: "/combineMarkdown"
    },
    {
      title: "Split Markdown",
      description: "Split a markdown file into multiple files.",
      icon: folderIcon,
      link: "/splitMarkdown"
    },
    {
      title: "Generate Link",
      description: "Generate a link to a specific section in a markdown file.",
      icon: folderIcon,
      link: "/generateLink"
    },
    {
      title: "Generate Table",
      description: "Generate a table from data in a markdown file.",
      icon: folderIcon,
      link: "/generateTable"
    },
    {
      title: "Convert Markdown to PDF",
      description: "Convert a markdown file to PDF format.",
      icon: folderIcon,
      link: "/mdToPdf"
    },
    {
      title: "Convert Markdown to CSV",
      description: "Convert a markdown file to CSV format.",
      icon: folderIcon,
      link: "/mdToCsv"
    },
    {
      title: "Convert Markdown to HTML",
      description: "Convert a markdown file to HTML format.",
      icon: folderIcon,
      link: "/mdToHtml"
    },
    {
      title: "Convert Markdown to JPG",
      description: "Convert a markdown file to JPG image format.",
      icon: folderIcon,
      link: "/mdToJpg"
    },
    {
      title: "Convert Markdown to PNG",
      description: "Convert a markdown file to PNG image format.",
      icon: folderIcon,
      link: "/mdToPng"
    },
    {
      title: "Convert Markdown to RST",
      description: "Convert a markdown file to reStructuredText format.",
      icon: folderIcon,
      link: "/mdToRst"
    }
  ]

  return (
    <div className='max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center gap-y-4 md:gap-y-8'>
      <h1 className='text-center font-bold text-3xl md:text-4xl'>🎨 Every tool you need to work with Markdown in one place 🚀</h1>
      <p className='text-center text-slate-800 font-medium text-lg md:text-2xl'>
        🌟 Every tool you need to use Markdown, at your fingertips. All are easy to use! Combine, split, generate tables, links, and convert Markdown with just a few clicks. 📝
      </p>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 justify-center pb-8 md:pb-16'>
        {features.map((feature, index) => (
          <FeatureCard feature={feature} />
        ))}
      </div>

    </div>
  )
}

export default LandingPage