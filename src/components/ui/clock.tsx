// components/Clock.tsx
"use client";
import React, { useEffect, useRef } from "react";
import "@/css/clock.css";


interface Clock{
    dark_sdw?: string,
    light_sdw? : string,
    box_sdw? : string,
    outline_color? : string,
    second_color? : string,
    size? : string,
}
   
const Clock: React.FC<Clock> = ({dark_sdw, light_sdw, box_sdw, outline_color, second_color , size}) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const style = {
    "--dark-clock-shadow": dark_sdw,
    "--light-clock-shadow": light_sdw,
    "--box-clock-shadow": box_sdw,
    "--outline-clock-color": outline_color,
    "--second-clock-color": second_color,
    "--s-clock": size,
  } as React.CSSProperties;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondsDeg = (seconds / 60) * 360;
      const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;

      if (secondRef.current) {
        secondRef.current.style.transform = `rotate(${secondsDeg}deg)`;
      }
      if (minuteRef.current) {
        minuteRef.current.style.transform = `rotate(${minutesDeg}deg)`;
      }
      if (hourRef.current) {
        hourRef.current.style.transform = `rotate(${hoursDeg}deg)`;
      }
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="face" style={style}>
      <p className="v-index">II</p>
      <p className="h-index">II</p>
      <div ref={hourRef} className="hour"></div>
      <div ref={minuteRef} className="minute"></div>
      <div ref={secondRef} className="second"></div>
    </div>
  );
};

export default Clock;
