import {
  createContext,
  createMemo,
  createSignal,
  JSXElement,
  Setter,
  Show,
} from "solid-js";

export type TDialogContext = JSXElement | null;
const defaultValue = ((_: TDialogContext) => {});
export const dialogContext = createContext(defaultValue);

function Dialog(props: any) {
  const [content, setContent] = createSignal<TDialogContext>(null);
  const isVisible = createMemo(() => !!content());
  let dialogBlur;

  function handleBlur(e: any){
    if(e.target === dialogBlur){
      setContent(null)
    }
  }

  return (
    <>
      <Show when={isVisible()}>
        <div ref={dialogBlur} class="fixed backdrop-blur-sm w-screen h-screen z-10" onClick={handleBlur}>
          <div class="fixed -translate-1/2 left-1/2 top-1/2 flex justify-center items-center">
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
