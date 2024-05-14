'use client';
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const TestimonialCards = () => {
  const musicSchoolTestimonials = [
    {
      quote:
        "The music lessons I received were transformative. They helped me discover my passion for music and develop my skills to a whole new level.",
      name: "Emma Watson",
      title: "Student",
    },
    {
      quote:
        "The instructors at the music school are exceptional. Their guidance and expertise have been instrumental in shaping my musical journey.",
      name: "John Smith",
      title: "Musician",
    },
    {
      quote:
        "Attending music classes here has been an enriching experience. I've learned not just about music theory but also about creativity and expression.",
      name: "Anna Garcia",
      title: "Enthusiast",
    },
    {
      quote:
        "The music school provides a supportive and inspiring environment for learning. It's where I've found my voice and gained confidence in my musical abilities.",
      name: "Michael Johnson",
      title: "Aspiring Artist",
    },
    {
      quote:
        "I never thought I could learn to play an instrument until I joined this music school. Now, I can't imagine my life without music.",
      name: "Sophia Martinez",
      title: "Lifelong Learner",
    },
  ];

  return (
     <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Hear our Harmony: Voices of success</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={musicSchoolTestimonials}
                direction="right"
                speed="slow"
      />
            </div>
        </div>
    </div>
  );
};

export default TestimonialCards;
