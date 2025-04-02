import { For, getOwner, runWithOwner, Show } from "solid-js";
import useDialog from "../hooks/useDialog";

export type TItems = {
  [key: string]: TItems | CallableFunction;
};

export type DialogListProps = {
  title?: string;
  items: TItems;
};

function DialogList(props: DialogListProps) {
  const owner = getOwner();
  const { setDialog, hideDialog } = useDialog();
  function handleOnClick(name: string, action: TItems | CallableFunction) {
    if (typeof action === "function") {
      (action as CallableFunction)();
      hideDialog();
    } else {
      runWithOwner(owner, () =>
        setDialog(<DialogList title={name} items={action as TItems} />)
      );
    }
  }
  return (
    <div class="flex flex-col justify-start items-strech p-3 bg-white rounded-sm shadow-sm gap-3">
      <Show when={props?.title}>
        <div class="flex items-center font-bold text-xl">{props?.title}</div>
      </Show>
      <For each={Object.entries(props.items)} fallback={null}>
        {([name, action], index) => (
          <div
            class="bg-sky-500 p-2 rounded-sm text-white"
            onClick={() => handleOnClick(name, action)}
            data-index={index()}
          >
            {name}
          </div>
        )}
      </For>
    </div>
  );
}

export default DialogList;
