"use client";
import React from "react";
import Clock from "./ui/clock";
import Todo from "./todo";
import { Provider } from "react-redux";
import { store } from "@/utils/store";
import Tooltip from "./ui/tooltip";

const ClockTimer: React.FC = () => {
  const [isTodoOpen, setIsTodoOpen] = React.useState<boolean>(false);

  return (
    <>
      {isTodoOpen ? (
        <Provider store={store}>
          <div
            className={`fixed top-[0] right-0 z-50 max-h-[82vh] min-h-[20vh]  `}
          >
            <Todo visible={isTodoOpen} />
          </div>
        </Provider>
      ) : (
        <>
        </>
      )}
      <span
        className="sm:fixed lg:top-[39rem] lg:right-6 top-[62rem] right-2 z-50 cursor-pointer hidden sm:inline-block "
        onClick={() => setIsTodoOpen(!isTodoOpen)}
      >
        <Tooltip text="ToDo's" >
          <Clock
            dark_sdw="#9ec7f9dc"
            size="70px"
            light_sdw="#c7dcf8"
            box_sdw="#00ffff45"
            second_color="#0004ff"
            outline_color="#332a37"
          />
        </Tooltip>
      </span>
    </>
  );
};

export default ClockTimer;
