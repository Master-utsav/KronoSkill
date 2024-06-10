"use client";
import React from "react";
import Clock from "./ui/clock";
import Todo from "./todo";
import { Provider } from "react-redux";
import { store } from "@/utils/store";

const ClockTimer: React.FC = () => {
  const [isTodoOpen, setIsTodoOpen] = React.useState<boolean>(false);

  return (
    <>
      {isTodoOpen ? (
        <Provider store={store}>
           <span
        className="fixed top-[0] right-0 z-50 max-h-[82vh] bg-blue-400 overflow-y-hidden"
          ><Todo />
      </span>
        </Provider>
      ) : (
        ""
      )}
      <span
        className="fixed top-[39rem] right-6 z-50"
        onClick={() => setIsTodoOpen(!isTodoOpen)}
      >
        <Clock
          dark_sdw="#9ec7f9dc"
          size="70px"
          light_sdw="#c7dcf8"
          box_sdw="#00ffff45"
          second_color="#0004ff"
          outline_color="#332a37"
        />
      </span>
    </>
  );
};

export default ClockTimer;
