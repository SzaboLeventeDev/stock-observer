import { FC, useEffect, useRef } from 'react';

interface SearchFieldProps {
  onSearch: (keywords: string) => void;
  animate: boolean;
}

const SearchField: FC<SearchFieldProps> = ({ onSearch, animate }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * @function searchStock
   * @description Search field for filtering between the market items.
   * @returns {Promise<void>} Dose not return any value.
   */
  const searchStock = async (): Promise<void> => {
    if (!inputRef.current?.value) return;
    onSearch(inputRef.current.value);
  };

  /**
   * @function handleBlur
   * @description Remove focus from the search field when clicking outside of the element.
   * @returns {void} Dose not return any value.
   */
  const handleBlur = (): void => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        inputRef.current?.blur();
      }
    }, 100);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center h-12 w-64 md:w-80 lg:w-100 
        transition-transform duration-500 ${animate ? 'translate-y-0' : 'translate-y-1/2'}`}
      ref={containerRef}
      onBlur={handleBlur}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="w-64 md:w-80 lg:w-100 pl-4 pr-2 py-2 
        dark:color-grey dark-bg:grey border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
        onFocus={() => inputRef.current?.focus()}
      />
      <button
        className="absolute right-2 p-0 cursor-pointer"
        onClick={searchStock}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchField;
