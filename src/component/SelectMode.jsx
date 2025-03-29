import React from "react";
import { Link } from "react-router-dom";

function SelectMode() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center mt-4 bg-white text-black">
        <h1 className="text-3xl font-bold mb-4">Typing Test</h1>
        <h2 className="text-2xl font-bold mb-4">Choose Your Mode</h2>
        <p className="text-gray-700">Select the mode you want to practice.</p>
        <div className="flex gap-4 mt-4">
          <Link
            to="/singleword"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Single Word
          </Link>
          <Link
            to="/sentence"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Paragraph
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectMode;
