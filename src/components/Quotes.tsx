'use client';
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import axios from "axios";

interface QuoteContent{
  name: string;
  quote: string;
  title: string
}
const Quotes = () => {
  const [qoutes, setQuotes] = useState<QuoteContent[]>([]);

  useEffect(() => {
  async function getQuoteContent() {
      try {
        const response = await axios.get("/api/manager/quote");
        const data = response.data;
       
        if (data && data.quotes && Array.isArray(data.quotes)) {
          setQuotes(data.quotes);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getQuoteContent();
  }, []);

  return (
     <div className="h-[30rem] w-full mt-5 dark:bg-grid-white/[0.08] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Echoes of Innovation: Voices Shaping the Future</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={qoutes}
                direction="right"
                speed="slow"
      />
            </div>
        </div>
    </div>
  );
};

export default Quotes;
