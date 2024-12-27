import Image from 'next/image'
import React from 'react'
import image1 from '@/public/christin-hume-Hcfwew744z4-unsplash.jpg'
import image2 from '@/public/john-schnobrich-2FPjlAyMQTA-unsplash.jpg'
import image3 from '@/public/thomas-lefebvre-gp8BLyaTaA0-unsplash.jpg'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <div className="max-w-6xl mx-auto p-8">
        <header className="text-center mb-12 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <h1 className="text-6xl font-bold text-black mb-4 flex items-center justify-center gap-3">
            <span>About Us</span>
            <span>✨</span>
          </h1>
          <p className="text-xl text-black flex items-center justify-center gap-2">
            <span>Transforming your markdown experience, one file at a time</span>
            <span>🚀</span>
          </p>
        </header>
        
        <section className="mb-10 hover:transform hover:scale-[1.01] transition-all duration-300 opacity-0 animate-[slideUp_1s_ease-out_forwards] [animation-delay:0.2s]">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-4xl font-semibold mb-4 text-black text-center flex items-center justify-center gap-2">
              <span>Our Story</span>
              <span>📚</span>
            </h2>
            <p className="text-base text-black mb-6 leading-relaxed">
              Our tool was born out of the need to simplify the process of converting markdown files into various formats. We understand the challenges faced by content creators, developers, and writers when it comes to managing and sharing their markdown content efficiently.
            </p>
            <Image 
              src={image1} 
              alt="Our Story" 
              width={700} 
              height={400} 
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mx-auto" 
            />
          </div>
        </section>
        
        <section className="mb-10 hover:transform hover:scale-[1.01] transition-all duration-300 opacity-0 animate-[slideUp_1s_ease-out_forwards] [animation-delay:0.4s]">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-4xl font-semibold mb-6 text-black text-center flex items-center justify-center gap-2">
              <span>Our Mission</span>
              <span>🎯</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 space-y-6">
                <p className="text-base text-black leading-relaxed">
                  Our mission is to provide a seamless and user-friendly platform that allows users to convert, manage, and share their markdown files with ease.
                </p>
                <div className="space-y-4">
                  <ul className="list-none space-y-4">
                    <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">1</span>
                      <div>
                        <span className="font-semibold">Efficiency First</span>
                        <p className="text-sm text-gray-600 mt-1">Quick and efficient file conversions with support for multiple formats</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">2</span>
                      <div>
                        <span className="font-semibold">User Experience</span>
                        <p className="text-sm text-gray-600 mt-1">Beautiful and consistent output for all your documents</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">3</span>
                      <div>
                        <span className="font-semibold">Security</span>
                        <p className="text-sm text-gray-600 mt-1">Secure and private processing of all your content</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <Image 
                  src={image2} 
                  alt="Our Mission" 
                  width={500} 
                  height={300} 
                  className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="hover:transform hover:scale-[1.01] transition-all duration-300 opacity-0 animate-[slideUp_1s_ease-out_forwards] [animation-delay:0.6s]">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-4xl font-semibold mb-6 text-black text-center flex items-center justify-center gap-2">
              <span>Why Choose Us</span>
              <span>⭐</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <Image 
                  src={image3} 
                  alt="Why Choose Us" 
                  width={500} 
                  height={300} 
                  className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-black">Key Features</h3>
                    <ul className="list-none space-y-4">
                      <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                          <span className="text-purple-600">→</span>
                        </span>
                        <div>
                          <span className="font-semibold">Multiple Formats</span>
                          <p className="text-sm text-gray-600 mt-1">Convert to PDF, HTML, RST, and more</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                          <span className="text-purple-600">→</span>
                        </span>
                        <div>
                          <span className="font-semibold">Smart Preview</span>
                          <p className="text-sm text-gray-600 mt-1">See changes in real-time before converting</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-black group hover:transform hover:translate-x-2 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                          <span className="text-purple-600">→</span>
                        </span>
                        <div>
                          <span className="font-semibold">Batch Processing</span>
                          <p className="text-sm text-gray-600 mt-1">Handle multiple files simultaneously</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page