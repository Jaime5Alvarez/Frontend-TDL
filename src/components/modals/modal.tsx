import { SetStateAction } from "react";
import { CrossIcon } from "../buttons/crossIcon";

export const Modal = ({
  children,
  setClose,
  close,
  maxWidth = "max-w-md",
}: {
  children: React.ReactNode;
  setClose: React.Dispatch<SetStateAction<boolean>>;
  close: boolean;
  maxWidth?: string;
}) => {
  return (
    <>
      {close && (
        <section className="fixed z-50 bg-black w-full h-screen flex justify-center items-center bg-opacity-50">
          <main
            className={`bg-white drop-shadow-lg rounded-lg p-5 relative border-2 ${maxWidth}`}
          >
            <CrossIcon close={setClose} />

            {children}
          </main>
        </section>
      )}
    </>
  );
};
