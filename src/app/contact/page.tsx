/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FormEvent, useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ContactPage(){
     const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [assistState , setAssistSatate] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted:', { email, message });
  };
  return (
    <div className="min-h-screen h-auto bg-gray-100 dark:bg-gray-900 md:py-12 md:pt-36 relative overflow-x-hidden py-4 pt-20">
      
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full " />
      <div className="max-w-2xl mx-auto p-4 relative space-y-4">
        <h1 className="text-2xl md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
        {"We're here to help with any questions about our courses, programs, or events. Whether you're looking to enhance your skills or need more information about our offerings, we're just a message away."}
        </p>
        <div className='flex flex-col text-start items-center justify-start w-fit h-auto'>
        <p className="text-blue-200 hover:text-blue-500 md:text-lg text-base cursor-pointer text-start" onClick={() => setAssistSatate(!assistState)}>How Can We Assist You?</p>
        {
          assistState ? (
            <ul className='flex flex-col gap-2 mt-2 animate-slidein'>
          <li className='text-start mr-2 flex w-[100%]'>
          <span className='text-bold text-white md:text-base text-sm w-[30%]'>Course Inquiries:{" "}</span>
            <p className='text-white/80 md:text-base text-sm w-[70%] text-start'>{"Have questions about our courses on YouTube? Need help finding the right one? Let us know!"}</p>
          </li>
          <li className='text-start mr-2 flex w-[100%]'>
          <span className='text-bold text-white md:text-base text-sm w-[30%]'>Program Information:{" "}</span>
            <p className='text-white/80 md:text-base text-sm w-[70%] text-start'>{"Want more details about our skill-enhancing programs? We're happy to provide all the information you need."}</p>
          </li>
          <li className='text-start mr-2 flex w-[100%]'>
          <span className='text-bold text-white md:text-base text-sm w-[30%]'>Event Details:{" "}</span>
            <p className='text-white/80 md:text-base text-sm w-[70%] text-start'>{"Interested in our upcoming online events? We'll keep you updated on dates, schedules, and how to participate."}</p>
          </li>
          <li className='text-start mr-2 flex w-[100%]'>
          <span className='text-bold text-white md:text-base text-sm w-[30%]'>Technical Support:{" "}</span>
            <p className='text-white/80 md:text-base text-sm w-[70%] text-start'>{"Facing any issues with accessing our content on YouTube? We're here to troubleshoot and ensure you have a seamless experience."}</p>
          </li>
          <li className='text-start mr-2 flex  w-[100%]'>
          <span className='text-bold text-white md:text-base text-sm w-[30%]'>General Questions:{" "}</span>
            <p className='text-white/80 md:text-base text-sm w-[70%] text-start'>{"Anything else on your mind? Feel free to ask, and we'll do our best to assist."}</p>
          </li>
        </ul>) : ""
        }
        </div>
        <p className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-[#75f7bde4] to-neutral-50 md:text-lg  text-base text-start'>Feel free to share your thoughts, requirements, and any suggestions you have to improve our site!</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* <ThemeSwitch/> */}
    </div>
  )
}


