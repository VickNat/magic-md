import React from 'react'
import folderIcon from '@/public/folder-icon.png'
import Image from 'next/image'
import Link from 'next/link'

interface FeatureProps {
  feature: any
}

const FeatureCard = ({ feature }: FeatureProps) => {
  return (
    <Link href={feature?.link} className='bg-white h-64 w-64 rounded-md shadow-md shadow-slate-300 p-6 flex flex-col justify-start items-start gap-y-2 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg border border-slate-300'>
      <Image src={feature?.icon} alt="Folder Icon " className='' width={50} height={50} />
      <h2 className='font-semibold text-slate-900 text-xl'>{feature?.title}</h2>
      <p className='font-normal text-slate-600 text-lg'>{feature?.description}</p>
    </Link>
  )
}

export default FeatureCard