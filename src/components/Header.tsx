import {
  Accessor,
  createEffect,
  createSignal,
  For,
} from "solid-js";

export type HeaderProps = {
  items: Accessor<string[]>;
  onClick: (item: string) => void;
};

function Header(props: HeaderProps) {
  const [selected, setSelected] = createSignal("");
  createEffect(() => {
    setSelected((props.items() ?? [])[0] ?? "");
  });
  function handleOnClick(item: string){
    setSelected(item);
    props.onClick(item);
  }

  return (
    <div class="fixed px-1 top-0 left-0 flex justify-center right-0 bg-sky-100 py-2 uppercase select-none rounded-b-lg shadow-md">
      <div class="flex gap-1 justify-start overflow-x-auto max-w-3xl rounded-xl">
        <For each={props.items()} fallback={null}>
          {(item, index) => (
            <div
              class={
                item === selected()
                  ? "rounded-full bg-sky-400 p-1 px-2 text-nowrap text-white"
                  : "rounded-full bg-white p-1 px-2 text-nowrap"
              }
              data-index={index()}
              onClick={() =>( handleOnClick(item))}
            >
              {item}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
export default Header;
