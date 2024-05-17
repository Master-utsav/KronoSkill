import React from "react";
import "@/css/spinner.css"; // Assuming you have this CSS file

interface SpinnerProps {
  size?: string; // Add size prop to customize spinner size
  bg_color?: string; // Optional color prop
  spinner_color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size, bg_color, spinner_color ,className }) => {
  const style = {
    "--spinner-size": size,
    "--base-color": bg_color,
    "--spinner-color": spinner_color,
  } as React.CSSProperties;

  return (
    <div className="bg_spinner relative">
      <div
        className={"loader_spinner animate-pulse " + className}
        style={style}
      ></div>
    </div>
  );
};
