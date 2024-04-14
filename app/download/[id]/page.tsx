'use client'

import { MdOutlineFileDownload } from "react-icons/md";

const DownloadPage = ({ params }: { params: { id: string } }) => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/magic-md.appspot.com/o/files"
  const file = decodeURIComponent(params.id);

  const url = `${baseUrl}${file}`;
  
  // console.log('file URL', file);

  return (
    <div className="min-h-[650px] flex flex-col justify-start items-center gap-y-8">
      <h1 className='text-center font-bold text-3xl md:text-4xl'>Download Markdown File</h1>
      <a href={url} className="relative cursor-pointer bg-indigo-400 rounded-lg border border-transparent shadow-sm px-6 py-3 font-medium text-white hover:bg-indigo-500 focus:outline-none" download><MdOutlineFileDownload className='h-12 w-auto' /> </a>
    </div>
  );
};

export default DownloadPage;
