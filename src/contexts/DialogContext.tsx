import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";

type DialogContextProps = {
  setDialog: Dispatch<SetStateAction<ReactNode>>;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextProps>({
  setDialog: () => null,
  closeDialog: () => null,
});

type DialogProviderProps = {
  children: React.ReactNode;
};

export default function DialogProvider({ children }: DialogProviderProps) {
  const [content, setDialog] = useState<ReactNode | null>(null);
  const dialogBlur = useRef(null);
  const closeDialog = () => {
    setDialog(null);
  };

  function handleBlur(e: any) {
    if (e.target === dialogBlur.current) {
      closeDialog();
    }
  }

  return (
    <>
      {content ? (
        <div
          ref={dialogBlur}
          className="fixed backdrop-blur-sm w-screen h-screen z-10"
          onClick={handleBlur}
        >
          <div className="fixed -translate-1/2 left-1/2 top-1/2 flex flex-col justify-center items-strech bg-white rounded-lg shadow-lg p-4">
            {content}
          </div>
        </div>
      ) : null}
      <DialogContext.Provider value={{ setDialog, closeDialog }}>
        {children}
      </DialogContext.Provider>
    </>
  );
}
