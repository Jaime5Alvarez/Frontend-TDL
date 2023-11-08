import { SetStateAction, useEffect } from "react";
import { CrossIcon } from "../buttons/crossIcon";

export const Modal = ({
  children,
  setClose,
  maxWidth = "max-w-md",
  onOpen,
}: {
  children: React.ReactNode;
  setClose: React.Dispatch<SetStateAction<boolean>>;
  maxWidth?: string;
  onOpen?: () => void;
}) => {
  useEffect(() => {
    onOpen && onOpen();
  }, []);
  return (
    <>
      <section className="fixed z-50 bg-black w-full h-screen flex justify-center items-center bg-opacity-50">
        <main
          className={`bg-white drop-shadow-lg rounded-lg p-5 relative border-2 ${maxWidth}`}
        >
          <CrossIcon close={setClose} />

          {children}
        </main>
      </section>
    </>
  );
};
