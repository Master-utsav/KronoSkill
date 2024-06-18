
import { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  bottom?: string ;
  left?: string ;
  animate? : string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children , bottom = "-bottom-10" , left = "left-0" , animate="animate-slidedown"}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col  hover:bg-transparent justify-center items-center"
    >
      {children}
      {showTooltip && (
        <div className={`absolute ${bottom} ${left} backdrop-blur-3xl left-0 transform -translate-x-1/2 bg-gray-800/80 text-white px-2 py-1 rounded-md shadow-md ${animate}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;