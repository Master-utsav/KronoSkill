'use client'
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const WhyChooseUs = () => {
  const musicSchoolContent = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 1
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 2
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 3
        </div>
      ),
    },
    {
      title: "Mastering Music Theory",
      description:
        "Dive deep into the fundamentals of music theory and elevate your musical understanding. Learn about scales, chords, harmony, rhythm, and more.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 4
        </div>
      ),
    },
    {
      title: "Exploring World Music",
      description:
        "Embark on a journey around the world through music. Discover diverse musical traditions, instruments, rhythms, and cultural expressions from different regions.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 5
        </div>
      ),
    },
    {
      title: "Discovering Jazz Legends",
      description:
        "Immerse yourself in the rich history and legendary figures of jazz music. Explore the origins, styles, innovations, and influential artists that shaped the jazz genre.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 6
        </div>
      ),
    },
    {
      title: "Introduction to Music Production",
      description:
        "Unlock the secrets of music production and unleash your creativity. Learn about recording, mixing, mastering, software tools, and techniques to produce professional-quality music.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 7
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full flex items-center justify-center">
          Item number 8
        </div>
      ),
    },
  ];

  return (
    <div className="p-10">
      <StickyScroll content={musicSchoolContent} />
    </div>
  );
};

export default WhyChooseUs;
