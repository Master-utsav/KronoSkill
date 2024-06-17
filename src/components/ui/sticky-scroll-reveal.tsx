import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ContentItem {
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
}

interface StickyScrollProps {
  content?: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength: any = content?.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content?.map((_, index) => index / cardLength);
    const closestBreakpointIndex: any = cardsBreakpoints?.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-thin scrollbar-thumb-green-600/80 scrollbar-track-indigo-200 scrollbar-corner-transparent"
      ref={ref}
    >
      <h1 className="md:mt-0 absolute top-4 left-[40%] text-center text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-1 z-50">
        Click to view{" "}
        <span className=" bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-[#065cf1e4] animate-pulse">
          Playlist
        </span>
      </h1>
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content?.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-10"
              >
                {item.description.length > 580 ? (
                  <>
                    {item.description.substring(0, 580)}...
                    <a
                      href={item.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ...more
                    </a>
                  </>
                ) : (
                  item.description
                )}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        className={cn(
          "hidden lg:block h-[240px] w-[426px] place-content-center  rounded-md bg-white/5 sticky top-20 overflow-hidden",
          contentClassName
        )}
      >
        {content && content[activeCard] ? (
          <>
            <motion.img
              key={content[activeCard].thumbnail}
              src={content[activeCard].thumbnail}
              alt={content[activeCard].title}
              className="w-full h-full object-cover"
              // style={{ minHeight: '180px', minWidth: '320px' }}
              transition={{ duration: 0.5 }}
            />
            <a
              href={content[activeCard].playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
            />
          </>
        ) : (
          ""
        )}
      </motion.div>
    </motion.div>
  );
};
