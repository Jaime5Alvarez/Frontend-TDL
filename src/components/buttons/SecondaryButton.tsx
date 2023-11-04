interface SecondaryButton {
  text: string;
  action: () => void;
}

export const SecondaryButton = ({ text, action }: SecondaryButton) => {
  return (
    <>
      <button
        className="text-blue-800 drop-shadow-lg max-w-lg font-bold hover:bg-opacity-90 duration-200 ease-in-out bg-white rounded-lg px-2 py-1"
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};
