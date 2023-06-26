import React from "react";

const CompactPagination = ({ page, totalPage, onChange }) => {
  const prevHandler = () => {
    page > 1 && onChange(page - 1);
  };
  const nextHandler = () => {
    page < totalPage && onChange(page + 1);
  };

  return (
    <div className="flex flex-1 gap-2 mt-4">
      <button
        onClick={prevHandler}
        disabled={page === 1}
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
      >
        Previous
      </button>

      <button
        onClick={nextHandler}
        disabled={page === totalPage}
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default CompactPagination;
