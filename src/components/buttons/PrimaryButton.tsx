interface PrimaryButton {
  text: string;
  action: () => void;
}

export const PrimaryButton = ({ text, action }: PrimaryButton) => {
  return (
    <>
      <button
        className="text-white drop-shadow-lg max-w-xl font-bold hover:bg-opacity-90 duration-200 ease-in-out bg-blue-700 rounded-lg px-2 py-1"
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};
