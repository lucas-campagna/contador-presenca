import { For, JSX, JSXElement } from "solid-js";

type TAction = {
  label: string;
  onClick: JSX.EventHandlerUnion<any, any>;
  icon?: JSXElement;
  selected?: boolean;
};

type MenuProps = {
  actions: TAction[];
};

function Nav(props: MenuProps) {
  return (
    <div class="fixed bottom-0 left-0 right-0 bg-sky-300 py-1 flex flex-row justify-center gap-1 select-none">
      <For each={props.actions} fallback={null}>
        {(item, index) => (
          <div
            onClick={item.onClick}
            data-index={index()}
            class={
              item.selected
                ? "uppercase bg-sky-600 p-2 rounded-md text-white cursor-pointer size-18 flex flex-col items-center justify-center text-xs overflow-hide"
                : "uppercase bg-sky-500 p-2 rounded-md text-white cursor-pointer size-18 flex flex-col items-center justify-center text-xs overflow-hide"
            }
          >
            {item.label}
          </div>
        )}
      </For>
    </div>
  );
}

export default Nav;
