import React from "react";

const AddSideSection = () => {
  return (
    <div className="flex flex-col items-center px-6 py-3 border rounded-lg mt-2 ">
      {/* Paragraph */}
      <p className="text-xl text-gray-500">
      <span className="text-gray-700">ADD</span> and <span className="text-gray-700">EXPAND</span> your business reach with JKcarmart
      </p>

      <button className="mt-10 px-10 py-3 bg-orange-500 text-white rounded-lg">
        Add
      </button>
    </div>
  );
};

export default AddSideSection;
