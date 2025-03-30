import { createContext, createMemo, createSignal, JSXElement, Show } from "solid-js";

export type TDialogContext = (children: () => JSXElement) => void
export const dialogContext = createContext({} as TDialogContext);

function Dialog(props: any) {
    const [content, setContent] = createSignal(null);
    const isVisible = createMemo(() => content() !== null);
    return (
        <>
            <Show when={isVisible()}>
                <div class="fixed backdrop-blur-sm w-screen h-screen">
                    <div class="fixed -translate-1/2 left-1/2 top-1/2 rounded-full p-1 bg-sky-100 flex justify-center items-center">
                        {content()}
                    </div>
                </div>
            </Show>
            <dialogContext.Provider value={setContent}>
                {props.children}
            </dialogContext.Provider>
        </>
    );
}
export default Dialog;