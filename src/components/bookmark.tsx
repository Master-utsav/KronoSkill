import React from 'react';
import "@/css/bookmark.css"
interface IconProps {
  size: string;
  secondaryColor: string;
  hoverColor: string;
  primaryColor: string;
  circleSize: string;
  isChecked: boolean;
}

const Bookmark: React.FC<IconProps> = ({
  size,
  secondaryColor,
  hoverColor,
  primaryColor,
  circleSize,
  isChecked,
})  => {
    const style = {
      "--icon-size": size,
      "--icon-secondary-color": secondaryColor,
      "--icon-hover-color": hoverColor,
      "--icon-primary-color": primaryColor,
      "--icon-circle-size" : circleSize,
    } as React.CSSProperties;

  return (
    <label className={`ui-bookmark ${isChecked ? 'checked' : ''}`} style={style}>
    <div className="bookmark">
      <svg viewBox="0 0 32 32">
        <g>
          <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
        </g>
      </svg>
    </div>
  </label>
  );
};

export default Bookmark;