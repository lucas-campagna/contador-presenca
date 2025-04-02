import { createContext, createSignal, Setter, Show } from "solid-js";

const isLoadingContext = createContext<Setter<boolean>>(() => null);

function IsLoadingProvider(props: any) {
  const [isLoading, setIsLoading] = createSignal(false);
  return (
    <>
      <Show when={isLoading()}>
        <div class="fixed backdrop-blur-sm w-screen h-screen z-10">
          <div class="fixed -translate-1/2 left-1/2 top-1/2 rounded-full p-1 bg-sky-100 flex justify-center items-center">
            <div class="relative animate-spin rounded-full size-24 bg-sky-100 flex justify-center items-center overflow-hidden">
              <div class="size-1/1 translate-y-1/2 bg-sky-200" />
              <div class="absolute rounded-full size-1/4 left-0 bg-sky-200" />
              <div class="absolute -scale-x-[100%] rounded-full size-3/4 right-0 bg-sky-100 overflow-hidden">
                <div class="size-1/1 translate-y-1/2 bg-sky-300" />
                <div class="absolute rounded-full size-1/4 top-1/2 -translate-y-1/2 bg-sky-300" />
                <div class="absolute rounded-full size-3/4 right-0 top-1/2 -translate-y-1/2 bg-sky-100" />
              </div>
            </div>
          </div>
        </div>
      </Show>
      <div class="fixed right-0 bottom-1/6 w-screen h-10 bg" />
      <isLoadingContext.Provider value={setIsLoading}>
        {props.children}
      </isLoadingContext.Provider>
    </>
  );
}

export { isLoadingContext, IsLoadingProvider };
