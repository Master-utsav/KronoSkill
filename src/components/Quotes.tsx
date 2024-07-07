'use client';
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useData } from "@/context/dataContext";


interface QuoteContent{
  name: string;
  quote: string;
  title: string
}
const Quotes = () => {
  const {data , loading , isLoggedIn} = useData();
  const qoutes: QuoteContent[] = data.quotes || [];
  
  return (
     <div className="h-[30rem] w-full mt-5 bg-grid-white/[0.08] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Echoes of Innovation: Voices Shaping the Future</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        {!loading ? (<div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={qoutes}
                direction="right"
                speed="slow"
            />
            </div>) : (isLoggedIn ? (<l-helix size="60" speed="1.3" color="#0c80fc70"></l-helix>) : (<l-helix size="60" speed="1.3" color="orchid"></l-helix>))}
            
        </div>
    </div>
  );
};

export default Quotes;
