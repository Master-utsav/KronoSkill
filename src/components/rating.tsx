import React from 'react';
import { RiStarFill, RiStarHalfLine, RiStarLine } from 'react-icons/ri';

interface RatingProps {
  rating: number;
  customColor?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, customColor = 'gold' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="rating flex">
      {stars.map((star) => {
        if (star <= Math.floor(rating)) {
          return <RiStarFill key={star} style={{ color: customColor }} />;
        } else if (star - 0.5 <= rating) {
          return <RiStarHalfLine key={star} style={{ color: customColor }} />;
        } else {
          return <RiStarLine key={star} />;
        }
      })}
    </div>
  );
};

export default Rating;