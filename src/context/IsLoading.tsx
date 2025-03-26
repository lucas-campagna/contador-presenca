import { createContext, createSignal, Show } from "solid-js";

const isLoadingContext = createContext();

function IsLoadingProvider(props: any) {
    const [isLoading, setIsLoading] = createSignal(true);
    return (
        <>
            <Show when={isLoading()}>
                <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full w-32 h-32 bg-sky-100 bg-opacity-50 flex justify-center items-center">
                    <div class="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-sky-600"></div>
                </div>
            </Show>
            <isLoadingContext.Provider value={setIsLoading}>
                {props.children}
            </isLoadingContext.Provider>
        </>
    );
}

export { isLoadingContext, IsLoadingProvider };