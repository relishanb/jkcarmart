import Image from 'next/image';
import React from 'react';

import { FaLocationDot } from "react-icons/fa6";

const testimonials = [
  {
    image: '/bg-blogs.jpg', // Replace with correct path
    username: 'XYZ | Jammu',
    description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.',
  },
  {
    image: '/bg-blogs.jpg', // Replace with correct path
    username: 'ABC | Jammu',
    description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.',
  },
  {
    image: '/bg-blogs.jpg', // Replace with correct path
    username: 'ABC | Jammu',
    description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.',
  },
  {
    image: '/bg-blogs.jpg', // Replace with correct path
    username: 'ABC | Jammu',
    description: 'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.',
  },
];

function TestimonialSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-start text-3xl font-extrabold text-gray-900 mb-10">
          Check what people say about us
        </h2>
        <div className="relative bg-white">
          <div className="bg-white flex overflow-x-auto space-x-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-b-2 border-orange-500 flex-shrink-0 w-72 sm:w-80 md:w-96 rounded-xl shadow-lg bg-white overflow-hidden"
              >
                <div className=" relative aspect-w-4 aspect-h-3">
                  <Image width={20} height={24}
                    className="object-cover w-full h-full"
                    src={testimonial?.image}
                    alt={`Testimonial ${index + 1}`}
                  />
                  <div className="absolute top-2 left-2 flex items-center bg-white/60 rounded-full px-2 py-1">
                    <div className="rounded-full w-5 h-5 mr-1">
                      <img
                        src="/favicon.ico"
                        alt="Favicon"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <span className="text-gray-800 font-medium text-sm">JKCARMART</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className='mr-2 text-orange-500 text-sm'>
                      <FaLocationDot/>
                    </span>
                    <h3 className="font-semibold text-gray-700 text-sm">{testimonial.username}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0">
            <button className="text-gray-600 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
