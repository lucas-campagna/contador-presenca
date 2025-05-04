import {
  createContext,
  memo,
  Dispatch,
  SetStateAction,
  useState,
  JSX,
} from "react";

type LoadingProviderPropsType = {
  children: JSX.Element;
};

type LoadingContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => null,
});

function LoadingProvider({ children }: LoadingProviderPropsType) {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
}

const Loading = memo(() => (
  <>
    <div className="fixed w-screen h-screen bg-light left-0 top-0 right-0 bottom-0 z-100" />
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-bold p-3 rounded-full animate-bounce z-101">
      Carregando...
    </div>
  </>
));

export default LoadingProvider;
