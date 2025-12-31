'use client';

import { useState } from 'react';
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const twoArray = [11, 12, 13, 14, 15, 16, 17];

export const DifferentFunction = () => {
  const [outputValue, setOutputValue] = useState<number[]>(array);
  const [anotherValue, setAnotherValue] = useState<number[]>([]);

  const handleClick = () => {
    const result = outputValue.map((items) => items * 2);
    setOutputValue(result);
  };

  const handleReset = () => {
    setOutputValue(array);
    setAnotherValue([]);
  };

  const handleConcatArray = () => {
    const result = array.concat(twoArray);
    setAnotherValue(result);
  };

  return (
    <div>
      <div>An output value from console log: {JSON.stringify(outputValue)}</div>
      <div>An output value from console log: {JSON.stringify(anotherValue)}</div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handleClick}
          className="p-4 bg-stone-900 text-white rounded-lg mt-4 font-bold"
        >
          Click me
        </button>
        <button
          onClick={handleReset}
          className="p-4 bg-stone-900 text-white rounded-lg mt-4 font-bold"
        >
          Reset
        </button>
        <button
          onClick={handleConcatArray}
          className="p-4 bg-gray-600 text-white rounded-lg mt-4 font-bold"
        >
          Set merge arrays
        </button>
      </div>
    </div>
  );
};
