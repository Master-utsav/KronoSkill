
import React, { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

interface RatingProps {
  initialRating: number;
  onSubmit: (rating: number) => void;
  customColor?: string;
}

const RatingSubmit: React.FC<RatingProps> = ({ initialRating, onSubmit, customColor = 'gold' }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = async(rate: number) => {
    setRating(rate);
    
  };
  
  const handleSubmit = () => {
    if (rating >= 1 && rating <= 5) {
      onSubmit(rating);
    } else {
      alert("Please select a rating between 1 and 5.");
    }
    setRating(0);
   
  };

  return (
    <div className="rating-component md:flex gap-2 flex-wrap space-y-2">
    <div className='flex flex-col gap-1 justify-center items-start'>
      <p>Rate this playlist</p>
      <div className="star-rating flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} onClick={() => handleStarClick(star)}>
            {star <= rating ? <RiStarFill style={{ color: customColor }} /> : <RiStarLine />}
          </span>
        ))}
      </div>
      </div>
      {rating > 0 && <button className={`ring-1 ring-[${customColor}] rounded-md p-2`} onClick={handleSubmit}>Submit</button>}
      
    </div>
  );
};

export default RatingSubmit;