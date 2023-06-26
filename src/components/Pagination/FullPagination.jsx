import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const FullPagination = ({ page, totalPage, onChange }) => {
  const prevHandler = () => {
    page > 1 && onChange(page - 1);
  };
  const nextHandler = () => {
    page < totalPage && onChange(page + 1);
  };
  const goToPage = page => {
    page >= 1 && page <= totalPage && onChange(page);
  };

  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page === 1}
          onClick={prevHandler}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={page === totalPage}
          onClick={nextHandler}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              disabled={page === 1}
              onClick={prevHandler}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array(totalPage)
              .fill({})
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {index + 1}
                </button>
              ))}
            <button
              onClick={nextHandler}
              disabled={page === totalPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-40"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default FullPagination;
