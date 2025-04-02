import { runWithOwner, getOwner } from "solid-js";
import useDialog from "../hooks/useDialog";
import DialogList from "./DialogList";

type TEvent = () => any;
export type TAction = { [key: string]: TEvent | TAction };

export type ActionButtonsProps = {
  actions: TAction;
};

function ActionButton(props: ActionButtonsProps) {
  const { setDialog } = useDialog();
  const owner = getOwner();
  function handleOnClick() {
    runWithOwner(owner, () =>
      setDialog(<DialogList items={props.actions} />)
    );
  }

  return (
    <div
      class="fixed right-[2%] bottom-[20%] size-[48px] bg-sky-600 rounded-full flex justify-center items-center font-bold text-white cursor-mouse shadow-md text-3xl leading-none text-center align-middle"
      onClick={handleOnClick}
    >
      +
    </div>
  );
}

export default ActionButton;
