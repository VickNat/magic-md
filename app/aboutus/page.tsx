import Image from 'next/image'
import React from 'react'
import image1 from '@/public/christin-hume-Hcfwew744z4-unsplash.jpg'
import image2 from '@/public/john-schnobrich-2FPjlAyMQTA-unsplash.jpg'
import image3 from '@/public/thomas-lefebvre-gp8BLyaTaA0-unsplash.jpg'

const Page = () => {
  return (
    <div className=" text-black min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-lg mt-4">Our journey and mission to simplify markdown file conversions.</p>
        </header>
        
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Our tool was born out of the need to simplify the process of converting markdown files into various formats. We understand the challenges faced by content creators, developers, and writers when it comes to managing and sharing their markdown content efficiently.
          </p>
          <Image src={image1} alt="Our Story" width={800} height={500} className="mt-4 rounded shadow-md" />
        </section>
        
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to provide a seamless and user-friendly platform that allows users to convert, manage, and share their markdown files with ease. We are dedicated to continuously improving our tool to meet the evolving needs of our users.
          </p>
          <Image src={image2} alt="Our Story" width={800} height={500} className="mt-4 rounded shadow-md" />
        </section>
        
        <section>
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg leading-relaxed">
            We are committed to offering a reliable and efficient solution for all your markdown conversion needs. Our tool supports a wide range of formats and provides features that help you create and manage your markdown content effortlessly.
          </p>
          <Image src={image3} alt="Our Story" width={800} height={500} className="mt-4 rounded shadow-md" />
        </section>
      </div>
    </div>
  )
}

export default Page