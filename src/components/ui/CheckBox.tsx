// CheckBox.tsx

import React, { useState } from 'react';

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label className="relative block cursor-pointer text-lg select-none mr-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="hidden"
      />
      <div className={`relative h-6 w-6 bg-transparent border border-gray-400 rounded transition animate-opac duration-300${isChecked ? 'bg-blue-600 border-l-0 border-r-0 border-t-2 border-b-2 rounded-sm border-green-500  ' : ''}`}>
        {isChecked && (
          <div className="absolute left-2 top-[1px] w-1.5 h-3.5  border-green-500 border-r-[3px] border-b-[3px] transform rotate-45 duration-500 animate-opac "></div>
        )}
      </div>
    </label>
  );
};

export default CheckBox;
