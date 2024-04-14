import React from 'react'
import FeatureCard from './FeatureCard'
import folderIcon from '@/public/folder-icon.png'
import jpg from '@/public/jpg.png'
import pdf from '@/public/pdf.png'
import png from '@/public/png.png'
import csv from '@/public/csv.png'
import html from '@/public/html-5.png'
import rst from '@/public/rst.png'
import split from '@/public/split.png'
import link from '@/public/link.png'
import table from '@/public/table.png'
import merge from '@/public/merge.png'

const LandingPage = () => {

  const features = [
    {
      title: "Combine Markdown",
      description: "Combine multiple markdown files. As many as you need!",
      icon: merge,
      link: "/combineMarkdown"
    },
    {
      title: "Split Markdown",
      description: "Split a markdown file into multiple files.",
      icon: split,
      link: "/splitMarkdown"
    },
    {
      title: "Generate Link",
      description: "Generate a link to a specific section in a markdown file.",
      icon: link,
      link: "/generateLink"
    },
    {
      title: "Generate Table",
      description: "Generate a table from data in a markdown file.",
      icon: table,
      link: "/generateTable"
    },
    {
      title: "Convert Markdown to PDF",
      description: "Convert a markdown file to PDF format.",
      icon: pdf,
      link: "/mdToPdf"
    },
    {
      title: "Convert Markdown to CSV",
      description: "Convert a markdown file to CSV format.",
      icon: csv,
      link: "/mdToCsv"
    },
    {
      title: "Convert Markdown to HTML",
      description: "Convert a markdown file to HTML format.",
      icon: html,
      link: "/mdToHtml"
    },
    {
      title: "Convert Markdown to JPG",
      description: "Convert a markdown file to JPG image format.",
      icon: jpg,
      link: "/mdToJpg"
    },
    {
      title: "Convert Markdown to PNG",
      description: "Convert a markdown file to PNG image format.",
      icon: png,
      link: "/mdToPng"
    },
    {
      title: "Convert Markdown to RST",
      description: "Convert a markdown file to reStructuredText format.",
      icon: rst,
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
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>

    </div>
  )
}

export default LandingPage