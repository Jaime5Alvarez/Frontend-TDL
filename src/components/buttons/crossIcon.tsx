export interface CrossIconprops {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CrossIcon: React.FC<CrossIconprops> = ({ close }) => {
  return (
    <button
      onClick={() => {
        close((prev) => !prev);
      }}
      type="button"
      className="absolute duration-200 ease-in-out right-2 top-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ml-auto inline-flex justify-center items-center "
      data-modal-hide="defaultModal"
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
};
